import { InfoIcon, TagIcon } from "lucide-react";
import { Avatar } from "../../../components/avatar/Avatar";
import { ToolTip } from "../../../components/toolTip";
import { formatToHighDenom, toDec, trimZeros } from "../../../libs/helpers";
import { isSynthetic } from "../utils";

export function OrderAssets({ order }: { order: Swap }) {
  const market = order.market;
  let orderAmt = order.amount;

  if (isSynthetic(market.quoteType)) {
    orderAmt = toDec(orderAmt).sub(order.protocolFee).sub(order.marketCreatorFee).toFixed();
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
            <span>Buy</span>
            <span>
              <ToolTip
                tip={`The amount of base asset to be bought by the seller. Also the amount of base asset the buyer is offering.`}
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
            <span>Sell</span>
            <span>
              <ToolTip
                tip={`The amount of quote asset to be sold by the seller. Also the amount of quote asset the buyer is buying.`}
                className="text-gray-400/30 hover:text-gray-400"
              >
                <InfoIcon className="h-4 w-4" />
              </ToolTip>
            </span>
          </p>
          <p className="font-dosis text-lg font-semibold tracking-wider">
            {trimZeros(toDec(order.cost).toFixed(6))} <span className="text-gray-400">{order?.quote}</span>
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
              <ToolTip tip={`The price of 1 BASE token.`} className="text-gray-400/30 hover:text-gray-400">
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
