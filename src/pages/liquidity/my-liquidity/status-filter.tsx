import IconDropDown from "@/components/icons/IconDropDown";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/libs/utils";
import { useState } from "react";

const options = ["Paused", "Empty", "Active", "Closed"];

export default function StatusFilter() {
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger>
        <Button
          variant={"ghost"}
          className={cn("gap-1 rounded-2xl px-3 hover:bg-eerie-black hover:text-white", { "bg-eerie-black": open })}
        >
          Status{" "}
          <IconDropDown
            className={cn("h-6 w-6 shrink-0 opacity-40 transition-all duration-300", open && "rotate-180")}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        className="w-[100px] rounded-2xl border-gunmetal/50 bg-chinese-black p-0 px-1 py-1"
      >
        {options.map((option) => (
          <Button
            variant={"ghost"}
            className="h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-gray-200 hover:bg-eerie-black hover:text-white"
          >
            {option}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
