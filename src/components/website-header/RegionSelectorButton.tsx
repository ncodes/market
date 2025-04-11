import { CheckCircle2, InfoIcon } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { FranceFlagIcon, GermanFlagIcon, UKFlagIcon } from "../../assets";
import { cn } from "../../libs/utils";
import CloseIcon from "../close-icon";
import { ToolTip } from "../tool-tip";
import IconDropDown from "../icons/IconDropDown";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Regions = [
  { name: "English", image: UKFlagIcon },
  { name: "French", image: FranceFlagIcon },
  { name: "German", image: GermanFlagIcon },
];

export default function RegionSelectorButton() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  function selectRegion(index: number) {
    setActiveIndex(index);
    setOpen(false);
  }

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              "bg-chinese-black px-2 py-2 transition-all duration-500 hover:bg-raisin-black",
              open && "bg-raisin-black",
            )}
          >
            <img src={Regions[activeIndex].image} className="w-[30px] rounded-full" />
            <IconDropDown className={cn("transition-all duration-500", open && "rotate-180")} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="end"
          className="w-[299px] rounded-3xl border border-eerie-black bg-chinese-black p-0 font-poppins outline-none"
        >
          <RegionContent activeIndex={activeIndex} selectRegion={selectRegion} />
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
            "bg-chinese-black px-2 py-2 transition-all duration-500 hover:bg-raisin-black",
            open && "bg-raisin-black",
          )}
        >
          <img src={Regions[activeIndex].image} className="w-[30px] rounded-full" />
          <IconDropDown className={cn("transition-all duration-500", open && "rotate-180")} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="max-h-[90vh] w-full rounded-b-none rounded-t-3xl border border-raisin-black bg-chinese-black p-0 font-poppins"
        hideCloseButton
        side={"bottom"}
      >
        <div className="flex items-center justify-between px-5 pr-3.5 pt-4">
          <Label className="flex items-center gap-1 p-0 text-lg tracking-wide text-lotion">
            <span className="tracking-wider">Select Region</span>
            <ToolTip
              tip="Only markets and liquidity available in the selected region will be displayed."
              className="opacity-50 hover:opacity-100"
            >
              <InfoIcon className="h-4 w-4" />
            </ToolTip>
          </Label>
          <CloseIcon
            setOpen={(open) => {
              setOpen(open);
            }}
          />
        </div>
        <RegionContent activeIndex={activeIndex} selectRegion={selectRegion} />
      </SheetContent>
    </Sheet>
  );
}

function RegionContent({ activeIndex, selectRegion }: { activeIndex: number; selectRegion: (index: number) => void }) {
  return (
    <div className="mt-2 flex w-full flex-col gap-1">
      <Label className="hidden items-center gap-1 p-4 pb-0 text-sm tracking-wide text-lotion lg:flex">
        <span className="tracking-wider">Select Region</span>
        <ToolTip
          tip="Only markets and liquidity available in the selected region will be displayed."
          className="opacity-50 hover:opacity-100"
        >
          <InfoIcon className="h-4 w-4" />
        </ToolTip>
      </Label>
      <div className="mt-1 px-2 pb-2">
        {Regions.map((region, index) => (
          <Button
            variant="ghost"
            key={index}
            className="m-0 flex w-full cursor-pointer justify-between p-0 px-2 text-start hover:bg-eerie-black"
            onClick={() => selectRegion(index)}
          >
            <div className="flex cursor-pointer items-center gap-2">
              <img src={region.image} className="w-[23px] cursor-pointer" />
              <Label
                className={`cursor-pointerfont-poppins text-base ${activeIndex === index ? "text-white" : "text-cool-grey"}`}
              >
                {region.name}
              </Label>
            </div>
            {activeIndex === index && <CheckCircle2 className="h-5 w-5 text-green-500" />}
          </Button>
        ))}
      </div>
    </div>
  );
}
