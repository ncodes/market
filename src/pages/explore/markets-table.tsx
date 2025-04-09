import { DataTable } from "@/components/data-table";
import { marketsColumns, MarketsProps } from "./columns";

function getData(): MarketsProps[] {
  return [
    {
      sn: 1,
      token: "USDC/USDT",
      feePct: "0.05%",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      "7d_vol": "$4B",
    },
    {
      sn: 2,
      token: "USDC/USDT",
      feePct: "0.05%",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      "7d_vol": "$4B",
    },
    {
      sn: 3,
      token: "USDC/USDT",
      feePct: "0.05%",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      "7d_vol": "$4B",
    },
    {
      sn: 4,
      token: "USDC/USDT",
      feePct: "0.05%",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      "7d_vol": "$4B",
    },
    {
      sn: 5,
      token: "USDC/USDT",
      feePct: "0.05%",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      "7d_vol": "$4B",
    },
    {
      sn: 6,
      token: "USDC/USDT",
      feePct: "0.05%",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      "7d_vol": "$4B",
    },
    {
      sn: 7,
      token: "USDC/USDT",
      feePct: "0.05%",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      "7d_vol": "$4B",
    },
    {
      sn: 8,
      token: "USDC/USDT",
      feePct: "0.05%",
      tvl: "$4B",
      "30d_vol": "$1B",
      "1d_vol": "$4B",
      "7d_vol": "$4B",
    },
  ];
}

export default function MarketsTable() {
  const data = getData();

  return (
    <div className="w-full">
      <DataTable
        className="overflow-hidden rounded-b-3xl text-sm font-light [&_th:first-child]:flex [&_th:first-child]:justify-center [&_th]:border-y [&_th]:border-gunmetal/40 [&_th]:font-light [&_tr]:!border-none"
        tableCellClassName="!cursor-pointer py-2"
        tableRowClassName="hover:bg-transparent"
        tableHeadClassName="text-cool-grey text-sm font-semibold"
        columns={marketsColumns}
        data={data}
      />
    </div>
  );
}
