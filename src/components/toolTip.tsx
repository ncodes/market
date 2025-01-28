import { TooltipPortal } from "@radix-ui/react-tooltip";
import React, { useState } from "react";
import { cn } from "../libs/utils.ts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export function ToolTip(props: {
  tip?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  className2?: string;
  side?: "top" | "bottom" | "left" | "right";
  disableHoverableContent?: boolean;
}) {
  const [open, setOpen] = useState(false);

  if (!props.tip) return <>{props.children}</>;

  return (
    <TooltipProvider disableHoverableContent={props.disableHoverableContent}>
      <Tooltip
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <TooltipTrigger className={cn("transition-all duration-500", props.className)} asChild>
          <span className="cursor-pointer">{props.children}</span>
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side={props.side || "top"}
            className={cn(
              "relative !z-50 border border-bright-gray/60 bg-baltic-sea text-sm font-light",
              props.className2,
            )}
          >
            {props.tip}
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  );
}
