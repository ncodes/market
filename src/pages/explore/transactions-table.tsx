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
      wallet: "0x12345879867",
    },
    {
      sn: 2,
      time: "13min ago",
      type: { from: "USDT", to: "SOL" },
      value: "$1B",
      quote: "10,000 USDC",
      base: "10,000 USDC",
      wallet: "0x12345879867",
    },
    {
      sn: 3,
      time: "13min ago",
      type: { from: "USDT", to: "SOL" },
      value: "$1B",
      quote: "10,000 USDC",
      base: "10,000 USDC",
      wallet: "0x12345879867",
    },
    {
      sn: 4,
      time: "13min ago",
      type: { from: "USDT", to: "SOL" },
      value: "$1B",
      quote: "10,000 USDC",
      base: "10,000 USDC",
      wallet: "0x12345879867",
    },

    {
      sn: 5,
      time: "13min ago",
      type: { from: "USDT", to: "SOL" },
      value: "$1B",
      quote: "10,000 USDC",
      base: "10,000 USDC",
      wallet: "0x12345879867",
    },

    {
      sn: 6,
      time: "13min ago",
      type: { from: "USDT", to: "SOL" },
      value: "$1B",
      quote: "10,000 USDC",
      base: "10,000 USDC",
      wallet: "0x12345879867",
    },

    {
      sn: 7,
      time: "13min ago",
      type: { from: "USDT", to: "SOL" },
      value: "$1B",
      quote: "10,000 USDC",
      base: "10,000 USDC",
      wallet: "0x12345879867",
    },

    {
      sn: 8,
      time: "13min ago",
      type: { from: "USDT", to: "SOL" },
      value: "$1B",
      quote: "10,000 USDC",
      base: "10,000 USDC",
      wallet: "0x12345879867",
    },
  ];
}

export default function TransactionsTable() {
  const data = getData();

  return (
    <div className="w-full">
      <DataTable
        className="overflow-hidden rounded-b-3xl text-sm font-light [&_th:first-child]:flex [&_th:first-child]:justify-center [&_th]:border-y [&_th]:border-gunmetal/40 [&_th]:font-light [&_tr]:!border-none"
        tableCellClassName="!cursor-pointer py-2.5"
        tableRowClassName="hover:bg-transparent"
        tableHeadClassName="text-cool-grey text-sm font-semibold"
        columns={transactionsColumns}
        data={data}
      />
    </div>
  );
}
