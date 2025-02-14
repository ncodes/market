import { DataTable } from "@/components/DataTable";
import { liquidityColumns, LiquidityTableProps } from "./columns";

function getData(): LiquidityTableProps[] {
  return [
    { sn: 1, token: "USDC/USDT", tvl: "$4B", "30d_vol": "$20M", "1d_vol": "$4B" },
    { sn: 2, token: "USDC/USDT", tvl: "$4B", "30d_vol": "$20M", "1d_vol": "$4B" },
    { sn: 3, token: "USDC/USDT", tvl: "$4B", "30d_vol": "$20M", "1d_vol": "$4B" },
    { sn: 4, token: "USDC/USDT", tvl: "$4B", "30d_vol": "$20M", "1d_vol": "$4B" },
  ];
}

export default function LiquidityTable() {
  const data = getData();

  return (
    <div className="w-full">
      <DataTable
        className="[&_th]:border-gunmetal/40 overflow-hidden rounded-b-3xl text-sm font-light [&_td:first-child]:pl-7 [&_th:first-child]:pl-7 [&_th]:border-y [&_tr]:!border-none"
        tableCellClassName="!cursor-pointer py-3"
        tableRowClassName="hover:bg-transparent"
        tableHeadClassName="text-cool-grey text-sm font-semibold"
        columns={liquidityColumns}
        data={data}
      />
    </div>
  );
}
