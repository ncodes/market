import { USDCIcon, USDTIcon } from "@/assets";
import AssetButton from "@/components/AssetButton";
import IconArrowLeft from "@/components/icons/IconArrowLeft";
import IconDropDown from "@/components/icons/IconDropDown";
import InfoLabel from "@/components/InfoLabel";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
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
          <div className="bg-raisin-black border-gunmetal w-full rounded-3xl border mb-4">
            <div className="border-gunmetal flex items-center gap-4 border-b px-5 py-4">
              <IconArrowLeft />
              <Label className="text-lotion text-2xl font-bold">Create Liquidity</Label>
            </div>
            <div className="border-gunmetal flex w-full flex-col gap-4 border-b px-6 pb-6 pt-3">
              <div className="flex w-full gap-5">
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Base Asset" info="This is the base asset" />
                  <AssetButton
                    text="USDC"
                    assetImage={USDCIcon}
                    className="bg-black-coral w-full h-11"
                    textClassName="text-cool-grey"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Quote Asset" info="This is the base asset" />
                  <AssetButton
                    text="USDT"
                    assetImage={USDTIcon}
                    className="bg-black-coral w-full h-11"
                    textClassName="text-cool-grey"
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
                  <Label className="text-cool-grey font-inter text-base font-bold uppercase">10 USDT / USDC</Label>
                </div>
              </div>
              <div className="flex w-full items-center gap-5">
                <div className="flex w-fit flex-col gap-1 pr-2">
                  <Label className="text-lotion text-sm font-light">Margin</Label>
                  <div className="bg-black-coral flex h-11 w-[90px] items-center justify-center rounded-3xl">
                    <Label className="text-anti-flash-white text-base font-bold">0%</Label>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-6">
                  <div className="flex flex-col gap-3 mt-5">
                    <Slider defaultValue={[0]} max={20} step={1} min={-21} />
                    <div className="flex justify-between">
                      <Label className="text-cool-grey font-inter font-bold">-20%</Label>
                      <Label className="text-cool-grey font-inter font-bold">+20%</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 px-6 pb-7 pt-6">
              <AdvanceSetting />
            </div>
          </div>
          <Button variant={"secondary"} className="w-full">Create</Button>
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
          <Label className="text-cool-grey font-poppins text-base font-bold">Advanced Settings</Label>
          <IconDropDown className={cn("transition-transform", isOpened ? "rotate-180" : "")} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent className="w-full">
        <div className="flex w-full flex-col gap-4">
          <div className="mt-3 flex w-full flex-col gap-1 pr-2">
            <InfoLabel text="Target" info="Target" />
            <div className="bg-black-coral flex h-11 items-center rounded-3xl px-4">
              <Label className="text-cool-grey font-inter text-base font-bold">0x12k…23w</Label>
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
