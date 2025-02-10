import IconArrowRightGrey from "@/components/icons/IconArrowRightGrey";
import IconDropDown from "@/components/icons/IconDropDown";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/libs/utils";
import { useState } from "react";

const options = ["Status", "Volume", "Amount", "Price"];

export default function StatusFilter() {
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger>
        <Button variant={"ghost"} className="text-cool-grey hover:text-cool-grey font-light hover:bg-transparent">
          Status{" "}
          <IconDropDown
            className={cn("h-6 w-6 shrink-0 opacity-40 transition-all duration-300", open && "rotate-180")}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="bg-chinese-black border-gunmetal/50 w-[178px] rounded-3xl p-0 px-2 py-[18px]"
      >
        {options.map((option) => (
          <Button
            variant={"ghost"}
            className="text-cool-grey hover:text-cool-grey w-full justify-between font-light hover:bg-eerie-black"
          >
            {option} <IconArrowRightGrey className="" />
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
