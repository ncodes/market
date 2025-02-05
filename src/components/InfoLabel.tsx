import { cn } from "@/libs/utils";
import { ToolTip } from "./ToolTip";
import IconQuestionMark from "./icons/IconQuestionMark";
import { Label } from "./ui/label";

interface InfoLabelProps {
  text: string;
  info: string;
  className?: string;
}

export default function InfoLabel({ text, info, className }: InfoLabelProps) {
  return (
    <Label
      className={cn("flex items-center gap-1 font-poppins text-sm font-normal tracking-wide text-lotion/90", className)}
    >
      {text}{" "}
      <ToolTip tip={info} className="opacity-50 hover:opacity-100">
        <IconQuestionMark className="size-4 cursor-pointer" />
      </ToolTip>
    </Label>
  );
}
