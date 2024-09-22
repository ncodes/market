import { Fragment } from "react";

export function PaymentDetails({ order }: { order: Swap }) {
  if (!order?.takerPaymentMethod && !order.providerPaymentMethod) return null;
  const paymentMethod = order.providerPaymentMethod || order.takerPaymentMethod;

  if (paymentMethod.type == 1) {
    return (
      <Fragment>
        <span className="inline-block w-[140px] font-poppins text-sm font-light text-gray-500">Bank Name:</span>
        <span>{paymentMethod.name}</span> <br />
        <span className="inline-block w-[140px] font-poppins text-sm font-light text-gray-500">Account Name:</span>
        <span>{paymentMethod.bankAccountName}</span> <br />
        <span className="inline-block w-[140px] font-poppins text-sm font-light text-gray-500">Account Number:</span>
        <span>{paymentMethod.bankAccountNumber}</span> <br />
        {paymentMethod.routingNumber && (
          <Fragment>
            <span className="inline-block w-[140px] font-poppins text-sm font-light text-gray-500">
              Routing Number:
            </span>
            <span>{paymentMethod.routingNumber}</span> <br />
          </Fragment>
        )}
        {paymentMethod.swiftCode && (
          <Fragment>
            <span className="inline-block w-[140px] font-poppins text-sm font-light text-gray-500">SWIFT Code:</span>{" "}
            <span>{paymentMethod.swiftCode}</span> <br />
          </Fragment>
        )}
        {paymentMethod.additionalInfo && (
          <Fragment>
            <span className="inline-block w-[140px] font-poppins text-sm font-light text-gray-500">
              Additional Info:
            </span>
            <span className="font-dosis text-lg">{paymentMethod.additionalInfo}</span> <br />
          </Fragment>
        )}
      </Fragment>
    );
  }

  if (paymentMethod.type == 2) {
    return (
      <Fragment>
        <span className="inline-block w-[140px] font-poppins text-sm font-light text-gray-500">Wallet Service:</span>{" "}
        <span>{paymentMethod.name}</span> <br />
        <span className="inline-block w-[140px] font-poppins text-sm font-light text-gray-500">Account ID:</span>{" "}
        <span>{paymentMethod.accountId}</span> <br />
        {paymentMethod.additionalInfo && (
          <Fragment>
            <span className="inline-block w-[140px] font-poppins text-sm font-light text-gray-500">
              Additional Info:
            </span>{" "}
            <span className="font-dosis text-sm">{paymentMethod.additionalInfo}</span> <br />
          </Fragment>
        )}
      </Fragment>
    );
  }
}
