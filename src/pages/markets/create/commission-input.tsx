import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { cn } from "@/libs/utils.ts";

export function CommisionInput({ className }: { className?: string }) {
  const [margin, setMargin] = useState(15);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [inputWidth, setInputWidth] = useState("1ch");

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    if (value) setMargin(Number(value));
  }

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(`${spanRef.current.offsetWidth}px`);
    }
  }, [margin]);

  return (
    <div className={cn("flex w-full items-center gap-5", className)}>
      <div className="flex w-fit flex-col gap-1 pr-2">
        <Label className="text-lotion/90 flex items-center gap-1 font-poppins text-sm font-normal tracking-wide">
          Commision
        </Label>
        <div className="bg-black-coral/20 focus-within:bg-black-coral/30 hover:bg-black-coral/30 mt-1 flex h-11 w-[90px] items-center justify-center rounded-3xl pl-1 transition-all duration-500">
          <div className="relative inline-flex">
            <span ref={spanRef} className="invisible absolute m-0 whitespace-pre p-0">
              {margin || "0"}
            </span>

            <input
              type="number"
              className="text-anti-flash-white inline-block border-none bg-transparent text-base font-semibold outline-none"
              style={{ width: inputWidth }}
              value={margin}
              onChange={handleInput}
            />
          </div>

          <Label className="text-anti-flash-white text-base font-semibold">%</Label>
        </div>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="mt-5 flex flex-col gap-3">
          <Slider
            defaultValue={[margin]}
            max={30}
            step={1}
            min={0}
            onValueChange={(value) => setMargin(value[0])}
            value={[margin]}
            className="border-none bg-transparent"
            rangeClassName="bg-chinese-green h-[6px] border-none"
            trackClassName="bg-black-coral/90 border-none"
            thumbClassName="border-chinese-green bg-chinese-green"
          />
          <div className="flex justify-between">
            <Label className="font-inter text-cool-grey font-semibold">0%</Label>
            <Label className="font-inter text-cool-grey font-semibold">30%</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
