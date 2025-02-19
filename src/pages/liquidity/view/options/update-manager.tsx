import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChevronRight, XIcon } from "lucide-react";
import { useState } from "react";
import InfoLabel from "@/components/InfoLabel";
import { Avatar } from "@/components/avatar/Avatar";
import { CoinbaseIcon } from "@/assets";
import Input from "@/components/Input";

export default function UpdateManager() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  return (
    <Dialog modal={true} open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Update Manager
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
              <Label className="max-w-[250px] text-2xl font-semibold text-lotion">
                {isSubmitted ? "Confirm" : "Update Liquidity Manager"}
              </Label>
              <Button
                onClick={() => setOpen(false)}
                variant="ghost"
                className="reset-btn text-gray-600 hover:bg-transparent hover:text-gray-100"
              >
                <XIcon className="size-5" />
              </Button>
            </div>
            {!isSubmitted && (
              <div className="mb-6 flex flex-col gap-5 px-5 py-[14px]">
                <div className="flex flex-col gap-1">
                  <InfoLabel text="Current" info="Current" className="text-light-periwinkle" />
                  <div className="flex items-center gap-1">
                    <Avatar src={CoinbaseIcon} rootClassName="w-5 h-5" className="h-5 w-5" />
                    <Label className="font-dosis text-lg font-semibold text-cool-grey">0x231245762817</Label>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <InfoLabel text="Enter New" info="Enter New" className="text-light-periwinkle" />
                  <Input type="text" placeholder="0x000" className="!font-poppins text-white" hideSuffix />
                </div>
              </div>
            )}

            {isSubmitted && (
              <div className="mb-6 flex flex-col gap-4 px-5 py-[14px]">
                <Label className="text-sm font-light text-cool-grey">
                  Setting a target ensures only the address can swap
                </Label>

                <div className="flex flex-col gap-1">
                  <InfoLabel text="Current" info="Current" className="text-light-periwinkle" />
                  <div className="flex items-center gap-1">
                    <Avatar src={CoinbaseIcon} rootClassName="w-5 h-5" className="h-5 w-5" />
                    <Label className="font-dosis text-lg font-semibold text-cool-grey">0x231245762817</Label>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <InfoLabel text="Current Liquidity Manager" info="Current Liquidity Manager" className="text-white" />
                  <div className="flex items-center gap-1">
                    <Avatar src={CoinbaseIcon} rootClassName="w-5 h-5" className="h-5 w-5" />
                    <Label className="font-dosis text-lg font-semibold text-white">0x231245762817</Label>
                  </div>
                </div>
              </div>
            )}
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
