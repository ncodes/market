import { InfoIcon, TagIcon } from "lucide-react";
import { Avatar } from "../../../components/avatar/Avatar";
import { ToolTip } from "../../../components/toolTip";
import { useConnectorContext } from "../../../hooks/connectors/useConnectorContext";
import { formatToHighDenom, pow10, toDec, toLDD, trimZeros } from "../../../libs/helpers";
import { calculateRoutesFee2, getPayer, isOrderRouter, isSynth } from "../utils";

export function OrderAssets({ order }: { order: Swap }) {
  const { address } = useConnectorContext();
  const isRouter = isOrderRouter(order, address);
  const payer = getPayer(order);
  const isPayer = address == payer;
  const market = order.market;
  let orderAmt = order.amount;
  const isSeller = address == order.taker;
  const totalFees = toDec(order.protocolFee).add(order.marketCreatorFee);
  let cost = order.cost;
  let feeHD = toDec(0);
  const hasRouter = !!order.payRouterRequest;

  if (isSynth(market.quoteType)) {
    feeHD = totalFees.div(pow10(order.market.baseDecimals));
    orderAmt = address == order.provider ? toDec(orderAmt).toFixed() : toDec(orderAmt).sub(totalFees).toFixed();

    if (hasRouter) {
      const routerFees = calculateRoutesFee2(order.payRouterRequest?.routeFees ?? []);
      cost = toDec(cost)
        .div(toDec(1).minus(toDec(routerFees).div(100)))
        .toNumber();
    }
  } else {
    const costLD = toLDD(cost, order.market.quoteDecimals);
    const costAfterFee = costLD.sub(totalFees).mul(pow10(order.market.baseDecimals));
    orderAmt = costAfterFee.div(order.price).toFixed();
    feeHD = totalFees.div(pow10(order.market.quoteDecimals));

    if (address == order.provider) {
      cost = toDec(costLD).sub(totalFees).div(pow10(order.market.quoteDecimals)).toNumber();
    }

    if (hasRouter && !isPayer && !isRouter) {
      const routerFees = calculateRoutesFee2(order.payRouterRequest?.routeFees ?? []);
      orderAmt = toDec(orderAmt)
        .mul(toDec(1).minus(toDec(routerFees).div(100)))
        .toFixed();
    }
  }

  return (
    <div className="flex gap-10 px-3 py-5">
      {/* Base */}
      <div className="flex min-w-[130px] items-center gap-2">
        <Avatar
          src={order?.market.baseLogo as string}
          fallback={order?.base}
          className="h-8 w-8"
          fallbackClassName="h-8 w-8 text-xs"
        />
        <div>
          <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder">
            <span>{!isRouter ? (!isSeller ? "Sell" : "Buy") : "Buy"}</span>
            <span>
              <ToolTip
                tip={
                  !isRouter
                    ? address == order.taker
                      ? `The amount of ${order.market.base} you are buying.`
                      : `The amount of ${order.market.base} you are selling. ${isSynth(order.market.quoteType) ? `${feeHD.toFixed(6)} will be deducted as fees.` : ""}`
                    : `The amount of ${order.market.base} being sold.`
                }
                className="text-gray-400/30 hover:text-gray-400"
              >
                <InfoIcon className="h-4 w-4" />
              </ToolTip>
            </span>
          </p>
          <p className="font-dosis text-lg font-semibold tracking-wider">
            {formatToHighDenom(orderAmt as string, order?.market.baseDecimals)}{" "}
            <span className="text-gray-400">{order?.base}</span>
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="flex min-w-[130px] items-center gap-2">
        <Avatar
          src={order?.market.quoteLogo as string}
          fallback={order?.quote}
          className="h-8 w-8"
          fallbackClassName="h-8 w-8 text-xs"
        />
        <div>
          <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder">
            <span>{!isRouter ? (isSeller ? "Sell" : "Buy") : `Sell`}</span>
            <span>
              <ToolTip
                tip={
                  !isRouter
                    ? address == order.taker
                      ? `The amount of ${order.market.quote} you are selling. ${!isSynth(order.market.quoteType) ? `${feeHD.toFixed(6)} will be deducted as fees.` : ""}`
                      : `The amount of ${order.market.quote} you are buying.`
                    : `The amount of ${order.market.quote} being bought.`
                }
                className="text-gray-400/30 hover:text-gray-400"
              >
                <InfoIcon className="h-4 w-4" />
              </ToolTip>
            </span>
          </p>
          <p className="font-dosis text-lg font-semibold tracking-wider">
            {trimZeros(toDec(cost).toFixed(6))} <span className="text-gray-400">{order?.quote}</span>
          </p>
        </div>
      </div>

      {/* Price */}
      <div className="flex min-w-[130px] items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
          <TagIcon className="h-5 w-5 text-gray-100" />
        </div>
        <div>
          <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder">
            <span>Price</span>
            <span>
              <ToolTip
                tip={`The price of 1 ${order.market.base} token. Set by the ${address == order.provider ? "you" : "buyer"}.`}
                className="text-gray-400/30 hover:text-gray-400"
              >
                <InfoIcon className="h-4 w-4" />
              </ToolTip>
            </span>
          </p>
          <p className="font-dosis text-lg font-semibold tracking-wider">
            {formatToHighDenom(order.price, order?.market.quoteDecimals)}{" "}
            <span className="text-gray-400">{order?.quote}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
