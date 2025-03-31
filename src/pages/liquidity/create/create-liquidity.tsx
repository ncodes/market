import { AdvanceSettings } from "@/pages/liquidity/create/advance-settings.tsx";
import { CreateLiquidityButton } from "@/pages/liquidity/create/create-liquidity-button.tsx";
import { PriceInput } from "@/pages/liquidity/create/price-input.tsx";
import Input, { LeftLabel, RightLabel } from "../../../components/Input.tsx";
import useLiquidityCreatorLogic from "./useLiquidityCreatorLogic.ts";
import { formatToHighDenom } from "@/libs/helpers.ts";
import { AssetButton } from "@/components/AssetButton.tsx";
import InfoLabel from "@/components/InfoLabel.tsx";
import { Label } from "@/components/ui/label.tsx";

export default function CreateLiquidityComponent({ market }: { market: Market }) {
  const { baseAssetBalance, baseUsdRate, selectedMarket, onTokenSelect } = useLiquidityCreatorLogic(market);

  return (
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
                text={selectedMarket.base}
                selectAsset={(asset) => onTokenSelect(asset, { base: true })}
                assetImage={selectedMarket.baseLogo}
                className="h-11 w-full bg-black-coral/20 pl-1.5 hover:bg-black-coral/30"
                textClassName="text-cool-grey"
                assetClassName="w-8 h-8"
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <InfoLabel text="Get" info="This is the base asset" />
              <AssetButton
                text={selectedMarket.quote}
                assetImage={selectedMarket.quoteLogo}
                selectAsset={(asset) => onTokenSelect(asset, { base: false })}
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
                    <span className="text-anti-flash-white">
                      {formatToHighDenom(baseAssetBalance, selectedMarket.baseDecimals)}
                    </span>
                  </span>
                }
              />
              <RightLabel
                label={
                  <span className="text-xs tracking-wide text-lotion">
                    <span className="text-anti-flash-white/70">
                      $
                      {(baseUsdRate.data ?? 0) *
                        Number(formatToHighDenom(baseAssetBalance, selectedMarket.baseDecimals))}
                    </span>
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
  );
}
