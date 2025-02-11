import { BNBIcon, BSCIcon, SolanaIcon, USDCIcon } from "@/assets";
import AssetSelect from "@/components/AssetSelect";
import IconLiquidity from "@/components/icons/IconLiquidity";
import IconNavigationArrows from "@/components/icons/IconNavigationArrows";
import IconSwap from "@/components/icons/IconSwap";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Tab from "@/components/ui/tab";

export default function LiquiditySwap() {
  return (
    <div className="bg-chinese-black w-full rounded-3xl border border-eerie-black/50">
      <Tab
        headersClassName="gap-1"
        tabHeaders={[
          <div className="flex cursor-pointer items-center gap-1 p-0 hover:bg-transparent">
            <IconSwap /> <Label className="text-lotion cursor-pointer font-semibold">Swap</Label>
          </div>,
          <div className="flex cursor-pointer items-center gap-1 p-0 hover:bg-transparent">
            <IconLiquidity /> <Label className="text-lotion cursor-pointer font-semibold">Add Liquidity</Label>
          </div>,
        ]}
        tabCompents={[<SwapTab />, <SwapTab />]}
      />
    </div>
  );
}

function SwapTab() {
  return (
    <div className="relative w-full">
      <AssetSelect
        title="Sell"
        balance="0.00"
        assetImage={USDCIcon}
        networkImage={SolanaIcon}
        text="USDC"
        className="border-b border-eerie-black"
        inputClassName="text-[40px] placeholder:text-[40px]"
        assetClassName="h-8 w-8"
        networkClassName="h-4 w-4"
      />

      <div className="absolute -mt-4 flex w-full justify-center">
        <div className="bg-gunmetal z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full">
          <IconNavigationArrows />
        </div>
      </div>

      <AssetSelect
        title="Buy"
        balance="0.00"
        assetImage={BNBIcon}
        networkImage={BSCIcon}
        text="USDC"
        inputClassName="text-[40px] placeholder:text-[40px]"
        assetClassName="h-8 w-8"
        networkClassName="h-4 w-4"
      />
      <div className="w-full px-6 pb-6">
        <Button variant={"secondary"} className="text-gunmetal w-full bg-white text-lg font-semibold">
          Swap
        </Button>
      </div>
    </div>
  );
}
