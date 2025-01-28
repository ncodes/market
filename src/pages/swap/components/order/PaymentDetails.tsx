import { InfoIcon } from "lucide-react";
import { Fragment } from "react";
import { ToolTip } from "../../../../components/ToolTip";
import { useConnectorContext } from "../../../../hooks/connectors/useConnectorContext";
import { cn } from "../../../../libs/utils";
import { getPayer, isOrderRouter, isSellerOrBuyer } from "../../common/utils";
import { SwapPaymentAmount } from "./SwapPaymentAmount";

export function PaymentDetails({ order }: { order: Swap }) {
  const { address } = useConnectorContext();
  const isRouter = isOrderRouter(order, address);
  const payer = getPayer(order);
  const isPayer = payer == address;

  if (!isRouter) {
    if (!order?.takerPaymentMethod && !order.providerPaymentMethod) return null;
    const isProvider = order.provider == address;

    let paymentMethod: PaymentMethod | undefined;
    const hasRouter = !!order.payRouterRequest;
    if (hasRouter) {
      if (isPayer) {
        paymentMethod = order.payRouterRequest.routes[0].paymentMethod;
      } else {
        paymentMethod = isProvider ? order.providerPaymentMethod : order.takerPaymentMethod;
      }
    } else {
      if (isPayer) {
        paymentMethod = isProvider ? order.takerPaymentMethod : order.providerPaymentMethod;
      } else {
        paymentMethod = payer == order.provider ? order.takerPaymentMethod : order.providerPaymentMethod;
      }
    }

    return (
      <>
        <PaymentInfo paymentMethod={paymentMethod} />
        <div className="mt-2 flex items-center gap-1 border-t border-gray-800 pt-2">
          <span className="inline-block w-[137px] font-poppins text-sm font-light text-gray-500">Amount:</span>
          <span className="font-dosis text-lg font-semibold text-screaming-green">
            <SwapPaymentAmount order={order} address={address} />
          </span>
          <ToolTip
            tip={
              isPayer
                ? `The exact amount you are are expected to send to the ${isSellerOrBuyer(order, address, true)}. ${hasRouter ? "This amount includes routing fees." : ""}`
                : `The exact amount you are expected to receive from the ${isSellerOrBuyer(order, address, true)}.`
            }
            className="ml-1 text-gray-400/30 transition-all duration-500 hover:text-gray-400"
          >
            <InfoIcon className="h-4 w-4" />
          </ToolTip>
        </div>
      </>
    );
  }

  return null;
}

export function PaymentInfo({ paymentMethod, className }: { paymentMethod: PaymentMethod; className?: string }) {
  if (paymentMethod?.type == 1) {
    return (
      <Fragment>
        <span className={cn("inline-block w-[140px] font-poppins text-sm font-light text-gray-500", className)}>
          Bank Name
        </span>
        <span>{paymentMethod.name}</span> <br />
        <span className={cn("inline-block w-[140px] font-poppins text-sm font-light text-gray-500", className)}>
          Account Name
        </span>
        <span>{paymentMethod.bankAccountName}</span> <br />
        <span className={cn("inline-block w-[140px] font-poppins text-sm font-light text-gray-500", className)}>
          Account Number
        </span>
        <span>{paymentMethod.bankAccountNumber}</span> <br />
        {paymentMethod.routingNumber && (
          <Fragment>
            <span className={cn("inline-block w-[140px] font-poppins text-sm font-light text-gray-500", className)}>
              Routing Number
            </span>
            <span>{paymentMethod.routingNumber}</span> <br />
          </Fragment>
        )}
        {paymentMethod.swiftCode && (
          <Fragment>
            <span className={cn("inline-block w-[140px] font-poppins text-sm font-light text-gray-500", className)}>
              SWIFT Code
            </span>{" "}
            <span>{paymentMethod.swiftCode}</span> <br />
          </Fragment>
        )}
        {paymentMethod.additionalInfo && (
          <Fragment>
            <span className={cn("inline-block w-[140px] font-poppins text-sm font-light text-gray-500", className)}>
              Additional Info:
            </span>
            <span className="font-dosis">{paymentMethod.additionalInfo}</span> <br />
          </Fragment>
        )}
      </Fragment>
    );
  }

  if (paymentMethod?.type == 2) {
    return (
      <Fragment>
        <span className={cn("inline-block w-[140px] font-poppins text-sm font-light text-gray-500", className)}>
          Wallet Service
        </span>{" "}
        <span>{paymentMethod.name}</span> <br />
        <span className={cn("inline-block w-[140px] font-poppins text-sm font-light text-gray-500", className)}>
          Account ID
        </span>{" "}
        <span>{paymentMethod.accountId}</span> <br />
        {paymentMethod.additionalInfo && (
          <Fragment>
            <span className="inline-block w-[140px] font-poppins text-sm font-light text-gray-500">
              Additional Info:
            </span>{" "}
            <span className="font-dosis">{paymentMethod.additionalInfo}</span> <br />
          </Fragment>
        )}
      </Fragment>
    );
  }
}
