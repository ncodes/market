import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { InfoIcon } from "lucide-react";
import moment from "moment";
import Countdown from "react-countdown";
import { ToolTip } from "../../../../components/ToolTip";
import { getPayer } from "../../common/utils";

export function HeaderCountDown({ order }: { order: Swap }) {
  const { address } = useConnectorContext();
  if (!order || !address) return null;

  const payer = getPayer(order);
  const isPayer = payer === address;

  const showCancel = !order.released && !order.paid && moment(order.cancelAt).isAfter(moment());

  return (
    <div>
      {showCancel && (
        <div className="flex flex-col text-right text-xs">
          <span className="flex items-center gap-1 text-gray-400">
            <span>Cancelable In</span>
            <ToolTip
              tip={`This order will be eligible for cancelation after the time elapses. ${isPayer ? `It is not advisable to send payment near or after this time as you may lose your payment.` : ``}`}
            >
              <InfoIcon className="h-3 w-3" />
            </ToolTip>
          </span>
          <span className="font-semibold text-gray-100">
            <Countdown date={order.cancelAt} />
          </span>
        </div>
      )}
    </div>
  );
}
