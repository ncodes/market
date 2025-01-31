import { REGIONS } from "@/libs/menu";
import { useState } from "react";
import IconCircle from "../icons/IconCircle";
import IconCircleActive from "../icons/IconCircleActive";
import IconDropDown from "../icons/IconDropDown";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export default function RegionSelectorButton() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <Button variant={"gray"} className="bg-gunmetal px-2 py-2">
          <img src={REGIONS[activeIndex].image} className="w-[30px] rounded-full" />
          <IconDropDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="end" className="w-fit border-none bg-transparent p-0 outline-none">
        <div className="mt-2 flex w-[299px] flex-col gap-4 rounded-3xl border border-gunmetal bg-raisin-black p-4 font-poppins">
          <Label className="text-base font-bold text-lotion">Language / Region</Label>
          {REGIONS.map((region, index) => (
            <div key={index} className="flex cursor-pointer justify-between" onClick={() => setActiveIndex(index)}>
              <div className="flex cursor-pointer gap-2">
                <img src={region.image} className="w-[33px] cursor-pointer" />
                <Label
                  className={`cursor-pointerfont-poppins text-base ${activeIndex === index ? "text-white" : "text-cool-grey"}`}
                >
                  {region.name}
                </Label>
              </div>
              {activeIndex === index ? <IconCircleActive /> : <IconCircle />}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
