import { useConnectorContext } from "@/hooks/connectors/useConnectorContext";
import { useRouteService } from "@/hooks/services/backend/useRouteService";
import { getRegions } from "@jointlabs/meta";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import useStore from "../../../hooks/store/useStore";
import { isSynth } from "../common/utils";
import { SwapPageState } from "../types/types";

export function usePayRoutesQuery({
  state,
  setState,
}: {
  state: SwapPageState;
  setState: React.Dispatch<React.SetStateAction<SwapPageState>>;
}) {
  const user = useStore((state) => state.user);
  const { chainInfo } = useConnectorContext();
  const { getPayRoutes } = useRouteService();
  const { selectedLiquidity, requiredMinBond, market } = state;
  const sourceCountry = getSourceCountry();
  const requester = chainInfo?.contracts?.marketManager?.address;
  const destOrgId = isSynth(market?.quoteType)
    ? selectedLiquidity?.paymentMethod?.org?.orgId
    : user?.paymentMethod?.orgId;

  const query = useQuery({
    enabled:
      !!selectedLiquidity &&
      !!requiredMinBond &&
      (isSynth(market?.quoteType) ? !!selectedLiquidity?.paymentMethod : !!user?.paymentMethod),
    queryKey: [
      "getSwapPayRoutes",
      requiredMinBond,
      {
        region: sourceCountry as string,
        destOrgId: destOrgId as number,
        net: chainInfo?.queryName,
        minBond: requiredMinBond,
        requester: requester as string,
      },
    ],
    queryFn: getPayRoutes,
  });

  // Handle payment routes fetch results
  useEffect(() => {
    if (query.data) {
      setState((prev) => ({ ...prev, payRoutes: query.data, selectedPayRoutes: [] }));
    }
  }, [query.data, query.isSuccess, query.isError]);

  /**
   * Get the country that will be used as source region to fetch pay routes
   * @returns The country of the source
   */
  function getSourceCountry() {
    if (!user?.paymentMethod) return;
    if (isSynth(market?.quoteType)) {
      const regions = getRegions(user?.paymentMethod?.name);
      if (!regions) throw new Error("user payment method regions were not found");
      return regions[0];
    }

    if (!selectedLiquidity?.paymentMethod) return;
    const regions = getRegions(selectedLiquidity.paymentMethod.name);
    if (!regions) throw new Error("provider payment method regions were not found");
    return regions[0];
  }

  return query;
}
