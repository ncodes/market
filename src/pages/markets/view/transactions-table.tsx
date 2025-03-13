import { DataTable } from "@/components/DataTable";
import { transactionsColumns, TransactionsTableProps } from "./columns";

function getData(): TransactionsTableProps[] {
  return [
    {
      sn: 1,
      time: "13min ago",
      type: { from: "USDT", to: "SOL" },
      value: "$1B",
      quote: "10,000 USDC",
      base: "10,000 USDC",
    },
    {
      sn: 2,
      time: "13min ago",
      type: { from: "USDT", to: "SOL" },
      value: "$1B",
      quote: "10,000 USDC",
      base: "10,000 USDC",
    },
    {
      sn: 3,
      time: "13min ago",
      type: { from: "USDT", to: "SOL" },
      value: "$1B",
      quote: "10,000 USDC",
      base: "10,000 USDC",
    },
    {
      sn: 4,
      time: "13min ago",
      type: { from: "USDT", to: "SOL" },
      value: "$1B",
      quote: "10,000 USDC",
      base: "10,000 USDC",
    },
  ];
}

export default function TransactionsTable() {
  const data = getData();

  return (
    <div className="w-full">
      <DataTable
        className="[&_th]:border-gunmetal/40 overflow-hidden rounded-b-3xl text-sm font-light [&_td:first-child]:pl-2 [&_th:first-child]:pl-2 [&_td:first-child]:sm:pl-6 [&_th:first-child]:sm:pl-6 [&_th]:border-y [&_tr]:!border-none"
        tableCellClassName="!cursor-pointer py-3"
        tableRowClassName="hover:bg-transparent"
        tableHeadClassName="text-cool-grey text-sm font-semibold"
        columns={transactionsColumns}
        data={data}
      />
    </div>
  );
}
