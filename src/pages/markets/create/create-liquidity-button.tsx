import { USDCIcon } from "@/assets";
import { Button } from "@/components/ui/button.tsx";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog.tsx";
import { Label } from "@/components/ui/label.tsx";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { Switch } from "../../../components/ui/switch";
import { AssetOverview } from "./asset-overview";

export function CreateMarketButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger className="w-full">
        <Button variant={"secondary"} className="h-14 w-full text-lg font-semibold">
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[450px] border-none bg-transparent px-0 py-0" hideCloseButton>
        <div className="w-full">
          <div className="bg-chinese-black mb-1 w-full rounded-3xl border border-eerie-black font-poppins">
            <div className="border-gunmetal flex items-center justify-between border-b px-5 py-4">
              <Label className="text-lotion text-2xl font-semibold">Confirm Market Creation</Label>
              <Button
                variant="ghost"
                className="flex h-auto w-auto items-center justify-center p-0 text-gray-100 opacity-80 hover:bg-transparent hover:text-gray-100 hover:opacity-100"
                onClick={() => setOpen(false)}
              >
                <XIcon className="h-7 w-7" />
              </Button>
            </div>
            <div className="flex flex-col gap-7 px-6 py-4">
              <div className="flex gap-14">
                <AssetOverview
                  title="Base Asset"
                  asset="USDC"
                  assetImage={USDCIcon}
                  inputWrapperClassName="bg-black-coral/10"
                  className="w-32"
                />
                <AssetOverview
                  title="Quote Asset"
                  asset="USDC"
                  assetImage={USDCIcon}
                  inputWrapperClassName="bg-black-coral/10"
                />
              </div>
              <div className="flex gap-14">
                <div className="flex w-32 flex-col gap-2">
                  <Label className="text-lotion/80 text-sm font-light tracking-[2px]">Commission</Label>
                  <div className="bg-black-coral/10 flex w-[89px] items-center justify-center rounded-full p-2 px-[14px]">
                    <Label className="text-center text-base text-gray-100">0%</Label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-lotion/80 text-sm font-light tracking-[2px]">Market Manager</Label>
                  <div className="bg-black-coral/10 flex items-center rounded-full p-2 px-[14px]">
                    <Label className="text-base text-gray-100">0x12k27918hsa111223w</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-gunmetal flex flex-col gap-4 border-t px-5 py-7">
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
                <div className="bg-black-coral/10 flex items-center rounded-full p-2 px-[14px]">
                  <Label className="text-base text-gray-100">Default</Label>
                </div>
              </div>
            </div>
          </div>
          <Button variant={"secondary"} className="h-14 w-full text-lg font-semibold">
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
