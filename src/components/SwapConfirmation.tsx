import { ConnectIcon, OPIcon, USDCIcon } from "@/assets";
import InfoLabel from "@/components/InfoLabel";
import { Avatar } from "@/components/avatar/Avatar";
import IconArrowRight from "@/components/icons/IconArrowRight";
import IconLink from "@/components/icons/IconLink";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useStore from "@/hooks/store/useStore";
import { cn } from "@/libs/utils";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import IconMarkSuccess from "./icons/IconMarkSuccess";

export default function SwapConfirmationModal({ open, completeSwap }: { open: boolean; completeSwap: () => void }) {
  const setOpenSwapConfirmation = useStore((s) => s.setOpenSwapConfirmation);
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <Dialog open={open} modal={true}>
      <DialogContent
        className="max-w-[500px] border-none p-4 md:p-0 tracking-wide transition-all duration-300"
        hideCloseButton
      >
        <div className="flex w-full flex-col gap-2">
          <div className="border-gunmetal bg-chinese-black rounded-3xl border">
            <div className="border-gunmetal/40 flex w-full justify-between border-b px-5 py-3">
              <Label className="text-lotion text-2xl font-semibold">
                {isSubmitted ? "Swap Completed" : "Confirm Swap"}
              </Label>
              <Button
                onClick={() => setOpenSwapConfirmation(false)}
                variant="ghost"
                className="reset-btn text-gray-600 hover:bg-transparent hover:text-gray-100"
              >
                <XIcon className="size-5" />
              </Button>
            </div>
            <div className="flex w-full items-center gap-[10px] px-5 py-[17px] pb-3">
              <Avatar src={OPIcon} rootClassName="w-8 h-8" className="h-8 w-8" />
              {!isSubmitted && <IconArrowRight />}
              {isSubmitted && <IconMarkSuccess />}
              <Avatar src={USDCIcon} rootClassName="w-8 h-8" className="h-8 w-8" />
              <IconLink />
              <Avatar src={ConnectIcon} rootClassName="w-8 h-8" className="h-8 w-8" />
            </div>

            <div className="flex flex-col gap-3 px-5 pt-1 tracking-wide">
              <Label className="text-cool-grey text-sm font-light">
                {isSubmitted ? "Your swap was successful" : "Authenticate the transaction your connected wallet"}
              </Label>
              <div className="mt-2 flex items-center gap-x-6">
                <div className="flex flex-col">
                  <Label className="font-inter text-cool-grey/70 text-sm font-normal">You’re swapping</Label>
                  <div className="flex flex-col gap-[2px]">
                    <Label className="font-dosis text-xl text-gray-100">100,000,000 OP</Label>
                    <Label className="text-cool-grey text-sm font-light">$120</Label>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <ChevronRight className="size-5 text-gray-200" />
                </div>
                <div className="flex flex-col">
                  <Label className="font-inter text-cool-grey/70 text-sm font-normal">To</Label>
                  <div className="flex flex-col gap-[2px]">
                    <Label className="font-dosis text-xl text-gray-100">100 USDT</Label>
                    <Label className="text-cool-grey text-sm font-light">$120</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-cool-grey/10 mt-4 w-full border-t py-5 pb-2 pt-0">
              <SwapTransactionDetails />
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="text-gunmetal h-12 text-lg font-semibold"
            onClick={isSubmitted ? completeSwap : () => setSubmitted(true)}
          >
            {isSubmitted ? "Finish" : "Approve & Swap"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SwapTransactionDetails() {
  const [open, setOpen] = useState(false);
  const contentHeight = useRef<HTMLDivElement>(null);
  const [animCount, setAnimCount] = useState(0);

  return (
    <motion.div className={cn("relative w-full overflow-hidden rounded-2xl py-0 pt-0")}>
      <div className="px-5">
        <Button
          variant="link"
          className={cn("w-full justify-between p-0 text-sm font-light text-gray-400 hover:text-gray-400", {
            "text-gray-400": open,
          })}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Show Less" : "Show More"}
          <ChevronDown className={cn("size-6 transition-all duration-300", { "rotate-180": open })} />
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, visibility: "hidden", position: "absolute" }}
        animate={{
          height: open ? contentHeight.current?.clientHeight : "0",
          opacity: open ? [0, 0.5, 1] : 0,
          visibility: open ? "visible" : "hidden",
          position: animCount === 0 ? (open ? "relative" : "absolute") : "relative",
        }}
        transition={{ duration: 0.3, ease: "linear" }}
        onAnimationComplete={() => {
          setAnimCount((prev) => prev + 1);
        }}
      >
        <div ref={contentHeight} className={cn("mx-2 flex flex-col gap-4 rounded-xl bg-baltic-sea/40 p-3 pb-3", {})}>
          <div className="flex w-full justify-between">
            <InfoLabel text="Fee" info="Fee" className="text-cool-grey font-light" />
            <div className="flex items-center gap-1">
              <Avatar src={OPIcon} rootClassName="w-6 h-6" className="h-6 w-6" />
              <Label className="text-light-periwinkle font-light">2.5</Label>
            </div>
          </div>

          <div className="flex w-full justify-between">
            <InfoLabel text="Network Fee" info="Network Fee" className="text-cool-grey font-light" />
            <div className="flex items-center gap-1">
              <Avatar src={USDCIcon} rootClassName="w-6 h-6" className="h-6 w-6" />
              <Label className="text-light-periwinkle font-light">0.1</Label>
            </div>
          </div>

          <div className="flex w-full justify-between">
            <InfoLabel text="Rate" info="Rate" className="text-cool-grey font-light" />
            <Label className="text-light-periwinkle font-light">1 OP = 1.2 USDC</Label>
          </div>

          <div className="flex w-full justify-between">
            <InfoLabel text="Max Slippage" info="Max Slippage" className="text-cool-grey font-light" />
            <Label className="text-light-periwinkle font-light">0.5%</Label>
          </div>
          <div className="flex w-full justify-between">
            <InfoLabel text="Expiry" info="Expiry" className="text-cool-grey font-light" />
            <Label className="text-light-periwinkle font-light">After 30 mins</Label>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
