import { handleAxiosError } from "@/libs/helpers.ts";
import axios, { AxiosProgressEvent } from "axios";
import { useConnectorContext } from "../../connectors/useConnectorContext";
import { useSession } from "../../useSession.ts";

export interface UploadParams {
  net: string;
  orderId: number;
  data: FormData;
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

/**
 * useFileService provides access to v1/files endpoint
 */
export function useFileService() {
  const { getChainInfo } = useConnectorContext();
  const { token } = useSession();

  /**
   * Upload a file
   */
  async function uploadFile(params: UploadParams): Promise<string> {
    try {
      const { net, orderId, data, onUploadProgress } = params;

      const resp = await axios({
        method: "post",
        url: `${getChainInfo().apiUrl}/v1/files/upload/${net}/${orderId}`,
        data,
        onUploadProgress,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });

      return Promise.resolve(resp.data.data.hash);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  return {
    uploadFile,
  };
}
