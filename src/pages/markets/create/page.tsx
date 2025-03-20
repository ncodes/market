import { AssetButton } from "@/components/AssetButton.tsx";
import InfoLabel from "@/components/InfoLabel.tsx";
import { Label } from "@/components/ui/label.tsx";
import PageLayout from "@/layouts/PageLayout.tsx";
import { AdvanceSettings, MarketSettinsProps } from "./advance-settings.tsx";
import { CommisionInput } from "./commission-input.tsx";
import { CreateMarketButton } from "./create-market-button.tsx";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { useAssetService } from "@/hooks/services/backend/useAssetService.ts";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import useStore from "@/hooks/store/useStore.ts";

export default function CreateMarketPage() {
  const { connected } = useConnectorContext();
  const { getList } = useAssetService();
  const [baseAsset, setBaseAsset] = useState<AssetInfo>();
  const [quoteAsset, setQuoteAsset] = useState<AssetInfo>();
  const [commission, setCommission] = useState<number>(15);
  const [marketSettings, setMarketSettings] = useState<MarketSettinsProps>({
    permPut: false,
    permSwap: false,
  });
  const { selectedChain } = useStore();

  const assets = useQuery({
    queryKey: ["getList", { network:  selectedChain.queryName}],
    queryFn: getList,
    enabled: connected,
  });

  useEffect(() => {
    if (!assets.isSuccess || !assets.data || baseAsset || quoteAsset) return;
    const base = assets.data[0];
    const quote = assets.data[1];

    setBaseAsset(base);
    setQuoteAsset(quote);
  }, [assets.data]);

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
                    text={baseAsset?.symbol ?? ""}
                    selectAsset={setBaseAsset}
                    assetImage={baseAsset?.logoURI ?? ""}
                    className="h-11 w-full bg-black-coral/20 pl-1.5 hover:bg-black-coral/30"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="Quote Asset" info="This is the base asset" />
                  <AssetButton
                    text={quoteAsset?.symbol ?? ""}
                    assetImage={quoteAsset?.logoURI ?? ""}
                    selectAsset={setQuoteAsset}
                    className="h-11 w-full bg-black-coral/20 pl-1.5 hover:bg-black-coral/30"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
              </div>
              <CommisionInput className="mt-4" setCommission={setCommission} />
            </div>
            <div className="flex w-full flex-col gap-4 px-5 pb-3 pt-3 md:px-5">
              <AdvanceSettings setMarketSettings={setMarketSettings}/>
            </div>
          </div>
          <CreateMarketButton
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
            marketSettings={marketSettings}
            commission={commission}
          />
        </div>
      </div>
    </PageLayout>
  );
}
