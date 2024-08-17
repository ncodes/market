import axios from "axios";
import { handleAxiosError } from "@/libs/helpers.ts";
import { User } from "@/types/api.ts";

/**
 * useAuthService provides access to v1/auth endpoint
 */
export function useAuthService() {
  async function createSessionFromWallet({
    walletAddress,
    msg,
    signedMsg,
  }: {
    walletAddress: string;
    msg: string;
    signedMsg: string;
  }): Promise<{
    token: string;
    user: User;
  }> {
    try {
      const headers = {};
      
      const resp = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/v1/auth/session-from-wallet`,
        data: {
          walletAddress: walletAddress,
          msg: msg,
          sig: signedMsg,
        },
        headers,
      });

      return Promise.resolve(resp.data.data);
    } catch (e) {
      return Promise.reject(handleAxiosError(e as never));
    }
  }

  return {
    createSessionFromWallet,
  };
}
