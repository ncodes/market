import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { motion } from "framer-motion";
import { ChevronUp, InfoIcon } from "lucide-react";
import { useState } from "react";
import { ToolTip } from "../../../../components/ToolTip";
import { Button } from "../../../../components/ui/button";
import { cn } from "../../../../libs/utils";
import { ProgressStatusIndicator } from "./ProgressStatusIndicator";
import { getSwapProgress } from "./progress";

export function OrderProgress({ order, collapse }: { order: Swap; collapse: boolean }) {
  const { address } = useConnectorContext();
  const [hide, setHide] = useState(collapse);

  return (
    <div className="flex w-full flex-col gap-3 border-t border-gray-800/50 px-3 py-3 pb-0">
      <a
        href="#"
        onClick={() => setHide(!hide)}
        className="flex w-full items-center justify-between text-lg tracking-wider"
      >
        <div className="flex items-center gap-2">
          <span>Progress</span>
          <span>
            <ToolTip
              tip={`Track the progress of the swap from start to finish.`}
              className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
            >
              <InfoIcon className="h-4 w-4" />
            </ToolTip>
          </span>
        </div>
        <div>
          <Button
            variant="ghost"
            size="icon"
            className="m-0 h-full w-auto rounded px-2 hover:bg-baltic-sea"
            onClick={() => {
              setHide(!hide);
            }}
          >
            <ChevronUp className={cn("h-5 w-5 text-gray-300 transition-all duration-300", hide ? "rotate-180" : "")} />
          </Button>
        </div>
      </a>
      <motion.div
        animate={{ height: hide ? "0" : "auto", opacity: hide ? 0 : 1 }}
        className={cn("flex flex-col pb-2", hide ? "hidden" : "")}
      >
        {getSwapProgress(order, address).map((step, index) => (
          <div key={index} className="relative flex h-[50px] items-center gap-5 tracking-wider">
            <ProgressStatusIndicator status={step.status} />
            <div className="flex flex-col">
              <span>{step.label}</span>
              <span className="text-xs text-gray-500">{step.description}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
