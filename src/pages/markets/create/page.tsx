import { AssetButton } from "@/components/AssetButton.tsx";
import InfoLabel from "@/components/InfoLabel.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import PageLayout from "@/layouts/PageLayout.tsx";
import { isPairInteractive } from "@/libs/asset.ts";
import { AdvanceSettings } from "./advance-settings.tsx";
import { CommisionInput } from "./commission-input.tsx";
import { CreateMarketButton } from "./create-market-button.tsx";
import useMarketCreatorLogic from "./useMarketCreatorLogic.ts";

export default function CreateMarketPage() {
  const { state, setState, onTokenSelect, errors, handleCreateMarket, setCommission } = useMarketCreatorLogic();

  return (
    <PageLayout title="Swap">
      <div className="flex w-full justify-center px-4">
        {state.isLoading && <PageLoader />}
        {!state.isLoading && (
          <div className="mt-5 w-full max-w-sm lg:mt-10 lg:max-w-md">
            <div className="mb-2 w-full rounded-3xl border border-eerie-black bg-chinese-black">
              <div className="flex items-center gap-4 border-b border-eerie-black px-3 py-4 md:px-3">
                <Label className="text-xl font-semibold text-lotion lg:text-2xl">Create Market</Label>
              </div>
              <div className="flex w-full flex-col gap-4 border-b border-eerie-black px-3 py-5 md:px-3">
                <div className="flex w-full flex-col gap-5 xs:flex-row">
                  <div className="flex w-full flex-col gap-1">
                    <InfoLabel text="Base Asset" info="This is the base asset" />
                    <AssetButton
                      text={state.baseToken?.symbol ?? ""}
                      selectAsset={(asset) => onTokenSelect(asset, { base: true })}
                      assetImage={state.baseToken?.logoURI ?? ""}
                      className="h-11 w-full bg-black-coral/20 pl-1.5 hover:bg-black-coral/30"
                      textClassName="text-cool-grey"
                      assetClassName="w-8 h-8"
                    />
                  </div>
                  <div className="flex w-full flex-col gap-1">
                    <InfoLabel text="Quote Asset" info="This is the base asset" />
                    <AssetButton
                      text={state.quoteToken?.symbol ?? ""}
                      assetImage={state.quoteToken?.logoURI ?? ""}
                      selectAsset={(asset) => onTokenSelect(asset, { base: false })}
                      className="h-11 w-full bg-black-coral/20 pl-1.5 hover:bg-black-coral/30"
                      textClassName="text-cool-grey"
                      assetClassName="w-8 h-8"
                    />
                  </div>
                </div>
                <CommisionInput
                  className="mt-4"
                  onChange={setCommission}
                  commission={state.commission}
                  errors={errors}
                />
              </div>
              <div className="flex w-full flex-col gap-4 px-3 pb-1 pt-3 md:px-3">
                <AdvanceSettings
                  state={state}
                  setState={setState}
                  errors={errors}
                  isMarketInteractive={
                    !!state.baseToken && !!state.quoteToken && isPairInteractive(state.baseToken, state.quoteToken)
                  }
                />
              </div>
            </div>
            <CreateMarketButton
              state={state}
              handleCreateMarket={handleCreateMarket}
              errors={errors}
              disabled={!state.baseToken || !state.quoteToken || Object.keys(errors).length > 0}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
}

function PageLoader() {
  return (
    <div className="mt-5 w-full max-w-sm overflow-hidden rounded-3xl border border-eerie-black bg-chinese-black px-4 py-5 lg:mt-10 lg:max-w-md">
      <Skeleton className="h-[40px] w-full max-w-[250px] rounded-xl bg-gunmetal" />
      <Skeleton className="mt-5 h-[80px] w-full rounded-xl bg-gunmetal" />
      <Skeleton className="mt-5 h-[80px] w-full rounded-xl bg-gunmetal" />
      <Skeleton className="mt-5 h-[80px] w-full rounded-xl bg-gunmetal" />
    </div>
  );
}
