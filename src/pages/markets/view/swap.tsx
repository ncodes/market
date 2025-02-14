import IconLiquidity from "@/components/icons/IconLiquidity";
import IconSwap from "@/components/icons/IconSwap";
import Swap from "@/components/Swap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LiquiditySwap() {
  return (
    <div className="bg-chinese-black w-full rounded-3xl border border-eerie-black/50">
      <Tabs defaultValue="swap" className="w-full">
        <TabsList className="flex w-full justify-start gap-[29px] border-b border-eerie-black/50 bg-transparent px-4">
          <TabsTrigger
            value="swap"
            className="text-black-coral data-[state=active]:text-lotion flex items-center gap-1 p-0 text-base font-semibold data-[state=active]:bg-transparent"
          >
            <IconSwap /> Swap
          </TabsTrigger>
          <TabsTrigger
            value="liquidity"
            className="text-black-coral data-[state=active]:text-lotion flex items-center gap-1 p-0 text-base font-semibold data-[state=active]:bg-transparent"
          >
            <IconLiquidity /> Add Liquidity
          </TabsTrigger>
        </TabsList>
        <TabsContent value="swap">
          <Swap
            inputClassName="text-[40px] placeholder:text-[40px]"
            assetClassName="h-8 w-8"
            networkClassName="h-4 w-4"
            hideHeader
            showEmbeddedButton
            rootClassName="border-none"
          />
        </TabsContent>
        <TabsContent value="liquidity"></TabsContent>
      </Tabs>
    </div>
  );
}
