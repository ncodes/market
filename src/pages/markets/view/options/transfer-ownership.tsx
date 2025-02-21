import EmojiAvatar from "@/components/avatar/EmojiAvatar";
import { AvatarSize } from "@/components/avatar/useAvatar";
import InfoLabel from "@/components/InfoLabel";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChevronRight, XIcon } from "lucide-react";
import { useState } from "react";

export default function TransferOwnership() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog modal={true} open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-sunset-orange hover:bg-eerie-black hover:text-sunset-orange"
        >
          Transfer Ownership
          <ChevronRight className="text-sunset-orange group-hover:text-sunset-orange" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[360px] border-none bg-transparent p-0 tracking-wide transition-all duration-300"
        hideCloseButton
      >
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-3xl border border-gunmetal bg-chinese-black">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-2xl font-semibold text-lotion">Transfer Ownership</Label>
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
                Your are about to transfer ownership of this market to the provided address. This action cannot be
                reversed.
              </Label>
              <div className="flex flex-col gap-1">
                <InfoLabel text="New Owner" info="New Owner" />
                <Input
                  suffix={<EmojiAvatar size={AvatarSize.Medium} randomStr="" className="mr-1 h-5 w-5" />}
                  placeholder="0x2345…."
                  type="text"
                  className="text-white"
                />
              </div>
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="h-12 bg-sunset-orange text-lg font-semibold text-white hover:bg-sunset-orange/70"
            onClick={() => setOpen(false)}
          >
            Transfer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
