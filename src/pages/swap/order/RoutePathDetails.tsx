import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { getCurrency, getShortName } from "@jointlabs/meta";
import { InfoIcon } from "lucide-react";
import EmojiAvatar from "../../../components/avatar/EmojiAvatar";
import { AvatarSize } from "../../../components/avatar/useAvatar";
import { ToolTip } from "../../../components/toolTip";
import { useSession } from "../../../hooks/useSession";
import { toDec, toHD, trimZeros } from "../../../libs/helpers";
import { calculateRoutesFee2, convertCurrency, getPayer, isSellerOrBuyer, isSynth } from "../utils";
import { PaymentInfo } from "./PaymentDetails";

export function RoutePathDetails({ order }: { order: Swap }) {
  const { address } = useConnectorContext();
  const { token } = useSession();
  const { market, provider, providerPaymentMethod, taker, takerPaymentMethod, cost, amount, rates } = order;

  // Route Details
  const routes = order.payRouterRequest?.routes ?? [];
  const routeFees = order.payRouterRequest?.routeFees || [];
  const route = routes?.find((route) => route.owner == address);
  if (!route) return null;
  const routeIdx = routes?.findIndex((route) => route.owner == address) ?? 0;
  const isLastRoute = routeIdx == routes.length - 1;
  const routeFee = routeFees[routeIdx];
  const totalRouteFees = calculateRoutesFee2(routeFees || [], routeIdx);
  const totalOrderFees = toDec(order.protocolFee).add(order.marketCreatorFee);
  const totalPrevFees = calculateRoutesFee2((routeFees || []).slice(0, routeIdx), 0);
  const payer = getPayer(order);
  const payee = payer == provider ? taker : provider;
  const payerPaymentMethod = payer == provider ? providerPaymentMethod : takerPaymentMethod;

  // The amount that will attract fee (swap amount or cost)
  const chargableAmt = isSynth(market.quoteType) ? toHD(amount, market.baseDecimals) : cost;
  let orderAmtAfterFees = "0";
  if (isSynth(market.quoteType)) {
    orderAmtAfterFees = toDec(chargableAmt)
      .div(toDec(1).minus(toDec(totalRouteFees).div(100)))
      .toFixed(6);
  } else {
    const totalFeesHD = toHD(totalOrderFees, market.quoteDecimals);
    orderAmtAfterFees = toDec(chargableAmt)
      .minus(totalFeesHD)
      .mul(toDec(1).minus(toDec(totalPrevFees).div(100)))
      .toFixed(6);
  }

  // Source Details
  const srcAddr = routeIdx == 0 ? (payer == provider ? provider : taker) : routes[routeIdx - 1]?.owner;
  const srcLabel = routeIdx == 0 ? isSellerOrBuyer(order, payer, false, true) : `Router #${routeIdx - 1}`;
  const srcAmt = orderAmtAfterFees;
  const srcPayMethod =
    routeIdx == 0
      ? payer == provider
        ? providerPaymentMethod
        : takerPaymentMethod
      : routes[routeIdx - 1]?.paymentMethod;
  const srcSymbol = getCurrency(route?.paymentMethod?.name || "");
  const srcAmtConv = token
    ? routeIdx == 0
      ? srcAmt
      : convertCurrency(srcAmt, getCurrency(routes[routeIdx - 1].paymentMethod.name!)!, srcSymbol!, rates)
    : "0";

  // Destination Details
  const destLabel = isLastRoute ? isSellerOrBuyer(order, payer, true, true) : `Router #${routeIdx + 1}`;
  const destAmt = toDec(srcAmt).sub(toDec(srcAmt).mul(toDec(routeFee).div(100)));
  const destPaymentMethod = isLastRoute
    ? payee == provider
      ? providerPaymentMethod
      : takerPaymentMethod
    : routes[routeIdx + 1]?.paymentMethod;
  const destSymbol = getCurrency(destPaymentMethod?.name || "");
  const destAmtConv = token
    ? convertCurrency(destAmt, getCurrency(payerPaymentMethod?.name || "")!, destSymbol!, rates)
    : "";

  return (
    <div className="py border-t border-gray-800/50 py-2">
      {!token && (
        <div className="mx-3 flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-yellow-800/30 bg-yellow-500/10 p-4 tracking-wider text-gray-300">
          <InfoIcon className="h-5 w-5 text-yellow-300" />
          <p className="text-sm">Link your wallet to Swop to reveal the payment details</p>
        </div>
      )}

      {token && (
        <>
          {/* Receiving From */}
          <div className="flex items-center gap-2 px-3 py-1">
            <p className="text-lg tracking-wider">You Receive From</p>
            <span className="text-gray-700 transition-all duration-300 hover:text-gray-500">
              <ToolTip tip="The payment that will be sent to your source bank or wallet account.">
                <InfoIcon className="h-4 w-4" />
              </ToolTip>
            </span>
          </div>

          <div className="mt-2 flex items-center gap-5 px-4">
            <div className="flex min-w-[145px] items-center gap-2">
              <EmojiAvatar randomStr={srcAddr} size={AvatarSize.Small} className="h-10 w-10" />
              <div>
                <p className="flex items-center gap-1 text-sm font-normal tracking-wide text-gray-400">
                  <span>{srcLabel}</span>
                </p>
                <p className="text-xs font-normal tracking-wider text-gray-500">
                  <ToolTip tip={srcPayMethod?.name ?? ""}>{getShortName(srcPayMethod?.name ?? "")}</ToolTip> →{" "}
                  <ToolTip tip={route?.paymentMethod?.name ?? ""}>
                    {getShortName(route?.paymentMethod?.name ?? "")}
                  </ToolTip>
                </p>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="flex items-center gap-1 text-sm text-boulder">
                <span>Amount</span>
                <ToolTip
                  className="text-gray-600 hover:text-gray-400"
                  tip="The amount you will receive in your source bank or wallet account."
                >
                  <InfoIcon className="h-3 w-3" />
                </ToolTip>
              </span>
              <span className="font-dosis text-lg font-bold tracking-wider text-gray-300">
                {trimZeros(srcAmtConv)} <span className="text-gray-400">{srcSymbol}</span>
              </span>
            </div>
          </div>

          {/* Sending To */}
          <div className="mx-1 mt-4 rounded-xl border border-green-800/40 bg-light-green/5 px-3 py-1 pb-2">
            <div className="flex items-center gap-2 py-1">
              <p className="text-lg tracking-wider">You Send To</p>
              <span className="text-gray-700 transition-all duration-300 hover:text-gray-500">
                <ToolTip tip="The destination bank or wallet account where the source amount will be transferred.">
                  <InfoIcon className="h-4 w-4" />
                </ToolTip>
              </span>
            </div>

            <div className="px mt-1 flex items-center gap-5">
              <div className="flex min-w-[145px] items-center gap-2">
                <EmojiAvatar
                  randomStr={isLastRoute ? payee : routes[routeIdx + 1].owner}
                  size={AvatarSize.Small}
                  className="h-10 w-10"
                />
                <div>
                  <p className="flex items-center gap-2 text-sm font-normal tracking-wide text-gray-400">
                    <span>{destLabel}</span>
                  </p>
                  <p className="text-xs font-normal tracking-wider text-gray-500">
                    <ToolTip tip={route?.paymentMethod?.name ?? ""}>
                      {getShortName(route?.paymentMethod?.name ?? "")}
                    </ToolTip>{" "}
                    →{" "}
                    <ToolTip tip={destPaymentMethod?.name ?? ""}>{getShortName(destPaymentMethod?.name ?? "")}</ToolTip>
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center gap-1 text-sm text-boulder">
                  <span>Amount</span>
                  <ToolTip tip="The exact amount you will send to the destination bank or wallet account.">
                    <InfoIcon className="h-3 w-3" />
                  </ToolTip>
                </span>
                <span className="font-dosis text-lg font-bold tracking-wider text-light-green">
                  {trimZeros(destAmtConv)} <span className="text-gray-400">{destSymbol}</span>
                </span>
              </div>
            </div>

            <div className="mt-3 border-t border-gray-800 pt-3 font-dosis text-sm tracking-wider">
              <PaymentInfo paymentMethod={destPaymentMethod} className="!min-w-[165px]" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
