import { Label } from "@/components/ui/label.tsx";
import { Slider } from "@/components/ui/slider.tsx";
import { cn } from "@/libs/utils.ts";
import { AlertTriangleIcon } from "lucide-react";
import { useRef, useState } from "react";
import InfoLabel from "../../../components/InfoLabel";

export function CommisionInput({
  className,
  errors,
  onChange,
}: {
  className?: string;
  commission: number;
  errors: Record<string, string[]>;
  onChange: (value: number) => void;
}) {
  const [commission, setCommission] = useState("");
  const spanRef = useRef<HTMLSpanElement | null>(null);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const sanitizeValue = (val: string) => {
      return val
        .replace(/-/g, "") // Remove minus signs
        .replace(/[^\d.]/g, "") // Remove non-numeric chars except decimal
        .replace(/(\..*)\./g, "$1"); // Allow only one decimal point
    };

    let sanitizedValue = sanitizeValue(event.target.value);
    if (parseFloat(sanitizedValue) > 30) {
      sanitizedValue = "30";
    }

    setCommission(sanitizedValue);
    onChange(parseFloat(sanitizedValue === "" ? "0" : sanitizedValue));
  }

  return (
    <div className="flex w-full flex-col">
      <div className={cn("flex w-full flex-col items-center gap-2 xxxs:flex-row xxxs:gap-5", className)}>
        <div className="flex w-full flex-col gap-1 pr-2 xxxs:w-fit">
          <InfoLabel text="Commission" info="The percentage of commission to collect per trade in this market" />
          <div className="mt-2 flex h-11 w-[90px] items-center justify-center gap-0.5 rounded-3xl bg-black-coral/20 pl-1 pr-1.5 transition-all duration-500 focus-within:bg-black-coral/30 hover:bg-black-coral/30">
            <div className="relative inline-flex w-fit">
              <span ref={spanRef} className="invisible absolute m-0 whitespace-pre p-0">
                {commission || "0"}
              </span>

              <input
                type="text"
                size={2}
                placeholder="0"
                className="border-none bg-transparent text-right text-base font-semibold outline-none"
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
              defaultValue={[parseFloat(commission)]}
              max={30}
              step={1}
              min={0}
              onValueChange={(value) => {
                setCommission(value[0].toString());
              }}
              value={[parseFloat(commission)]}
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
