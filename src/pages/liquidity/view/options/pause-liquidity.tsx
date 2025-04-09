import CloseIcon from "@/components/close-icon";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { ChevronRight, PauseIcon } from "lucide-react";
import { useState } from "react";

export default function PauseLiquidity() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      triggerComponent={
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-yellow-500 hover:bg-eerie-black hover:text-yellow-500"
        >
          <span className="flex items-center gap-1">
            <PauseIcon className="size-4" />
            <span>Pause</span>
          </span>
          <ChevronRight className="text-cool-grey group-hover:text-white" />
        </Button>
      }
      content={
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-b-none rounded-t-3xl border border-gunmetal bg-chinese-black md:rounded-b-3xl">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-base font-semibold text-lotion lg:text-2xl">Pause Liquidity</Label>
              <CloseIcon setOpen={setOpen} />
            </div>
            <div className="mb-3 flex flex-col gap-3 px-5 py-[14px] pb-0">
              {!isSubmitted && (
                <Label className="text-sm font-light text-cool-grey">
                  You can pause your liquidity to prevent new swaps. You can unpause it at any time.
                </Label>
              )}
              {isSubmitted && (
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/20">
                    <InfoCircledIcon className="h-8 w-8 text-yellow-500" />
                  </div>
                  <Label className="text-sm font-light text-cool-grey">
                    Are you sure you want to pause this liquidity?
                  </Label>
                </div>
              )}
            </div>
            <div className="flex w-full px-5 py-2 lg:hidden">
              <Button
                variant={"secondary"}
                className="h-12 w-full bg-yellow-500 text-lg font-semibold text-gunmetal hover:bg-yellow-400"
                onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
              >
                {isSubmitted ? "Pause" : "Proceed"}
              </Button>
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="hidden h-12 bg-yellow-500 text-lg font-semibold text-gunmetal hover:bg-yellow-400 lg:flex"
            onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
          >
            {isSubmitted ? "Pause" : "Proceed"}
          </Button>
        </div>
      }
    />
  );
}
