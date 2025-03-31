import { useConnectorContext } from "@/hooks/connectors/useConnectorContext";
import { useMarketService } from "@/hooks/services/backend/useMarketService";
import { useQuery } from "@tanstack/react-query";

export function useMarketLogic() {
    const { getChainInfo } = useConnectorContext();
    const { getTopMarkets } = useMarketService();

    const topMarkets = useQuery({
        queryKey: ["getTopMarkets", { network: getChainInfo().queryName, limit: 1 }],
        queryFn: getTopMarkets,
        enabled: true,
    });

    return { topMarkets}
}