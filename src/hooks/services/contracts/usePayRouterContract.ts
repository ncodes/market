import { BigNumberish } from "ethers";
import { useConnectorContext } from "../../connectors/useConnectorContext";

/**
 * Providers utilities for reading and writing to the PayRouter contract
 */
export default function usePayRouterContract() {
  const { simulateAndWriteContract } = useConnectorContext();

  /**
   * Mark a request as paid
   * @param requestId The request ID
   * @param routeId The route ID
   */
  async function markRequestAsPaid(requestId: BigNumberish, routeId: BigNumberish) {
    const res = await simulateAndWriteContract("payRouter", "markRequestAsPaid", [requestId, routeId]);
    return res[0];
  }

  /**
   * Parse transaction error into human-friendly message
   * @param error The error object
   */
  function humanizeErrors(error: { message: string } | unknown): string {
    if (error instanceof Error) {
      // if (error.message.includes("OC: ZERO_LIQ")) return "Cannot perform action on empty liquidity";

      // Common
      if (error.message.includes("User rejected the request")) return "Transaction was rejected";
      if (error.message.includes("replacement transaction underpriced")) {
        return "Rejected: Not enough gas to replace pending tx";
      }
    }

    return "Transaction failed";
  }

  return {
    markRequestAsPaid,
    humanizeErrors,
  };
}
