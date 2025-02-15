import { SolanaIcon, USDCIcon } from "@/assets";
import { Avatar } from "@/components/avatar/Avatar";
import IconOpenLink from "@/components/icons/IconOpenLink";
import { Label } from "@/components/ui/label";
import PageLayout from "@/layouts/PageLayout";
import { Link } from "react-router-dom";
import LiquidityChart from "./chart";
import LiquiditySwap from "./swap";
import LiquidityTable from "./liquidity-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconTriangleUp from "@/components/icons/IconTriangleUp";
import IconTriangleDown from "@/components/icons/IconTriangleDown";
import { NetworkSelectorButton } from "@/components/AssetButton";
import TransactionsTable from "./transactions-table";

export default function ViewMarketPage() {
  return (
    <PageLayout title="View Liquidity">
      <div className="flex w-full justify-center">
        <div className="flex gap-6">
          <div className="bg-chinese-black w-screen max-w-3xl rounded-3xl border border-eerie-black/50">
            <div className="flex items-center gap-6 border-b border-eerie-black px-6 py-4">
              <div className="flex items-center">
                <div className="relative w-16">
                  <Avatar src={USDCIcon} className="h-8 w-8 shadow-sm drop-shadow-sm" rootClassName="h-8 w-8 z-10" />
                  <Avatar src={SolanaIcon} className="h-8 w-8" rootClassName="absolute bottom-0 right-3 h-8 w-8 z-0" />
                </div>
                <Label className="text-lg font-medium text-white">USDC/SOL</Label>
              </div>
              <Label className="text-chinese-green bg-gunmetal rounded-xl px-2 py-1 text-xs font-semibold">0.05%</Label>
            </div>
            <LiquidityChart />
            <div className="w-full">
              <Tabs defaultValue="liquidity" className="w-full">
                <TabsList className="flex w-full justify-between border-b border-eerie-black/50 bg-transparent px-6 py-6">
                  <div className="flex justify-start gap-[29px]">
                    <TabHead value="liquidity" title="Liquidity" />
                    <TabHead value="transactions" title="Transactions" />
                  </div>
                  <NetworkSelectorButton text="Chain" className="py-0 text-gray-200 hover:text-white" />
                </TabsList>
                <TabsContent value="liquidity" className="w-full">
                  <LiquidityTable />
                </TabsContent>
                <TabsContent value="transactions" className="w-full">
                  <TransactionsTable />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="flex w-screen max-w-[400px] flex-col gap-6">
            <div className="flex flex-col gap-3">
              <LiquiditySwap />
              <div className="bg-chinese-black w-full rounded-3xl border border-eerie-black/50">
                <div className="border-b border-eerie-black/50 px-5 py-3">
                  <Label className="text-lotion text-xl font-semibold">Stats</Label>
                </div>
                <div className="flex w-full flex-col gap-4 px-5 py-3">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <Label className="text-cool-grey font-light">Amount Available</Label>
                        <Label className="text-anti-flash-white font-dosis text-2xl font-semibold">$10m USDC</Label>
                      </div>
                      <div className="flex flex-col">
                        <Label className="text-cool-grey font-light">24Hr Fees.</Label>
                        <Label className="text-anti-flash-white font-dosis text-2xl font-semibold">$100k</Label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <Label className="text-cool-grey font-light">TVL</Label>
                        <div className="flex items-center gap-3">
                          <Label className="text-anti-flash-white font-dosis text-2xl font-semibold">$40.5</Label>
                          <div className="flex items-center">
                            <IconTriangleUp />
                            <Label className="text-go-green font-light">0.03%</Label>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <Label className="text-cool-grey font-light">24Hr Vol.</Label>
                        <div className="flex items-center gap-3">
                          <Label className="text-anti-flash-white font-dosis text-2xl font-semibold">$80.5m</Label>
                          <div className="flex items-center">
                            <IconTriangleDown />
                            <Label className="text-coral-red font-light">20%</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 p-2 px-5">
              <Label className="text-lotion text-xl font-medium">Links</Label>
              <div className="flex w-full flex-col gap-4">
                {[1, 2, 3, 4].map((_) => (
                  <div className="flex w-full justify-between tracking-wide">
                    <div className="flex items-center">
                      <div className="relative w-10">
                        <Avatar
                          src={USDCIcon}
                          className="h-6 w-6 shadow-sm drop-shadow-sm"
                          rootClassName="h-6 w-6 z-10"
                        />
                        <Avatar
                          src={SolanaIcon}
                          className="h-6 w-6"
                          rootClassName="absolute bottom-0 right-[2px] h-6 w-6 z-0"
                        />
                      </div>
                      <Label className="text-xs font-light text-white">USDC/USDT</Label>
                    </div>
                    <div className="flex">
                      <div className="border-vampire-black rounded-s-3xl border bg-eerie-black px-3">
                        <Label className="text-cool-grey text-xs font-light">0x123...9867</Label>
                      </div>
                      <Link to={"#"}>
                        <div className="flex items-center rounded-e-3xl border border-eerie-black bg-eerie-black px-1">
                          <Label className="text-chinese-green text-xs font-normal">View</Label>
                          <IconOpenLink />
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function TabHead({ value, title }: { value: string; title: string }) {
  return (
    <TabsTrigger
      value={value}
      className="text-black-coral flex items-center gap-1 p-0 text-sm font-semibold data-[state=active]:bg-transparent data-[state=active]:text-white"
    >
      {title}
    </TabsTrigger>
  );
}
