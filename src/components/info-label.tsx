import { ToolTip } from "@/components/tool-tip";
import { cn } from "@/libs/utils";
import IconQuestionMark from "./icons/IconQuestionMark";
import { Label } from "./ui/label";

interface InfoLabelProps {
  text: string;
  info: string;
  className?: string;
  toolTipClassname?: string;
  popupClassName?: string;
}

export default function InfoLabel({ text, info, className, toolTipClassname, popupClassName }: InfoLabelProps) {
  return (
    <Label
      className={cn(
        "flex items-center gap-1 font-poppins text-sm font-normal tracking-wider text-lotion/90",
        className,
      )}
    >
      {text}{" "}
      <ToolTip tip={info} className="opacity-50 hover:opacity-100" className2={popupClassName}>
        <IconQuestionMark className={cn("size-4 cursor-pointer", toolTipClassname)} />
      </ToolTip>
    </Label>
  );
}
