import { NetworkSelectorButton } from "@/components/asset-button";
import { DataTable } from "@/components/data-table";
import InfoLabel from "@/components/info-label";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AppPages } from "@/libs/pages";
import { cn } from "@/libs/utils";
import { SelectChainButton } from "@/pages/explore/options/select-chain";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LiquidityProps, liquidityColumns } from "./liquidity-columns";
import { SelectStatusButton } from "./options/select-volume";
import StatusFilter from "./status-filter";

function getData(): LiquidityProps[] {
  return Array.from({ length: 10 }, (_, i) => i + 1).map((value) => ({
    id: value.toString(),
    market: "USDC/USDT",
    amount: { value: "10,000", info: "Base" },
    price: { value: "40 USDC", info: "auto +12%" },
    target: "0x12345879867",
    status: "active",
    oneDayVolume: "$4M",
    thirtyDayVolume: "$20M",
  }));
}

export default function LiquidityTable() {
  const data = getData();

  return (
    <div className="w-full overflow-hidden rounded-3xl border border-eerie-black bg-chinese-black">
      <div className="flex w-full items-center justify-between px-6 py-2">
        <InfoLabel
          className="text-xl font-semibold tracking-wider lg:text-2xl"
          info="My Liquidity"
          text="My Liquidity"
          toolTipClassname="w-6 h-6"
        />
        <div className="flex lg:hidden">
          <MoreButton />
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <NetworkSelectorButton text="Chain" className="text-gray-200 hover:text-white" />
          <StatusFilter />
          <Button variant={"secondary"} className="h-[30px] bg-white px-7 text-sm font-semibold hover:bg-white/70">
            Add +
          </Button>
        </div>
      </div>
      <DataTable
        className="text-sm font-light [&_th]:border-y [&_th]:border-gunmetal/40 [&_tr]:!border-none"
        tableCellClassName="!cursor-pointer py-3"
        tableRowClassName="hover:bg-transparent"
        tableHeadClassName="text-gray-400 font-light"
        columns={liquidityColumns}
        data={data}
      />
    </div>
  );
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
        <SelectChainButton />
        <SelectStatusButton />
        <Button
          onClick={() => navigate(AppPages.createLiquidity)}
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Add Liquidity
          <Plus className="text-cool-grey group-hover:text-white" />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
