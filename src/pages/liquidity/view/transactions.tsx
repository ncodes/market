import { DataTable } from "@/components/DataTable";
import { liquidityTransactionsColumns, LiquidityTransactionsProps } from "./transactions-columns";

function getData(): LiquidityTransactionsProps[] {
  return [
    { time: "13min ago", type: "Buy", usd: "$678", usdc: "100", usdt: "102", wallet: "0x124…867" },
    { time: "13min ago", type: "Sell", usd: "$678", usdc: "100", usdt: "102", wallet: "0x124…867" },
    { time: "1min ago", type: "Buy", usd: "$678", usdc: "100", usdt: "102", wallet: "0x124…867" },
    { time: "13min ago", type: "Sell", usd: "$678", usdc: "100", usdt: "102", wallet: "0x124…867" },
  ];
}

export default function LiquidityTransactions() {
  const data = getData();

  return (
    <div className="w-full">
      <DataTable
        className="[&_th]:border-gunmetal/40 overflow-auto rounded-b-3xl text-sm font-light [&_td:first-child]:pl-2 [&_th:first-child]:pl-2 [&_td:first-child]:xs:pl-6 [&_th:first-child]:xs:pl-6 [&_th]:border-y [&_tr]:!border-none"
        tableCellClassName="!cursor-pointer py-3"
        tableRowClassName="hover:bg-transparent"
        tableHeadClassName="text-cool-grey text-sm font-semibold"
        columns={liquidityTransactionsColumns}
        data={data}
      />
    </div>
  );
}
