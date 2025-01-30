import { handleAxiosError } from "@/libs/helpers.ts";
import axios from "axios";
import { useConnectorContext } from "../../connectors/useConnectorContext";
import { useSession } from "../../useSession.ts";

export interface CreateParams {
  net: string;
  orderId: number;
  issue: string;
  description: string;
  files?: string[];
}

/**
 * useFileService provides access to v1/appeals endpoint
 */
export function useAppealService() {
  const { getChainInfo } = useConnectorContext();
  const { token } = useSession();

  /**
   * Create an appeal
   * @param params The params to create an appeal
   * @returns The appeal ID
   */
  async function createAppeal(params: CreateParams): Promise<string> {
    try {
      const { net, issue, description, orderId, files } = params;

      const resp = await axios({
        method: "post",
        url: `${getChainInfo().apiUrl}/v1/appeals/${net}`,
        data: {
          orderId,
          issue,
          description,
          files,
        },
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      return Promise.resolve(resp.data.data.hash);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  return {
    createAppeal,
  };
}
