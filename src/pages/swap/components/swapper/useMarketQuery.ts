import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Operator } from "../../../../constants";
import { useConnectorContext } from "../../../../hooks/connectors/useConnectorContext";
import { useMarketService } from "../../../../hooks/services/backend/useMarketService";
import { isReqErr404 } from "../../../../libs/helpers";
import { getTokenType } from "../../utils";
import { SwapPageState } from "./types";

export function useMarketQuery({
  state,
  setState,
}: {
  state: SwapPageState;
  setState: React.Dispatch<React.SetStateAction<SwapPageState>>;
}) {
  const { chainInfo } = useConnectorContext();
  const { getMarketByBaseAndQuoteAddress } = useMarketService();

  const query = useQuery({
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
    if (query.isSuccess) {
      const market = query.data;
      setState((prev) => ({ ...prev, market: market, isMarketUnknown: false }));
    } else if (query.isError) {
      if (isReqErr404(query.error)) {
        setState((prev) => ({
          ...prev,
          isMarketUnknown: true,
          market: undefined,
          selectedLiquidity: undefined,
          selectedPayRoutes: [],
          sellAmountAfterFee: "",
        }));
      }
    }
  }, [query.data, query.isSuccess, query.isError, query.fetchStatus, query.isRefetching]);

  return query;
}
