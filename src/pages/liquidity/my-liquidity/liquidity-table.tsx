import { NetworkSelectorButton } from "@/components/AssetButton";
import { DataTable } from "@/components/DataTable";
import InfoLabel from "@/components/InfoLabel";
import { Button } from "@/components/ui/button";
import { liquidityColumns, LiquidityProps } from "./liquidity-columns";
import StatusFilter from "./status-filter";
import { ChevronDown } from "lucide-react";

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
      <div className="flex w-full items-center justify-between px-6 py-4">
        <InfoLabel
          className="text-2xl font-semibold tracking-wider"
          info="My Liquidity"
          text="My Liquidity"
          toolTipClassname="w-6 h-6"
        />
        <Button variant={"ghost"} className="p-0 hover:bg-transparent hover:text-white flex lg:hidden"><ChevronDown className="w-6 text-2xl"/></Button>
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
