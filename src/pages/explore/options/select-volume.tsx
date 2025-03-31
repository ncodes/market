import CloseIcon from "@/components/close-icon";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";

export function SelectVolumeButton() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedNetworkIndex] = useState(0);

  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      triggerComponent={
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Volume(1D)
          <ChevronRight className="text-cool-grey group-hover:text-white" />
        </Button>
      }
      content={
        <div className="flex w-full flex-col overflow-hidden rounded-b-none rounded-t-3xl border border-eerie-black bg-chinese-black md:rounded-b-3xl">
          <div className="flex h-fit items-center justify-between px-5 py-3">
            <Label className="text-[18px] font-normal tracking-wider text-lotion">Volume</Label>
            <CloseIcon setOpen={setOpen} />
          </div>

          <div className="flex w-full flex-col gap-2 border-t border-eerie-black px-0 py-3">
            {["7 Day", "30 Day", "All Time"].map((volume, index) => (
              <VolumeTile
                key={index}
                name={volume}
                isSelected={selectedIndex === index}
                onClick={() => {
                  setSelectedNetworkIndex(index);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      }
    />
  );
}

function VolumeTile({ name, isSelected, onClick }: { name: string; isSelected?: boolean; onClick?: () => void }) {
  return (
    <Button
      variant={"ghost"}
      className="m-0 h-auto w-full justify-start rounded-none p-0 text-left hover:bg-transparent"
      onClick={onClick}
    >
      <div className="group flex w-full cursor-pointer items-center justify-between px-5 py-2">
        <Label
          className={cn("text-sm font-light tracking-wide text-cool-grey", { "text-anti-flash-white": isSelected })}
        >
          {name}
        </Label>
        {isSelected && <CheckCircle2 size={20} className="text-green-400" />}
      </div>
    </Button>
  );
}
