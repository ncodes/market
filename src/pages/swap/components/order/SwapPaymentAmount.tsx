import { getCurrency } from "@jointlabs/meta";
import useStore from "../../../../hooks/store/useStore";
import { pow10, toDec, toLDD, trimZeros } from "../../../../libs/helpers";
import {
  calculateRoutesFee,
  calculateRoutesFee2,
  convertCurrency,
  getPayer,
  isOrderRouter,
  isSynth,
} from "../../utils";

export function SwapPaymentAmount({ order, address }: { order?: Swap; address?: string }) {
  const user = useStore((state) => state.user);

  if (!order || !address || !user) return null;
  const { market } = order;

  const totalRouteFees = calculateRoutesFee(order.payRouterRequest?.routes || []);
  const payer = getPayer(order);
  const isPayer = payer == address;
  const cost = toDec(order.cost);
  const hasRouter = !!order.payRouterRequest;
  const isRouter = isOrderRouter(order, address);
  let amount = toDec(0);
  let symbol = order.quote;

  if (isSynth(market.quoteType)) {
    if (isPayer) {
      amount = cost.div(toDec(1).minus(toDec(totalRouteFees).div(100)));
    } else {
      amount = cost;
    }
  } else {
    const totalFees = toDec(order.protocolFee).add(order.marketCreatorFee);
    const cost = toLDD(order.cost, market.quoteDecimals);
    const costAfterFee = cost.sub(totalFees).mul(pow10(market.baseDecimals));
    amount = costAfterFee.div(order.price).div(pow10(market.baseDecimals));
    symbol = order.base;

    if (hasRouter && !isPayer && !isRouter) {
      const routerFees = calculateRoutesFee2(order.payRouterRequest?.routeFees ?? []);
      amount = toDec(amount).mul(toDec(1).minus(toDec(routerFees).div(100)));
      const convSymbol = getCurrency(user?.paymentMethod?.name)!;
      const convAmt = convertCurrency(amount, symbol!, convSymbol, order.rates);
      symbol = convSymbol;
      amount = toDec(convAmt);
    }
  }

  return <>{trimZeros(amount.toFixed(6)) + " " + symbol}</>;
}
