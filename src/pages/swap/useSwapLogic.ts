import { useMarketService } from "@/hooks/services/backend/useMarketService.ts";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Operator } from "@/constants.ts";
import { isReqErr404, toHD } from "@/libs/helpers.ts";
import { SwapPageType } from "@/pages/swap/types.ts";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { TokenLists } from "../../../../jointlabs/meta";
import { useEffect, useState } from "react";
import { getTokenType } from "@/pages/swap/utils.ts";
import { useLiquidityService } from "@/hooks/services/backend/useLiquidityService.ts";

const defaultState: SwapPageType = {
  drawerContent: undefined,
  openDrawer: false,
  tokenLists: undefined,
  isMarketUnknown: false,
  insufficientLiquidity: false,
  sellAmount: 0,
  buyAmount: 0,
  market: undefined,
  fillInfo: undefined,
  lastSideUpdated: "",
  focusSide: undefined,
};

export function useSwapLogic() {
  const queryClient = useQueryClient();
  const { getMarketByBaseAndQuoteAddress } = useMarketService();
  const { fill } = useLiquidityService();
  const { ready, chainInfo, chainId } = useConnectorContext();
  const [state, setState] = useState<SwapPageType>({
    ...defaultState,
    buyAmount: "",
    sellAmount: "",
    tokenLists: TokenLists[chainInfo!.queryName],
  });

  useEffect(() => {
    if (state.focusSide != "Sell") return;
    let updState = { ...state, lastSideUpdated: "Sell" };
    if (state.sellAmount == "" || state.sellAmount == undefined) {
      updState = { ...updState, buyAmount: "" };
    }
    setState(updState);
  }, [state.sellAmount]);

  useEffect(() => {
    if (state.focusSide != "Buy") return;
    let updState = { ...state, lastSideUpdated: "Buy" };
    if (state.buyAmount == "" || state.buyAmount == undefined) {
      updState = { ...updState, sellAmount: "" };
    }
    setState(updState);
  }, [state.buyAmount]);

  useEffect(() => {
    if (!ready) return;
    setState((prev) => ({
      ...prev,
      tokenLists: TokenLists[chainInfo!.queryName],
      sellToken: TokenLists[chainInfo!.queryName]?.tokens[0],
    }));
  }, [ready, chainInfo]);

  useEffect(() => {
    if (!chainId) return;
    setState((prev) => ({ ...prev, sellToken: undefined, buyToken: undefined }));
  }, [chainId]);

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

  useEffect(() => {
    if (!!state.sellToken && !!state.buyToken) {
      void queryClient.invalidateQueries({ queryKey: ["getPairMarket"] });
    }
  }, [state.sellToken, state.buyToken]);

  useEffect(() => {
    if (!getPairMarketQry.isFetched) return;
    if (getPairMarketQry.isSuccess && getPairMarketQry.data) {
      setState((prev) => ({ ...prev, market: getPairMarketQry.data, isMarketUnknown: false }));
    } else if (getPairMarketQry.isError) {
      if (isReqErr404(getPairMarketQry.error)) {
        setState((prev) => ({ ...prev, isMarketUnknown: true }));
      }
    }
  }, [getPairMarketQry.data, getPairMarketQry.isSuccess, getPairMarketQry.isError]);

  const fillQry = useQuery({
    queryKey: [
      "fill",
      {
        network: chainInfo!.queryName as string,
        marketAddress: state.market?.address as string,
        amount: state.lastSideUpdated == "Sell" ? state.sellAmount.toString() : state.buyAmount.toString(),
        decimals: state.lastSideUpdated == "Sell" ? state.market?.quoteDecimals : state.market?.baseDecimals,
        side: state.lastSideUpdated,
      },
    ],
    queryFn: fill,
    enabled: () => {
      return (
        !!state.market &&
        !!state.lastSideUpdated &&
        ((state.focusSide === "Sell" && !!state.sellAmount) || (state.focusSide === "Buy" && !!state.buyAmount))
      );
    },
  });

  useEffect(() => {
    if (!fillQry.isFetched) return;

    if (fillQry.isSuccess && fillQry.data) {
      const lowLiq = !fillQry.data.filled;
      const { baseDecimals, quoteDecimals } = state.market;
      const { totalQuantityFilled } = fillQry.data;
      const { sellAmount, buyAmount, lastSideUpdated } = state;
      setState((prev) => ({
        ...prev,
        insufficientLiquidity: lowLiq,
        buyAmount: lastSideUpdated != "Sell" ? buyAmount : toHD(totalQuantityFilled, baseDecimals),
        sellAmount: lastSideUpdated != "Buy" ? sellAmount : toHD(totalQuantityFilled, quoteDecimals),
      }));
    }
  }, [fillQry.data, fillQry.isSuccess, fillQry.isError]);

  return {
    state,
    setState,
  };
}
