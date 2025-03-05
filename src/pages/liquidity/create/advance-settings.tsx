import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible.tsx";
import { Label } from "@/components/ui/label.tsx";
import IconDropDown from "@/components/icons/IconDropDown.tsx";
import { cn } from "@/libs/utils.ts";
import InfoLabel from "@/components/InfoLabel.tsx";
import { Switch } from "@/components/ui/switch.tsx";
import Input from "@/components/Input.tsx";

export function AdvanceSettings() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Collapsible className="w-full" onOpenChange={(open) => setIsOpened(open)}>
      <CollapsibleTrigger className="w-full">
        <div className="flex w-full justify-between">
          <Label className="font-poppins text-sm lg:text-base font-semibold text-cool-grey">Advanced Settings</Label>
          <IconDropDown className={cn("transition-transform", isOpened ? "rotate-180" : "")} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-2 w-full">
        <div className="flex w-full flex-col gap-4">
          <div className="mt-3 flex w-full flex-col gap-1 pr-2">
            <InfoLabel text="Target" info="Target" className="mb-1" />
            <Input type="text" placeholder="0x000" className="!font-poppins" hideSuffix />
          </div>
          <div className="mt-1 flex w-full justify-between">
            <InfoLabel text="Pause" info="Pause" className="text-base" />
            <Switch defaultChecked />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
