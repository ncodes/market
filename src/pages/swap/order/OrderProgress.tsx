import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { InfoIcon } from "lucide-react";
import { ToolTip } from "../../../components/toolTip";
import { Label } from "../../../components/ui/label";
import { ProgressStatusIndicator } from "./ProgressStatusIndicator";
import { getSwapProgress } from "./progress";

export function OrderProgress({ order }: { order: Swap }) {
  const { address } = useConnectorContext();

  return (
    <div className="flex min-h-[100px] flex-col gap-3 border-t border-gray-800/50 px-4 py-3 pb-0">
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
      <div className="flex flex-col pb-2">
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
  );
}
