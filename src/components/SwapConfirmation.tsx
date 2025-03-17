import { ConnectIcon, OPIcon, USDCIcon } from "@/assets";
import InfoLabel from "@/components/InfoLabel";
import { Avatar } from "@/components/avatar/Avatar";
import IconArrowRight from "@/components/icons/IconArrowRight";
import IconLink from "@/components/icons/IconLink";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useStore from "@/hooks/store/useStore";
import { cn } from "@/libs/utils";
import { motion } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import IconMarkSuccess from "./icons/IconMarkSuccess";
import Modal from "./Modal";
import CloseIcon from "./CloseIcon";

export default function SwapConfirmationModal({ open, completeSwap }: { open: boolean; completeSwap: () => void }) {
  const setOpenSwapConfirmation = useStore((s) => s.setOpenSwapConfirmation);
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <Modal
      open={open}
      content={
        <div className="flex w-full flex-col gap-2">
          <div className="w-full rounded-b-none rounded-t-3xl border border-eerie-black bg-chinese-black font-poppins md:rounded-b-3xl">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-base font-semibold text-lotion lg:text-2xl">
                {isSubmitted ? "Swap Completed" : "Confirm Swap"}
              </Label>
              <CloseIcon setOpen={setOpenSwapConfirmation}/>
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
              <Label className="text-sm font-light text-cool-grey">
                {isSubmitted ? "Your swap was successful" : "Authenticate the transaction your connected wallet"}
              </Label>
              <div className="mt-2 flex items-center gap-x-6">
                <div className="flex flex-col">
                  <Label className="font-inter text-sm font-normal text-cool-grey/70">You’re swapping</Label>
                  <div className="flex flex-col gap-[2px]">
                    <Label className="font-dosis text-xl text-gray-100">100,000,000 OP</Label>
                    <Label className="text-sm font-light text-cool-grey">$120</Label>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <ChevronRight className="size-5 text-gray-200" />
                </div>
                <div className="flex flex-col">
                  <Label className="font-inter text-sm font-normal text-cool-grey/70">To</Label>
                  <div className="flex flex-col gap-[2px]">
                    <Label className="font-dosis text-xl text-gray-100">100 USDT</Label>
                    <Label className="text-sm font-light text-cool-grey">$120</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 w-full border-t border-cool-grey/10 py-5 pb-2 pt-0">
              <SwapTransactionDetails />
            </div>
            <div className="block w-full px-5 pb-5 pt-2 lg:hidden">
              <Button
                variant={"secondary"}
                className="h-12 w-full font-semibold text-gunmetal"
                onClick={isSubmitted ? completeSwap : () => setSubmitted(true)}
              >
                {isSubmitted ? "Finish" : "Approve & Swap"}
              </Button>
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="hidden h-12 text-lg font-semibold text-gunmetal lg:block"
            onClick={isSubmitted ? completeSwap : () => setSubmitted(true)}
          >
            {isSubmitted ? "Finish" : "Approve & Swap"}
          </Button>
        </div>
      }
    />
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
            <InfoLabel text="Fee" info="Fee" className="font-light text-cool-grey" />
            <div className="flex items-center gap-1">
              <Avatar src={OPIcon} rootClassName="w-6 h-6" className="h-6 w-6" />
              <Label className="font-light text-light-periwinkle">2.5</Label>
            </div>
          </div>

          <div className="flex w-full justify-between">
            <InfoLabel text="Network Fee" info="Network Fee" className="font-light text-cool-grey" />
            <div className="flex items-center gap-1">
              <Avatar src={USDCIcon} rootClassName="w-6 h-6" className="h-6 w-6" />
              <Label className="font-light text-light-periwinkle">0.1</Label>
            </div>
          </div>

          <div className="flex w-full justify-between">
            <InfoLabel text="Rate" info="Rate" className="font-light text-cool-grey" />
            <Label className="font-light text-light-periwinkle">1 OP = 1.2 USDC</Label>
          </div>

          <div className="flex w-full justify-between">
            <InfoLabel text="Max Slippage" info="Max Slippage" className="font-light text-cool-grey" />
            <Label className="font-light text-light-periwinkle">0.5%</Label>
          </div>
          <div className="flex w-full justify-between">
            <InfoLabel text="Expiry" info="Expiry" className="font-light text-cool-grey" />
            <Label className="font-light text-light-periwinkle">After 30 mins</Label>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
