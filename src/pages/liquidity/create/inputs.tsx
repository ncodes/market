import InfoLabel from "@/components/info-label";
import Input, { LeftLabel } from "@/components/input";
import { Button } from "@/components/ui/button.tsx";
import { cn, sanitizeNumberFromInput } from "@/libs/utils.ts";
import { motion } from "framer-motion";
import { AlertTriangleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Label } from "../../../components/ui/label";
import { Slider } from "../../../components/ui/slider";

export function PriceInput({
  value,
  baseSymbol,
  priceSymbol,
  errors,
  onAutoPriceChange,
  onChange,
  onMarginChange,
  onKeyUp,
}: {
  value: string;
  baseSymbol: string;
  priceSymbol: string;
  errors: Record<string, string[]>;
  onChange: (value: string) => void;
  onAutoPriceChange: (autoPrice: boolean) => void;
  onMarginChange: (value: number) => void;
  onKeyUp: () => void;
}) {
  const [auto, setAuto] = useState(false);
  const [animCount, setAnimCount] = useState(0);

  useEffect(() => {
    onAutoPriceChange(auto);
  }, [auto]);

  return (
    <motion.div className={cn("relative w-full overflow-hidden py-0 pt-0")}>
      <div className="flex w-full flex-col gap-1">
        <div className="flex w-full items-center justify-between">
          <InfoLabel
            text={auto ? "Initial price" : "Price"}
            info={
              auto
                ? `The initial price of 1 ${baseSymbol} in ${priceSymbol}`
                : `Set the price of 1 ${baseSymbol} in ${priceSymbol}`
            }
          />

          <div className="mb-1 flex rounded-full border border-eerie-black">
            <Button
              variant="ghost"
              onClick={() => setAuto(true)}
              className={cn(
                "scale-btn flex h-auto cursor-pointer items-center rounded-full bg-transparent p-1 px-4 hover:bg-transparent hover:text-white",
                {
                  "bg-screaming-green text-gray-800 hover:scale-100 hover:bg-screaming-green hover:text-gray-800": auto,
                },
              )}
            >
              Auto
            </Button>

            <Button
              variant="ghost"
              onClick={() => setAuto(false)}
              className={cn(
                "scale-btn flex h-auto cursor-pointer items-center rounded-full bg-transparent p-1 px-4 hover:bg-transparent hover:text-white",
                {
                  "bg-screaming-green text-gray-800 hover:scale-100 hover:bg-screaming-green hover:text-gray-800":
                    !auto,
                },
              )}
            >
              Manual
            </Button>
          </div>
        </div>
        {!auto && (
          <p className="pb-1 text-xs font-light tracking-wider text-cool-grey">
            Set the price of <i>1 {baseSymbol}</i> in the <i>{priceSymbol}</i> asset. You are responsible for updating
            the price during the lifetime of the liquidity.
          </p>
        )}

        {auto && (
          <p className="pb-1 text-xs font-light tracking-wider text-cool-grey">
            Prices sync automatically with market rates. You can modify your margin settings at any time to optimize
            your price position.
          </p>
        )}

        <Input
          type="text"
          defaultValue={value}
          onChange={onChange}
          suffix={priceSymbol}
          disabled={auto}
          className="text-white"
          onKeyUp={onKeyUp}
          containerClassName={cn("input-text-bold", { "input-error": !!errors.price?.[0] })}
        >
          <LeftLabel
            label={
              <>
                {errors.price?.[0] && (
                  <span className="flex items-center gap-1 text-xs tracking-wide text-red-500">
                    <AlertTriangleIcon className="h-3 w-3" />
                    <span>{errors.price?.[0]}</span>
                  </span>
                )}
              </>
            }
          />
        </Input>

        <motion.div
          initial={{ opacity: 0, visibility: "hidden", position: "absolute" }}
          animate={{
            height: auto ? 100 : "0",
            opacity: auto ? [0, 0.5, 1] : 0,
            visibility: auto ? "visible" : "hidden",
            position: animCount === 0 ? (auto ? "relative" : "absolute") : "relative",
          }}
          transition={{ duration: 0.3, ease: "linear" }}
          onAnimationComplete={() => {
            setAnimCount((prev) => prev + 1);
          }}
        >
          <MarginInput className="mt-4" onChange={onMarginChange} />
        </motion.div>
      </div>
    </motion.div>
  );
}

function MarginInput({ className, onChange }: { className?: string; onChange: (value: number) => void }) {
  const [margin, setMargin] = useState("");

  function getMargin() {
    return parseFloat(margin);
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    const sanitizedValue = sanitizeNumberFromInput(value, { min: -20, max: 20, defaultValue: "", allowNegative: true });
    setMargin(sanitizedValue);
    onChange(parseFloat(sanitizedValue));
  }

  return (
    <div className={cn("flex w-full items-center gap-5", className)}>
      <div className="flex w-fit flex-col gap-1 pr-2">
        <InfoLabel
          text="Margin"
          info="Adjust your price position upward or downward in relation to the current market price."
        />
        <div className="mt-1 flex h-11 w-[90px] items-center justify-center rounded-3xl bg-black-coral/20 pl-1 transition-all duration-500 focus-within:bg-black-coral/30 hover:bg-black-coral/30">
          <div className="relative mr-4 inline-flex gap-0.5">
            <input
              type="number"
              placeholder="0"
              className="w-[30px] border-none bg-transparent text-right text-base font-semibold text-anti-flash-white outline-none"
              value={margin}
              onChange={handleInput}
            />
            <Label className="text-base font-semibold text-anti-flash-white">%</Label>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col gap-6">
        <div className="mt-5 flex flex-col gap-3">
          <Slider
            defaultValue={[getMargin()]}
            max={20}
            step={1}
            min={-20}
            onValueChange={(value) => setMargin(value[0])}
            value={[getMargin()]}
            className="border-none bg-transparent"
            rangeClassName={cn(
              "bg-screaming-green h-[6px] border-none transition-all duration-500",
              getMargin() >= 0 ? "bg-screaming-green" : "bg-red-500",
            )}
            trackClassName={cn(
              "bg-screaming-green border-none transition-all duration-500",
              getMargin() >= 0 ? "bg-screaming-green" : "bg-red-500",
            )}
            thumbClassName="border-white bg-gray-100"
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
