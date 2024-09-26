import { Button } from "@/components/ui/button.tsx";
import { ConnectButton } from "@/hooks/connectors/components/ConnectButton.tsx";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { cn } from "@/libs/utils.ts";
import { AlertTriangle, Loader2 } from "lucide-react";
import moment from "moment";
import LinkAccountButton from "../../../components/header/LinkAccountButton";
import { useSession } from "../../../hooks/useSession";
import { getPayer, isOrderRouter, isSwapCounterparty } from "../utils";
import { hasLastRouterPaid } from "./progress";
import { SwapOrderState } from "./useSwapOrderLogic";

export function OrderAction({
  order,
  state,
  markAsPaid,
  release,
  cancel,
  markRouteAsPaid,
  setState,
}: {
  order: Swap;
  state: SwapOrderState;
  markAsPaid: () => Promise<void>;
  release: () => Promise<void>;
  cancel: () => Promise<void>;
  markRouteAsPaid: (requestId: bigint, routeId: bigint) => Promise<void>;
  setState: React.Dispatch<React.SetStateAction<SwapOrderState>>;
}) {
  const { address, ready, chainInfo } = useConnectorContext();
  const { token } = useSession();
  const payer = getPayer(order);
  const lastRouterPaid = hasLastRouterPaid(order);
  const isRouter = isOrderRouter(order, address);

  function doMarkRequestAsPaid() {
    const routes = order.payRouterRequest?.routes ?? [];
    const route = routes?.find((route) => route.owner == address);
    if (!route) return;
    markRouteAsPaid(BigInt(order.payRouterRequest?.requestId), BigInt(route?.routeId));
  }

  function isRoutePaid() {
    const routes = order.payRouterRequest?.routes ?? [];
    const route = routes?.find((route) => route.owner == address);
    return order.payRouterRequest.routePayments.some((payment) => payment.routeId == route?.id);
  }

  return (
    <>
      {isSwapCounterparty(order, address) && (
        <div className="flex w-full flex-col gap-2 pt-2">
          {!!token && ready && payer == address && !order.paid && !order.cancelled && (
            <div className="mt-3 flex w-full flex-col gap-2 border-t border-gray-800/50 pt-2">
              <Button
                className={cn(
                  "w-full rounded-2xl bg-yellow-400/90 text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-yellow-400",
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

          {!!token &&
            ready &&
            payer != address &&
            !order.released &&
            !order.cancelled &&
            (!order.payRouterRequest || lastRouterPaid) && (
              <div className="flex w-full flex-col gap-2 border-t border-gray-800/50">
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
                    "w-full rounded-2xl bg-light-green/90 text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-light-green",
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
            <div className="flex w-full flex-col gap-2 border-t border-gray-800/50">
              <ConnectButton
                connectBtnText="Connect wallet"
                renderNullOnConnect={true}
                className="h-auto w-full rounded-2xl bg-light-green/30 py-3 text-xl font-medium text-[#AAFA8A] animate-in fade-in-30 hover:scale-[1.01] hover:bg-light-green hover:bg-light-green/35"
              />
            </div>
          )}

          {!token && ready && !order.released && (
            <div className="flex w-full flex-col gap-2 border-t border-gray-800/50">
              <LinkAccountButton
                onLoading={(loading) =>
                  setState((prev) => ({ ...prev, loading: { ...prev.loading, linkingWallet: loading } }))
                }
              >
                <Button
                  variant="secondary"
                  className={cn(
                    "w-full rounded-2xl text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-gray-200",
                    "disabled:bg-alice-blue/90 disabled:text-black disabled:hover:bg-alice-blue",
                    {},
                  )}
                  disabled={state.loading.linkingWallet}
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

      {isRouter && !isRoutePaid() && order.paid && (
        <div className="w-full pb-2">
          <div className="mt-3 flex w-full flex-col gap-2 border-t border-gray-800/50 pt-2">
            <p className="text-center text-xs font-light tracking-wider text-boulder">
              Tap "Paid" once you have sent the payment
            </p>
            <Button
              className={cn(
                "w-full rounded-2xl bg-yellow-400/90 text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-yellow-400",
                "disabled:bg-alice-blue/90 disabled:text-black disabled:hover:bg-alice-blue",
              )}
              disabled={state.loading.markRouteAsPaid}
              onClick={doMarkRequestAsPaid}
            >
              {!state.loading.markRouteAsPaid && "Paid"}
              {state.loading.markRouteAsPaid && <Loader2 className="h-5 w-5 animate-spin" />}
            </Button>
          </div>
        </div>
      )}

      {((!isSwapCounterparty(order, address) && !isRouter) || (order.released && (!isRouter || isRoutePaid()))) && (
        <div className="flex w-full flex-col gap-2 border-t border-gray-800/50 py-2">
          <Button
            variant="outline"
            className={cn(
              "w-full rounded-2xl border-gray-800 bg-eerie-black text-lg font-medium duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:text-gray-100",
            )}
            onClick={() => {
              window.open(`${chainInfo?.blockExplorer}/tx/${order.txHash}`, "_blank");
            }}
          >
            View Transaction
          </Button>
        </div>
      )}

      {ready &&
        isOrderCancellable(order) &&
        !order.cancelled &&
        !order.released &&
        !order.paid &&
        isSwapCounterparty(order, address) && (
          <div className="flex w-full flex-col gap-2 py-2">
            <Button
              variant="ghost"
              className="rounded-2xl bg-mirage/10 hover:scale-[1.01] hover:bg-baltic-sea/50 hover:text-gray-200"
              disabled={state.loading.cancel}
              onClick={cancel}
            >
              {!state.loading.cancel && "Cancel"}
              {state.loading.cancel && (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </span>
              )}
            </Button>
          </div>
        )}
    </>
  );
}

function isOrderCancellable(order: Swap) {
  return moment(order.cancelAt).isBefore(moment());
}
