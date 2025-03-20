import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { useState } from "react";
import { Switch } from "../../../components/ui/switch";
import { AssetOverview } from "./asset-overview";
import CloseIcon from "@/components/CloseIcon";
import { MarketSettinsProps } from "./advance-settings";
import useMarketContract from "@/hooks/services/contracts/useMarketContract";
import { useQueryClient } from "@tanstack/react-query";
import { delay, logError, tokenTypeToAssetType } from "@/libs/helpers";

export function CreateMarketButton({
  baseAsset,
  quoteAsset,
  marketSettings,
  commission,
}: {
  commission: number;
  baseAsset?: AssetInfo;
  quoteAsset?: AssetInfo;
  marketSettings: MarketSettinsProps;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createMarket, humanizeErrors, createMarketWithManager } = useMarketContract();
  const queryClient = useQueryClient();

  const doCreateMarket = async () => {
    if (!baseAsset || !quoteAsset) return;
    try {
      setLoading(true);
      if (marketSettings.marketManager) {
        await createMarketWithManager(
          baseAsset.address,
          quoteAsset.address,
          tokenTypeToAssetType(baseAsset.type),
          tokenTypeToAssetType(quoteAsset.type),
          marketSettings.permPut,
          marketSettings.permSwap,
          (commission || 0) * 100,
          marketSettings.mediatorPool?.id ?? 0,
          marketSettings.marketManager,
        );
      } else {
        await createMarket(
          baseAsset.address,
          quoteAsset.address,
          tokenTypeToAssetType(baseAsset.type),
          tokenTypeToAssetType(quoteAsset.type),
          marketSettings.permPut,
          marketSettings.permSwap,
          (commission || 0) * 100,
          marketSettings.mediatorPool?.id ?? 0,
        );
      }
      await delay(5000);

      queryClient.refetchQueries({ queryKey: ["getMarkets"] }).catch(logError);
      setOpen(false);
    } catch (error) {
      const msg = humanizeErrors(error);
      logError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      triggerClassName="w-full"
      triggerComponent={
        <Button variant={"secondary"} className="btn">
          Create
        </Button>
      }
      desktopClassName="w-[450px]"
      content={
        <div className="w-full">
          <div className="mb-1 w-full rounded-b-none rounded-t-3xl border border-eerie-black bg-chinese-black font-poppins md:rounded-b-3xl">
            <div className="flex items-center justify-between border-b border-gunmetal/50 px-5 py-4">
              <Label className="text-xl font-semibold text-lotion lg:text-2xl">Confirm Market Creation</Label>
              <CloseIcon setOpen={setOpen} />
            </div>
            <div className="flex flex-col gap-5 px-6 py-4">
              <div className="flex gap-14">
                <AssetOverview
                  title="Base Asset"
                  asset={baseAsset?.symbol ?? ""}
                  assetImage={baseAsset?.logoURI ?? ""}
                  inputWrapperClassName="bg-black-coral/10 gap-1.5"
                  labelClassName="text-lotion/60 font-normal"
                  className="w-32"
                />
                <AssetOverview
                  title={"Quote Asset"}
                  asset={quoteAsset?.symbol ?? ""}
                  assetImage={quoteAsset?.logoURI ?? ""}
                  inputWrapperClassName="bg-black-coral/10 gap-1.5"
                  labelClassName="text-lotion/60 font-normal"
                  className="w-32"
                />
              </div>
              <div className="flex gap-14">
                <div className="flex w-32 flex-col gap-2">
                  <Label className="text-sm tracking-wider text-lotion/60">Commission</Label>
                  <div className="flex w-[89px] items-center justify-center rounded-full bg-black-coral/10 p-2 px-[14px]">
                    <Label className="text-center text-base text-gray-100">{commission}%</Label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm tracking-wider text-lotion/60">Market Manager</Label>
                  <div className="flex items-center rounded-full bg-black-coral/10 p-2 px-[14px]">
                    <Label className="text-base text-gray-100">{marketSettings.marketManager ?? "Not set"}</Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-t border-gunmetal/40 px-5 py-3">
              <div className="flex items-center justify-between">
                <Label className="text-lotion/60">Anyone can add liquidity</Label>
                <Switch checked={marketSettings.permPut} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-lotion/60">Anyone can swap</Label>
                <Switch checked={marketSettings.permSwap} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-lotion/60">Select Mediator Pool</Label>
                <div className="flex items-center rounded-full bg-black-coral/10 p-2 px-[14px]">
                  <Label className="text-base text-gray-100">{marketSettings.mediatorPool?.name ?? "Not set"}</Label>
                </div>
              </div>
            </div>

            <div className="block w-full px-5 pb-3 lg:hidden">
              <Button onClick={() => doCreateMarket()} variant={"secondary"} className="btn w-full font-semibold">
                Confirm
              </Button>
            </div>
          </div>
          <Button
            onClick={() => doCreateMarket()}
            variant={"secondary"}
            className="btn mt-2 hidden w-full text-lg font-semibold lg:block"
          >
            Confirm
          </Button>
        </div>
      }
    />
  );
}
