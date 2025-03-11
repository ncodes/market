import EmojiAvatar from "@/components/avatar/EmojiAvatar";
import { AvatarSize } from "@/components/avatar/useAvatar";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";
import { ChevronRight, XIcon } from "lucide-react";
import { useState } from "react";

export default function TransferOwnership() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      triggerComponent={
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-sunset-orange hover:bg-eerie-black hover:text-sunset-orange"
        >
          Transfer Ownership
          <ChevronRight className="text-sunset-orange group-hover:text-sunset-orange" />
        </Button>
      }
      content={
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-b-none rounded-t-3xl border border-gunmetal bg-chinese-black lg:rounded-b-3xl">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-base font-semibold text-lotion lg:text-2xl">
                {isSubmitted ? "Confirm Transfer" : "Transfer Ownership"}
              </Label>
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
                {isSubmitted
                  ? "Are you sure you want to Transfer ownership  of this market?"
                  : "Your are about to transfer ownership of this market to the provided address. This action cannot be reversed."}
              </Label>
              <div className="flex flex-col gap-[6px]">
                <div className="flex flex-col gap-1">
                  <Label className={cn("text-sm font-light text-white", { "text-cool-grey": isSubmitted })}>
                    {isSubmitted ? "Old Owner" : "New Owner"}
                  </Label>
                  <Input
                    suffix={<EmojiAvatar size={AvatarSize.Medium} randomStr="" className="mr-1 h-5 w-5 shrink-0" />}
                    placeholder="0x2345…."
                    type="text"
                    className={cn("text-white", { "text-cool-grey": isSubmitted })}
                    readOnly={isSubmitted}
                  />
                </div>
                {!isSubmitted && (
                  <Label className="text-sm font-light text-cool-grey">Enter address of new owner</Label>
                )}
              </div>
              {isSubmitted && (
                <div className="flex flex-col gap-1">
                  <Label className="text-sm font-light text-white">New Owner</Label>
                  <Input
                    suffix={<EmojiAvatar size={AvatarSize.Medium} randomStr="" className="mr-1 h-5 w-5 shrink-0" />}
                    placeholder="0x2345…."
                    type="text"
                    className="text-white"
                    readOnly={true}
                  />
                </div>
              )}
            </div>
            <div className="flex w-full px-5 pb-3 lg:hidden">
              <Button
                variant={"secondary"}
                className="h-12 w-full bg-sunset-orange text-lg font-semibold text-white hover:bg-sunset-orange/70"
                onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
              >
                {isSubmitted ? "Proceed" : "Transfer"}
              </Button>
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="hidden h-12 bg-sunset-orange text-lg font-semibold text-white hover:bg-sunset-orange/70 lg:flex"
            onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
          >
            {isSubmitted ? "Proceed" : "Transfer"}
          </Button>
        </div>
      }
    />
  );
}
