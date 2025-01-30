import { useConnectorContext } from "@/hooks/connectors/useConnectorContext";
import { useMiscService } from "@/hooks/services/backend/useMiscService";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { isZero, toLDD } from "../../../libs/helpers";
import { isSynth } from "../common/utils";
import { SwapPageState } from "../types/types";

export function useMinRoutesBondQuery({
  state,
  setState,
}: {
  state: SwapPageState;
  setState: React.Dispatch<React.SetStateAction<SwapPageState>>;
}) {
  const { convertSynthToCrypto } = useMiscService();
  const { chainInfo } = useConnectorContext();

  const query = useQuery({
    queryKey: [
      "minRoutesBond",
      state.sellAmount,
      {
        network: chainInfo!.queryName as string,
        synth: (isSynth(state.market?.quoteType) ? state.sellToken?.symbol : state.buyToken?.symbol) as string,
        to: chainInfo?.bondToken.address as string,
      },
    ],
    queryFn: convertSynthToCrypto,
    enabled: !!state.selectedLiquidity && !state.market?.instant && !isZero(state.sellAmount),
  });

  // Handle routes bond fetch results
  useEffect(() => {
    if (!query.isSuccess) return;
    const minBondLD = toLDD(query.data.value, chainInfo?.bondToken.decimals);
    const requiredMinBond = minBondLD.mul(state.sellAmount!).toFixed(0);
    if (requiredMinBond != state.requiredMinBond) {
      setState((prev) => ({
        ...prev,
        requiredMinBond: minBondLD.mul(state.sellAmount!).toFixed(0),
        selectedPayRoutes: [],
      }));
    }
  }, [query.data, query.status, query.fetchStatus]);

  return query;
}
