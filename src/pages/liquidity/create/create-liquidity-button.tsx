import { USDCIcon } from "@/assets";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { AssetOverview } from "@/pages/liquidity/create/asset-overview.tsx";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { ToolTip } from "../../../components/ToolTip";
import { Switch } from "../../../components/ui/switch";
import Modal from "@/components/Modal";

export function CreateLiquidityButton() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      triggerClassName="w-full"
      triggerComponent={
        <Button variant={"secondary"} className="h-14 w-full text-base font-semibold lg:text-lg">
          Create
        </Button>
      }
      content={
        <div className="w-full">
          <div className="mb-1 w-full rounded-b-none rounded-t-3xl border border-eerie-black bg-chinese-black font-poppins md:rounded-b-3xl">
            <div className="flex items-center justify-between border-b border-eerie-black px-5 py-4">
              <Label className="text-base font-semibold text-lotion lg:text-2xl">Confirm Liqudity Creation</Label>
              <Button
                variant="ghost"
                className="flex h-auto w-auto items-center justify-center p-0 text-gray-100 opacity-80 hover:bg-transparent hover:text-gray-100 hover:opacity-100"
                onClick={() => setOpen(false)}
              >
                <XIcon className="h-7 w-7" />
              </Button>
            </div>
            <div className="flex flex-col gap-4 px-6 py-4">
              <div className="flex gap-14">
                <AssetOverview
                  title="You add"
                  asset="USDC"
                  assetImage={USDCIcon}
                  inputWrapperClassName="bg-black-coral/10"
                />
                <AssetOverview
                  title="You get"
                  asset="USDC"
                  assetImage={USDCIcon}
                  inputWrapperClassName="bg-black-coral/10"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-sm font-light tracking-[2px] text-lotion/80">Price (per USDC)</Label>
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
              <div className="flex gap-14">
                <div className="flex w-[106px] flex-col gap-2">
                  <Label className="text-sm font-light tracking-[2px] text-lotion/80">Margin</Label>
                  <div className="flex h-11 w-[84px] items-center justify-center rounded-full bg-black-coral/10">
                    <Label className="font-poppins text-base font-semibold text-gray-100">0%</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-t border-eerie-black px-5 py-7">
              <div className="flex justify-between">
                <Label className="text-lotion/80">Target</Label>
                <ToolTip tip={"0x1234456"}>
                  <Label className="text-cool-grey">0x12k…23w</Label>
                </ToolTip>
              </div>
              <div className="flex justify-between">
                <Label className="text-lotion/80">Paused Initially</Label>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
            </div>
            <div className="block px-5 lg:hidden">
              <Button variant={"secondary"} className="h-14 w-full font-semibold">
                Confirm
              </Button>
            </div>
          </div>
          <Button variant={"secondary"} className="hidden h-14 w-full text-lg font-semibold lg:block">
            Confirm
          </Button>
        </div>
      }
    />
  );
}
