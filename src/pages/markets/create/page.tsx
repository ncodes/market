import { USDCIcon, USDTIcon } from "@/assets";
import { AssetButton } from "@/components/AssetButton.tsx";
import InfoLabel from "@/components/InfoLabel.tsx";
import { Label } from "@/components/ui/label.tsx";
import PageLayout from "@/layouts/PageLayout.tsx";
import { AdvanceSettings } from "./advance-settings.tsx";
import { CommisionInput } from "./commission-input.tsx";
import { CreateMarketButton } from "./create-market-button.tsx";

export default function CreateMarketPage() {
  return (
    <PageLayout title="Swap">
      <div className="flex w-full justify-center px-4">
        <div className="mt-5 w-full max-w-sm lg:mt-10 lg:max-w-md">
          <div className="mb-2 w-full rounded-3xl border border-eerie-black bg-chinese-black">
            <div className="flex items-center gap-4 border-b border-eerie-black px-5 py-4 md:px-5">
              <Label className="text-xl font-semibold text-lotion lg:text-2xl">Create Market</Label>
            </div>
            <div className="flex w-full flex-col gap-4 border-b border-eerie-black px-5 py-5 md:px-5">
              <div className="flex w-full flex-col gap-5 xs:flex-row">
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Base Asset" info="This is the base asset" />
                  <AssetButton
                    text="USDC"
                    assetImage={USDCIcon}
                    className="h-11 w-full bg-black-coral/20 pl-1.5 hover:bg-black-coral/30"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Quote Asset" info="This is the base asset" />
                  <AssetButton
                    text="USDT"
                    assetImage={USDTIcon}
                    className="h-11 w-full bg-black-coral/20 pl-1.5 hover:bg-black-coral/30"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
              </div>
              <CommisionInput className="mt-4" />
            </div>
            <div className="flex w-full flex-col gap-4 px-5 pb-3 pt-3 md:px-5">
              <AdvanceSettings />
            </div>
          </div>
          <CreateMarketButton />
        </div>
      </div>
    </PageLayout>
  );
}
