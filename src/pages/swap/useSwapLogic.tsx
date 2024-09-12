import { Operator } from "@/constants.ts";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { useLiquidityService } from "@/hooks/services/backend/useLiquidityService.ts";
import { useMarketService } from "@/hooks/services/backend/useMarketService.ts";
import useRouterContract from "@/hooks/services/contracts/useRouterContract.ts";
import { isReqErr404, logError, toDec, toHD, toHDD, toLDD, trimZeros } from "@/libs/helpers.ts";
import { DefaultSwapExpireDurSec, DefaultSwapSlippage } from "@/pages/swap/constants.ts";
import { SideBuy, SideSell, SwapPageType, SwapSide } from "@/pages/swap/types.ts";
import { getTokenType, isERC20, isNative, isSynthetic } from "@/pages/swap/utils.ts";
import { AssetType } from "@/types/enums.ts";
import { TokenList, TokenLists } from "@jointlabs/meta";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useBalance } from "wagmi";

const defaultState: SwapPageType = {
  slippage: DefaultSwapSlippage,
  expires: DefaultSwapExpireDurSec,
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
};

export function useSwapLogic() {
  const queryClient = useQueryClient();
  const { getMarketByBaseAndQuoteAddress } = useMarketService();
  const { fill } = useLiquidityService();
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
  const { route, humanizeErrors } = useRouterContract();
  const [state, setState] = useState<SwapPageType>({ ...defaultState, tokenLists: TokenLists[chainInfo!.queryName] });
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

    if (state.focusSide != SideSell) {
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
    if (state.focusSide != SideBuy) return;

    const updState = { ...state, lastSideUpdated: SideBuy as SwapSide };
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

  // Fetch choose pair market
  const getPairMarketQry = useQuery({
    queryKey: [
      "getPairMarket",
      {
        base: state.buyToken?.address as string,
        quote: state.sellToken?.address as string,
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

  // Refetch market on token side change
  useEffect(() => {
    if (!!state.sellToken && !!state.buyToken) {
      void queryClient.invalidateQueries({ queryKey: ["getPairMarket"] });
      void checkRouterAllowance(state.sellAmount || "0", state.sellToken, address);
    }
  }, [state.sellToken, state.buyToken]);

  useEffect(() => {
    if (!getPairMarketQry.isFetched) return;
    if (getPairMarketQry.isSuccess && getPairMarketQry.data) {
      const market = getPairMarketQry.data;
      setState((prev) => ({ ...prev, market: market, isMarketUnknown: false }));
    } else if (getPairMarketQry.isError) {
      if (isReqErr404(getPairMarketQry.error)) {
        setState((prev) => ({ ...prev, isMarketUnknown: true }));
      }
    }
  }, [getPairMarketQry.data, getPairMarketQry.isSuccess, getPairMarketQry.isError]);

  // Fetch liquidities sufficient for completing the swap
  const fillQry = useQuery({
    queryKey: [
      "fill",
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
    enabled: () => {
      return (
        !!state.market &&
        !!state.lastSideUpdated &&
        ((state.focusSide === SideSell && !!state.sellAmount) ||
          (state.focusSide === SideBuy && !!state.buyAmount) ||
          (state.focusSide == undefined && (state.sellAmount != "" || state.buyAmount != "")))
      );
    },
  });

  // Listen to updates on liquidity fill request
  useEffect(() => {
    if (!fillQry.isFetched) return;

    if (fillQry.isSuccess && fillQry.data) {
      const lowLiq = !fillQry.data.filled;
      const { baseDecimals, quoteDecimals, baseType, base, quote } = state.market as Market;
      const { totalQuantityFilledAfterFees } = fillQry.data;
      const { sellAmount, buyAmount, lastSideUpdated } = state;

      setState((prev) => ({
        ...prev,
        insufficientLiquidity: lowLiq,
        buyAmount: lastSideUpdated != SideSell ? buyAmount : toHD(totalQuantityFilledAfterFees, baseDecimals),
        sellAmount: lastSideUpdated != SideBuy ? sellAmount : toHD(totalQuantityFilledAfterFees, quoteDecimals),
        takerPaysFee: isOnchainAsset(baseType),
        mktFee: toHD(fillQry.data.totalMktFee, isOnchainAsset(baseType) ? baseDecimals : quoteDecimals),
        protoFee: toHD(fillQry.data.totalProtoFee, isOnchainAsset(baseType) ? baseDecimals : quoteDecimals),
        feeSideSymbol: isOnchainAsset(baseType) ? base : quote,
        protoFeePct: fillQry.data.protoFeePct,
        mktFeePct: fillQry.data.mktFeePct,
      }));
    }
  }, [fillQry.data, fillQry.isSuccess, fillQry.isError]);

  useEffect(() => {
    if (state.autoInitiateSwap) void swap();
  }, [state.autoInitiateSwap]);

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
    try {
      const { buyToken, buyAmount, sellToken, sellAmount } = state;
      if (!sellToken || !buyToken || !fillQry.data || !sellAmount || !chainInfo) return;

      setState((prev) => ({ ...prev, swapLoading: true }));
      const txHash = await route(sellToken, fillQry.data, 0, 0);
      const toastMsg = buildSwapSuccessMsg(
        buyAmount!,
        buyToken.symbol!,
        sellAmount,
        sellToken.symbol!,
        txHash,
        chainInfo.blockExplorer!,
      );
      toast.success(toastMsg, { position: "top-right", duration: 6000 });
      setState((prev) => ({
        ...prev,
        buyAmount: "",
        sellAmount: "",
        swapLoading: false,
        autoInitiateSwap: false,
      }));
    } catch (error) {
      const msg = humanizeErrors(error);
      toast.error("Swap Error", { description: msg, position: "top-right" });
      logError(error);
      setState((prev) => ({ ...prev, swapLoading: false, autoInitiateSwap: false }));
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
  buyAmount: string,
  buySymbol: string,
  sellAmount: string,
  sellSymbol: string,
  txHash: string,
  blockExplorer: string,
) {
  return (
    <div>
      <p className="text-sm font-medium">Swap Completed</p>
      <p className="text-gray-200">
        You swapped{" "}
        <b className="font-bold text-white">
          {trimZeros(toDec(sellAmount).toFixed(4))} {sellSymbol}
        </b>{" "}
        for{" "}
        <b className="font-bold text-white">
          {trimZeros(toDec(buyAmount).toFixed(4))} {buySymbol}
        </b>
        .
      </p>
      <div className="flex gap-2 text-xs font-light text-gray-400">
        <a href={`${blockExplorer}/tx/${txHash}`} target="_blank" rel="noreferrer">
          View Tx
        </a>
      </div>
    </div>
  );
}
