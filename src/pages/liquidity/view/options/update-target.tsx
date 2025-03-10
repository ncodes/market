import InfoLabel from "@/components/InfoLabel";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import EmojiAvatar from "@/components/avatar/EmojiAvatar";
import { AvatarSize } from "@/components/avatar/useAvatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRight, XIcon } from "lucide-react";
import { useState } from "react";

export default function UpdateTarget() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      triggerComponent={
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Update Target
          <ChevronRight className="text-cool-grey group-hover:text-white" />
        </Button>
      }
      content={
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-b-none rounded-t-3xl border border-gunmetal bg-chinese-black lg:rounded-b-3xl">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="max-w-[250px] text-base font-semibold text-lotion lg:text-xl">
                {isSubmitted ? "Confirm" : "Update Target"}
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
              <div className="mb-6 flex flex-col gap-5 px-5 py-[14px] pb-0">
                <Label className="text-sm font-light text-cool-grey">
                  Setting a target address ensures only the address owner can swap your liquidity.
                </Label>
                <div className="flex flex-col gap-1">
                  <InfoLabel text="Current" info="Current" className="text-light-periwinkle" />
                  <div className="flex items-center gap-2">
                    <EmojiAvatar className="h-5 w-5" size={AvatarSize.Small} randomStr="" />
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
              <div className="mb-6 flex flex-col gap-4 px-5 py-[14px] pb-0">
                <Label className="text-sm font-light text-cool-grey">
                  Are you sure you want to update the target address?
                </Label>

                <div className="flex flex-col gap-1 opacity-50">
                  <InfoLabel text="Current" info="Current Target" className="text-light-periwinkle" />
                  <div className="flex items-center gap-2">
                    <EmojiAvatar className="h-5 w-5" size={AvatarSize.Small} randomStr="" />
                    <Label className="font-dosis text-lg font-semibold text-cool-grey">0x231245762817</Label>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <InfoLabel text="New" info="New Target" className="text-white" />
                  <div className="flex items-center gap-2">
                    <EmojiAvatar className="h-5 w-5" size={AvatarSize.Small} randomStr="" />
                    <Label className="font-dosis text-lg font-semibold text-white">0x231245762817</Label>
                  </div>
                </div>
              </div>
            )}
            <div className="flex w-full px-5 pb-3 lg:hidden">
              <Button
                variant={"secondary"}
                className="h-12 w-full text-lg font-semibold text-gunmetal"
                onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
              >
                {isSubmitted ? "Update" : "Confirm"}
              </Button>
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="hidden h-12 text-lg font-semibold text-gunmetal lg:flex"
            onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
          >
            {isSubmitted ? "Update" : "Confirm"}
          </Button>
        </div>
      }
    />
  );
}
