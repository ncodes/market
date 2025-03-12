import EmojiAvatar from "@/components/avatar/EmojiAvatar";
import { AvatarSize } from "@/components/avatar/useAvatar";
import IconMinus from "@/components/icons/IconMinus";
import InfoLabel from "@/components/InfoLabel";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronRight, XIcon } from "lucide-react";
import { useState } from "react";

export default function AddProvider() {
  const [open, setOpen] = useState(false);
  const [addresses, setAddresses] = useState(["0x231245762817", "0x231245762817"]);
  const [addressValue, setAddressValue] = useState<string>();
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
          Add Provider
          <ChevronRight className="text-cool-grey group-hover:text-white" />
        </Button>
      }
      content={
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-b-none rounded-t-3xl border border-gunmetal bg-chinese-black lg:rounded-b-3xl">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-base font-semibold text-lotion lg:text-2xl">
                {isSubmitted ? "Confirm" : "Add Swapper"}
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
              <div className="mb-8 flex flex-col gap-4 px-5 py-[14px] pb-0">
                <Label className="text-sm font-light text-cool-grey">Add one or multiple Liquidity Provider(s)</Label>
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
                  <div className="flex max-h-[55vh] w-full flex-col gap-3 overflow-y-auto rounded-[14px] bg-raisin-black py-4 pl-4">
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
            )}

            {isSubmitted && (
              <div className="mb-8 flex max-h-[55vh] flex-col gap-4 overflow-y-auto px-5 py-[14px] pb-0">
                <Label className="text-sm font-light text-cool-grey">Confirm provider(s)</Label>
                <div className="flex w-full flex-col">
                  <Label className="text-sm font-light text-white">Provider 1</Label>
                  <div className="flex items-center gap-1">
                    <EmojiAvatar size={AvatarSize.Micro} randomStr="" className="h-5 w-5" />
                    <Label className="font-dosis text-lg font-semibold text-white">0x231245762817</Label>
                  </div>
                </div>

                <div className="flex w-full flex-col">
                  <Label className="text-sm font-light text-white">Provider 2</Label>
                  <div className="flex items-center gap-1">
                    <EmojiAvatar size={AvatarSize.Micro} randomStr="" className="h-5 w-5" />
                    <Label className="font-dosis text-lg font-semibold text-white">0x231245762817</Label>
                  </div>
                </div>

                <div className="flex w-full flex-col">
                  <Label className="text-sm font-light text-white">Provider 3</Label>
                  <div className="flex items-center gap-1">
                    <EmojiAvatar size={AvatarSize.Micro} randomStr="" className="h-5 w-5" />
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
                {isSubmitted ? "Update" : "Add All"}
              </Button>
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="hidden h-12 text-lg font-semibold text-gunmetal lg:flex"
            onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
          >
            {isSubmitted ? "Update" : "Add All"}
          </Button>
        </div>
      }
    />
  );
}
