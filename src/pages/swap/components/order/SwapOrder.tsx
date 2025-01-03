import { Card, CardFooter } from "@/components/ui/card.tsx";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { cn } from "@/libs/utils.ts";
import { InfoIcon } from "lucide-react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useIntersectionObserver } from "usehooks-ts";
import { ToolTip } from "../../../../components/toolTip";
import { getPayer, isOrderExpired, isOrderRouter, isSwapCounterparty } from "../../common/utils";
import { useSwapOrderLogic } from "../../hooks/useSwapOrderLogic";
import { SwapDrawer } from "../SwapDrawer";
import { AppealAlert } from "./AppealAlert";
import { HeaderCountDown } from "./HeaderCountDown";
import { OrderAction } from "./OrderAction";
import { OrderAssets } from "./OrderAssets";
import { OrderParticipants } from "./OrderParticipants";
import { OrderProgress } from "./OrderProgress";
import { PaymentInformation } from "./PaymentInformation";
import { RoutePathDetails } from "./RoutePathDetails";

export function SwapOrder() {
  const { orderId } = useParams();
  const { order, markAsPaid, markRouteAsPaid, release, cancel, state, setState } = useSwapOrderLogic(orderId);
  const { address } = useConnectorContext();
  const swapSectionRef = useRef<HTMLDivElement | null>(null);
  const footerRef = useRef<HTMLDivElement | null>(null);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 1,
  });

  if (!order) return null;

  const payer = getPayer(order);
  const isPayer = address == payer;
  const isRouter = isOrderRouter(order, address);
  const orderExpired = isOrderExpired(order);
  const isCounterparty = isSwapCounterparty(order, address);

  return (
    <div ref={ref} className="relative mx-auto mb-[150px] mt-5 flex w-[600px] flex-col overflow-hidden rounded-b-3xl">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-lg font-normal tracking-wider">
          <span className="text-gray-500">Swap {">"} </span>
          <span className="text-gray-200">Order #{orderId}</span>
        </h1>
        <div>{<HeaderCountDown order={order} />}</div>
      </div>

      <div>
        {isRouter && (
          <div className="flex w-full items-center gap-1 rounded-t-lg border-gray-800/50 bg-baltic-sea/70 px-3 py-2 text-center text-xs font-medium tracking-wider text-gray-300">
            <span>Router View</span>
            <ToolTip tip="You are viewing this order as a router">
              <InfoIcon className="h-3 w-3 text-gray-500" />
            </ToolTip>
          </div>
        )}

        {orderExpired && !order.released && (
          <div
            className={cn(
              "flex w-full items-center justify-center gap-1 rounded-t-lg border-gray-800/50 bg-red-600 px-3 py-2 text-center text-xs font-medium tracking-wider text-red-200",
              {
                "rounded-t-none": isRouter,
              },
            )}
          >
            <span>Order Expired</span>
            <ToolTip
              tip={`The order has passed the cancellation time. ${isCounterparty && !order.cancelled ? `You may cancel the order to return escrowed liquidity.` : ""} ${isPayer ? ` Do not send payment or proceed with the swap. ` : ``}`}
            >
              <InfoIcon className="h-3 w-3 text-red-100" />
            </ToolTip>
          </div>
        )}

        <Card
          ref={swapSectionRef}
          className={cn(
            "w-full rounded-3xl border border-gray-800/50 bg-gradient-to-b from-mirage to-onyx px-1 pb-0 text-gray-300",
            {
              "rounded-t-none": isRouter || orderExpired,
            },
          )}
        >
          <div className="flex min-h-[600px] flex-col justify-between gap-2">
            <div className="flex-1">
              {!!order.appeal && <AppealAlert order={order} setSwapOrderState={setState} footerRef={footerRef} />}

              <OrderAssets order={order} />

              {/* Swapper & Provider & Router info */}
              <OrderParticipants order={order} address={address} />

              {/* Payment Details */}
              {isSwapCounterparty(order, address) && <PaymentInformation order={order} />}

              {isRouter && <RoutePathDetails order={order} collapse={!isIntersecting} />}

              {/* Progress */}
              {(isSwapCounterparty(order, address) || isRouter) && (
                <OrderProgress order={order} collapse={!isIntersecting} />
              )}
            </div>

            {/* Actions */}
            <CardFooter ref={footerRef} className="flex-0 flex-col px-2 pb-0">
              <OrderAction
                container={swapSectionRef}
                order={order}
                swapOrderState={state}
                markAsPaid={markAsPaid}
                markRouteAsPaid={markRouteAsPaid}
                release={release}
                cancel={cancel}
                setSwapOrderState={setState}
              />
            </CardFooter>
          </div>
        </Card>
        <SwapDrawer
          swapOrderState={state}
          order={order}
          setSwapOrderState={setState}
          containerHeight={swapSectionRef.current?.clientHeight}
        />
      </div>
    </div>
  );
}
