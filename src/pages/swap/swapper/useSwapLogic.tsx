import { Operator } from "@/constants.ts";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { useLiquidityService } from "@/hooks/services/backend/useLiquidityService.ts";
import { useMarketService } from "@/hooks/services/backend/useMarketService.ts";
import { useMiscService } from "@/hooks/services/backend/useMiscService";
import { useRouteService } from "@/hooks/services/backend/useRouteService";
import useCoreContract from "@/hooks/services/contracts/useCoreContract";
import useRouterContract from "@/hooks/services/contracts/useRouterContract.ts";
import useGeo from "@/hooks/useGeo";
import { delay, isReqErr404, isZero, logError, toDec, toHD, toHDD, toLDD, trimZeros } from "@/libs/helpers.ts";
import { DefaultSwapExpireDurSec, DefaultSwapSlippage } from "@/pages/swap/constants.ts";
import { getTokenType, isERC20, isNative, isSynthetic } from "@/pages/swap/utils.ts";
import { AssetType } from "@/types/enums.ts";
import { TokenList, TokenLists } from "@jointlabs/meta";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ZeroAddress } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TransactionReceipt, decodeEventLog, encodeAbiParameters, parseAbiParameters } from "viem";
import { useBalance } from "wagmi";
import { SideQuote, SwapPageType, SwapSide } from "./types";

const defaultState: SwapPageType = {
  slippage: DefaultSwapSlippage,
  expires: DefaultSwapExpireDurSec,
  liquidities: [],
  selectedLiquidity: undefined,
  payRoutes: [],
  selectedPayRoutes: [],
  sellAmount: "",
  buyAmount: "",
  focusSide: undefined,
  drawerContent: undefined,
  openDrawer: false,
  tokenLists: undefined,
  sellToken: undefined,
  buyToken: undefined,
  isMarketUnknown: false,
  market: undefined,
  insufficientLiquidity: false,
  lastSideUpdated: undefined,
  takerPaysFee: false,
  mktFee: undefined,
  protoFee: undefined,
  feeSideSymbol: undefined,
  mktFeePct: 0,
  protoFeePct: 0,
  showFeeDetails: false,
  nativeBalance: "0",
  baseBalance: "0",
  quoteBalance: "0",
  insufficientBalance: false,
  openDrawerSide: undefined,
  allowanceOk: false,
  approveLoading: false,
  swapLoading: false,
  autoInitiateSwap: false,
  requiredMinBond: undefined,
};

export function useSwapLogic() {
  const queryClient = useQueryClient();
  const { getMarketByBaseAndQuoteAddress } = useMarketService();
  const { fill } = useLiquidityService();
  const { getPayRoutes } = useRouteService();
  const { convertSynthToCrypto } = useMiscService();
  const {
    ready,
    chainInfo,
    chainId,
    address,
    getTokenAllowance,
    approveAllowance,
    getTokenSupply,
    humanizeErc20Errors,
  } = useConnectorContext();
  const nativeBalQry = useBalance({ address: address, scopeKey: "native" });
  const { route, humanizeErrors: routerHumanizeErrors } = useRouterContract();
  const { swapQuoteForBase, humanizeErrors: coreHumanizeErrors } = useCoreContract();
  const [state, setState] = useState<SwapPageType>({ ...defaultState, tokenLists: TokenLists[chainInfo!.queryName] });
  const { country } = useGeo();
  const navigate = useNavigate();

  const baseBalQry = useBalance({
    token: state.buyToken?.address as `0x${string}`,
    address: address,
    scopeKey: "base",
    query: { enabled: !!state.buyToken },
  });

  const quoteBalQry = useBalance({
    token: state.sellToken?.address as `0x${string}`,
    address: address,
    scopeKey: "quote",
    query: { enabled: !!state.sellToken },
  });

  // Listen for balance updates for sell and buy tokens
  useEffect(() => {
    if (nativeBalQry.data) {
      setState((prev) => ({ ...prev, nativeBalance: toHD(nativeBalQry.data.value) }));
    }

    if (baseBalQry.data) {
      if (isERC20(getTokenType(state.buyToken))) {
        setState((prev) => ({ ...prev, baseBalance: baseBalQry.data.value.toString() }));
      } else if (isNative(getTokenType(state.buyToken)) && nativeBalQry.data) {
        setState((prev) => ({ ...prev, baseBalance: nativeBalQry.data.value.toString() }));
      }
    }

    if (quoteBalQry.data) {
      if (isERC20(getTokenType(state.sellToken))) {
        setState((prev) => ({ ...prev, quoteBalance: quoteBalQry.data.value.toString() }));
      } else if (isNative(getTokenType(state.sellToken)) && nativeBalQry.data) {
        setState((prev) => ({ ...prev, quoteBalance: nativeBalQry.data.value.toString() }));
      }
    }
  }, [nativeBalQry.data, baseBalQry.data, quoteBalQry.data, state.buyToken, state.sellToken]);

  // Listen to sell amount change
  useEffect(() => {
    const updState = { ...state };

    if (state.sellAmount && state.buyToken) {
      updState.insufficientBalance = toHDD(state.quoteBalance!, state.market?.quoteDecimals).lt(state.sellAmount);
    }

    if (state.focusSide != SwapSide.Sell) {
      setState(updState);
      return;
    }

    updState.lastSideUpdated = SwapSide.Sell;

    if (!state.sellAmount) {
      updState.buyAmount = "";
    }

    if (state.sellAmount == "") {
      updState.insufficientBalance = false;
      updState.insufficientLiquidity = false;
    }

    if (state.sellAmount && state.buyToken) {
      updState.insufficientBalance = toHDD(state.quoteBalance || "0", state.market?.quoteDecimals).lt(state.sellAmount);
    }

    setState(updState);

    if (state.sellToken) {
      void checkRouterAllowance(state.sellAmount || "0", state.sellToken, address);
    }
  }, [state.sellAmount]);

  // Listen to buy amount change
  useEffect(() => {
    if (state.focusSide != SwapSide.Buy) return;

    const updState = { ...state, lastSideUpdated: SwapSide.Buy };
    if (!state.buyAmount) {
      updState.sellAmount = "";
      updState.insufficientBalance = false;
    }

    setState(updState);

    if (state.sellToken) {
      void checkRouterAllowance(state.sellAmount || "0", state.sellToken, address);
    }
  }, [state.buyAmount]);

  // Set token list and initial sell token side on chain selection
  useEffect(() => {
    if (!ready) return;
    setState((prev) => ({
      ...prev,
      tokenLists: TokenLists[chainInfo!.queryName],
      sellToken: TokenLists[chainInfo!.queryName]?.tokens[0],
      buyAmount: "",
      buyToken: undefined,
    }));
  }, [ready, chainInfo]);

  // Unset tokens on chain change
  useEffect(() => {
    if (!chainId) return;
    setState((prev) => ({ ...prev, sellToken: undefined, buyToken: undefined }));
  }, [chainId]);

  {
    // Fetch choose pair market
    const getPairMarketQry = useQuery({
      queryKey: [
        "getPairMarket",
        state.buyToken!,
        state.sellToken!,
        {
          network: chainInfo!.queryName as string,
          creator: Operator,
          baseType: getTokenType(state.buyToken),
          quoteType: getTokenType(state.sellToken),
        },
      ],
      queryFn: getMarketByBaseAndQuoteAddress,
      retry: false,
      enabled: !!state.sellToken && !!state.buyToken,
    });

    // Handle pair market fetch results
    useEffect(() => {
      if (getPairMarketQry.isSuccess) {
        const market = getPairMarketQry.data;
        setState((prev) => ({ ...prev, market: market, isMarketUnknown: false }));
      } else if (getPairMarketQry.isError) {
        if (isReqErr404(getPairMarketQry.error)) {
          setState((prev) => ({
            ...prev,
            isMarketUnknown: true,
            market: undefined,
            selectedLiquidity: undefined,
            selectedPayRoutes: [],
          }));
        }
      }
    }, [
      getPairMarketQry.data,
      getPairMarketQry.isSuccess,
      getPairMarketQry.isError,
      getPairMarketQry.fetchStatus,
      getPairMarketQry.isRefetching,
    ]);
  }

  // Refetch market on token side change
  useEffect(() => {
    if (!!state.sellToken && !!state.buyToken) {
      void queryClient.invalidateQueries({ queryKey: ["getPairMarket"] });
      void checkRouterAllowance(state.sellAmount || "0", state.sellToken, address);
    }
  }, [state.sellToken, state.buyToken]);

  // Fetch liquidities sufficient for completing the swap
  const fillQry = useQuery({
    queryKey: [
      "fill",
      state.market!,
      {
        address,
        network: chainInfo!.queryName as string,
        marketAddress: (state.market?.address as string) || "",
        amount: state.lastSideUpdated == SwapSide.Sell ? state.sellAmount || "0" : state.buyAmount || "0",
        decimals:
          state.lastSideUpdated == SwapSide.Sell ? state.market?.quoteDecimals || 0 : state.market?.baseDecimals || 0,
        side: state.lastSideUpdated!,
      },
    ],
    queryFn: fill,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 15000,
    enabled: () => {
      const hasMarket = !!state.market;
      const hasSideUpdated = !!state.lastSideUpdated;
      const hasSellAmount = state.sellAmount !== "" && state.sellAmount !== undefined;
      const hasBuyAmount = state.buyAmount !== "" && state.buyAmount !== undefined;
      const isSellSideFocused = state.focusSide === SwapSide.Sell && hasSellAmount;
      const isBuySideFocused = state.focusSide === SwapSide.Buy && hasBuyAmount;
      const isSidesUnfocused = state.focusSide === undefined && (hasSellAmount || hasBuyAmount);
      return hasMarket && hasSideUpdated && (isSellSideFocused || isBuySideFocused || isSidesUnfocused);
    },
  });

  // Listen to updates on liquidity fill request
  useEffect(() => {
    if (!fillQry.isFetched) return;

    if (fillQry.data) {
      const { liquidities } = fillQry.data;
      let liqId = "";
      if (!state.market?.instant && liquidities.length > 0) {
        liqId = state.selectedLiquidity ? state.selectedLiquidity.id : liquidities[0].id;
      }

      setState((prev) => handleFillResult(prev, fillQry.data, liqId));
    }
  }, [
    fillQry.data,
    fillQry.isSuccess,
    fillQry.isError,
    fillQry.isFetching,
    fillQry.isRefetching,
    fillQry.isLoading,
    state.selectedLiquidity,
  ]);

  // Handle auto swap
  useEffect(() => {
    if (state.autoInitiateSwap) void swap();
  }, [state.autoInitiateSwap]);

  // Fetch the minimum bond required of routers (required to query for routers)
  const minRoutesBondQry = useQuery({
    queryKey: [
      "minRoutesBond",
      state.sellAmount,
      {
        network: chainInfo!.queryName as string,
        synth: state.sellToken?.symbol as string,
        to: chainInfo?.bondToken.address as string,
      },
    ],
    queryFn: convertSynthToCrypto,
    enabled: !!state.selectedLiquidity && isSynthetic(state.sellToken) && !isZero(state.sellAmount),
  });

  // Handle routes bond fetch results
  useEffect(() => {
    if (minRoutesBondQry.isSuccess) {
      const minBondLD = toLDD(minRoutesBondQry.data.value, chainInfo?.bondToken.decimals);
      const requiredMinBond = minBondLD.mul(state.sellAmount!).toFixed(0);
      if (requiredMinBond != state.requiredMinBond) {
        setState((prev) => ({
          ...prev,
          requiredMinBond: minBondLD.mul(state.sellAmount!).toFixed(0),
          selectedPayRoutes: [],
        }));
      }
    }
  }, [minRoutesBondQry.data, minRoutesBondQry.status, minRoutesBondQry.fetchStatus]);

  {
    // Fetch payment routes for the selected liquidity
    const getPayRoutesQry = useQuery({
      enabled: !!state.selectedLiquidity && !!state.requiredMinBond,
      queryKey: [
        "getSwapPayRoutes",
        state.requiredMinBond,
        {
          region: country,
          destOrgId: state.selectedLiquidity?.paymentMethod.org.orgId as number,
          net: chainInfo?.queryName,
          minBond: state.requiredMinBond,
        },
      ],
      queryFn: getPayRoutes,
    });

    // Handle payment routes fetch results
    useEffect(() => {
      if (getPayRoutesQry.data) setState((prev) => ({ ...prev, payRoutes: getPayRoutesQry.data }));
      console.log(">", 4);
    }, [getPayRoutesQry.data, getPayRoutesQry.isSuccess, getPayRoutesQry.isError]);
  }

  /**
   * Check and update router allowance
   * @param amount The amount to check if allowed
   * @param token The target token
   * @param address The target account owner
   */
  async function checkRouterAllowance(amount: string, token: TokenList.Token | undefined, address: string) {
    if (!token) return false;

    if (isNative(getTokenType(token)) || isSynthetic(getTokenType(token))) {
      setState((prev) => ({ ...prev, allowanceOk: true }));
      return true;
    }

    if (!amount) return false;

    const amountLD = toLDD(amount, token.decimals);
    const routerAddr = chainInfo?.contracts?.router?.address;
    const allowance = await getTokenAllowance(token.address as `0x${string}`, address, routerAddr as `0x${string}`);
    const allowanceOk = toDec(allowance).gte(amountLD);
    setState((prev) => ({ ...prev, allowanceOk }));

    return allowanceOk;
  }

  /**
   * Initiate the approval of the transfer of the sell token
   * into the router contract
   */
  async function approveSell() {
    const routerAddr = chainInfo?.contracts?.router?.address;
    const totalSupply = await getTokenSupply(state.sellToken?.address as `0x${string}`);

    try {
      setState((prev) => ({ ...prev, approveLoading: true }));
      await approveAllowance(state.sellToken?.address as `0x${string}`, routerAddr as `0x${string}`, totalSupply);
      toast.success("Allowance Request", { description: "Allowance request approved", position: "top-right" });
      const allowed = await checkRouterAllowance(state.sellAmount || "0", state.sellToken, address);
      setState((prev) => ({ ...prev, approveLoading: false }));

      setTimeout(() => {
        setState((prev) => ({ ...prev, autoInitiateSwap: allowed }));
      }, 2000);
    } catch (error) {
      const msg = humanizeErc20Errors(error);
      toast.error("Approval RequestError", { description: msg, position: "top-right" });
      logError(error);
      setState({ ...state, approveLoading: false });
    }
  }

  /**
   * Swap sell tokens for buy tokens
   */
  async function swap() {
    const { buyToken, buyAmount, sellToken, sellAmount, market, selectedPayRoutes, requiredMinBond } = state;
    if (
      !sellToken ||
      !buyToken ||
      !fillQry.data ||
      !sellAmount ||
      !chainInfo ||
      !market ||
      !state.selectedLiquidity ||
      !chainInfo?.contracts?.core
    )
      return;

    setState((prev) => ({ ...prev, swapLoading: true }));

    let txHash = "",
      errMsg = "";
    let txReceipt: TransactionReceipt | undefined;
    let error: Error | undefined;

    if (market.instant) {
      try {
        txHash = await route(sellToken, fillQry.data, 0, 0);
        setState((prev) => ({
          ...prev,
          buyAmount: "",
          sellAmount: "",
          swapLoading: false,
          autoInitiateSwap: false,
        }));
      } catch (e) {
        errMsg = routerHumanizeErrors(e);
        error = e as Error;
      }
    } else {
      try {
        const liq = state.selectedLiquidity;
        const provider = liq.provider;
        const fill = fillQry.data;
        const amount = fill.side == SideQuote ? liq.quantityFilled : toDec(liq.amountFilled).toFixed(0);

        const data = encodeAbiParameters(parseAbiParameters("uint256[], uint256[]"), [
          selectedPayRoutes.map((route) => BigInt(route.routeId)),
          selectedPayRoutes.map(() => BigInt(requiredMinBond!)),
        ]);

        [txHash, txReceipt] = await swapQuoteForBase(
          market.address,
          provider,
          ZeroAddress,
          liq.lid,
          amount,
          liq.price,
          [],
          0,
          0,
          data,
        );
        await delay(5000);

        const targetIndex = market.manager ? 0 : txReceipt.logs.length - 1;
        const event = decodeEventLog({
          abi: chainInfo?.contracts?.core.abi,
          data: txReceipt.logs[targetIndex].data,
          topics: txReceipt.logs[targetIndex].topics,
        }) as { args: { numTypeInfo: bigint[] } };

        const orderId = (event.args as { numTypeInfo: bigint[] }).numTypeInfo[0];
        navigate(`/swap/${orderId}`);

        setState((prev) => ({ ...prev, swapLoading: false, autoInitiateSwap: false }));
      } catch (e) {
        errMsg = coreHumanizeErrors(error);
        error = e as Error;
      }
    }

    if (!errMsg) {
      const toastMsg = buildSwapSuccessMsg(
        market.instant,
        buyAmount!,
        buyToken.symbol!,
        sellAmount,
        sellToken.symbol!,
        txHash,
        chainInfo.blockExplorer!,
      );
      toast.success(toastMsg, { position: "top-right", duration: 6000 });
    } else {
      logError(error);
      setState((prev) => ({ ...prev, swapLoading: false, autoInitiateSwap: false }));
      toast.error("Swap Error", { description: errMsg, position: "top-right" });
    }
  }

  return {
    state,
    setState,
    approveSell,
    swap,
  };
}

function isOnchainAsset(assetType: AssetType) {
  return (
    assetType == AssetType.ERC20 ||
    assetType == AssetType.ERC721 ||
    assetType == AssetType.ERC1155 ||
    assetType == AssetType.NATIVE
  );
}

function buildSwapSuccessMsg(
  instant: boolean,
  buyAmount: string,
  buySymbol: string,
  sellAmount: string,
  sellSymbol: string,
  txHash: string,
  blockExplorer: string,
) {
  return (
    <div>
      {instant && (
        <>
          <p className="text-sm font-medium">Swap Completed</p>
          <p className="text-gray-200">
            You sold{" "}
            <b className="font-bold text-white">
              {trimZeros(toDec(sellAmount).toFixed(4))} {sellSymbol}
            </b>{" "}
            for{" "}
            <b className="font-bold text-white">
              {trimZeros(toDec(buyAmount).toFixed(4))} {buySymbol}
            </b>
            .
          </p>
        </>
      )}

      {!instant && (
        <>
          <p className="text-sm font-medium">Order Created</p>
          <p className="text-gray-200">
            New order to sell{" "}
            <b className="font-bold text-white">
              {trimZeros(toDec(sellAmount).toFixed(4))} {sellSymbol}
            </b>{" "}
            for{" "}
            <b className="font-bold text-white">
              {trimZeros(toDec(buyAmount).toFixed(4))} {buySymbol}
            </b>
            .
          </p>
        </>
      )}

      <div className="flex gap-2 text-xs font-light text-gray-400">
        <a href={`${blockExplorer}/tx/${txHash}`} target="_blank" rel="noreferrer">
          View Tx
        </a>
      </div>
    </div>
  );
}

/**
 * Handle the fill result and update the state
 * @param state The current state
 * @param fillResult The fill result
 * @param liqId The ID of the target liquidity to use. If not provided, the first liquidity will be used. Only relevant
 * when the swap market is not instant.
 * @returns
 */
function handleFillResult(state: SwapPageType, fillResult: FillResult, liqId: string) {
  const lowLiq = !fillResult.filled;
  const { baseDecimals, quoteDecimals, baseType, base, quote } = state.market as Market;
  const { totalQuantityFilledAfterFees, totalMktFee, totalProtoFee, mktFeePct, liquidities, protoFeePct } = fillResult;
  const { sellAmount, buyAmount, lastSideUpdated } = state;

  const newState = {
    ...state,
    insufficientLiquidity: lowLiq,
    takerPaysFee: isOnchainAsset(baseType),
    mktFee: toHD(totalMktFee, isOnchainAsset(baseType) ? baseDecimals : quoteDecimals),
    protoFee: toHD(totalProtoFee, isOnchainAsset(baseType) ? baseDecimals : quoteDecimals),
    feeSideSymbol: isOnchainAsset(baseType) ? base : quote,
    protoFeePct: protoFeePct,
    mktFeePct: mktFeePct,
    liquidities: liquidities,
  };

  if (state.market?.instant) {
    return {
      ...newState,
      buyAmount: lastSideUpdated != SwapSide.Sell ? buyAmount : toHD(totalQuantityFilledAfterFees, baseDecimals),
      sellAmount: lastSideUpdated != SwapSide.Buy ? sellAmount : toHD(totalQuantityFilledAfterFees, quoteDecimals),
    };
  } else {
    if (liquidities.length > 0) {
      liqId = !liqId ? liquidities[0].id : liqId;
      let liq = liquidities.find((liq) => liq.id == liqId);

      // TODO:
      // ? what happens when the liquidity no longer existing in the fill result?
      // ? we should probably reset the swap component or pick the current top liquidity
      if (!liq) {
        liqId = liquidities[0].id;
        liq = liquidities.find((liq) => liq.id == liqId);
      }

      return {
        ...newState,
        buyAmount: lastSideUpdated != SwapSide.Sell ? buyAmount : toHD(liq?.quantityFilledAfterFees, baseDecimals),
        sellAmount: lastSideUpdated != SwapSide.Buy ? sellAmount : toHD(liq?.quantityFilledAfterFees, quoteDecimals),
        selectedLiquidity: liq,
      };
    }
    return {
      ...newState,
      selectedLiquidity: undefined,
    };
  }
}
