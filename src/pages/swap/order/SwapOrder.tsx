import { Button } from "@/components/ui/button.tsx";
import { Card, CardFooter } from "@/components/ui/card.tsx";
import { ConnectButton } from "@/hooks/connectors/components/ConnectButton.tsx";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { cn } from "@/libs/utils.ts";
import { AlertTriangle, InfoIcon, Loader2, TagIcon } from "lucide-react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "../../../components/avatar/Avatar";
import EmojiAvatar from "../../../components/avatar/EmojiAvatar";
import { AvatarSize } from "../../../components/avatar/useAvatar";
import LinkAccountButton from "../../../components/header/LinkAccountButton";
import { ToolTip } from "../../../components/toolTip";
import { Label } from "../../../components/ui/label";
import { useSession } from "../../../hooks/useSession";
import { formatToHighDenom, shortenAddress, toDec, trimZeros } from "../../../libs/helpers";
import { getPayer, iamSellerOrBuyer, isSwapCounterparty, isSynthetic } from "../utils";
import { PaymentDetails } from "./PaymentDetails";
import { ProgressStatusIndicator, getSwapProgress } from "./Progress";
import { SwapPaymentAmount } from "./SwapPaymentAmount";
import { useSwapOrderLogic } from "./useSwapOrderLogic";

export function SwapOrder() {
  const { orderId } = useParams();
  const { order, markAsPaid, release, state, setState } = useSwapOrderLogic(orderId);
  const { ready, address, chainInfo } = useConnectorContext();
  const { token } = useSession();
  const swapSectionRef = useRef<HTMLDivElement | null>(null);

  if (!order) return null;

  const market = order.market;
  let { amount: orderAmt } = order;
  const payer = getPayer(order);

  if (isSynthetic(market.quoteType)) {
    orderAmt = toDec(orderAmt).sub(order.protocolFee).sub(order.marketCreatorFee).toFixed();
  }

  return (
    <div className="relative mx-auto mt-10 flex w-[600px] flex-col overflow-hidden rounded-b-3xl">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-lg font-normal tracking-wider">
          <span className="text-gray-500">Swap {">"} </span>
          <span className="text-gray-200">Order #{orderId}</span>
        </h1>
      </div>
      <Card
        ref={swapSectionRef}
        className={cn(
          "min-h-[200px] w-full rounded-3xl border border-gray-800/50 bg-gradient-to-b from-mirage to-onyx p-4 pb-0 text-gray-300",
        )}
      >
        <div className="space-y-5">
          <div className="flex gap-10">
            {/* Base */}
            <div className="flex min-w-[140px] items-center gap-2">
              <Avatar
                src={order?.market.baseLogo as string}
                fallback={order?.base}
                className="h-8 w-8"
                fallbackClassName="h-8 w-8 text-xs"
              />
              <div>
                <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder/70">
                  <span>Buy</span>
                  <span>
                    <ToolTip
                      tip={`The amount of base asset to be bought by the seller. Also the amount of base asset the buyer is offering.`}
                      className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                    >
                      <InfoIcon className="h-4 w-4" />
                    </ToolTip>
                  </span>
                </p>
                <p className="font-dosis text-lg font-semibold tracking-wider">
                  {formatToHighDenom(orderAmt as string, order?.market.baseDecimals)}{" "}
                  <span className="text-gray-400">{order?.base}</span>
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="flex min-w-[140px] items-center gap-2">
              <Avatar
                src={order?.market.quoteLogo as string}
                fallback={order?.quote}
                className="h-8 w-8"
                fallbackClassName="h-8 w-8 text-xs"
              />
              <div>
                <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder/70">
                  <span>Sell</span>
                  <span>
                    <ToolTip
                      tip={`The amount of quote asset to be sold by the seller. Also the amount of quote asset the buyer is buying.`}
                      className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                    >
                      <InfoIcon className="h-4 w-4" />
                    </ToolTip>
                  </span>
                </p>
                <p className="font-dosis text-lg font-semibold tracking-wider">
                  {trimZeros(toDec(order.cost).toFixed(6))} <span className="text-gray-400">{order?.quote}</span>
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="flex min-w-[140px] items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
                <TagIcon className="h-5 w-5 text-gray-100" />
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder/70">
                  <span>Price</span>
                  <span>
                    <ToolTip
                      tip={`The price of 1 BASE token.`}
                      className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                    >
                      <InfoIcon className="h-4 w-4" />
                    </ToolTip>
                  </span>
                </p>
                <p className="font-dosis text-lg font-semibold tracking-wider">
                  {formatToHighDenom(order.price, order?.market.quoteDecimals)}{" "}
                  <span className="text-gray-400">{order?.quote}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Swapper & Provider info */}
          <div className="flex gap-10 border-t border-gray-800/50 pt-5">
            <div className="flex min-w-[130px] items-center gap-2">
              <EmojiAvatar randomStr={order.taker} size={AvatarSize.Small} className="h-10 w-10" />
              <div>
                <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder/70">
                  <span>Seller</span>
                  <span>
                    <ToolTip
                      tip={`The address of the seller or taker. The seller sells quote token for base token.`}
                      className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                    >
                      <InfoIcon className="h-4 w-4" />
                    </ToolTip>
                  </span>
                  {order.taker == address && (
                    <span className="rounded bg-gray-700 px-1 text-[10px] font-bold text-gray-100">YOU</span>
                  )}
                </p>
                <p className="text-xs font-normal tracking-wider text-gray-400">{shortenAddress(order.taker)} </p>
              </div>
            </div>
            <div className="flex min-w-[130px] items-center gap-2">
              <EmojiAvatar randomStr={order.provider} size={AvatarSize.Small} className="h-10 w-10" />
              <div>
                <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder/70">
                  <span>Buyer</span>
                  <span>
                    <ToolTip
                      tip={`The address of buyer or liquidity provider. The buyer buys quote token with base token.`}
                      className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                    >
                      <InfoIcon className="h-4 w-4" />
                    </ToolTip>
                  </span>
                  {order.provider == address && (
                    <span className="rounded bg-gray-700 px-1 text-[10px] font-bold text-gray-100">YOU</span>
                  )}
                </p>
                <p className="text-xs font-normal tracking-wider text-gray-400">{shortenAddress(order.provider)}</p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          {isSwapCounterparty(order, address) && (
            <div className="min-h-[100px] border-t border-gray-800/50 pt-3">
              <Label className="flex items-center gap-2 text-lg tracking-wider">
                <span>
                  {!order.released
                    ? payer == address
                      ? "Send Payment to"
                      : "Payment will be sent to:"
                    : "Payment Details"}
                </span>
                <span>
                  <ToolTip
                    tip={
                      payer == address
                        ? `Send payment to the ${iamSellerOrBuyer(order, address, true)} to complete the swap.`
                        : `The ${iamSellerOrBuyer(order, address, true)} will send payment to you using this payment method.`
                    }
                    className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                  >
                    <InfoIcon className="h-4 w-4" />
                  </ToolTip>
                </span>
              </Label>
              {!!token && (
                <div className="mt-3 min-h-[100px] rounded-xl border border-gray-800/50 bg-eerie-black p-4 font-dosis tracking-wider text-gray-300">
                  {<PaymentDetails order={order} />}
                  <div className="mt-2 flex items-center gap-1 border-t border-gray-800/50 pt-2">
                    <span className="inline-block w-[140px] font-poppins text-sm font-light text-gray-500">
                      Amount:
                    </span>
                    <span className="font-dosis text-lg font-semibold text-screaming-green">
                      <SwapPaymentAmount order={order} address={address} />
                    </span>
                    <ToolTip
                      tip={
                        payer == address
                          ? `The exact amount you are are expected to send to the ${iamSellerOrBuyer(order, address, true)}.`
                          : `The exact amount you are expected to receive from the ${iamSellerOrBuyer(order, address, true)}.`
                      }
                      className="ml-1 text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                    >
                      <InfoIcon className="h-4 w-4" />
                    </ToolTip>
                  </div>
                </div>
              )}

              {!token && (
                <div className="mt-3 flex min-h-[50px] items-center justify-center gap-2 rounded-xl border border-yellow-800/30 bg-yellow-500/10 p-4 tracking-wider text-gray-300">
                  <InfoIcon className="h-5 w-5 text-yellow-300" />
                  <p className="text-sm">
                    {payer == address &&
                      order.taker == address &&
                      "Link your wallet to Swop to reveal the buyer's payment details"}
                    {payer != address &&
                      order.provider == address &&
                      "Link your wallet to Swop to reveal the payment details"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Progress */}
          {isSwapCounterparty(order, address) && (
            <div className="flex min-h-[100px] flex-col gap-3 border-t border-gray-800/50 py-3 pb-0">
              <Label className="flex items-center gap-2 text-lg tracking-wider">
                <span>Progress</span>
                <span>
                  <ToolTip
                    tip={`Track the progress of the swap from start to finish.`}
                    className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                  >
                    <InfoIcon className="h-4 w-4" />
                  </ToolTip>
                </span>
              </Label>
              <div className="flex flex-col">
                {getSwapProgress(order, address).map((step, index) => (
                  <div key={index} className="relative flex h-[50px] items-center gap-5 tracking-wider">
                    <ProgressStatusIndicator status={step.status} />
                    <div className="flex flex-col">
                      <span>{step.label}</span>
                      <span className="text-xs text-gray-500">{step.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <CardFooter className="flex flex-col p-4 px-0 pt-0">
          {isSwapCounterparty(order, address) && (
            <div className="w-full">
              {!!token && ready && payer == address && !order.paid && (
                <div className="flex w-full flex-col gap-2 border-t border-gray-800/50 pt-5">
                  <Button
                    className={cn(
                      "h-[55px] w-full rounded-2xl bg-yellow-400/90 text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-yellow-400",
                      "disabled:bg-alice-blue/90 disabled:text-black disabled:hover:bg-alice-blue",
                    )}
                    disabled={state.loading.markAsPaid || order.paid}
                    onClick={markAsPaid}
                  >
                    {!state.loading.markAsPaid && "Paid"}
                    {state.loading.markAsPaid && <Loader2 className="h-5 w-5 animate-spin" />}
                  </Button>
                </div>
              )}

              {!!token && ready && payer != address && !order.released && (
                <div className="flex w-full flex-col gap-2 border-t border-gray-800/50 pt-5">
                  {order.paid && (
                    <div className="flex items-center justify-center gap-2 rounded-lg bg-yellow-900/30 p-2 text-yellow-400">
                      <AlertTriangle className="h-4 w-4 text-yellow-300" />
                      <span className="text-sm tracking-wider">
                        Please confirm payment receipt before releasing the order
                      </span>
                    </div>
                  )}

                  <Button
                    className={cn(
                      "h-[55px] w-full rounded-2xl bg-light-green/90 text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-light-green",
                      "disabled:bg-alice-blue/90 disabled:text-black disabled:hover:bg-alice-blue",
                      {},
                    )}
                    disabled={!order.paid || state.loading.release}
                    onClick={release}
                  >
                    {!state.loading.release && "Release"}
                    {state.loading.release && <Loader2 className="h-5 w-5 animate-spin" />}
                  </Button>
                </div>
              )}

              {!ready && (
                <div className="flex w-full flex-col gap-2 border-t border-gray-800/50 pt-5">
                  <ConnectButton
                    connectBtnText="Connect wallet"
                    renderNullOnConnect={true}
                    className="h-auto w-full rounded-2xl bg-light-green/30 py-3 text-xl font-medium text-[#AAFA8A] animate-in fade-in-30 hover:scale-[1.01] hover:bg-light-green hover:bg-light-green/35"
                  />
                </div>
              )}

              {!token && ready && !order.released && (
                <div className="flex w-full flex-col gap-2 border-t border-gray-800/50 pt-5">
                  <LinkAccountButton
                    onLoading={(loading) =>
                      setState((prev) => ({ ...prev, loading: { ...prev.loading, linkingWallet: loading } }))
                    }
                  >
                    <Button
                      variant="secondary"
                      className={cn(
                        "h-[55px] w-full rounded-2xl text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-gray-200",
                        "disabled:bg-alice-blue/90 disabled:text-black disabled:hover:bg-alice-blue",
                        {},
                      )}
                      disabled={state.loading.linkingWallet}
                      onClick={() => {}}
                    >
                      {!state.loading.linkingWallet && "Link Wallet"}
                      {state.loading.linkingWallet && (
                        <span className="flex items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin" />
                        </span>
                      )}
                    </Button>
                  </LinkAccountButton>
                </div>
              )}
            </div>
          )}

          {(!isSwapCounterparty(order, address) || order.released) && (
            <div className="mt-5 flex w-full flex-col gap-2 border-t border-gray-800/50 pt-3">
              <Button
                variant="outline"
                className={cn(
                  "h-[55px] w-full rounded-2xl border-gray-800 bg-eerie-black text-lg font-medium duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:text-gray-100",
                )}
                onClick={() => {
                  window.open(`${chainInfo?.blockExplorer}/tx/${order.txHash}`, "_blank");
                }}
              >
                View Transaction
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
