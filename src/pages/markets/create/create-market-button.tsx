import { USDCIcon } from "@/assets";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { Switch } from "../../../components/ui/switch";
import { AssetOverview } from "./asset-overview";

export function CreateMarketButton() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      triggerClassName="w-full"
      triggerComponent={
        <Button variant={"secondary"} className="btn">
          Create
        </Button>
      }
      desktopClassName="w-[450px]"
      content={
        <div className="w-full">
          <div className="mb-1 w-full rounded-b-none rounded-t-3xl border border-eerie-black bg-chinese-black font-poppins md:rounded-b-3xl">
            <div className="flex items-center justify-between border-b border-gunmetal px-5 py-4">
              <Label className="text-xl font-semibold text-lotion lg:text-2xl">Confirm Market Creation</Label>
              <Button
                variant="ghost"
                className="flex h-auto w-auto items-center justify-center p-0 text-gray-100 opacity-80 hover:bg-transparent hover:text-gray-100 hover:opacity-100"
                onClick={() => setOpen(false)}
              >
                <XIcon className="h-7 w-7" />
              </Button>
            </div>
            <div className="flex flex-col gap-5 px-6 py-4">
              <div className="flex gap-14">
                <AssetOverview
                  title="Base Asset"
                  asset="USDC"
                  assetImage={USDCIcon}
                  inputWrapperClassName="bg-black-coral/10 gap-1.5"
                  className="w-32"
                />
                <AssetOverview
                  title="Quote Asset"
                  asset="USDC"
                  assetImage={USDCIcon}
                  inputWrapperClassName="bg-black-coral/10 gap-1.5"
                />
              </div>
              <div className="flex gap-14">
                <div className="flex w-32 flex-col gap-2">
                  <Label className="text-sm font-light tracking-wider text-lotion/80">Commission</Label>
                  <div className="flex w-[89px] items-center justify-center rounded-full bg-black-coral/10 p-2 px-[14px]">
                    <Label className="text-center text-base text-gray-100">0%</Label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-light tracking-wider text-lotion/80">Market Manager</Label>
                  <div className="flex items-center rounded-full bg-black-coral/10 p-2 px-[14px]">
                    <Label className="text-base text-gray-100">0x12k2...913w</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-t border-gunmetal px-5 py-3">
              <div className="flex items-center justify-between">
                <Label className="text-lotion/80">Anyone can add liquidity</Label>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-lotion/80">Anyone can swap</Label>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-lotion/80">Select Mediator Pool</Label>
                <div className="flex items-center rounded-full bg-black-coral/10 p-2 px-[14px]">
                  <Label className="text-base text-gray-100">Default</Label>
                </div>
              </div>
            </div>

            <div className="block w-full px-5 pb-3 lg:hidden">
              <Button variant={"secondary"} className="btn w-full font-semibold">
                Confirm
              </Button>
            </div>
          </div>
          <Button variant={"secondary"} className="btn mt-2 hidden w-full text-lg font-semibold lg:block">
            Confirm
          </Button>
        </div>
      }
    />
  );
}
