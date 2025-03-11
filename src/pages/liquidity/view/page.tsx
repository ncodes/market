import { SolanaIcon, USDCIcon } from "@/assets";
import { Avatar } from "@/components/avatar/Avatar";
import IconActive from "@/components/icons/IconActive";
import IconDropDown from "@/components/icons/IconDropDown";
import IconLock from "@/components/icons/IconLock";
import IconOpenLink from "@/components/icons/IconOpenLink";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/layouts/PageLayout";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import LiquidityChart from "./chart";
import PauseLiquidity from "./options/pause-liquidity";
import UpdateManager from "./options/update-manager";
import UpdatePrice from "./options/update-price";
import LiquiditySwap from "./swap";
import LiquidityTransactions from "./transactions";
import UpdateTarget from "./options/update-target";
import useStore from "@/hooks/store/useStore";
import AdjustAmount from "./options/adjust-amount";
import { cn } from "@/libs/utils";
import { useState } from "react";

export default function ViewLiquidityPage() {
  const { setOpenAdjustAmount } = useStore();

  return (
    <PageLayout title="View Liquidity">
      <div className="flex w-full justify-center">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-screen max-w-full lg:max-w-3xl rounded-3xl border border-eerie-black/50 bg-chinese-black">
            <div className="flex justify-between border-b border-eerie-black px-6 py-4">
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
                <Label className="flex items-center gap-1 text-xs font-light text-light-periwinkle">
                  <IconActive /> Active
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Label className="flex items-center gap-1 text-xs font-semibold text-cool-grey">
                  <IconLock /> Permissioned
                </Label>
                <Button
                  variant={"secondary"}
                  className="h-[30px] bg-white px-7 text-sm font-semibold hover:bg-white/70"
                  onClick={() => setOpenAdjustAmount(true)}
                >
                  Edit
                </Button>
                <AdjustAmount />
                <MoreButton />
              </div>
            </div>
            <div className="flex w-full items-start gap-32 border-b border-eerie-black px-6 py-4">
              <div className="flex flex-col">
                <Label className="h-4 text-sm font-light text-cool-grey">Amount</Label>
                <Label className="font-dosis text-2xl font-semibold text-anti-flash-white">
                  10,000,000 <span className="text-gray-400">JOIN</span>
                </Label>
              </div>
              <div className="flex flex-col">
                <Label className="h-4 text-sm font-light text-cool-grey">Price</Label>
                <Label className="font-dosis text-2xl font-semibold text-anti-flash-white">10.5 SOL</Label>
                <div className="flex gap-1">
                  <Label className="text-xs font-light text-cool-grey">Auto</Label>
                  <Label className="text-xs font-light text-ufo-green">+15%</Label>
                </div>
              </div>
              <div className="flex flex-col">
                <Label className="flex h-4 items-center text-sm font-light text-cool-grey">
                  1 Day Volume <IconDropDown className="h-5 w-5" />
                </Label>
                <Label className="font-dosis text-2xl font-semibold text-anti-flash-white">400 USDC</Label>
              </div>
            </div>
            <LiquidityChart />
            <div className="w-full">
              <Tabs defaultValue="transactions" className="w-full">
                <TabsList className="flex w-full justify-start gap-[29px] border-b border-eerie-black/50 bg-transparent px-6">
                  <TabHead value="transactions" title="Transactions" />
                  <TabHead value="lps" title="Permitted LPs" />
                  <TabHead value="takers" title="Permitted Takers" />
                </TabsList>
                <TabsContent value="transactions" className="w-full">
                  <LiquidityTransactions />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="flex w-screen max-w-[400px] flex-col gap-6">
            <LiquiditySwap />
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

function TabHead({ value, title }: { value: string; title: string }) {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center gap-1 p-0 text-sm font-semibold text-black-coral data-[state=active]:bg-transparent data-[state=active]:text-white"
    >
      {title}
    </TabsTrigger>
  );
}

function MoreButton() {
  const { setOpenAdjustAmount } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger>
        <Button
          variant={"secondary"}
          className="flex h-[30px] gap-2 bg-white px-3 pl-5 text-sm font-semibold hover:bg-white/70"
          onClick={() => setOpen(true)}
        >
          Manage
          <ChevronDown className={cn("size-6 transition-all duration-300", { "rotate-180": open })} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[217px] flex-col gap-1 rounded-3xl border-none bg-vampire-black p-2"
        side="bottom"
        align="end"
      >
        <Button
          onClick={() => setOpenAdjustAmount(true)}
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Adjust Amount
          <ChevronRight className="text-cool-grey group-hover:text-white" />
        </Button>
        <UpdatePrice />
        <UpdateManager />
        <UpdateTarget />
        <PauseLiquidity />
      </PopoverContent>
    </Popover>
  );
}
