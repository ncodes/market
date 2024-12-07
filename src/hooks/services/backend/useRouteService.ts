import { handleAxiosError } from "@/libs/helpers.ts";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { useConnectorContext } from "../../connectors/useConnectorContext.tsx";

export interface GetRoutesParams {
  net?: string;
  region: string;
  destOrgId: number;
  requester: string;
  minBond?: string;
  maxDepth?: number;
}

/**
 * useRouteService provides access to v1/routes endpoint
 */
export function useRouteService() {
  const { getChainInfo } = useConnectorContext();

  /**
   * Get pay routes
   */
  async function getPayRoutes(
    ctx: QueryFunctionContext<[string, string | undefined, GetRoutesParams]>,
  ): Promise<PayRouterRoute[][]> {
    try {
      const [, , params] = ctx.queryKey;
      const resp = await axios({
        url: `${getChainInfo().apiUrl}/v1/routes/${params.region}/${params.destOrgId}`,
        method: "get",
        params: {
          net: params.net,
          minBond: params.minBond,
          requester: params.requester,
        },
        headers: {
          "Content-Type": "application/json",
        },
      } as AxiosRequestConfig);

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  return {
    getPayRoutes,
  };
}
