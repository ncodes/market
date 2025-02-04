import { Settings } from "lucide-react";
import { useState } from "react";
import { cn } from "../../libs/utils";
import IconArrowRight from "../icons/IconArrowRight";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function SettingsButton() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        {" "}
        <div
          className={cn(
            "bg-chinese-black flex h-11 w-11 cursor-pointer items-center justify-center rounded-full transition-all duration-500 hover:bg-raisin-black",
            open && "bg-raisin-black",
          )}
        >
          <Settings className="h-5 w-5 text-gray-500" />
        </div>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="border-none bg-transparent p-0 outline-none">
        <div className="bg-chinese-black mt-2 flex w-[330px] flex-col gap-4 rounded-3xl border border-eerie-black p-4 font-poppins">
          <Label className="text-base tracking-wider text-lotion">Preferences</Label>

          <div className="flex justify-between">
            <Label className="font-poppins text-base font-normal tracking-wide text-cool-grey">Theme</Label>
            <div className="flex items-center gap-4">
              <Label className="cursor-pointer font-inter text-sm text-white">Auto</Label>
              <Label className="cursor-pointer font-inter text-sm text-black-coral">Dark</Label>
              <Label className="cursor-pointer font-inter text-sm text-black-coral">Light</Label>
            </div>
          </div>
          <div className="flex justify-between">
            <Label className="font-poppins text-base font-normal tracking-wide text-cool-grey">Default Currency</Label>
            <div className="flex cursor-pointer items-center gap-1">
              <Label className="cursor-pointer font-inter text-xs text-white">USD</Label>
              <IconArrowRight />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
