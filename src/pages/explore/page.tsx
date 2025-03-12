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
import { ChevronDown } from "lucide-react";

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
                  <TabHead value="token" title="Token" />
                  <TabHead value="liquidity" title="Liquidity" />
                  <TabHead value="markets" title="Markets" />
                  <TabHead value="transactions" title="Transactions" />
                </div>
                <Button variant={"ghost"} className="hover:bg-transparent hover:text-white">
                  <ChevronDown />
                </Button>
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
          <div className="mt-4 flex w-full items-center justify-center lg:justify-between">
            <div className="flex w-fit gap-1">
              <Label className="text-sm font-light text-cool-grey">Showing</Label>
              <Label className="text-sm font-semibold text-cool-grey">31-40</Label>
              <Label className="text-sm font-light text-cool-grey">of</Label>
              <Label className="text-sm font-semibold text-cool-grey">256</Label>
            </div>
            <Pagination className="hidden lg:block m-0 w-fit">
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
