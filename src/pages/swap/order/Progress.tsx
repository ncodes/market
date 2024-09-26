import { AlertTriangle } from "lucide-react";
import { ProgressStatus } from "../constants";
import { getPayer, iamSellerOrBuyer, isOrderRouter } from "../utils";

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
  const hasRouter = !!order.payRouterRequest;
  const isRouter = isOrderRouter(order, address);
  const releaser = payer == order.provider ? order.taker : order.provider;

  if (!order.cancelled && !isRouter) {
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
          : isPayer
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
              "Tap 'Paid' after making payment to the buyer."
            ) : (
              "Send payment using the payment detail provided above."
            )
          ) : isProvider ? (
            `${counterpartCap} will mark the order as 'paid' when they have paid.`
          ) : (
            <span className="flex items-center gap-1 text-yellow-400">
              <AlertTriangle className="h-3 w-3" /> Confirm payment receipt before marking as paid.
            </span>
          )
        ) : isPayer ? (
          !isProvider ? (
            `Waiting for ${counterpartNonCap} to verify payment.`
          ) : (
            ""
          )
        ) : isProvider ? (
          !hasRouter ? (
            <span>Waiting for you to confirm payment with your bank or wallet service.</span>
          ) : (
            <span>Waiting routers to route payment to you.</span>
          )
        ) : (
          ""
        ),
    });
  }

  if (hasRouter) {
    const countRouters = order.payRouterRequest.routeIds?.length ?? 0;
    for (let index = 0; index < (order.payRouterRequest.routes?.length ?? 0); index++) {
      const routes = order.payRouterRequest.routes;
      const route = routes[index];
      const routePaid = order.payRouterRequest.routePayments?.find((p) => p.routeId == route.id);
      const payee = payer == order.provider ? order.taker : order.provider;
      const counterpartNonCap = iamSellerOrBuyer(order, payee, false);

      progress.push({
        status: !routePaid ? ProgressStatus.PENDING : ProgressStatus.COMPLETED,
        label: !routePaid
          ? `Waiting for ${route.owner == address ? "you" : `Router #${index}`} to pay`
          : route.owner == address
            ? `You marked the route as 'paid'`
            : `Router #${index} has marked the route as 'paid'`,
        description:
          index < countRouters - 1
            ? !routePaid
              ? route.owner == address
                ? `Waiting for you to pay router #${index + 1}.`
                : `Waiting for router #${index} to pay ${routes[index + 1].owner == address ? `you` : `router #${index + 1}`}.`
              : route.owner == address
                ? `You have paid router #${index + 1}.`
                : `Router #${index} has paid ${routes[index + 1].owner == address ? `you. Please verify payment` : `router #${index + 1}`}.`
            : !routePaid
              ? route.owner == address
                ? `Waiting for you to pay the ${counterpartNonCap}.`
                : `Waiting for router #${index} to pay the ${counterpartNonCap}.`
              : route.owner == address
                ? `You paid the ${counterpartNonCap}.`
                : `Router #${index} has paid the ${counterpartNonCap}.`,
      });
    }
  }

  if ((order.paid && !hasRouter) || hasLastRouterPaid(order)) {
    if (!isRouter) {
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
            : "Complete the swap by releasing the order."
          : isPayer
            ? `${counterpartCap} has released the order.`
            : "You released the order. Swap has completed.",
      });
    } else {
      const whoIsReleaser = iamSellerOrBuyer(order, releaser, false, true);
      const whoIsReleaserNoCap = iamSellerOrBuyer(order, releaser, false);
      progress.push({
        status: !order.released ? ProgressStatus.PENDING : ProgressStatus.COMPLETED,
        label: !order.released ? `Waiting for order release` : `Order released`,
        description: order.released
          ? `${whoIsReleaser} released the order.`
          : `Waiting for ${whoIsReleaserNoCap} to release the order.`,
      });
    }
  }

  if (order.cancelled) {
    progress.push({
      status: ProgressStatus.CANCELLED,
      label: "Order Canncelled",
      description: (order.finalizer == address ? "You" : `${counterpartCap}`) + " cancelled the order.",
    });
  }

  return progress;
}

export function hasLastRouterPaid(order: Swap) {
  const countRouters = order.payRouterRequest?.routeIds?.length ?? 0;
  if (countRouters == 0) return false;
  const lastRouter = order.payRouterRequest.routes[countRouters - 1];
  return !!order.payRouterRequest.routePayments?.find((p) => p.routeId == lastRouter.id);
}
