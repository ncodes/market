import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useConnectorContext } from "../../../hooks/connectors/useConnectorContext";
import { useLiquidityService } from "../../../hooks/services/backend/useLiquidityService";
import { isZero, toHD } from "../../../libs/helpers";
import { AssetType } from "../../../types/enums";
import { SwapPageState, SwapSide } from "../types/types";

export function useFillQuery({
  state,
  setState,
}: {
  state: SwapPageState;
  setState: React.Dispatch<React.SetStateAction<SwapPageState>>;
}) {
  const { fill } = useLiquidityService();
  const { address, chainInfo } = useConnectorContext();

  // Fetch liquidities sufficient for completing the swap
  const query = useQuery({
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
      const hasSellAmount = !isZero(state.sellAmount);
      const hasBuyAmount = !isZero(state.buyAmount);
      const isSellSideFocused = state.focusSide === SwapSide.Sell && hasSellAmount;
      const isBuySideFocused = state.focusSide === SwapSide.Buy && hasBuyAmount;
      const isSidesUnfocused = state.focusSide === undefined && (hasSellAmount || hasBuyAmount);
      return hasMarket && hasSideUpdated && (isSellSideFocused || isBuySideFocused || isSidesUnfocused);
    },
  });

  // Listen to updates on liquidity fill request
  useEffect(() => {
    if (!query.isFetched) return;
    if (!query.data) return;

    let liqId = "";
    const { liquidities } = query.data;
    if (!state.market?.instant && liquidities.length > 0) {
      liqId = state.selectedLiquidity ? state.selectedLiquidity.id : liquidities[0].id;
    }

    setState((prev) => handleFillResult(prev, query.data, liqId));
  }, [
    query.data,
    query.isSuccess,
    query.isError,
    query.isFetching,
    query.isRefetching,
    query.isLoading,
    state.selectedLiquidity,
  ]);

  return query;
}

/**
 * Handle the fill result and update the state
 * @param state The current state
 * @param fillResult The fill result
 * @param liqId The ID of the target liquidity to use. If not provided, the first liquidity will be used. Only relevant
 * when the swap market is not instant.
 * @returns
 */
function handleFillResult(state: SwapPageState, fillResult: FillResult, liqId: string) {
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
      buyAmount: lastSideUpdated == SwapSide.Sell ? toHD(totalQuantityFilledAfterFees, baseDecimals) : buyAmount,
      sellAmount: lastSideUpdated == SwapSide.Buy ? toHD(totalQuantityFilledAfterFees, quoteDecimals) : sellAmount,
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
        buyAmount: lastSideUpdated == SwapSide.Sell ? toHD(liq?.quantityFilledAfterFees, baseDecimals) : buyAmount,
        sellAmount: lastSideUpdated == SwapSide.Buy ? toHD(liq?.quantityFilledAfterFees, quoteDecimals) : sellAmount,
        selectedLiquidity: liq,
      };
    }
    return {
      ...newState,
      selectedLiquidity: undefined,
    };
  }
}

function isOnchainAsset(assetType: AssetType) {
  return (
    assetType == AssetType.ERC20 ||
    assetType == AssetType.ERC721 ||
    assetType == AssetType.ERC1155 ||
    assetType == AssetType.NATIVE
  );
}
