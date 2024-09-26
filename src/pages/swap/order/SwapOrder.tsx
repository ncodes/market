import { Card, CardFooter } from "@/components/ui/card.tsx";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { cn } from "@/libs/utils.ts";
import { InfoIcon } from "lucide-react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { ToolTip } from "../../../components/toolTip";
import { isOrderRouter, isSwapCounterparty } from "../utils";
import { OrderAction } from "./OrderAction";
import { OrderAssets } from "./OrderAssets";
import { OrderParticipants } from "./OrderParticipants";
import { OrderProgress } from "./OrderProgress";
import { PaymentInformation } from "./PaymentInformation";
import { RouteSourceDetails } from "./RouteSourceDetails";
import { useSwapOrderLogic } from "./useSwapOrderLogic";

export function SwapOrder() {
  const { orderId } = useParams();
  const { order, markAsPaid, markRouteAsPaid, release, cancel, state, setState } = useSwapOrderLogic(orderId);
  const { address } = useConnectorContext();
  const swapSectionRef = useRef<HTMLDivElement | null>(null);

  if (!order) return null;

  const isRouter = isOrderRouter(order, address);

  return (
    <div className="relative mx-auto mt-5 flex w-[600px] flex-col overflow-hidden rounded-b-3xl">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-lg font-normal tracking-wider">
          <span className="text-gray-500">Swap {">"} </span>
          <span className="text-gray-200">Order #{orderId}</span>
        </h1>
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
        <Card
          ref={swapSectionRef}
          className={cn(
            "w-full rounded-3xl border border-gray-800/50 bg-gradient-to-b from-mirage to-onyx px-1 pb-0 text-gray-300",
            {
              "rounded-t-none": isRouter,
            },
          )}
        >
          <div className="">
            <OrderAssets order={order} />

            {/* Swapper & Provider & Router info */}
            <OrderParticipants order={order} address={address} />

            {/* Payment Details */}
            {isSwapCounterparty(order, address) && <PaymentInformation order={order} />}

            {isRouter && <RouteSourceDetails order={order} />}

            {/* Progress */}
            {(isSwapCounterparty(order, address) || isRouter) && <OrderProgress order={order} />}
          </div>

          {/* Actions */}
          <CardFooter className="flex flex-col px-2 pb-0">
            <OrderAction
              order={order}
              state={state}
              markAsPaid={markAsPaid}
              markRouteAsPaid={markRouteAsPaid}
              release={release}
              cancel={cancel}
              setState={setState}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
