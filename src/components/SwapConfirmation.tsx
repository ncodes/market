import { ConnectIcon, OPIcon, USDCIcon } from "@/assets";
import { Avatar } from "@/components/avatar/Avatar";
import IconArrowRight from "@/components/icons/IconArrowRight";
import IconClose from "@/components/icons/IconClose";
import IconLink from "@/components/icons/IconLink";
import InfoLabel from "@/components/InfoLabel";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import useStore from "@/hooks/store/useStore";
import { cn } from "@/libs/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function SwapConfirmationModal({ open, completeSwap }: { open: boolean; completeSwap: () => void }) {
  const setOpenSwapConfirmation = useStore((s) => s.setOpenSwapConfirmation);

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-[450px] border-none p-0" hideCloseButton>
        <div className="flex w-full flex-col gap-4">
          <div className="bg-chinese-black border-gunmetal rounded-3xl border">
            <div className="border-gunmetal flex w-full justify-between border-b px-5 py-4">
              <Label className="text-lotion text-2xl font-semibold">Confirm Swap</Label>
              <Button
                onClick={() => setOpenSwapConfirmation(false)}
                variant={"secondary"}
                className="bg-gunmetal hover:bg-gunmetal/70 h-11 w-11 rounded-full p-0"
              >
                <IconClose className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex w-full items-center gap-[10px] px-5 py-[17px]">
              <Avatar src={OPIcon} rootClassName="w-8 h-8" className="h-8 w-8" />
              <IconArrowRight />
              <Avatar src={USDCIcon} rootClassName="w-8 h-8" className="h-8 w-8" />
              <IconLink />
              <Avatar src={ConnectIcon} rootClassName="w-8 h-8" className="h-8 w-8" />
            </div>

            <div className="flex flex-col gap-4 px-5 pt-1">
              <Label className="text-cool-grey text-sm font-light">
                Authenticate the transaction your connected wallet
              </Label>
              <div className="flex items-center gap-[30px]">
                <div className="flex w-full flex-col gap-1">
                  <Label className="font-inter text-base font-medium text-white">You’re swapping</Label>
                  <div className="flex flex-col gap-[2px]">
                    <Label className="text-cool-grey font-dosis text-xl">100,000,000 OP</Label>
                    <Label className="text-sm font-light text-white">$120</Label>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-1">
                  <Label className="font-inter text-base font-medium text-white">To</Label>
                  <div className="flex flex-col gap-[2px]">
                    <Label className="text-cool-grey font-dosis text-xl">100 USDT</Label>
                    <Label className="text-sm font-light text-white">$120</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-5 py-5">
              <SeeMore />
            </div>
          </div>
          <Button variant={"secondary"} className="text-gunmetal h-12 text-lg font-semibold" onClick={completeSwap}>
            Approve & Swap
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SeeMore() {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("mt-2 w-full rounded-2xl p-3 py-0 pt-0", { "bg-baltic-sea/40": open })}>
      <Button
        variant="link"
        className={cn("text-cool-grey w-full justify-between p-0 font-semibold hover:text-gray-200", {
          "text-gray-200": open,
        })}
        onClick={() => setOpen((prev) => !prev)}
      >
        Show More
        <ChevronDown className={cn("size-4 transition-all duration-300", { "rotate-180": open })} />
      </Button>
      <div className={cn("flex flex-col gap-4 pb-3", { hidden: !open })}>
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
    </div>
  );
}
