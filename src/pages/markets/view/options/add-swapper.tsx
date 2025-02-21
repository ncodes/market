import EmojiAvatar from "@/components/avatar/EmojiAvatar";
import { AvatarSize } from "@/components/avatar/useAvatar";
import IconMinus from "@/components/icons/IconMinus";
import InfoLabel from "@/components/InfoLabel";
import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ChevronRight, XIcon } from "lucide-react";
import { useState } from "react";

export default function AddSwapper() {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState(["0x231245762817", "0x231245762817"]);
  const [addressValue, setAddressValue] = useState<string>();

  return (
    <Dialog modal={true} open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Add Swapper
          <ChevronRight className="text-cool-grey group-hover:text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[397px] border-none bg-transparent p-0 tracking-wide transition-all duration-300"
        hideCloseButton
      >
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-3xl border border-gunmetal bg-chinese-black">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-2xl font-semibold text-lotion">Add Swapper</Label>
              <Button
                onClick={() => setOpen(false)}
                variant="ghost"
                className="reset-btn text-gray-600 hover:bg-transparent hover:text-gray-100"
              >
                <XIcon className="size-5" />
              </Button>
            </div>
            <div className="mb-8 flex flex-col gap-4 px-5 py-[14px] pb-0">
              <Label className="text-sm font-light text-cool-grey">Add one or multiple swapper(s)</Label>
              <div className="flex flex-col gap-2">
                <InfoLabel text="Address" info="Address" className="text-sm font-light text-light-periwinkle" />
                <Input
                  onChange={({ currentTarget }) => {
                    setAddressValue(currentTarget.value);
                  }}
                  value={addressValue}
                  suffix={
                    <Button
                      variant={"secondary"}
                      className="min-w-[81px] bg-white text-raisin-black"
                      onClick={() => {
                        if (addressValue) {
                          setAddresses((prev) => [...prev, addressValue]);
                          setAddressValue("");
                        }
                      }}
                    >
                      Add +
                    </Button>
                  }
                  type="text"
                  className="text-white"
                />
              </div>
              {addresses.length > 0 && (
                <div className="flex w-full flex-col gap-3 rounded-[14px] bg-raisin-black py-4 pl-4">
                  {addresses.map((address, index) => (
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-1">
                        <EmojiAvatar size={AvatarSize.Medium} randomStr="" className="h-5 w-5" />
                        <Label className="font-dosis text-lg font-semibold text-cool-grey">{address}</Label>
                      </div>
                      <Button
                        variant={"ghost"}
                        className="flex gap-1 text-sm font-light text-sunset-orange hover:bg-transparent hover:text-sunset-orange"
                        onClick={() => setAddresses(addresses.filter((_, id) => index != id))}
                      >
                        Remove
                        <IconMinus />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="h-12 text-lg font-semibold text-gunmetal"
            onClick={() => setOpen(false)}
          >
            Add All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
