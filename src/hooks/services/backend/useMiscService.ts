import { handleAxiosError } from "@/libs/helpers.ts";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { useConnectorContext } from "../../connectors/useConnectorContext.tsx";

export interface GetCryptoRateParams {
  net: string;
  symbolOrAddress: string;
  symbol: string;
}

export interface GetMediatorPoolsParams {
  network: string;
}

interface GetSynthRateParams {
  symbol: string;
}

export interface GetProtocolFeesParams {
  network: string;
}

export interface GetPointParams {
  name: string;
}

export interface GetTokenInfoParams {
  network?: string;
  address: string;
}

/**
 * useMiscService provides access to v1/misc endpoint
 */
export function useMiscService() {
  const { getChainInfo } = useConnectorContext();

  /**
   * Get crypto USD rate
   */
  async function getCryptoRate(ctx: QueryFunctionContext<[string, GetCryptoRateParams]>): Promise<number> {
    try {
      const [, params] = ctx.queryKey;
      const headers = {};

      const resp = await axios({
        method: "get",
        url: `${getChainInfo().apiUrl}/v1/misc/crypto-rate/${params.net}/${params.symbolOrAddress}`,
        headers,
      } as AxiosRequestConfig);

      return Promise.resolve(resp.data.data.price);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get synthetic USD rate
   */
  async function getSynthRate(ctx: QueryFunctionContext<[string, GetSynthRateParams]>): Promise<number> {
    try {
      const [, params] = ctx.queryKey;
      const headers = {};

      const resp = await axios({
        method: "get",
        url: `${getChainInfo().apiUrl}/v1/misc/synth-rate/${params.symbol}`,
        headers,
      } as AxiosRequestConfig);

      return Promise.resolve(resp.data.data.price);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get protocol fees
   * @param ctx The query function context
   * @returns
   */
  async function getProtocolFees(ctx: QueryFunctionContext<[string, GetProtocolFeesParams]>): Promise<ProtocolFees> {
    try {
      const [, params] = ctx.queryKey;
      const { network } = params;
      const headers = {};

      const apiUrl = getChainInfo().apiUrl;
      const resp = await axios({
        method: "get",
        url: `${apiUrl}/v1/misc/${network}/protocol-fees`,
        headers,
      } as AxiosRequestConfig);

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get point value
   * @param ctx The query function context
   * @returns
   */
  async function getPoint(ctx: QueryFunctionContext<[string, GetPointParams]>): Promise<number> {
    try {
      const [, params] = ctx.queryKey;
      const { name } = params;
      const headers = {};

      const apiUrl = getChainInfo().apiUrl;
      const resp = await axios({
        method: "get",
        url: `${apiUrl}/v1/misc/point/${name}`,
        headers,
      } as AxiosRequestConfig);

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get token information
   * @param ctx The query function context
   * @returns
   */
  async function getTokenInfo(ctx: QueryFunctionContext<[string, GetTokenInfoParams]>): Promise<TokenInfo> {
    try {
      const [, params] = ctx.queryKey;
      const { network, address } = params;
      const headers = {};

      const apiUrl = getChainInfo().apiUrl;
      const resp = await axios({
        method: "get",
        url: `${apiUrl}/v1/misc/token-info/${network || "-"}/${address}`,
        headers,
      } as AxiosRequestConfig);

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  async function getPointsPerEnergon(): Promise<number> {
    try {
      const apiUrl = getChainInfo().apiUrl;
      const resp = await axios({
        method: "get",
        url: `${apiUrl}/v1/misc/points-per-energon`,
      } as AxiosRequestConfig);

      return resp.data.data.value;
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get contract parameters
   * @param ctx The query function context
   * @returns
   */
  async function getContractParams(ctx: QueryFunctionContext<[string, { network: string }]>): Promise<ContractsParams> {
    try {
      const [, params] = ctx.queryKey;
      const { network } = params;
      const apiUrl = getChainInfo().apiUrl;
      const resp = await axios({
        method: "get",
        url: `${apiUrl}/v1/misc/contracts-params`,
      } as AxiosRequestConfig);
      return resp.data.data[network];
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get request country code
   * @returns
   */
  async function getRequestCountryCode(): Promise<string> {
    try {
      const apiUrl = getChainInfo().apiUrl;
      const resp = await axios({
        method: "get",
        url: `${apiUrl}/v1/misc/req-country-code`,
      } as AxiosRequestConfig);

      return resp.data.data.code || "";
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Compute swap fees
   * @returns
   */
  async function computeFees(
    ctx: QueryFunctionContext<
      [string, { network: string; market: string; provider: string; taker: string; amount: string; price: string }]
    >,
  ): Promise<{
    protoFee: string;
    mktCreatorFee: string;
    feeBp: string;
    mktFeeBp: string;
  }> {
    try {
      const [, params] = ctx.queryKey;
      const { network, market, provider, taker, amount, price } = params;
      const apiUrl = getChainInfo().apiUrl;
      const resp = await axios({
        method: "get",
        url: `${apiUrl}/v1/misc/compute-fees`,
        params: {
          net: network,
          mid: market,
          provider,
          taker,
          orderAmount: amount,
          orderPrice: price,
        },
      } as AxiosRequestConfig);

      return resp.data.data;
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Convert synth to crypto
   * @param ctx The query function context
   * @returns
   */
  async function convertSynthToCrypto(
    ctx: QueryFunctionContext<[string, string | undefined, { network: string; synth: string; to: string }]>,
  ): Promise<{
    synthUsd: string;
    tokenUsd: string;
    value: string;
  }> {
    try {
      const [, , params] = ctx.queryKey;
      const { network, to, synth } = params;
      const apiUrl = getChainInfo().apiUrl;
      const resp = await axios({
        method: "get",
        url: `${apiUrl}/v1/misc/conv-synth-crypto/${network}/${synth}/${to}`,
      } as AxiosRequestConfig);

      return resp.data.data;
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  return {
    convertSynthToCrypto,
    getCryptoRate,
    getSynthRate,
    getProtocolFees,
    getPoint,
    getTokenInfo,
    getPointsPerEnergon,
    getContractParams,
    getRequestCountryCode,
    computeFees,
  };
}
