import { handleAxiosError } from "@/libs/request";
import { AssetType } from "@/types/enums.ts";
import { TokenList } from "@jointlabs/meta";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import { useConnectorContext } from "../../connectors/useConnectorContext";

export interface ListMarketsParams {
  network: string;
  marketFilter: MarketFilter;
  limit?: number;
  offset?: number;
  connectedAddress?: string;
}

type GetMarketID = "getMarket";
export interface GetMarketParams {
  network: string;
  market: string;
}

interface GetTopMarketsParams {
  network: string;
  limit: number;
}

/**
 * useMarketService provides access to v1/markets endpoints
 */
export function useMarketService() {
  const { getChainInfo } = useConnectorContext();

  /**
   * Get markets
   */
  async function listMarkets(
    ctx: QueryFunctionContext<[string, ListMarketsParams]>,
  ): Promise<{ markets: Market[]; meta: { queryCount: number } }> {
    try {
      const [, params] = ctx.queryKey;
      const { network, marketFilter, limit, offset } = params;
      const headers: { [key: string]: string | undefined } = {};
      const resp = await axios({
        method: "get",
        url: `${getChainInfo().apiUrl}/v1/markets`,
        params: {
          ...marketFilter,
          net: network,
          offset,
          limit,
        },
        headers,
      });

      return Promise.resolve({ markets: resp.data.data || [], meta: resp.data.meta });
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get market
   */
  async function getMarket(ctx: QueryFunctionContext<[GetMarketID, GetMarketParams]>): Promise<Market> {
    try {
      const [, params] = ctx.queryKey;
      const { network, market } = params;
      const headers: { [key: string]: string | undefined } = {};
      const resp = await axios({
        method: "get",
        url: `${getChainInfo().apiUrl}/v1/markets/${market}`,
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
   * Get market by base and quote address
   */
  async function getMarketByBaseAndQuoteAddress(
    ctx: QueryFunctionContext<
      [
        string,
        TokenList.Token,
        TokenList.Token,
        {
          network: string;
          creator?: string;
          baseType?: AssetType;
          quoteType?: AssetType;
        },
      ]
    >,
  ): Promise<Market> {
    try {
      const [, base, quote, params] = ctx.queryKey;
      const { network, creator } = params;
      const headers: { [key: string]: string | undefined } = {};
      const resp = await axios({
        method: "get",
        url: `${getChainInfo().apiUrl}/v1/markets/${base.address}/${quote.address}`,
        params: {
          net: network,
          creator,
          baseType: params.baseType,
          quoteType: params.quoteType,
        },
        headers,
      });

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get top markets
   */
  async function getTopMarkets(ctx: QueryFunctionContext<[string, GetTopMarketsParams]>): Promise<Market[]> {
    try {
      const [, params] = ctx.queryKey;
      const { network, limit } = params;
      const headers: { [key: string]: string | undefined } = {};
      const resp = await axios<{ data: Market[] }>({
        method: "get",
        url: `${getChainInfo().apiUrl}/v1/markets/top`,
        params: {
          net: network,
          limit,
        },
        headers,
      });

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  return {
    listMarkets,
    getMarket,
    getTopMarkets,
    getMarketByBaseAndQuoteAddress,
  };
}
