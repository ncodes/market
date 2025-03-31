import { DataTable } from "@/components/data-table";
import { liquidityColumns, LiquidyTableProps } from "./columns";

function getData(): LiquidyTableProps[] {
  return [
    {
      sn: 1,
      token: "USDC/USDT",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      provider: "0x1234567890123456789012345678901234567890",
      lastSwapAt: "10s ago",
    },
    {
      sn: 2,
      token: "USDC/USDT",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      provider: "0x1234567890123456789012345678901234567890",
      lastSwapAt: "10s ago",
    },
    {
      sn: 3,
      token: "USDC/USDT",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      provider: "0x1234567890123456789012345678901234567890",
      lastSwapAt: "10s ago",
    },
    {
      sn: 4,
      token: "USDC/USDT",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      provider: "0x1234567890123456789012345678901234567890",
      lastSwapAt: "10s ago",
    },
    {
      sn: 5,
      token: "USDC/USDT",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      provider: "0x1234567890123456789012345678901234567890",
      lastSwapAt: "10s ago",
    },
    {
      sn: 6,
      token: "USDC/USDT",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      provider: "0x1234567890123456789012345678901234567890",
      lastSwapAt: "10s ago",
    },
    {
      sn: 7,
      token: "USDC/USDT",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      provider: "0x1234567890123456789012345678901234567890",
      lastSwapAt: "10s ago",
    },
    {
      sn: 8,
      token: "USDC/USDT",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      provider: "0x1234567890123456789012345678901234567890",
      lastSwapAt: "10s ago",
    },
  ];
}

export default function LiquidityTable() {
  const data = getData();

  return (
    <div className="w-full">
      <DataTable
        className="overflow-hidden rounded-b-3xl text-sm font-light [&_th:first-child]:flex [&_th:first-child]:justify-center [&_th]:border-y [&_th]:border-gunmetal/40 [&_th]:font-light [&_tr]:!border-none"
        tableCellClassName="!cursor-pointer py-1.5"
        tableRowClassName="hover:bg-transparent"
        tableHeadClassName="text-cool-grey text-sm font-semibold"
        columns={liquidityColumns}
        data={data}
      />
    </div>
  );
}
