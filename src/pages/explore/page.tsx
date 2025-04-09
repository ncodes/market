import { NetworkSelectorButton } from "@/components/asset-button";
import { IconSearch } from "@/components/icons/IconSearch";
import TabHeader from "@/components/tab-header";
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import PageLayout from "@/layouts/PageLayout";
import { AppPages } from "@/libs/pages";
import { cn } from "@/libs/utils";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LiquidityTable from "./liquidity-table";
import MarketsTable from "./markets-table";
import { SearchTokenButton } from "./options/search-token";
import { SelectChainButton } from "./options/select-chain";
import { SelectVolumeButton } from "./options/select-volume";
import TokenTable from "./token-table";
import TransactionsTable from "./transactions-table";
import VolumeFilter from "./volume-filter";

enum PageTabHeaders {
  TOKEN = "token",
  LIQUIDITY = "liquidity",
  MARKETS = "markets",
  TRANSACTIONS = "transactions",
}

export default function ExplorePage() {
  const [currentTab, setCurrentTab] = useState(PageTabHeaders.TOKEN);
  const navigate = useNavigate();

  return (
    <PageLayout title="Explore">
      <div className="mt-4 flex w-full justify-center px-4">
        <div className="w-full max-w-5xl">
          <div className="rounded-3xl border border-eerie-black/50 bg-chinese-black">
            <Tabs defaultValue="token" className="w-full" onValueChange={(value) => setCurrentTab(value as any)}>
              <TabsList className="flex h-[55px] w-full justify-between bg-transparent px-5 pt-2">
                <TabHeader items={["Token", "Liquidity", "Markets", "Transactions"]} />
                <div className="flex lg:hidden">
                  <MoreButton />
                </div>
                <div className="hidden items-center gap-2 lg:flex">
                  {shouldAddLiquidity(currentTab) && (
                    <Button
                      onClick={() => navigate(AppPages.createLiquidity)}
                      variant={"secondary"}
                      className="h-[30px] bg-white py-0 text-sm font-semibold text-gunmetal"
                    >
                      + Add Liquidity
                    </Button>
                  )}
                  <NetworkSelectorButton
                    text="Chain"
                    className="gap-1.5 text-gray-200 hover:text-white"
                    imgClassName="h-6 w-6"
                  />
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

function shouldShowSearch(option: PageTabHeaders) {
  return option === PageTabHeaders.LIQUIDITY || option === PageTabHeaders.MARKETS || option === PageTabHeaders.TOKEN;
}

function shouldVolumeFilter(option: PageTabHeaders) {
  return option === PageTabHeaders.TOKEN;
}

function shouldAddLiquidity(option: PageTabHeaders) {
  return option === PageTabHeaders.LIQUIDITY || option === PageTabHeaders.MARKETS;
}

function MoreButton() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Popover onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger asChild>
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
          onClick={() => navigate(AppPages.createLiquidity)}
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Add Liquidity
          <Plus className="text-cool-grey group-hover:text-white" />
        </Button>
        <SelectChainButton />
        <SelectVolumeButton />
        <SearchTokenButton />
      </PopoverContent>
    </Popover>
  );
}
