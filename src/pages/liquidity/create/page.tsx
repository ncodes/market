import { USDCIcon, USDTIcon } from "@/assets";
import { AssetButton } from "@/components/AssetButton.tsx";
import InfoLabel from "@/components/InfoLabel.tsx";
import { Label } from "@/components/ui/label.tsx";
import PageLayout from "@/layouts/PageLayout.tsx";
import { AdvanceSettings } from "@/pages/liquidity/create/advance-settings.tsx";
import { CreateLiquidityButton } from "@/pages/liquidity/create/create-liquidity-button.tsx";
import { PriceInput } from "@/pages/liquidity/create/price-input.tsx";
import Input, { LeftLabel, RightLabel } from "../../../components/Input.tsx";

export default function CreateLiquidityPage() {
  return (
    <PageLayout title="Create Liquidity">
      <div className="flex w-full justify-center px-4">
        <div className="mt-5 w-full max-w-sm lg:mt-10 lg:max-w-md">
          <div className="mb-2 w-full rounded-3xl border border-eerie-black bg-chinese-black">
            <div className="flex items-center gap-4 border-b border-eerie-black px-5 py-4 md:px-5">
              <Label className="text-xl font-semibold text-lotion lg:text-2xl">Create Liquidity</Label>
            </div>
            <div className="flex w-full flex-col gap-4 border-b border-eerie-black px-5 pb-4 pt-3 md:px-5">
              <div className="flex w-full flex-col gap-5 xs:flex-row">
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Add" info="This is the base asset" />
                  <AssetButton
                    text="USDC"
                    assetImage={USDCIcon}
                    className="h-11 w-full bg-black-coral/20 pl-1.5 hover:bg-black-coral/30"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Get" info="This is the base asset" />
                  <AssetButton
                    text="USDT"
                    assetImage={USDTIcon}
                    className="h-11 w-full bg-black-coral/20 pl-1.5 hover:bg-black-coral/30"
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
                      <span className="text-xs tracking-wide text-lotion">
                        <span className="text-cool-grey">Bal: </span>
                        <span className="text-anti-flash-white">100</span>
                      </span>
                    }
                  />
                  <RightLabel
                    label={
                      <span className="text-xs tracking-wide text-lotion">
                        <span className="text-anti-flash-white/70">$103.3</span>
                      </span>
                    }
                  />
                </Input>
              </div>

              <PriceInput />
            </div>
            <div className="flex w-full flex-col gap-4 px-5 pb-3 pt-3 md:px-5">
              <AdvanceSettings />
            </div>
          </div>
          <CreateLiquidityButton />
        </div>
      </div>
    </PageLayout>
  );
}
