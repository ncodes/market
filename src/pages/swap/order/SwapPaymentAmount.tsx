import { toDec } from "../../../libs/helpers";
import { calculateRoutesFee, getPayer, isSynthetic } from "../utils";

export function SwapPaymentAmount({ order, address }: { order?: Swap; address?: string }) {
  if (!order || !address) return null;

  const totalRouteFees = calculateRoutesFee(order.payRouterRequest?.routes || []);
  const payer = getPayer(order);

  if (isSynthetic(order.market.quoteType) && payer == address) {
    return (
      <>
        {toDec(order.cost)
          .div(toDec(1).minus(toDec(totalRouteFees).div(100)))
          .toFixed(6) +
          " " +
          order.quote}
      </>
    );
  }

  if (isSynthetic(order.market.quoteType) && payer != address) {
    return <>{toDec(order.cost).toFixed(6) + " " + order.quote}</>;
  }

  return null;
}
