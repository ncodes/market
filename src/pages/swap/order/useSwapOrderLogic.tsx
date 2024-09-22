import { useConnectorContext } from "@/hooks/connectors/useConnectorContext";
import { useSwapService } from "@/hooks/services/backend/useSwapService";
import useCoreContract from "@/hooks/services/contracts/useCoreContract";
import { useSession } from "@/hooks/useSession";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { delay, logError } from "../../../libs/helpers";

const defaultState = {
  loading: {
    markAsPaid: false,
    release: false,
    linkingWallet: false,
  },
};

export function useSwapOrderLogic(orderId?: string) {
  const [state, setState] = useState({ ...defaultState });
  const { markOrderAsPaid, releaseOrder, humanizeErrors } = useCoreContract();
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

  return {
    order: swapOrderQry.data,
    state,
    setState,
    markAsPaid,
    release,
  };
}

function buildSuccessMsg(label: string, msg: string, txHash: string, blockExplorer: string) {
  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-gray-200">{msg}</p>
      <div className="flex gap-2 text-xs font-light text-gray-400">
        <a href={`${blockExplorer}/tx/${txHash}`} target="_blank" rel="noreferrer">
          View Tx
        </a>
      </div>
    </div>
  );
}
