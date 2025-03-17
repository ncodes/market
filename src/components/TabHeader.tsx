import { cn } from "@/libs/utils";
import TabHead from "./TabHead";
import { useMediaQuery } from "usehooks-ts";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useState } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";

interface TabHeaderProps {
  className?: string;
  items: string[];
  itemClassName?: string;
}

export default function TabHeader({ className, items, itemClassName }: TabHeaderProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <div className={cn("flex justify-start gap-4 lg:gap-[25px]", className)}>
        {items.map((item, index) => (
          <TabHead
            key={index}
            className={cn("text-sm md:text-base", itemClassName)}
            value={item.toLowerCase()}
            title={item}
          />
        ))}
      </div>
    );
  }

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger>
        <Button variant={"ghost"} className="p-0 hover:bg-transparent hover:text-white">
          <TabHead
            className={cn("text-sm md:text-base", itemClassName)}
            value={items[selectedIndex].toLowerCase()}
            title={items[selectedIndex]}
          />
          <ChevronDown className={cn("size-6 transition-all duration-300", { "rotate-180": open })} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[217px] flex-col gap-1 rounded-3xl border-none bg-vampire-black p-2"
        side="bottom"
        align="start"
      >
        {items.map((item, index) => (
          <Button
            onClick={() => {
              setOpen(false);
              setSelectedIndex(index);
            }}
            key={index}
            variant={"ghost"}
            className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
          >
            <TabHead className={cn("text-sm md:text-base", itemClassName)} value={item.toLowerCase()} title={item} />
            {selectedIndex === index && <CheckCircle2 className="h-5 w-5 text-green-500" />}
          </Button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
