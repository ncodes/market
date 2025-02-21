import InfoLabel from "@/components/InfoLabel.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { cn } from "@/libs/utils.ts";
import { useEffect, useRef, useState } from "react";

export function MarginInput({ className, ref }: { className?: string; ref?: React.LegacyRef<HTMLDivElement> }) {
  const [margin, setMargin] = useState(0);
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
    <div className={cn("flex w-full items-center gap-5", className)} ref={ref}>
      <div className="flex w-fit flex-col gap-1 pr-2">
        <InfoLabel text="Margin" info="Margin" />
        <div className="mt-1 flex h-11 w-[90px] items-center justify-center rounded-3xl bg-black-coral/20 pl-1 transition-all duration-500 focus-within:bg-black-coral/30 hover:bg-black-coral/30">
          <div className="relative inline-flex">
            <span ref={spanRef} className="invisible absolute m-0 whitespace-pre p-0">
              {margin || "0"}
            </span>

            <input
              type="number"
              className="inline-block border-none bg-transparent text-base font-semibold text-anti-flash-white outline-none"
              style={{ width: inputWidth }}
              value={margin}
              onChange={handleInput}
            />
          </div>

          <Label className="text-base font-semibold text-anti-flash-white">%</Label>
        </div>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="mt-5 flex flex-col gap-3">
          <Slider
            defaultValue={[margin]}
            max={20}
            step={1}
            min={-20}
            onValueChange={(value) => setMargin(value[0])}
            value={[margin]}
            className="border-none bg-transparent"
            rangeClassName="bg-black-coral/90 h-[6px] border-none"
            trackClassName="bg-screaming-green border-none"
            thumbClassName="border-screaming-green bg-screaming-green"
          />
          <div className="flex justify-between">
            <Label className="font-inter font-semibold text-cool-grey">-20%</Label>
            <Label className="font-inter font-semibold text-cool-grey">+20%</Label>
          </div>
        </div>
      </div>
    </div>
  );
}
