import InfoLabel from "@/components/InfoLabel.tsx";
import Input from "@/components/Input.tsx";
import IconDropDown from "@/components/icons/IconDropDown.tsx";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { cn } from "@/libs/utils.ts";
import { motion } from "framer-motion";
import { AlertTriangleIcon } from "lucide-react";
import { useRef, useState } from "react";
import { MarketCreatorState } from "./hooks/useMarketCreatorLogic";
import SelectMediatorPool from "./select-mediator-pool";

export function AdvanceSettings({
  state,
  errors,
  setState,
  isInteractive,
}: {
  state: MarketCreatorState;
  errors: Record<string, string[]>;
  setState: React.Dispatch<React.SetStateAction<MarketCreatorState>>;
  isInteractive: boolean;
}) {
  const [isOpened, setIsOpened] = useState(false);
  const contentHeight = useRef<HTMLDivElement>(null);

  return (
    <motion.div className={cn("relative w-full overflow-hidden py-0 pt-0")}>
      <Button
        variant={"ghost"}
        className="flex w-full justify-between text-nowrap bg-transparent p-0 hover:bg-transparent"
        onClick={() => setIsOpened((prev) => !prev)}
      >
        <Label className="font-poppins text-sm font-semibold text-cool-grey lg:text-base">Advanced Settings</Label>
        <IconDropDown className={cn("transition-transform", isOpened ? "rotate-180" : "")} />
      </Button>
      <motion.div
        initial={{ opacity: 0, height: 0, visibility: "hidden" }}
        animate={{
          height: isOpened ? "auto" : 0,
          opacity: isOpened ? [0, 0.5, 1] : 0,
          visibility: isOpened ? "visible" : "hidden",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div ref={contentHeight} className="flex w-full flex-col gap-4 py-2">
          <div className="flex w-full justify-between">
            <InfoLabel text="Anyone can add liquidity" info="Anyone can add liquidity" className="text-sm" />
            <Switch
              checked={state.permPut}
              onCheckedChange={(v) => {
                setState((prev) => ({ ...prev, permPut: v }));
              }}
            />
          </div>
          <div className="flex w-full justify-between">
            <InfoLabel text="Anyone can swap" info="Anyone can swap" className="text-sm" />
            <Switch
              checked={state.permSwap}
              onCheckedChange={(v) => {
                setState((prev) => ({ ...prev, permSwap: v }));
              }}
            />
          </div>
          {isInteractive && (
            <div className="flex w-full justify-between">
              <InfoLabel text="Select Mediator Pool" info="Select Mediator Pool" className="text-sm" />
              <SelectMediatorPool
                onMediatorPoolSelected={(value) => setState((prev) => ({ ...prev, mediatorPool: value }))}
              />
            </div>
          )}
          <div className="flex w-full flex-col gap-1 pr-0">
            <InfoLabel text="Set Market Manager" info="Set Market Manager" className="mb-1" />
            <Input
              type="text"
              placeholder="0x000"
              className="pr-4 !font-poppins !text-sm"
              containerClassName="rounded-2xl"
              onChange={({ currentTarget }) => {
                setState((prev) => ({ ...prev, marketManager: currentTarget.value }));
              }}
              hideSuffix
            />
            {errors.marketManager?.[0] && (
              <span className="mt-2 flex items-center gap-1 text-xs tracking-wide text-red-500">
                <AlertTriangleIcon className="h-3 w-3" />
                <span>{errors.marketManager?.[0]}</span>
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
