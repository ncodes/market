import { SolanaIcon, USDCIcon } from "@/assets";
import { NetworkSelectorButton } from "@/components/AssetButton";
import TabHead from "@/components/TabHead";
import { Avatar } from "@/components/avatar/Avatar";
import IconOpenLink from "@/components/icons/IconOpenLink";
import IconTriangleDown from "@/components/icons/IconTriangleDown";
import IconTriangleUp from "@/components/icons/IconTriangleUp";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import PageLayout from "@/layouts/PageLayout";
import { Link } from "react-router-dom";
import LiquidityChart from "./chart";
import LiquidityTable from "./liquidity-table";
import LiquiditySwap from "./swap";
import TransactionsTable from "./transactions-table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/libs/utils";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import UpdateCommision from "./options/update-commision";
import AddSwapper from "./options/add-swapper";
import AddProvider from "./options/add-provider";
import RenounceOwnership from "./options/renounce-ownership";
import TransferOwnership from "./options/transfer-ownership";

export default function ViewMarketPage() {
  return (
    <PageLayout title="View Liquidity">
      <div className="flex w-full justify-center">
        <div className="flex gap-6">
          <div className="w-screen max-w-3xl rounded-3xl border border-eerie-black/50 bg-chinese-black">
            <div className="flex items-center justify-between border-b border-eerie-black px-6 py-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <div className="relative w-16">
                    <Avatar src={USDCIcon} className="h-8 w-8 shadow-sm drop-shadow-sm" rootClassName="h-8 w-8 z-10" />
                    <Avatar
                      src={SolanaIcon}
                      className="h-8 w-8"
                      rootClassName="absolute bottom-0 right-3 h-8 w-8 z-0"
                    />
                  </div>
                  <Label className="text-lg font-medium text-white">USDC/SOL</Label>
                </div>
                <Label className="rounded-xl bg-gunmetal px-2 py-1 text-xs font-semibold text-screaming-green">
                  0.05%
                </Label>
              </div>
              <EditButton />
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
              <div className="w-full rounded-3xl border border-eerie-black/50 bg-chinese-black">
                <div className="border-b border-eerie-black/50 px-5 py-3">
                  <Label className="text-xl font-semibold text-lotion">Stats</Label>
                </div>
                <div className="flex w-full flex-col gap-4 px-5 py-3">
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <Label className="font-light text-cool-grey">Amount Available</Label>
                        <Label className="font-dosis text-2xl font-semibold text-anti-flash-white">$10m USDC</Label>
                      </div>
                      <div className="flex flex-col">
                        <Label className="font-light text-cool-grey">24Hr Fees.</Label>
                        <Label className="font-dosis text-2xl font-semibold text-anti-flash-white">$100k</Label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <Label className="font-light text-cool-grey">TVL</Label>
                        <div className="flex items-center gap-3">
                          <Label className="font-dosis text-2xl font-semibold text-anti-flash-white">$40.5</Label>
                          <div className="flex items-center">
                            <IconTriangleUp />
                            <Label className="font-light text-go-green">0.03%</Label>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <Label className="font-light text-cool-grey">24Hr Vol.</Label>
                        <div className="flex items-center gap-3">
                          <Label className="font-dosis text-2xl font-semibold text-anti-flash-white">$80.5m</Label>
                          <div className="flex items-center">
                            <IconTriangleDown />
                            <Label className="font-light text-coral-red">20%</Label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4 p-2 px-5">
              <Label className="text-xl font-medium text-lotion">Links</Label>
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
                      <div className="rounded-s-3xl border border-vampire-black bg-eerie-black px-3">
                        <Label className="text-xs font-light text-cool-grey">0x123...9867</Label>
                      </div>
                      <Link to={"#"}>
                        <div className="flex items-center rounded-e-3xl border border-eerie-black bg-eerie-black px-1">
                          <Label className="text-xs font-normal text-screaming-green">View</Label>
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

function EditButton() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger>
        <Button
          variant={"secondary"}
          className="flex h-[30px] gap-2 bg-white px-3 pl-5 text-sm font-semibold hover:bg-white/70"
          onClick={() => setOpen(true)}
        >
          Edit
          <ChevronDown className={cn("size-6 transition-all duration-300", { "rotate-180": open })} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[217px] flex-col gap-1 rounded-3xl border-none bg-vampire-black p-2"
        side="bottom"
        align="end"
      >
        <UpdateCommision />
        <AddSwapper />
        <AddProvider />
        <TransferOwnership />
        <RenounceOwnership />
      </PopoverContent>
    </Popover>
  );
}
