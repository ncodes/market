import { cn } from "@/libs/utils";
import IconQuestionMark from "./icons/IconQuestionMark";
import { Label } from "./ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

interface InfoLabelProps {
  text: string;
  info: string;
  className?: string;
}

export default function InfoLabel({ text, info, className }: InfoLabelProps) {
  return (
    <Label className={cn("text-lotion flex items-center gap-1 font-poppins text-sm font-light", className)}>
      {text}{" "}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <IconQuestionMark className="cursor-pointer" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{info}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Label>
  );
}
