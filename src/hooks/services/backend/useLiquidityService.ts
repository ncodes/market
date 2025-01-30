import { handleAxiosError, toLD } from "@/libs/helpers.ts";
import { SwapSide } from "@/pages/swap/types.ts";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { useConnectorContext } from "../../connectors/useConnectorContext";

export interface ListLiquidityParams {
  provider?: string;
  network: string;
  limit?: number;
  offset?: number;
  connectedAddress?: string;
  isProvider?: boolean;
  liquidityFilter?: LiquidityFilter;
}

type ListLiquidityIDs = "getLiquidities" | "getLiquidityByCreator" | "getLiquiditiesByLiquidities";
type GetLiquidityIDs = "getLiquidity";
type GetLiquidityEventsIDs = "getLiquidityEvents";

interface GetLiquidityParams {
  network: string;
  market: string;
  provider: string;
  lid: number;
}

/**
 * useLiquidityService provides access to v1/liquidities endpoints
 */
export function useLiquidityService() {
  const { getChainInfo } = useConnectorContext();

  /**
   * List liquidities
   * @param ctx
   */
  async function listLiquidities(
    ctx: QueryFunctionContext<[ListLiquidityIDs, ListLiquidityParams]>,
  ): Promise<{ liquidities: Liquidity[]; meta: { queryCount: number } }> {
    try {
      const [id, params] = ctx.queryKey;
      const { network, limit, liquidityFilter, offset } = params;
      const headers = {
        "Content-Type": "application/json",
      };

      const payload = {
        ...liquidityFilter,
        net: network,
        offset,
        limit,
        isProvider: false,
      };

      if (id == "getLiquidityByCreator" && params.connectedAddress) {
        payload.provider = params.connectedAddress;
        payload.isProvider = true;
      }

      const resp = await axios({
        method: "post",
        url: `${getChainInfo().apiUrl}/v1/liquidities`,
        data: payload,
        headers,
      });

      return Promise.resolve({
        liquidities: resp.data.data,
        meta: resp.data.meta,
      });
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Fill returns liquidities sufficient to fill the given amount of the given side.
   * @param ctx
   */
  async function fill(
    ctx: QueryFunctionContext<
      [
        string,
        Market,
        {
          address: string;
          network: string;
          marketAddress: string;
          amount: string;
          side: SwapSide;
          decimals: number;
        },
      ]
    >,
  ): Promise<FillResult> {
    try {
      const headers = {};
      const [, , params] = ctx.queryKey;
      const { network, marketAddress, address, decimals } = params;

      let amount = "";
      let side = "";
      if (params.side === "Sell") {
        amount = toLD(params.amount, decimals);
        side = "quote";
      } else if (params.side === "Buy") {
        amount = toLD(params.amount, decimals);
        side = "base";
      }

      const resp = await axios({
        method: "get",
        url: `${getChainInfo().apiUrl}/v1/liquidities/${marketAddress}/${amount}/${side}/fill`,
        params: {
          net: network,
          taker: address,
        },
        headers,
      } as AxiosRequestConfig);

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get liquidity
   */
  async function getLiquidity(ctx: QueryFunctionContext<[GetLiquidityIDs, GetLiquidityParams]>): Promise<Liquidity> {
    try {
      const [, params] = ctx.queryKey;
      const { network, market, provider, lid } = params;
      const headers = {};
      const resp = await axios({
        method: "get",
        url: `${getChainInfo().apiUrl}/v1/liquidities/${market}/${provider}/${lid}`,
        params: {
          net: network,
        },
        headers,
      });

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get liquidity events
   */
  async function getEvents(ctx: QueryFunctionContext<[GetLiquidityEventsIDs, GetLiquidityParams]>): Promise<Event[]> {
    try {
      const [, params] = ctx.queryKey;
      const { network, market, provider, lid } = params;
      const headers = {};
      const resp = await axios<{ data: Event[] }>({
        method: "get",
        url: `${getChainInfo().apiUrl}/v1/liquidities/${market}/${provider}/${lid}/events`,
        params: {
          net: network,
        },
        headers,
      });

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  return {
    listLiquidities,
    getLiquidity,
    getEvents,
    fill,
  };
}
