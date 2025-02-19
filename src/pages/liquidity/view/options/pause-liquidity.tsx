import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChevronRight, XIcon } from "lucide-react";
import { useState } from "react";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function PauseLiquidity() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  return (
    <Dialog modal={true} open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Pause
          <ChevronRight className="text-cool-grey group-hover:text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[360px] border-none bg-transparent p-0 tracking-wide transition-all duration-300"
        hideCloseButton
      >
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-3xl border border-gunmetal bg-chinese-black">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-2xl font-semibold text-lotion">Pause Liquidity</Label>
              <Button
                onClick={() => setOpen(false)}
                variant="ghost"
                className="reset-btn text-gray-600 hover:bg-transparent hover:text-gray-100"
              >
                <XIcon className="size-5" />
              </Button>
            </div>
            <div className="mb-6 flex flex-col gap-3 px-5 py-[14px]">
              {!isSubmitted && (
                <Label className="text-sm font-light text-cool-grey">
                  Pausing your liquidity will prevent new swaps
                </Label>
              )}
              {isSubmitted && (
                <div className="flex items-start gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sunset-orange/20">
                    <InfoCircledIcon className="h-5 w-5 text-sunset-orange" />
                  </div>
                  <Label className="text-sm font-light text-cool-grey">
                    Are you sure you want to pause this liquidity?
                  </Label>
                </div>
              )}
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="h-12 text-lg font-semibold text-gunmetal"
            onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
          >
            {isSubmitted ? "Pause" : "Proceed"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
