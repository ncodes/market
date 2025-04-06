import IconDropDown from "@/components/icons/IconDropDown.tsx";
import InfoLabel from "@/components/info-label";
import Input, { LeftLabel } from "@/components/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { cn } from "@/libs/utils.ts";
import { motion } from "framer-motion";
import { AlertTriangleIcon } from "lucide-react";
import { useRef, useState } from "react";

export function AdvanceSettings({
  pause,
  target,
  errors,
  onPauseChange,
  onTargetChange,
  onTargetKeyUp,
}: {
  pause: boolean;
  target: string;
  errors: Record<string, string[]>;
  onPauseChange: (pause: boolean) => void;
  onTargetChange: (target: string) => void;
  onTargetKeyUp: () => void;
}) {
  const [isOpened, setIsOpened] = useState(false);
  const contentHeight = useRef<HTMLDivElement>(null);
  const [animCount, setAnimCount] = useState(0);

  return (
    <motion.div className={cn("relative w-full overflow-hidden py-0 pt-0")}>
      <Button
        variant={"ghost"}
        className="flex w-full justify-between bg-transparent p-0 hover:bg-transparent"
        onClick={() => setIsOpened((prev) => !prev)}
      >
        <Label className="font-poppins text-sm text-cool-grey">Advanced Settings</Label>
        <IconDropDown className={cn("transition-transform", isOpened ? "rotate-180" : "")} />
      </Button>
      <motion.div
        initial={{ opacity: 0, visibility: "hidden", position: "absolute" }}
        animate={{
          height: isOpened ? contentHeight.current?.clientHeight : "0",
          opacity: isOpened ? [0, 0.5, 1] : 0,
          visibility: isOpened ? "visible" : "hidden",
          position: animCount === 0 ? (isOpened ? "relative" : "absolute") : "relative",
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        onAnimationComplete={() => {
          setAnimCount((prev) => prev + 1);
        }}
      >
        <div ref={contentHeight} className="flex w-full flex-col gap-4">
          <div className="mt-1 flex w-full flex-col gap-1">
            <InfoLabel
              text="Target"
              info="Specify the target of this liquidity. Only the provided address will be able to swap."
              className="mb-1"
            />
            <Input
              type="text"
              placeholder="Enter address (0x000...)"
              className="!font-poppins"
              hideSuffix
              defaultValue={target}
              onChange={(value) => onTargetChange(value)}
              onKeyUp={onTargetKeyUp}
              containerClassName={cn("input-text-bold", { "input-error": !!errors.target?.[0] })}
            >
              <LeftLabel
                label={
                  <>
                    {errors.target?.[0] && (
                      <span className="flex items-center gap-1 text-xs tracking-wide text-red-500">
                        <AlertTriangleIcon className="h-3 w-3" />
                        <span>{errors.target?.[0]}</span>
                      </span>
                    )}
                  </>
                }
              />
            </Input>
          </div>
          <div className="mt- flex w-full justify-between">
            <InfoLabel
              text="Pause"
              info="Pause immediately after creation. Useful when you don't want to start accepting swaps immediately."
            />
            <Switch checked={pause} onCheckedChange={onPauseChange} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
