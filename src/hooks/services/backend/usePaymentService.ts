import { handleAxiosError } from "@/libs/helpers.ts";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";
import { useConnectorContext } from "../../connectors/useConnectorContext.tsx";
import { useSession } from "../../useSession.ts";

export interface GetPaymentMethodsParams {
  network?: string;
}

export interface GetPaymentMethodGrantSignatureParams {
  network: string;
  badge: string;
  address: string;
  liquidityAddress: string;
  disable?: boolean;
}

/**
 * usePaymentService provides access to v1/payments endpoints
 */
export function usePaymentService() {
  const { getChainInfo } = useConnectorContext();
  const { token } = useSession();

  /**
   * Get payment methods
   * @param ctx - The query function context
   */
  async function getPaymentMethods(
    ctx: QueryFunctionContext<[string, GetPaymentMethodsParams]>,
  ): Promise<PaymentMethod[]> {
    try {
      const [, params] = ctx.queryKey;
      const { network } = params;
      const resp = await axios({
        method: "get",
        url: `${getChainInfo().apiUrl}/v1/payments/methods`,
        params: {
          net: network,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      } as AxiosRequestConfig);
      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Add a payment method
   * @param net - The network name
   * @param type - The payment method type
   * @param name - The payment method name
   * @param accountId - The account id
   * @param bankAccountName - The bank account name
   * @param bankAccountNumber - The bank account number
   * @param routingNumber - The routing number
   * @param swiftCode - The swift code
   * @param additionalInfo - The additional info
   */
  async function addPaymentMethod({
    net,
    type,
    name,
    accountId,
    bankAccountName,
    bankAccountNumber,
    routingNumber,
    swiftCode,
    additionalInfo,
    useAsDefault,
  }: {
    net: string;
    type?: number;
    name: string;
    accountId: string;
    bankAccountName: string;
    bankAccountNumber: string;
    routingNumber: string;
    swiftCode: string;
    additionalInfo: string;
    useAsDefault?: boolean;
  }): Promise<PaymentMethod> {
    try {
      const resp = await axios({
        method: "post",
        url: `${getChainInfo().apiUrl}/v1/payments/methods`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          net,
          type,
          name,
          accountId,
          bankAccountName,
          bankAccountNumber,
          routingNumber,
          swiftCode,
          additionalInfo,
          useAsDefault,
        }),
      });
      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  /**
   * Delete a payment method
   * @param id - The payment method id
   */
  async function deletePaymentMethod({ id }: { id: string }): Promise<void> {
    try {
      await axios({
        method: "delete",
        url: `${getChainInfo().apiUrl}/v1/payments/methods/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  return {
    getPaymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
  };
}
