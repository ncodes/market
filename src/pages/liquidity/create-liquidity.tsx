import { USDCIcon, USDTIcon } from "@/assets";
import AssetButton from "@/components/AssetButton";
import AssetAvatar from "@/components/avatar/AssetAvatar";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import IconClose from "@/components/icons/IconClose";
import IconDropDown from "@/components/icons/IconDropDown";
import InfoLabel from "@/components/InfoLabel";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import PageLayout from "@/layouts/PageLayout";
import { cn } from "@/libs/utils";
import { useState } from "react";

export default function CreateLiquidityPage() {
  return (
    <PageLayout title="Swap">
      <div className="flex w-full justify-center">
        <div className="w-full max-w-md">
          <div className="bg-raisin-black border-gunmetal mb-4 w-full rounded-3xl border">
            <div className="border-gunmetal flex items-center gap-4 border-b px-5 py-4">
              <IconArrowLeft />
              <Label className="text-lotion text-2xl font-semibold">Create Liquidity</Label>
            </div>
            <div className="border-gunmetal flex w-full flex-col gap-4 border-b px-6 pb-6 pt-3">
              <div className="flex w-full gap-5">
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Base Asset" info="This is the base asset" />
                  <AssetButton
                    text="USDC"
                    assetImage={USDCIcon}
                    className="bg-black-coral h-11 w-full"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Quote Asset" info="This is the base asset" />
                  <AssetButton
                    text="USDT"
                    assetImage={USDTIcon}
                    className="bg-black-coral h-11 w-full"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
              </div>
              <div className="flex w-full flex-col gap-1">
                <InfoLabel text="Amount  in USDC" info="This is amount in USDC" />
                <div className="bg-black-coral flex h-11 w-full rounded-3xl pl-4">
                  <input
                    type="number"
                    placeholder="0.0000000"
                    className="placeholder:text-cool-grey w-full border-none bg-transparent font-dosis text-lg outline-none placeholder:font-dosis active:border-none active:outline-none"
                  />
                  <div className="bg-cool-grey flex h-full items-center rounded-3xl px-4">
                    <Label className="text-lotion font-light">USDC</Label>
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <div className="flex gap-1">
                    <Label className="text-silver-sand text-xs uppercase tracking-[1px]">Bal:</Label>
                    <Label className="text-lotion text-xs uppercase tracking-[1px]">0.00</Label>
                  </div>
                  <Label className="text-lotion text-xs uppercase tracking-[1px]">$100</Label>
                </div>
              </div>
              <div className="mt-1 flex w-full justify-between">
                <InfoLabel text="Automatic Price" info="Automatic Price" className="text-base" />
                <Switch />
              </div>
              <div className="flex w-full gap-5">
                <div className="flex w-full flex-col gap-1 pr-2">
                  <InfoLabel text="Price Per USDT" info="Price Per USDT" />
                  <div className="bg-black-coral flex h-11 items-center rounded-3xl px-4">
                    <input
                      type="number"
                      placeholder="0.0000000"
                      className="text-cool-grey placeholder:text-cool-grey w-full border-none bg-transparent font-dosis text-lg outline-none active:border-none active:outline-none"
                    />
                  </div>
                </div>
                <div className="flex w-full flex-col gap-3">
                  <InfoLabel text="Initial Price" info="Initial Price" />
                  <Label className="text-cool-grey font-inter text-base font-semibold uppercase">10 USDT / USDC</Label>
                </div>
              </div>
              <div className="flex w-full items-center gap-5">
                <div className="flex w-fit flex-col gap-1 pr-2">
                  <Label className="text-lotion text-sm font-light">Margin</Label>
                  <div className="bg-black-coral flex h-11 w-[90px] items-center justify-center rounded-3xl">
                    <Label className="text-anti-flash-white text-base font-semibold">0%</Label>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-6">
                  <div className="mt-5 flex flex-col gap-3">
                    <Slider defaultValue={[0]} max={20} step={1} min={-21} />
                    <div className="flex justify-between">
                      <Label className="text-cool-grey font-inter font-semibold">-20%</Label>
                      <Label className="text-cool-grey font-inter font-semibold">+20%</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 px-6 pb-7 pt-6">
              <AdvanceSetting />
            </div>
          </div>
          <CreateLiquidityButton />
        </div>
      </div>
    </PageLayout>
  );
}

function AdvanceSetting() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <Collapsible className="w-full" onOpenChange={(open) => setIsOpened(open)}>
      <CollapsibleTrigger className="w-full">
        <div className="flex w-full justify-between">
          <Label className="text-cool-grey font-poppins text-base font-semibold">Advanced Settings</Label>
          <IconDropDown className={cn("transition-transform", isOpened ? "rotate-180" : "")} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full">
        <div className="flex w-full flex-col gap-4">
          <div className="mt-3 flex w-full flex-col gap-1 pr-2">
            <InfoLabel text="Target" info="Target" />
            <div className="bg-black-coral flex h-11 items-center rounded-3xl px-4">
              <Label className="text-cool-grey font-inter text-base font-semibold">0x12k…23w</Label>
            </div>
          </div>
          <div className="mt-1 flex w-full justify-between">
            <InfoLabel text="Pause" info="Pause" className="text-base" />
            <Switch defaultChecked />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function CreateLiquidityButton() {
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
          <div className="border-gunmetal bg-raisin-black mb-4 w-full rounded-3xl border font-poppins">
            <div className="border-gunmetal flex items-center justify-between border-b px-5 py-4">
              <Label className="text-lotion text-2xl font-semibold">Confirm Liqudity Creation</Label>
              <div
                className="bg-gunmetal flex h-11 w-11 cursor-pointer items-center justify-center rounded-full"
                onClick={() => setOpen(false)}
              >
                <IconClose />
              </div>
            </div>
            <div className="flex flex-col gap-4 px-6 py-4">
              <div className="flex gap-14">
                <AssetOverview title="BASE ASSET" asset="USDC" assetImage={USDCIcon} />
                <AssetOverview title="QUOTE ASSET" asset="USDC" assetImage={USDCIcon} />
              </div>
              <div className="flex gap-14">
                <div className="flex w-[106px] flex-col gap-2">
                  <Label className="text-lotion text-sm font-light uppercase tracking-[2px]">Price</Label>
                  <div className="bg-black-coral flex h-11 w-[84px] items-center rounded-full px-[14px]">
                    <Label className="text-cool-grey font-inter text-base font-semibold">AUTO</Label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-lotion text-sm font-light uppercase tracking-[2px]">Initial Price</Label>
                  <div className="bg-black-coral flex h-11 w-[131px] items-center rounded-full px-[14px]">
                    <Label className="text-anti-flash-white font-inter text-base font-semibold">10 USDT</Label>
                  </div>
                </div>
              </div>
              <div className="mb-4 flex gap-14">
                <div className="flex w-[106px] flex-col gap-2">
                  <Label className="text-lotion text-sm font-light uppercase tracking-[2px]">Margin</Label>
                  <div className="bg-black-coral flex h-11 w-[84px] items-center justify-center rounded-full">
                    <Label className="text-anti-flash-white font-inter text-base font-semibold">0%</Label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-lotion text-sm font-light uppercase tracking-[2px]">Initial Price</Label>
                  <div className="bg-black-coral flex h-11 w-[131px] items-center rounded-full px-[14px]">
                    <Label className="text-anti-flash-white font-inter text-base font-semibold">1000 USDC</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-gunmetal flex flex-col gap-4 border-t px-5 py-7">
              <div className="flex justify-between">
                <Label className="text-lotion">Target</Label>
                <Label className="text-cool-grey font-semibold">0x12k…23w</Label>
              </div>
              <div className="flex justify-between">
                <Label className="text-lotion">Paused Initially</Label>
                <Checkbox defaultChecked />
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

function AssetOverview({ asset, assetImage, title }: { asset: string; assetImage: string; title: string }) {
  return (
    <div className="flex flex-col">
      <Label className="text-lotion text-sm font-light tracking-[2px]">{title}</Label>
      <div className="bg-black-coral flex h-11 w-[106px] items-center justify-between rounded-3xl px-[10px]">
        <AssetAvatar assetImage={assetImage} className="h-8 w-8" />
        <Label className="text-cool-grey font-inter text-base font-semibold">{asset}</Label>
      </div>
    </div>
  );
}
