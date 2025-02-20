import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChevronRight, XIcon } from "lucide-react";
import { useState } from "react";
import { PriceInput } from "../../create/price-input";

export default function UpdatePrice() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  return (
    <Dialog modal={true} open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Adjust Price
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
              <Label className="text-2xl font-semibold text-lotion">{isSubmitted ? "Confirm" : "Adjust Price"}</Label>
              <Button
                onClick={() => setOpen(false)}
                variant="ghost"
                className="reset-btn text-gray-600 hover:bg-transparent hover:text-gray-100"
              >
                <XIcon className="size-5" />
              </Button>
            </div>
            <div className="mb-6 flex flex-col gap-3 px-5 py-[14px] pb-0">
              <Label className="text-sm font-light text-cool-grey">
                {isSubmitted ? "Confirm Price Update" : "Update the price of the liquidity"}
              </Label>
              {isSubmitted && (
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-light tracking-wider text-lotion/80">New Price</Label>
                    <div className="flex items-center rounded-full bg-black-coral/10 p-2 px-[14px]">
                      <Label className="text-base text-gray-100">
                        10323.30 <span className="text-gray-500">USDC</span>
                      </Label>
                    </div>
                  </div>
                  <div className="flex w-[106px] flex-col gap-2">
                    <Label className="mt-1">&nbsp;</Label>
                    <div className="flex h-11 w-[84px] items-center justify-center rounded-full bg-black-coral/10">
                      <Label className="font-poppins text-base font-semibold text-gray-100">Auto</Label>
                    </div>
                  </div>
                </div>
              )}
              {isSubmitted && (
                <div className="flex gap-14">
                  <div className="flex w-[106px] flex-col gap-2">
                    <Label className="text-sm font-light tracking-wider text-lotion/80">Margin</Label>
                    <div className="flex h-11 w-[84px] items-center justify-center rounded-full bg-black-coral/10">
                      <Label className="font-poppins text-base font-semibold text-gray-100">0%</Label>
                    </div>
                  </div>
                </div>
              )}
              {!isSubmitted && <PriceInput />}
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="h-12 text-lg font-semibold text-gunmetal"
            onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
          >
            {isSubmitted ? "Update" : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
