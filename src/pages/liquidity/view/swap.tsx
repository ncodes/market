import { BNBIcon, BSCIcon, SolanaIcon, USDCIcon } from "@/assets";
import AssetSelect from "@/components/AssetSelect";
import IconLiquidity from "@/components/icons/IconLiquidity";
import IconNavigationArrows from "@/components/icons/IconNavigationArrows";
import IconSwap from "@/components/icons/IconSwap";
import Swap from "@/components/Swap";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Tab from "@/components/ui/tab";

export default function LiquiditySwap() {
  return (
    <div className="bg-chinese-black w-full rounded-3xl border border-eerie-black/50">
      <Tab
        headersClassName="gap-1"
        tabHeaders={[
          "Swap",
          // <div className="flex cursor-pointer items-center gap-1 p-0 hover:bg-transparent">
          //   <IconSwap /> <Label className="text-lotion cursor-pointer font-semibold">Swap</Label>
          // </div>,
          // <div className="flex cursor-pointer items-center gap-1 p-0 hover:bg-transparent">
          //   <IconLiquidity /> <Label className="text-lotion cursor-pointer font-semibold">Add Liquidity</Label>
          // </div>,
        ]}
        tabCompents={[
          <Swap
            inputClassName="text-[40px] placeholder:text-[40px]"
            assetClassName="h-8 w-8"
            networkClassName="h-4 w-4"
            hideHeader
            showEmbeddedButton
          />,
        ]}
      />
    </div>
  );
}
