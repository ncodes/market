import { Label } from "@/components/ui/label.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { cn } from "@/libs/utils.ts";
import { AlertTriangleIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CommisionInput({
  className,
  commission,
  errors,
  setCommission,
}: {
  className?: string;
  commission: number;
  errors: Record<string, string[]>;
  setCommission: (value: number) => void;
}) {
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const [inputWidth, setInputWidth] = useState("1ch");

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    if (value) {
      setCommission(Number(value));
    }
  }

  useEffect(() => {
    if (spanRef.current) {
      setInputWidth(`${spanRef.current.offsetWidth}px`);
    }
  }, [commission]);

  return (
    <div className="flex w-full flex-col">
      <div className={cn("flex w-full flex-col items-center gap-2 xxxs:flex-row xxxs:gap-5", className)}>
        <div className="flex w-full flex-col gap-1 pr-2 xxxs:w-fit">
          <Label className="flex items-center gap-1 font-poppins text-sm font-normal tracking-wide text-lotion/90">
            Commision
          </Label>
          <div className="mt-2 flex h-11 w-[90px] items-center justify-center rounded-3xl bg-black-coral/20 pl-1 transition-all duration-500 focus-within:bg-black-coral/30 hover:bg-black-coral/30">
            <div className="relative inline-flex">
              <span ref={spanRef} className="invisible absolute m-0 whitespace-pre p-0">
                {commission || "0"}
              </span>

              <input
                type="number"
                className="inline-block border-none bg-transparent text-base font-semibold text-anti-flash-white outline-none"
                style={{ width: inputWidth }}
                value={commission}
                onChange={handleInput}
              />
            </div>

            <Label className="text-base font-semibold text-anti-flash-white">%</Label>
          </div>
        </div>
        <div className="mt-2 flex w-full flex-col gap-6">
          <div className="mt-5 flex flex-col gap-3">
            <Slider
              defaultValue={[commission]}
              max={30}
              step={1}
              min={0}
              onValueChange={(value) => {
                setCommission(value[0]);
              }}
              value={[commission]}
              className="border-none bg-transparent"
              rangeClassName="bg-screaming-green h-[6px] border-none"
              trackClassName="bg-black-coral/90 border-none"
              thumbClassName="border-screaming-green bg-screaming-green"
            />
            <div className="flex justify-between">
              <Label className="font-inter font-semibold text-cool-grey">0%</Label>
              <Label className="font-inter font-semibold text-cool-grey">30%</Label>
            </div>
          </div>
        </div>
      </div>
      {errors.commission?.[0] && (
        <span className="mt-2 flex items-center gap-1 text-xs tracking-wide text-red-500">
          <AlertTriangleIcon className="h-3 w-3" />
          <span>{errors.commission?.[0]}</span>
        </span>
      )}
    </div>
  );
}
