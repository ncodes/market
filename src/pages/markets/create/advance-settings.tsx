import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible.tsx";
import { Label } from "@/components/ui/label.tsx";
import IconDropDown from "@/components/icons/IconDropDown.tsx";
import { cn } from "@/libs/utils.ts";
import InfoLabel from "@/components/InfoLabel.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import Input from "@/components/Input.tsx";
import SelectMediatorPool from "./select-mediator-pool";

export function AdvanceSettings() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Collapsible className="w-full" onOpenChange={(open) => setIsOpened(open)}>
      <CollapsibleTrigger className="w-full">
        <div className="flex w-full justify-between">
          <Label className="text-cool-grey font-poppins text-base font-semibold">Advanced Settings</Label>
          <IconDropDown className={cn("transition-transform", isOpened ? "rotate-180" : "")} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 w-full">
        <div className="flex w-full flex-col gap-4">
          <div className="mt-3 flex w-full flex-col gap-1 pr-2">
            <InfoLabel text="Set Market Manager" info="Set Market Manager" className="mb-1" />
            <Input type="text" placeholder="0x000" className="!font-poppins" hideSuffix />
          </div>
          <div className="mt-1 flex w-full justify-between">
            <InfoLabel text="Anyone can add liquidity" info="Anyone can add liquidity" className="text-base" />
            <Switch defaultChecked />
          </div>
          <div className="mt-1 flex w-full justify-between">
            <InfoLabel text="Anyone can swap" info="Anyone can swap" className="text-base" />
            <Switch />
          </div>
          <div className="mt-1 flex w-full justify-between">
            <InfoLabel text="Select Mediator Pool" info="Select Mediator Pool" className="text-base" />
            <SelectMediatorPool />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
