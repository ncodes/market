import { InfoIcon } from "lucide-react";
import EmojiAvatar from "../../../../components/avatar/EmojiAvatar";
import { AvatarSize } from "../../../../components/avatar/useAvatar";
import { ToolTip } from "../../../../components/toolTip";
import { shortenAddress } from "../../../../libs/helpers";
import { cn } from "../../../../libs/utils";
import { isOrderRouter } from "../../utils";

export function OrderParticipants({ order, address }: { order: Swap; address: string }) {
  const isRouter = isOrderRouter(order, address);
  let routePosition = 0;
  if (isRouter) {
    const routes = order.payRouterRequest?.routes ?? [];
    routePosition = routes?.findIndex((route) => route.owner == address) ?? 0;
  }

  return (
    <div className="flex gap-10 border-t border-gray-800/50 px-3 py-5">
      <div className={cn("flex min-w-[130px] items-center gap-2", order.taker == address ? "order-1" : "order-2")}>
        <EmojiAvatar randomStr={order.taker} size={AvatarSize.Small} className="h-10 w-10" />
        <div>
          <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder/90">
            <span>Seller</span>
            {order.taker == address && (
              <span className="rounded bg-gray-700 px-1 text-[10px] font-bold text-gray-100">YOU</span>
            )}
            <span>
              <ToolTip
                tip={`The address of the seller or taker. The seller sells quote token for base token.`}
                className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
              >
                <InfoIcon className="h-4 w-4" />
              </ToolTip>
            </span>
          </p>
          <p className="text-xs font-normal tracking-wider text-gray-400">{shortenAddress(order.taker)} </p>
        </div>
      </div>

      <div className={cn("flex min-w-[142px] items-center gap-2", order.provider == address ? "order-1" : "order-2")}>
        <EmojiAvatar randomStr={order.provider} size={AvatarSize.Small} className="h-10 w-10" />
        <div>
          <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder/90">
            <span>Buyer</span>
            {order.provider == address && (
              <span className="rounded bg-gray-700 px-1 text-[10px] font-bold text-gray-100">YOU</span>
            )}
            <span>
              <ToolTip
                tip={`The address of buyer or liquidity provider. The buyer buys quote token with base token.`}
                className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
              >
                <InfoIcon className="h-4 w-4" />
              </ToolTip>
            </span>
          </p>
          <p className="text-xs font-normal tracking-wider text-gray-400">{shortenAddress(order.provider)}</p>
        </div>
      </div>

      {isRouter && (
        <div className="flex min-w-[130px] items-center gap-2">
          <EmojiAvatar randomStr={address} size={AvatarSize.Small} className="h-10 w-10" />
          <div>
            <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder">
              <span>Router #{routePosition}</span>
              <span className="rounded bg-gray-700 px-1 text-[10px] font-bold text-gray-100">YOU</span>
              <span>
                <ToolTip
                  tip={`You are participating in the order as a router.`}
                  className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                >
                  <InfoIcon className="h-4 w-4" />
                </ToolTip>
              </span>
            </p>
            <p className="text-xs font-normal tracking-wider text-gray-400">{shortenAddress(address)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
