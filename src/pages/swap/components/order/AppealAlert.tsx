import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Scale } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { getAppealerStr } from "../../utils";
import { SwapOrderState } from "./useSwapOrderLogic";

export function AppealAlert({
  order,
  setSwapOrderState,
  footerRef,
}: {
  order: Swap;
  setSwapOrderState: React.Dispatch<React.SetStateAction<SwapOrderState>>;
  footerRef: React.RefObject<HTMLDivElement>;
}) {
  const appealerStr = getAppealerStr(order);

  return (
    <div className="p-2 px-1">
      <Alert className="flex items-center justify-between rounded-3xl border-0 bg-yellow-500/20 tracking-wide text-yellow-400">
        <Scale className="mt-1 h-5 w-5 !text-yellow-400" />
        <div className="relative top-1 flex flex-col">
          <AlertTitle className="tracking-wide">Order Appealed</AlertTitle>
          <AlertDescription className="text-yellow-100">{appealerStr} appealed the order</AlertDescription>
        </div>
        <Button
          variant="default"
          className="bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
          onClick={() => {
            footerRef.current?.scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
              setSwapOrderState((prev) => ({ ...prev, drawerContent: "appeal-centre", openDrawer: true }));
            }, 300);
          }}
        >
          Appeal Centre
        </Button>
      </Alert>
    </div>
  );
}
