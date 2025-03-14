import { NetworkSelectorButton } from "@/components/AssetButton";
import TabHead from "@/components/TabHead";
import { IconSearch } from "@/components/icons/IconSearch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import PageLayout from "@/layouts/PageLayout";
import { useState } from "react";
import LiquidityTable from "./liquidity-table";
import MarketsTable from "./markets-table";
import TokenTable from "./token-table";
import TransactionsTable from "./transactions-table";
import VolumeFilter from "./volume-filter";
import { ChevronDown, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/libs/utils";
import { SelectChainButton } from "./options/select-chain";
import { SearchTokenButton } from "./options/search-token";
import { SelectVolumeButton } from "./options/select-volume";

enum TabHeader {
  TOKEN = "token",
  LIQUIDITY = "liquidity",
  MARKETS = "markets",
  TRANSACTIONS = "transactions",
}

export default function ExplorePage() {
  const [currentTab, setCurrentTab] = useState(TabHeader.TOKEN);

  return (
    <PageLayout title="Explore">
      <div className="mt-4 flex w-full justify-center px-4">
        <div className="w-full max-w-5xl">
          <div className="rounded-3xl border border-eerie-black/50 bg-chinese-black">
            <Tabs defaultValue="token" className="w-full" onValueChange={(value) => setCurrentTab(value as any)}>
              <TabsList className="flex h-[55px] w-full justify-between bg-transparent px-5 pr-1 pt-2">
                <div className="flex justify-start gap-4 lg:gap-[25px]">
                  <TabHead className="text-sm md:text-base" value="token" title="Token" />
                  <TabHead className="text-sm md:text-base" value="liquidity" title="Liquidity" />
                  <TabHead className="text-sm md:text-base" value="markets" title="Markets" />
                  <TabHead className="text-sm md:text-base" value="transactions" title="Transactions" />
                </div>
                <div className="flex lg:hidden">
                  <MoreButton />
                </div>
                <div className="hidden items-center gap-2 lg:flex">
                  {shouldAddLiquidity(currentTab) && (
                    <Button
                      variant={"secondary"}
                      className="h-[30px] bg-white py-0 text-sm font-semibold text-gunmetal"
                    >
                      + Add Liquidity
                    </Button>
                  )}
                  <NetworkSelectorButton text="Chain" className="text-gray-200 hover:text-white" />
                  {shouldVolumeFilter(currentTab) && <VolumeFilter />}
                  {shouldShowSearch(currentTab) && <SearchInput />}
                </div>
              </TabsList>
              <TabsContent value="token" className="w-full">
                <TokenTable />
              </TabsContent>
              <TabsContent value="liquidity" className="w-full">
                <LiquidityTable />
              </TabsContent>
              <TabsContent value="markets" className="w-full">
                <MarketsTable />
              </TabsContent>
              <TabsContent value="transactions" className="w-full">
                <TransactionsTable />
              </TabsContent>
            </Tabs>
          </div>
          <div className="mt-6 flex w-full flex-col items-center justify-center gap-6 lg:flex-row lg:justify-between lg:gap-0">
            <div className="flex w-fit gap-1">
              <Label className="text-sm font-light text-cool-grey">Showing</Label>
              <Label className="text-sm font-semibold text-cool-grey">31-40</Label>
              <Label className="text-sm font-light text-cool-grey">of</Label>
              <Label className="text-sm font-semibold text-cool-grey">256</Label>
            </div>
            <Pagination className="m-0 w-fit">
              <PaginationContent className="">
                <PaginationItem className="">
                  <PaginationPrevious href="#" hideText />
                </PaginationItem>
                <PaginationItem className="flex gap-1">
                  <PaginationLink className="text-xs font-semibold text-cool-grey" href="#" isActive>
                    1
                  </PaginationLink>
                  <PaginationLink className="text-xs font-semibold text-cool-grey" href="#">
                    2
                  </PaginationLink>
                  <PaginationLink className="text-xs font-semibold text-cool-grey" href="#">
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className="text-xs font-semibold text-cool-grey" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink className="text-xs font-semibold text-cool-grey" href="#">
                    12
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext className="" href="#" hideText />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function SearchInput() {
  return (
    <div className="flex h-11 w-[204px] items-center justify-between gap-1 rounded-3xl bg-eerie-black px-3 py-1">
      <IconSearch className="opacity-40" />
      <input
        type="text"
        className="w-full border-none bg-transparent text-white outline-none placeholder:text-cool-grey active:border-none active:bg-transparent active:outline-none"
        placeholder="Search tokens"
      />
    </div>
  );
}

function shouldShowSearch(option: TabHeader) {
  return option === TabHeader.LIQUIDITY || option === TabHeader.MARKETS || option === TabHeader.TOKEN;
}

function shouldVolumeFilter(option: TabHeader) {
  return option === TabHeader.TOKEN;
}

function shouldAddLiquidity(option: TabHeader) {
  return option === TabHeader.LIQUIDITY || option === TabHeader.MARKETS;
}

function MoreButton() {
  const [open, setOpen] = useState(false);

  return (
    <Popover onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger>
        <Button variant={"ghost"} className="p-0 hover:bg-transparent hover:text-white">
          <ChevronDown className={cn("size-6 transition-all duration-300", { "rotate-180": open })} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[217px] flex-col gap-1 rounded-3xl border-none bg-vampire-black p-2"
        side="bottom"
        align="end"
      >
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Add Liquidity
          <Plus className="text-cool-grey group-hover:text-white" />
        </Button>
        <SelectChainButton/>
        <SelectVolumeButton/>
        <SearchTokenButton/>
      </PopoverContent>
    </Popover>
  );
}
