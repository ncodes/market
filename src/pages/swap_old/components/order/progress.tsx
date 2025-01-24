import { ProgressStatus } from "../../common/constants";
import { getAppealerStr, getPayer, isOrderExpired, isOrderRouter, isSellerOrBuyer } from "../../common/utils";

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
  const counterpartCap = isSellerOrBuyer(order, address, true, true);
  const counterpartNonCap = isSellerOrBuyer(order, address, true);
  const hasRouter = !!order.payRouterRequest;
  const isRouter = isOrderRouter(order, address);
  const isFirstRouter = isRouter && order.payRouterRequest?.routes?.[0]?.owner == address;
  const releaser = payer == order.provider ? order.taker : order.provider;
  const paid = order.paid;

  if (!order.cancelled && !isRouter) {
    progress.push({
      status: paymentStatus,
      label:
        paymentStatus != ProgressStatus.COMPLETED
          ? isPayer
            ? `Send payment to ${hasRouter ? "router #0" : `the ${counterpartNonCap}`}`
            : `Waiting for ${counterpartNonCap} to pay`
          : isPayer
            ? `You have paid`
            : `${counterpartCap} has paid`,

      description:
        paymentStatus != ProgressStatus.COMPLETED
          ? isPayer
            ? !isProvider
              ? `Tap 'Paid' after making payment to ${hasRouter ? "router #0" : "the buyer"}.`
              : "Send payment using the payment details provided above."
            : isProvider
              ? `${counterpartCap} will mark the order as 'paid' when they have paid.`
              : `${counterpartCap} is expected to send payment to ${hasRouter ? "router #0" : "you"}.`
          : isPayer
            ? !paid
              ? `Waiting for the ${counterpartNonCap} to verify payment.`
              : `Waiting for the ${counterpartNonCap} to release the order.`
            : !hasRouter
              ? !paid
                ? `Waiting for you to confirm payment.`
                : `${counterpartCap} has marked the order as 'paid'.`
              : `Waiting to receive payment from router.`,
    });
  }

  if (!order.cancelled && isRouter) {
    const counterpartCap = isSellerOrBuyer(order, payer, false, true);
    const counterpart2NonCap = isSellerOrBuyer(order, payer, true);
    progress.push({
      status: paymentStatus,
      label:
        paymentStatus != ProgressStatus.COMPLETED
          ? `Waiting for payment from the ${isSellerOrBuyer(order, payer, false)}`
          : `${counterpartCap} has paid`,

      description:
        paymentStatus != ProgressStatus.COMPLETED
          ? `${counterpartCap} is expected to send payment ${hasRouter ? (isFirstRouter ? `to you` : `to router #0`) : `to the ${counterpart2NonCap}`}.`
          : `${counterpartCap} marked the order as 'paid'.`,
    });
  }

  if (hasRouter) {
    const countRouters = order.payRouterRequest.routeIds?.length ?? 0;
    for (let index = 0; index < (order.payRouterRequest.routes?.length ?? 0); index++) {
      const routes = order.payRouterRequest.routes;
      const route = routes[index];
      const routePaid = order.payRouterRequest.routePayments?.find((p) => p.routeId == route.id);
      const payee = payer == order.provider ? order.taker : order.provider;
      const counterpartNonCap = isSellerOrBuyer(order, payee, false);
      const whoiam = isSellerOrBuyer(order, address, false, false);

      progress.push({
        status: !routePaid ? ProgressStatus.PENDING : ProgressStatus.COMPLETED,
        label: !routePaid
          ? `Waiting for ${route.owner == address ? "you" : `Router #${index}`} to pay`
          : route.owner == address
            ? `You have 'paid'`
            : `Router #${index} has 'paid'`,
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
                : `Waiting for router #${index} to pay ${counterpartNonCap == whoiam ? "you" : `the ${counterpartNonCap}`}.`
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
            ? `Waiting for the ${counterpartNonCap} to release the order`
            : "Release the order"
          : isPayer
            ? "Order released"
            : "Order released",
        description: !order.released
          ? isPayer
            ? "The order will finalized once released."
            : "Complete the swap by releasing the order."
          : isPayer
            ? `${counterpartCap} has released the order. Swap has completed.`
            : "You released the order. Swap has completed.",
      });
    } else {
      const whoIsReleaser = isSellerOrBuyer(order, releaser, false, true);
      const whoIsReleaserNoCap = isSellerOrBuyer(order, releaser, false);
      progress.push({
        status: !order.released ? ProgressStatus.PENDING : ProgressStatus.COMPLETED,
        label: !order.released ? `Waiting for order release` : `Order released`,
        description: order.released
          ? `${whoIsReleaser} released the order.`
          : `Waiting for the ${whoIsReleaserNoCap} to release the order.`,
      });
    }
  }

  if (isOrderExpired(order)) {
    progress.push({
      status: ProgressStatus.DANGER,
      label: "Order Expired",
      description: `Order reached the cancel time without payment.`,
    });
  }

  if (order.cancelled) {
    progress.push({
      status: ProgressStatus.DANGER,
      label: "Order Cancelled",
      description: (order.finalizer == address ? "You" : `${counterpartCap}`) + " cancelled the order.",
    });
  }

  if (order.appeal) {
    progress.push({
      status: ProgressStatus.APPEALED,
      label: "Order Appealed",
      description: `${getAppealerStr(order)} requested an appeal. Our team will review it shortly.`,
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
