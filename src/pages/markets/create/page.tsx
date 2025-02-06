import { USDCIcon, USDTIcon } from "@/assets";
import AssetButton from "@/components/AssetButton.tsx";
import InfoLabel from "@/components/InfoLabel.tsx";
import { Label } from "@/components/ui/label.tsx";
import PageLayout from "@/layouts/PageLayout.tsx";
import { CommisionInput } from "./commission-input.tsx";
import { CreateMarketButton } from "./create-liquidity-button.tsx";
import { AdvanceSettings } from "./advance-settings.tsx";

export default function CreateMarketPage() {
  return (
    <PageLayout title="Swap">
      <div className="flex w-full justify-center">
        <div className="mt-10 w-full max-w-md">
          <div className="bg-chinese-black mb-2 w-full rounded-3xl border border-eerie-black">
            <div className="flex items-center gap-4 border-b border-eerie-black px-5 py-4">
              <Label className="text-lotion text-2xl font-semibold">Create Market</Label>
            </div>
            <div className="flex w-full flex-col gap-4 border-b border-eerie-black px-6 py-3">
              <div className="flex w-full gap-5">
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Base Asset" info="This is the base asset" />
                  <AssetButton
                    text="USDC"
                    assetImage={USDCIcon}
                    className="bg-black-coral/20 hover:bg-black-coral/30 h-11 w-full"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Quote Asset" info="This is the base asset" />
                  <AssetButton
                    text="USDT"
                    assetImage={USDTIcon}
                    className="bg-black-coral/20 hover:bg-black-coral/30 h-11 w-full"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
              </div>
              <CommisionInput className="mt-4" />
            </div>
            <div className="flex w-full flex-col gap-4 px-6 pb-7 pt-3">
              <AdvanceSettings />
            </div>
          </div>
          <CreateMarketButton />
        </div>
      </div>
    </PageLayout>
  );
}
