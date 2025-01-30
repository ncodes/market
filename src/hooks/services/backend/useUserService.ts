import { handleAxiosError } from "@/libs/helpers.ts";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { useConnectorContext } from "../../connectors/useConnectorContext";
import { useSession } from "../../useSession.ts";

export interface GetUserParams {
  addressOrUserId: string;
  noAuth?: boolean;
  net?: string;
}

interface LogOnlineStatusParams {
  net: string;
  orderId?: number;
  offerId?: number;
}

/**
 * useUserService provides access to v1/users endpoint
 */
export function useUserService() {
  const { getChainInfo, address } = useConnectorContext();
  const { getAccessToken } = useSession();

  /**
   * Get a user
   */
  async function getUser(ctx: QueryFunctionContext<[string, GetUserParams]>): Promise<User> {
    try {
      const [, params] = ctx.queryKey;
      const headers: Record<string, string | undefined> = {};

      if (!params.noAuth) {
        const token = getAccessToken(address);
        headers["authorization"] = token ? `Bearer ${token}` : undefined;
      }

      const resp = await axios({
        url: `${getChainInfo().apiUrl}/v1/users/${params.addressOrUserId}`,
        method: "get",
        params: { no404: true, net: params.net },
        headers,
      } as AxiosRequestConfig);

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Log online status
   * @param params The request params
   * @returns
   */
  async function logOnlineStatus(params: LogOnlineStatusParams) {
    try {
      const token = getAccessToken(address);

      const resp = await axios({
        url: `${getChainInfo().apiUrl}/v1/users/log-status`,
        method: "post",
        data: {
          ...params,
          net: params.net,
        },
        headers: {
          authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
      } as AxiosRequestConfig);

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Register device
   * @returns
   */
  async function registerDevice() {
    try {
      const token = getAccessToken(address);

      await axios({
        url: `${getChainInfo().apiUrl}/v1/users/register-device`,
        method: "post",
        data: {},
        headers: {
          authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
      } as AxiosRequestConfig);

      return Promise.resolve(undefined);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Update default payment method
   * @param id The payment method id
   * @returns
   */
  async function updateDefaultPaymentMethod(id: string) {
    try {
      const token = getAccessToken(address);

      await axios({
        url: `${getChainInfo().apiUrl}/v1/users/payment-method/${id}`,
        method: "put",
        headers: {
          authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
      } as AxiosRequestConfig);

      return Promise.resolve(undefined);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get energon balance
   * @param ctx The query function context
   * @returns
   */
  async function getEnergonBalance(ctx: QueryFunctionContext<[string, { address: string }]>): Promise<string> {
    try {
      const [, params] = ctx.queryKey;
      const headers = {};

      const resp = await axios({
        url: `${getChainInfo().apiUrl}/v1/users/energon-balance/${params.address}`,
        method: "get",
        headers,
      } as AxiosRequestConfig);

      return Promise.resolve(resp.data.data.balance);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get NFT Info
   * @param ctx The query function context
   * @returns
   */
  async function getNFTInfo(
    ctx: QueryFunctionContext<[string, { address: string }]>,
  ): Promise<{ count: number; totalPoints: string }> {
    try {
      const [, params] = ctx.queryKey;
      const headers = {};

      const resp = await axios({
        url: `${getChainInfo().apiUrl}/v1/users/nft-info/${params.address}`,
        method: "get",
        headers,
      } as AxiosRequestConfig);

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Get galxe balance
   * @param ctx The query function context
   * @returns
   */
  async function getGalxePoints(
    ctx: QueryFunctionContext<[string, { address: string }]>,
  ): Promise<{ points: number; actualPoints: number }> {
    try {
      const [, params] = ctx.queryKey;
      const headers = {};

      const resp = await axios({
        url: `${getChainInfo().apiUrl}/v1/users/galxe-points/${params.address}`,
        method: "get",
        headers,
      } as AxiosRequestConfig);

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  return {
    getUser,
    logOnlineStatus,
    registerDevice,
    getEnergonBalance,
    getNFTInfo,
    getGalxePoints,
    updateDefaultPaymentMethod,
  };
}
