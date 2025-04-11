import { Settings } from "lucide-react";
import { useState } from "react";
import { cn } from "../../libs/utils";
import IconArrowRight from "../icons/IconArrowRight";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useMediaQuery } from "usehooks-ts";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import Icon3Dots from "../icons/Icon3Dots";
import CloseIcon from "../close-icon";

export default function SettingsButton() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          {" "}
          <Button
            className={cn(
              "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-chinese-black p-0 transition-all duration-500 hover:bg-raisin-black",
              open && "bg-raisin-black",
            )}
          >
            <Settings className="hidden lg:block h-5 w-5 text-gray-500" />
            <Icon3Dots className="block lg:hidden rotate-90" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          className="w-[330px] rounded-3xl border border-eerie-black bg-chinese-black p-0 outline-none"
        >
          <SettingsContent />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
      <SheetTrigger>
        {" "}
        <Button
          className={cn(
            "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-chinese-black p-0 transition-all duration-500 hover:bg-raisin-black",
            open && "bg-raisin-black",
          )}
        >
          <Settings className="h-5 w-5 text-gray-500" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="max-h-[90vh] w-full rounded-b-none rounded-t-3xl border border-raisin-black bg-chinese-black p-0 font-poppins"
        hideCloseButton
        side={"bottom"}
      >
        <div className="flex items-center justify-between px-5 pt-4">
          <Label className="text-base tracking-wider text-lotion">Preferences</Label>
          <CloseIcon setOpen={setOpen}/>
        </div>
        <SettingsContent />
      </SheetContent>
    </Sheet>
  );
}

function SettingsContent() {
  return (
    <div className="mt-2 flex w-full flex-col gap-4 p-4 font-poppins">
      <Label className="hidden lg:block text-base tracking-wider text-lotion">Preferences</Label>
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
  );
}
