import { cn } from "@/libs/utils.ts";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { ProgressStatus } from "../constants";
import { getPayer, iamSellerOrBuyer } from "../utils";

export function ProgressStatusIndicator({
  dashCount = 6,
  status = ProgressStatus.PENDING,
  gap = 0.25,
}: {
  dashCount?: number;
  status?: ProgressStatus;
  gap?: number;
}) {
  gap = status === ProgressStatus.COMPLETED ? 0 : gap;
  return (
    <div className="flex h-full items-center">
      <div className="relative flex h-full flex-col" style={{ gap: `${gap}rem` }}>
        {Array.from({ length: dashCount }).map((_, index) => (
          <div
            key={index}
            className={cn("w-[2px] flex-1 bg-gray-600", {
              "h-full": status != ProgressStatus.COMPLETED,
              "bg-gray-400": status === ProgressStatus.IN_PROGRESS,
              "bg-green-500": status === ProgressStatus.COMPLETED,
            })}
          />
        ))}
      </div>
      {status == ProgressStatus.PENDING && (
        <div className="absolute -left-[3px] z-10 h-[6px] w-[6px] animate-pulse rounded-full border-2 bg-onyx outline outline-offset-2" />
      )}

      {status === ProgressStatus.COMPLETED && (
        <CheckCircle2 className="absolute -left-[6.5px] z-10 h-[15px] w-[15px] rounded-full bg-onyx text-green-400" />
      )}
    </div>
  );
}

/**
 * Get the swap progress
 * @param order - The swap order
 * @param address - The user's address
 * @returns The swap progress
 */
export function getSwapProgress(order?: Swap, address?: string) {
  if (!order || !address) return [];
  const progress = [];
  const payer = getPayer(order);
  const isPayer = address == payer;
  const isProvider = address == order.provider;
  const paymentStatus = order.paid ? ProgressStatus.COMPLETED : ProgressStatus.PENDING;
  const counterpartCap = iamSellerOrBuyer(order, address, true, true);
  const counterpartNonCap = iamSellerOrBuyer(order, address, true);

  progress.push({
    status: paymentStatus,
    label:
      paymentStatus != ProgressStatus.COMPLETED
        ? isPayer
          ? !isProvider
            ? "Send payment to the buyer"
            : "Send payment to the seller"
          : isProvider
            ? "Waiting for payment from the seller"
            : "Waiting for payment from the buyer"
        : // -- status = completed
          isPayer
          ? !isProvider
            ? "You marked the order as 'paid'"
            : "You marked the order as 'paid'"
          : isProvider
            ? `${counterpartCap} marked the order as 'paid'`
            : `${counterpartCap} marked the order as 'paid'`,

    description:
      paymentStatus != ProgressStatus.COMPLETED ? (
        isPayer ? (
          !isProvider ? (
            "Tap 'Paid' after making payment to the buyer"
          ) : (
            "Send payment using the payment detail provided above"
          )
        ) : isProvider ? (
          `${iamSellerOrBuyer(order, address, true)} will mark the order as 'paid' when they have paid`
        ) : (
          <span className="flex items-center gap-1 text-yellow-400">
            <AlertTriangle className="h-3 w-3" /> Confirm payment receipt before marking as paid
          </span>
        )
      ) : // -- status = completed
      isPayer ? (
        !isProvider ? (
          `Waiting for ${counterpartNonCap} to verify payment`
        ) : (
          ""
        )
      ) : isProvider ? (
        <span>Waiting for you to confirm payment with your bank or wallet service</span>
      ) : (
        ""
      ),
  });

  if (order.paid) {
    progress.push({
      status: !order.released ? ProgressStatus.PENDING : ProgressStatus.COMPLETED,
      label: !order.released
        ? isPayer
          ? `Waiting for ${counterpartNonCap} to release the order`
          : "Release the order"
        : isPayer
          ? "Order released"
          : "Order released",
      description: !order.released
        ? isPayer
          ? ""
          : "Complete the swap by releasing the order"
        : isPayer
          ? `${counterpartCap} has released the order`
          : "",
    });
  }

  return progress;
}
