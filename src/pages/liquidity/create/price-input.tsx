import InfoLabel from "@/components/InfoLabel.tsx";
import Input from "@/components/Input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/libs/utils.ts";
import { MarginInput } from "@/pages/liquidity/create/margin-input.tsx";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

export function PriceInput() {
  const [autoPrice, setAutoPrice] = useState(false);
  const contentHeight = useRef<HTMLDivElement>(null);
  const [animCount, setAnimCount] = useState(0);

  return (
    <motion.div className={cn("relative w-full overflow-hidden py-0 pt-0")}>
      <div className="mt-1 flex w-full flex-col gap-1">
        <div className="flex w-full items-center justify-between">
          <InfoLabel text={autoPrice ? "Initial price" : "Price"} info="Price" />

          <div className="mb-1 flex rounded-full border border-eerie-black">
            <Button
              variant="ghost"
              onClick={() => setAutoPrice(true)}
              className={cn(
                "scale-btn flex h-auto cursor-pointer items-center rounded-full bg-transparent p-1 px-4 hover:bg-transparent hover:text-white",
                {
                  "bg-screaming-green text-gray-800 hover:scale-100 hover:bg-screaming-green hover:text-gray-800":
                    autoPrice,
                },
              )}
            >
              Auto
            </Button>

            <Button
              variant="ghost"
              onClick={() => setAutoPrice(false)}
              className={cn(
                "scale-btn flex h-auto cursor-pointer items-center rounded-full bg-transparent p-1 px-4 hover:bg-transparent hover:text-white",
                {
                  "bg-screaming-green text-gray-800 hover:scale-100 hover:bg-screaming-green hover:text-gray-800":
                    !autoPrice,
                },
              )}
            >
              Manual
            </Button>
          </div>
        </div>
        <Input suffix="USDT" disabled={autoPrice} className="text-white" />
        <motion.div
          initial={{ opacity: 0, visibility: "hidden", position: "absolute" }}
          animate={{
            height: autoPrice ? contentHeight.current?.clientHeight : "0",
            opacity: autoPrice ? [0, 0.5, 1] : 0,
            visibility: autoPrice ? "visible" : "hidden",
            position: animCount === 0 ? (autoPrice ? "relative" : "absolute") : "relative",
          }}
          transition={{ duration: 0.3, ease: "linear" }}
          onAnimationComplete={() => {
            setAnimCount((prev) => prev + 1);
          }}
        >
          <MarginInput className="mt-4" ref={contentHeight} />
        </motion.div>
      </div>
    </motion.div>
  );
}
