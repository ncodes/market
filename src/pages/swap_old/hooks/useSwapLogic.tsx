import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import useCoreContract from "@/hooks/services/contracts/useCoreContract";
import useRouterContract from "@/hooks/services/contracts/useRouterContract.ts";
import { delay, isZero, logError, toDec, toHDD, toLD, toLDD, trimZeros } from "@/libs/helpers.ts";
import { DefaultSwapExpireDurSec, DefaultSwapSlippage } from "@/pages/swap/common/constants";
import { applyRoutingFeeToAmount, deductRoutingFeeFromAmount, isNative, isSynth } from "@/pages/swap/common/utils";
import { TokenList, TokenLists } from "@jointlabs/meta";
import { useQueryClient } from "@tanstack/react-query";
import { ZeroAddress } from "ethers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TransactionReceipt, encodeAbiParameters, parseAbiParameters, parseEventLogs } from "viem";
import useStore from "../../../hooks/store/useStore";
import { SideQuote, SwapPageState, SwapSide } from "../types/types";
import { useBalances } from "./useBalances";
import { useFillQuery } from "./useFillQuery";
import { useMarketQuery } from "./useMarketQuery";
import { useMinRoutesBondQuery } from "./useMinRoutesBondQuery";
import { usePayRoutesQuery } from "./usePayRoutesQuery";

const defaultState: SwapPageState = {
  slippage: DefaultSwapSlippage,
  expires: DefaultSwapExpireDurSec,
  liquidities: [],
  selectedLiquidity: undefined,
  payRoutes: [],
  selectedPayRoutes: [],
  sellAmount: "",
  buyAmount: "",
  sellAmountAfterFee: "",
  buyAmountAfterFee: "",
  focusSide: undefined,
  drawerContentType: undefined,
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
  selectedPaymentMethod: undefined,
  feeSideSymbol: undefined,
  mktFeePct: 0,
  protoFeePct: 0,
  showFeeDetails: false,
  nativeBalance: "0",
  baseBalance: "0",
  quoteBalance: "0",
  insufficientBalance: false,
  linkWalletLoading: false,
  openDrawerSide: undefined,
  allowanceOk: false,
  approveLoading: false,
  swapLoading: false,
  autoInitiateSwap: false,
  requiredMinBond: undefined,
};

export function useSwapLogic() {
  const queryClient = useQueryClient();
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
  const user = useStore((state) => state.user);
  const { route, humanizeErrors: routerHumanizeErrors } = useRouterContract();
  const { swapQuoteForBase, humanizeErrors: coreHumanizeErrors } = useCoreContract();
  const [state, setState] = useState<SwapPageState>({ ...defaultState, tokenLists: TokenLists[chainInfo!.queryName] });
  const navigate = useNavigate();

  // Fetch balances
  useBalances({ state, setState, address });

  // Handle market query
  useMarketQuery({ state, setState });

  // Handle fill request
  const fillQry = useFillQuery({ state, setState });

  // Fetch the minimum bond required of routers (required to query for routers)
  useMinRoutesBondQuery({ state, setState });

  // Fetch the pay routes
  usePayRoutesQuery({ state, setState });

  // Listen to sell amount change
  useEffect(() => {
    const updState = { ...state, sellAmountAfterFee: "" };

    if (state.sellAmount && !isSynth(state.sellToken) && state.buyToken) {
      updState.insufficientBalance = toHDD(state.quoteBalance!, state.market?.quoteDecimals).lt(state.sellAmount);
    }

    if (state.focusSide != SwapSide.Sell) {
      setState(updState);
      return;
    }

    updState.lastSideUpdated = SwapSide.Sell;

    if (isZero(state.sellAmount)) {
      updState.buyAmount = "";
    }

    if (isZero(state.sellAmount)) {
      updState.insufficientBalance = false;
      updState.insufficientLiquidity = false;
      updState.selectedLiquidity = undefined;
      updState.selectedPayRoutes = [];
    }

    if (state.sellAmount && state.buyToken) {
      updState.insufficientBalance = toHDD(state.quoteBalance || "0", state.market?.quoteDecimals).lt(state.sellAmount);
    }

    setState(updState);
  }, [state.sellAmount]);

  // Listen to buy amount change
  useEffect(() => {
    if (state.focusSide != SwapSide.Buy) return;

    const updState = { ...state, lastSideUpdated: SwapSide.Buy, buyAmountAfterFee: "" };

    if (isZero(state.buyAmount)) {
      updState.sellAmount = "";
      updState.insufficientBalance = false;
      updState.selectedLiquidity = undefined;
      updState.selectedPayRoutes = [];
    }

    setState(updState);
  }, [state.buyAmount]);

  // Check if sell token allowance approval is needed.
  useEffect(() => {
    if (!state.sellToken || !state.sellAmount) return;
    void checkRouterAllowance(state.sellAmount || "0", state.sellToken, address);
  }, [state.sellAmount, state.sellToken, address]);

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

  // Refetch market on token side change
  useEffect(() => {
    if (!!state.sellToken && !!state.buyToken) {
      void queryClient.invalidateQueries({ queryKey: ["getPairMarket"] });
      void checkRouterAllowance(state.sellAmount || "0", state.sellToken, address);
    }
  }, [state.sellToken, state.buyToken]);

  // Handle auto swap
  useEffect(() => {
    if (state.autoInitiateSwap) void swap();
  }, [state.autoInitiateSwap]);

  // Handle sell or buy amount increases or decreases due to pay route selection.
  useEffect(() => {
    if (!state.market || state.market.instant) return;
    if (state.selectedPayRoutes.length == 0) {
      setState((prev) => ({ ...prev, sellAmountAfterFee: "", buyAmountAfterFee: "" }));
      return;
    }
    if (isSynth(state.market.quoteType)) {
      const actualAmount = applyRoutingFeeToAmount(state.sellAmount || "0", state.selectedPayRoutes, 8);
      setState((prev) => ({ ...prev, sellAmountAfterFee: trimZeros(actualAmount) }));
    } else {
      const actualAmount = deductRoutingFeeFromAmount(state.buyAmount || "0", state.selectedPayRoutes, 8);
      setState((prev) => ({ ...prev, buyAmountAfterFee: trimZeros(actualAmount) }));
    }
  }, [state.selectedPayRoutes]);

  // Reset pay routes list if user payment method is unset
  useEffect(() => {
    if (user?.paymentMethod) return;
    setState((prev) => ({ ...prev, payRoutes: [], selectedPayRoutes: [] }));
  }, [user?.paymentMethod]);

  // Reset selected pay routes if payment method is changed
  useEffect(() => {
    if (isSynth(state.market?.quoteType)) return;
    setState((prev) => ({ ...prev, selectedPayRoutes: [] }));
  }, [state.selectedPaymentMethod]);

  /**
   * Check and update router allowance
   * @param amount The amount to check if allowed
   * @param token The target token
   * @param address The target account owner
   */
  async function checkRouterAllowance(amount: string, token: TokenList.Token | undefined, address: string) {
    if (!token) return false;

    if (isNative(token) || isSynth(token)) {
      setState((prev) => ({ ...prev, allowanceOk: true }));
      return true;
    }

    if (!amount) return false;

    const { market } = state;
    const amountLD = toLDD(amount, token.decimals);
    const contractAddr = market?.instant ? chainInfo?.contracts?.router?.address : chainInfo?.contracts?.core?.address;
    const allowance = await getTokenAllowance(token.address as `0x${string}`, address, contractAddr as `0x${string}`);
    const allowanceOk = toDec(allowance).gte(amountLD);
    setState((prev) => ({ ...prev, allowanceOk }));

    return allowanceOk;
  }

  /**
   * Initiate the approval of the transfer of the sell token
   * into the router contract
   */
  async function approveSell() {
    const { market } = state;
    const contractAddr = market?.instant ? chainInfo?.contracts?.router?.address : chainInfo?.contracts?.core?.address;
    const totalSupply = await getTokenSupply(state.sellToken?.address as `0x${string}`);

    try {
      setState((prev) => ({ ...prev, approveLoading: true }));
      await approveAllowance(state.sellToken?.address as `0x${string}`, contractAddr as `0x${string}`, totalSupply);
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
      isZero(sellAmount) ||
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
          isNative(sellToken) ? BigInt(toLD(sellAmount!, sellToken.decimals)) : undefined,
        );
        await delay(5000);

        const logs = parseEventLogs({
          abi: chainInfo?.contracts?.core.abi,
          logs: txReceipt.logs,
          eventName: "SwapOrder",
        });
        const swapOrderEvt = logs[0] as unknown as { args: { numTypeInfo: bigint[] } };
        const orderId = swapOrderEvt.args.numTypeInfo[0];
        navigate(`/swap/${orderId}`);

        setState((prev) => ({ ...prev, swapLoading: false, autoInitiateSwap: false }));
      } catch (e) {
        error = e as Error;
        errMsg = coreHumanizeErrors(error);
      }
    }

    if (!errMsg) {
      const toastMsg = buildSwapSuccessMsg(
        market.instant,
        buyAmount!,
        buyToken.symbol!,
        sellAmount!,
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

  /**
   * Get the sell amount. If a router fee has been added to the original sell amount
   * it returns the sell amount + the fee, otherwise it returns the original sell amount.
   * @returns The sell amount
   */
  function getSellAmount() {
    return state.sellAmountAfterFee || state.sellAmount;
  }

  function getBuyAmount() {
    return state.buyAmountAfterFee || state.buyAmount;
  }

  return {
    state,
    setState,
    getSellAmount,
    getBuyAmount,
    approveSell,
    swap,
  };
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
