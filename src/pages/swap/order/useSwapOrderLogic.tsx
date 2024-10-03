import { useConnectorContext } from "@/hooks/connectors/useConnectorContext";
import { useSwapService } from "@/hooks/services/backend/useSwapService";
import useCoreContract from "@/hooks/services/contracts/useCoreContract";
import { useSession } from "@/hooks/useSession";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import usePayRouterContract from "../../../hooks/services/contracts/usePayRouterContract";
import { delay, logError } from "../../../libs/helpers";

export interface SwapOrderState {
  loading: {
    markAsPaid: boolean;
    markRouteAsPaid: boolean;
    release: boolean;
    linkingWallet: boolean;
    cancel: boolean;
  };
}

const defaultState: SwapOrderState = {
  loading: {
    markAsPaid: false,
    markRouteAsPaid: false,
    release: false,
    linkingWallet: false,
    cancel: false,
  },
};

export function useSwapOrderLogic(orderId?: string) {
  const [state, setState] = useState<SwapOrderState>({ ...defaultState });
  const { markOrderAsPaid, releaseOrder, cancelOrder, humanizeErrors } = useCoreContract();
  const { markRequestAsPaid, humanizeErrors: humanizePayRouterErrors } = usePayRouterContract();
  const { getSwap } = useSwapService();
  const { chainInfo } = useConnectorContext();
  const { token } = useSession();

  const swapOrderQry = useQuery({
    queryKey: ["getSwapOrder", token, { orderId: orderId!, network: chainInfo?.queryName }],
    queryFn: getSwap,
    enabled: !!orderId && !!chainInfo,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
  });

  async function markAsPaid() {
    setState((prev) => ({ ...prev, loading: { ...prev.loading, markAsPaid: true } }));
    try {
      const txHash = await markOrderAsPaid(BigInt(orderId!));
      await delay(5000);
      await swapOrderQry.refetch();
      const msg = buildSuccessMsg("Success", "Order was marked as 'PAID'", txHash, chainInfo?.blockExplorer as string);
      toast.success(msg, { position: "top-right", duration: 6000 });
      setState((prev) => ({ ...prev, loading: { ...prev.loading, markAsPaid: false } }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: { ...prev.loading, markAsPaid: false } }));
      const msg = humanizeErrors(error);
      logError(error);
      toast.error("Swap Error", { description: msg, position: "top-right" });
    }
  }

  async function release() {
    setState((prev) => ({ ...prev, loading: { ...prev.loading, release: true } }));
    try {
      const txHash = await releaseOrder(BigInt(orderId!));
      await delay(5000);
      await swapOrderQry.refetch();
      const msg = buildSuccessMsg("Success", "Order was released", txHash, chainInfo?.blockExplorer as string);
      toast.success(msg, { position: "top-right", duration: 6000 });
      setState((prev) => ({ ...prev, loading: { ...prev.loading, release: false } }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: { ...prev.loading, release: false } }));
      const msg = humanizeErrors(error);
      logError(error);
      toast.error("Swap Error", { description: msg, position: "top-right" });
    }
  }

  async function cancel() {
    setState((prev) => ({ ...prev, loading: { ...prev.loading, cancel: true } }));
    try {
      const txHash = await cancelOrder(BigInt(orderId!));
      await delay(5000);
      await swapOrderQry.refetch();
      const msg = buildSuccessMsg("Success", "Order was cancelled", txHash, chainInfo?.blockExplorer as string);
      toast.success(msg, { position: "top-right", duration: 6000 });
      setState((prev) => ({ ...prev, loading: { ...prev.loading, cancel: false } }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: { ...prev.loading, cancel: false } }));
      const msg = humanizeErrors(error);
      logError(error);
      toast.error("Swap Error", { description: msg, position: "top-right" });
    }
  }

  async function markRouteAsPaid(requestId: bigint, routeId: bigint) {
    setState((prev) => ({ ...prev, loading: { ...prev.loading, markRouteAsPaid: true } }));
    try {
      const txHash = await markRequestAsPaid(requestId, routeId);
      await delay(5000);
      await swapOrderQry.refetch();
      const msg = buildSuccessMsg("Success", "Route was marked as 'PAID'", txHash, chainInfo?.blockExplorer as string);
      toast.success(msg, { position: "top-right", duration: 6000 });
      setState((prev) => ({ ...prev, loading: { ...prev.loading, markRouteAsPaid: false } }));
    } catch (error) {
      setState((prev) => ({ ...prev, loading: { ...prev.loading, markRouteAsPaid: false } }));
      const msg = humanizePayRouterErrors(error);
      logError(error);
      toast.error("Swap Error", { description: msg, position: "top-right" });
    }
  }

  return {
    order: swapOrderQry.data,
    state,
    setState,
    markAsPaid,
    release,
    cancel,
    markRouteAsPaid,
  };
}

function buildSuccessMsg(label: string, msg: string, txHash: string, blockExplorer: string) {
  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-gray-200">{msg}</p>
      <div className="flex gap-2 text-xs font-light text-green-400">
        <a href={`${blockExplorer}/tx/${txHash}`} target="_blank" rel="noreferrer">
          view tx
        </a>
      </div>
    </div>
  );
}
