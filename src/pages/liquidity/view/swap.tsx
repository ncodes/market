import IconLiquidity from "@/components/icons/IconLiquidity";
import IconSwap from "@/components/icons/IconSwap";
import Swap from "@/components/Swap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LiquiditySwap() {
  return (
    <div className="hidden w-full rounded-3xl border border-eerie-black/50 bg-chinese-black xl:flex">
      <Tabs defaultValue="swap" className="w-full">
        <TabsList className="flex h-auto w-full justify-start gap-[29px] rounded-none border-b border-eerie-black/50 bg-red-400 bg-transparent px-4">
          <TabsTrigger
            value="swap"
            className="flex items-center gap-1 p-0 py-3 text-base font-semibold text-black-coral data-[state=active]:bg-transparent data-[state=active]:text-lotion"
          >
            <IconSwap /> Swap
          </TabsTrigger>
          <TabsTrigger
            value="liquidity"
            className="flex items-center gap-1 p-0 py-3 text-base font-semibold text-black-coral data-[state=active]:bg-transparent data-[state=active]:text-lotion"
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
