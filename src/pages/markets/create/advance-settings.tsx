import InfoLabel from "@/components/InfoLabel.tsx";
import Input from "@/components/Input.tsx";
import IconDropDown from "@/components/icons/IconDropDown.tsx";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import { cn } from "@/libs/utils.ts";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import SelectMediatorPool from "./select-mediator-pool";

export function AdvanceSettings() {
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
        <Label className="font-poppins text-sm font-semibold text-cool-grey lg:text-base">Advanced Settings</Label>
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
        <div ref={contentHeight} className="flex w-full flex-col gap-4 py-2">
          <div className="flex w-full flex-col gap-1 pr-2">
            <InfoLabel text="Set Market Manager" info="Set Market Manager" className="mb-1" />
            <Input type="text" placeholder="0x000" className="!font-poppins" hideSuffix />
          </div>
          <div className="flex w-full justify-between">
            <InfoLabel text="Anyone can add liquidity" info="Anyone can add liquidity" className="text-base" />
            <Switch defaultChecked />
          </div>
          <div className="flex w-full justify-between">
            <InfoLabel text="Anyone can swap" info="Anyone can swap" className="text-base" />
            <Switch />
          </div>
          <div className="flex w-full justify-between">
            <InfoLabel text="Select Mediator Pool" info="Select Mediator Pool" className="text-base" />
            <SelectMediatorPool />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
