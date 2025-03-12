import { USDCIcon, USDTIcon } from "@/assets";
import InfoLabel from "@/components/InfoLabel.tsx";
import { Label } from "@/components/ui/label.tsx";
import PageLayout from "@/layouts/PageLayout.tsx";
import { AdvanceSettings } from "@/pages/liquidity/create/advance-settings.tsx";
import { CreateLiquidityButton } from "@/pages/liquidity/create/create-liquidity-button.tsx";
import { PriceInput } from "@/pages/liquidity/create/price-input.tsx";
import Input, { LeftLabel, RightLabel } from "../../../components/Input.tsx";
import { AssetButton } from "@/components/AssetButton.tsx";

export default function CreateLiquidityPage() {
  return (
    <PageLayout title="Swap">
      <div className="flex w-full justify-center px-4">
        <div className="mt-10 w-full max-w-sm lg:max-w-md">
          <div className="mb-2 w-full rounded-3xl border border-eerie-black bg-chinese-black">
            <div className="flex items-center gap-4 border-b border-eerie-black px-5 py-4">
              <Label className="text-base lg:text-2xl font-semibold text-lotion">Create Liquidity</Label>
            </div>
            <div className="flex w-full flex-col gap-4 border-b border-eerie-black px-6 pb-6 pt-3">
              <div className="flex w-full gap-5">
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Add" info="This is the base asset" />
                  <AssetButton
                    text="USDC"
                    assetImage={USDCIcon}
                    className="h-11 w-full bg-black-coral/20 hover:bg-black-coral/30"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Get" info="This is the base asset" />
                  <AssetButton
                    text="USDT"
                    assetImage={USDTIcon}
                    className="h-11 w-full bg-black-coral/20 hover:bg-black-coral/30"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col gap-1">
                <InfoLabel text="Amount" info="This is amount in USDC" />
                <Input suffix="USDC">
                  <LeftLabel
                    label={
                      <span className="p-2 text-xs font-extralight tracking-[2px] text-lotion">
                        <span className="text-cool-grey">Bal: </span>
                        <span className="text-anti-flash-white">100</span>
                      </span>
                    }
                  />
                  <RightLabel
                    label={
                      <span className="p-2 text-xs font-extralight tracking-[2px] text-lotion">
                        <span className="text-anti-flash-white/70">$103.3</span>
                      </span>
                    }
                  />
                </Input>
              </div>

              <PriceInput />
            </div>
            <div className="flex w-full flex-col gap-4 px-6 pb-7 pt-3">
              <AdvanceSettings />
            </div>
          </div>
          <CreateLiquidityButton />
        </div>
      </div>
    </PageLayout>
  );
}
