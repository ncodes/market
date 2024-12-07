import { Button } from "@/components/ui/button.tsx";
import { ConnectButton } from "@/hooks/connectors/components/ConnectButton.tsx";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { cn } from "@/libs/utils.ts";
import { AlertTriangle, Loader2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { ConfirmDialog } from "../../../../components/ConfirmDialog";
import LinkAccountButton from "../../../../components/header/LinkAccountButton";
import { useSession } from "../../../../hooks/useSession";
import { getPayer, isOrderRouter, isSwapCounterparty } from "../../utils";
import { hasLastRouterPaid } from "./progress";
import { SwapOrderState } from "./useSwapOrderLogic";

const defaultState = {
  openAppealConfirmModal: false,
};

export function OrderAction({
  order,
  swapOrderState,
  container,
  markAsPaid,
  release,
  cancel,
  markRouteAsPaid,
  setSwapOrderState,
}: {
  order: Swap;
  swapOrderState: SwapOrderState;
  container: React.RefObject<HTMLDivElement>;
  markAsPaid: () => Promise<void>;
  release: () => Promise<void>;
  cancel: () => Promise<void>;
  markRouteAsPaid: (requestId: bigint, routeId: bigint) => Promise<void>;
  setSwapOrderState: React.Dispatch<React.SetStateAction<SwapOrderState>>;
}) {
  const [state, setState] = useState({ ...defaultState });
  const { address, ready, chainInfo } = useConnectorContext();
  const { token } = useSession();
  const payer = getPayer(order);
  const lastRouterPaid = hasLastRouterPaid(order);
  const isRouter = isOrderRouter(order, address);
  const expired = !order.paid && moment(order.cancelAt).isBefore(moment());
  const isTimeToAppeal = moment(order.disputeFrom).isBefore(moment());
  const counterpartyCanAppeal = !!token && order.paid && isTimeToAppeal && !order.appeal;
  const routerCanAppeal = isRouter && !!token && !isRoutePaid() && order.paid && isTimeToAppeal && !order.appeal;
  const canRouterMarkPaid = isRouter && !isRoutePaid() && order.paid && !!token;

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
    <div className="w-full">
      <div className={cn("w-full border-t border-gray-800/50 px-1")}>
        {isSwapCounterparty(order, address) && !expired && (
          <div className="flex w-full flex-col gap-2">
            {!!token && ready && payer == address && !order.paid && !order.cancelled && (
              <div className="flex w-full flex-col gap-2 py-2">
                <Button
                  className={cn(
                    "w-full rounded-2xl bg-yellow-400/90 text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-yellow-400",
                    "disabled:bg-alice-blue/90 disabled:text-black disabled:hover:bg-alice-blue",
                  )}
                  disabled={swapOrderState.loading.markAsPaid || order.paid}
                  onClick={markAsPaid}
                >
                  {!swapOrderState.loading.markAsPaid && "Paid"}
                  {swapOrderState.loading.markAsPaid && <Loader2 className="h-5 w-5 animate-spin" />}
                </Button>
              </div>
            )}

            {!!token &&
              ready &&
              payer != address &&
              !order.released &&
              !order.cancelled &&
              (!order.payRouterRequest || lastRouterPaid) && (
                <div className="flex w-full flex-col gap-2 py-2">
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
                    disabled={!order.paid || swapOrderState.loading.release}
                    onClick={release}
                  >
                    {!swapOrderState.loading.release && "Release"}
                    {swapOrderState.loading.release && <Loader2 className="h-5 w-5 animate-spin" />}
                  </Button>
                </div>
              )}

            {!ready && (
              <div className="flex w-full flex-col gap-2">
                <ConnectButton
                  connectBtnText="Connect wallet"
                  renderNullOnConnect={true}
                  className="h-auto w-full rounded-2xl bg-light-green/60 py-3 text-xl font-medium text-[#c3faad] animate-in fade-in-30 hover:scale-[1.01] hover:bg-light-green/65"
                />
              </div>
            )}

            {counterpartyCanAppeal && (
              <div className="flex w-full flex-col gap-2 py-2">
                <AppealBtn state={state} setState={setState} setSwapOrderState={setSwapOrderState} />
              </div>
            )}

            {!token && ready && !order.released && (
              <div className="flex w-full flex-col gap-2 py-2">
                <LinkWalletBtn setSwapOrderState={setSwapOrderState} swapOrderState={swapOrderState} />
              </div>
            )}
          </div>
        )}

        {isRouter && (
          <div className="flex w-full flex-col gap-2 pb-2">
            {canRouterMarkPaid && (
              <div className="mt-3 flex w-full flex-col gap-2 pt-2">
                <p className="text-center text-xs font-light tracking-wider text-boulder">
                  Tap "Paid" once you have sent the payment
                </p>
                <Button
                  className={cn(
                    "w-full rounded-2xl bg-yellow-400/90 text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-yellow-400",
                    "disabled:bg-alice-blue/90 disabled:text-black disabled:hover:bg-alice-blue",
                  )}
                  disabled={swapOrderState.loading.markRouteAsPaid}
                  onClick={doMarkRequestAsPaid}
                >
                  {!swapOrderState.loading.markRouteAsPaid && "Paid"}
                  {swapOrderState.loading.markRouteAsPaid && <Loader2 className="h-5 w-5 animate-spin" />}
                </Button>
              </div>
            )}

            {routerCanAppeal && (
              <div className="flex w-full flex-col gap-2">
                <AppealBtn state={state} setState={setState} setSwapOrderState={setSwapOrderState} />
              </div>
            )}

            {!token && (
              <div className="flex w-full flex-col gap-2 py-2">
                <LinkWalletBtn setSwapOrderState={setSwapOrderState} swapOrderState={swapOrderState} />
              </div>
            )}
          </div>
        )}

        {((!isSwapCounterparty(order, address) && !isRouter) || (order.released && (!isRouter || isRoutePaid()))) && (
          <div className="flex w-full flex-col gap-2 py-2">
            {!ready && (
              <div className="flex w-full flex-col gap-2">
                <ConnectButton
                  connectBtnText="Connect wallet"
                  renderNullOnConnect={true}
                  className="h-auto w-full rounded-2xl bg-light-green/60 py-2 text-xl font-medium text-[#c3faad] animate-in fade-in-30 hover:scale-[1.01] hover:bg-light-green/65"
                />
              </div>
            )}

            {ready && (
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
            )}
          </div>
        )}

        {ready &&
          isOrderCancellable(order) &&
          !order.cancelled &&
          !order.released &&
          !order.paid &&
          isSwapCounterparty(order, address) && (
            <div className="flex w-full flex-col gap-2 pb-2">
              <Button
                variant="ghost"
                className="rounded-2xl hover:scale-[1.01]"
                disabled={swapOrderState.loading.cancel}
                onClick={cancel}
              >
                {!swapOrderState.loading.cancel && "Cancel"}
                {swapOrderState.loading.cancel && (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </span>
                )}
              </Button>
            </div>
          )}

        {!!order.appeal && !!token && (
          <div className="flex w-full flex-col gap-2 pb-2">
            <Button
              variant="outline"
              className={cn(
                "w-full rounded-2xl border-yellow-500/30 bg-eerie-black text-lg font-medium text-yellow-500 duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:text-yellow-400",
              )}
              onClick={() => {
                setSwapOrderState((prev) => ({ ...prev, drawerContent: "appeal-centre", openDrawer: true }));
              }}
            >
              Open Appeal Centre
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function LinkWalletBtn({
  setSwapOrderState,
  swapOrderState,
}: {
  setSwapOrderState: React.Dispatch<React.SetStateAction<SwapOrderState>>;
  swapOrderState: SwapOrderState;
}) {
  return (
    <LinkAccountButton
      onLoading={(loading) =>
        setSwapOrderState((prev) => ({ ...prev, loading: { ...prev.loading, linkingWallet: loading } }))
      }
    >
      <Button
        variant="secondary"
        className={cn(
          "w-full rounded-2xl text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-gray-200",
          "disabled:bg-alice-blue/90 disabled:text-black disabled:hover:bg-alice-blue",
          {},
        )}
        disabled={swapOrderState.loading.linkingWallet}
      >
        {!swapOrderState.loading.linkingWallet && "Link Wallet"}
        {swapOrderState.loading.linkingWallet && (
          <span className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
          </span>
        )}
      </Button>
    </LinkAccountButton>
  );
}

function AppealBtn({
  state,
  setState,
  setSwapOrderState,
}: {
  state: { openAppealConfirmModal: boolean };
  setState: React.Dispatch<React.SetStateAction<{ openAppealConfirmModal: boolean }>>;
  setSwapOrderState: React.Dispatch<React.SetStateAction<SwapOrderState>>;
}) {
  return (
    <ConfirmDialog
      open={state.openAppealConfirmModal}
      tip=""
      title="Want to start an appeal?"
      description="An appeal will extend the time to order completion by at least 48 hours. Proceed if you are sure there is no progress on the swap."
      confirmBtnText="Create Appeal"
      cancelBtnText="Cancel"
      cancelBtnVariant="ghost"
      cancelBtnClassName="hover:bg-transparent hover:text-gray-300"
      triggerClassName="w-full"
      confirmBtnVariant="secondary"
      confirmBtnClassName="text-black"
      onOpenChange={(open) => {
        setState((prev) => ({ ...prev, openAppealConfirmModal: open }));
      }}
      onConfirm={() => {
        setSwapOrderState((prev: SwapOrderState) => ({
          ...prev,
          drawerContent: "create-appeal",
          openDrawer: true,
        }));
        setState((prev) => ({ ...prev, openAppealConfirmModal: false }));
      }}
    >
      <Button variant="ghost" className="w-full rounded-2xl hover:scale-[1.01]">
        Appeal
      </Button>
    </ConfirmDialog>
  );
}

function isOrderCancellable(order: Swap) {
  return moment(order.cancelAt).isBefore(moment());
}
