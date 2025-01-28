import { toDec } from "@/libs/helpers.ts";
import { isNative } from "@/pages/swap/common/utils.ts";
import { TokenList } from "@jointlabs/meta";
import { ZeroAddress } from "ethers";
import { SideQuote } from "../../../pages/swap/types/types.ts";
import { LiquidityStruct, RouteStruct } from "../../../typechain/Router.ts";
import { useConnectorContext } from "../../connectors/useConnectorContext";

/**
 * UseRouterContract provides access to the Router contract
 */
export default function useRouterContract() {
  const { simulateAndWriteContract } = useConnectorContext();

  /**
   * Create and execute a route transaction from a fill result
   * @param sellToken The sell token
   * @param fillResult The fill result object
   * @param deadline The deadline for the route transaction
   * @param operator The operator for the route transaction
   */
  async function route(sellToken: TokenList.Token, fillResult: FillResult, deadline: number, operator: number) {
    const { marketAddress, side, totalAmountFilled, totalQuantityFilled, liquidities } = fillResult;

    const route: RouteStruct = {
      market: marketAddress,
      liqs: [] as LiquidityStruct[],
    };

    for (const fill of liquidities) {
      route.liqs.push({
        provider: fill.providerIndex,
        lid: fill.lid,
        amount: side == SideQuote ? fill.quantityFilled : toDec(fill.amountFilled).toFixed(0),
        maxPrice: fill.price,
      });
    }

    const res = await simulateAndWriteContract(
      "router",
      "route",
      [{ routes: [route], deadline, operator, target: ZeroAddress }],
      isNative(sellToken)
        ? side == SideQuote
          ? BigInt(toDec(totalAmountFilled).toFixed(0))
          : BigInt(toDec(totalQuantityFilled).toFixed(0))
        : undefined,
      true,
      1,
    );

    return res[0];
  }

  /**
   * Parse transaction error into human-friendly message
   * @param error The error object
   */
  function humanizeErrors(error: { message: string } | unknown) {
    if (error instanceof Error) {
      if (error.message.includes("User rejected the request")) {
        return "Transaction was rejected";
      }

      if (error.message.includes("ROUTER: INSUFFICIENT_BALANCE")) {
        return "You have insufficient sell token balance";
      }

      if (error.message.includes("OC: LOW_LIQ")) {
        return "Router selected liquidity is low. Refresh & Try again.";
      }

      if (error.message.includes("replacement transaction underpriced")) {
        return "Rejected: Not enough gas to replace pending tx";
      }
    }
    return "Transaction failed";
  }

  return {
    humanizeErrors,
    route,
  };
}
