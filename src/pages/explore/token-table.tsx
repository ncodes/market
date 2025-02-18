import { DataTable } from "@/components/DataTable";
import { tokenColumns, TokenTableProps } from "./columns";

const chartData = [
  { value: 10 },
  { value: 15 },
  { value: 12 },
  { value: 20 },
  { value: 8 },
  { value: 18 },
  { value: 25 },
  { value: 22 },
  { value: 30 },
  { value: 8 },
  { value: 18 },
  { value: 25 },
  { value: 22 },
  { value: 30 },
  { value: 8 },
  { value: 18 },
  { value: 25 },
  { value: 22 },
  { value: 30 },
];

function getData(): TokenTableProps[] {
  return [
    {
      sn: 1,
      name: "USDC",
      price: "10,000",
      "1h_change": { value: "0.07%", isPositive: true },
      "1d_change": { value: "0.07%", isPositive: false },
      fdv: "$4B",
      volume: "$1B",
      chart: { data: chartData, isPositive: true },
    },
    {
      sn: 2,
      name: "USDC",
      price: "10,000",
      "1h_change": { value: "0.07%", isPositive: false },
      "1d_change": { value: "0.07%", isPositive: true },
      fdv: "$4B",
      volume: "$1B",
      chart: { data: chartData, isPositive: false },
    },
    {
      sn: 3,
      name: "USDC",
      price: "10,000",
      "1h_change": { value: "0.07%", isPositive: false },
      "1d_change": { value: "0.07%", isPositive: true },
      fdv: "$4B",
      volume: "$1B",
      chart: { data: chartData, isPositive: false },
    },
    {
      sn: 4,
      name: "USDC",
      price: "10,000",
      "1h_change": { value: "0.07%", isPositive: true },
      "1d_change": { value: "0.07%", isPositive: false },
      fdv: "$4B",
      volume: "$1B",
      chart: { data: chartData, isPositive: true },
    },
    {
      sn: 5,
      name: "USDC",
      price: "10,000",
      "1h_change": { value: "0.07%", isPositive: true },
      "1d_change": { value: "0.07%", isPositive: false },
      fdv: "$4B",
      volume: "$1B",
      chart: { data: chartData, isPositive: false },
    },
    {
      sn: 6,
      name: "USDC",
      price: "10,000",
      "1h_change": { value: "0.07%", isPositive: true },
      "1d_change": { value: "0.07%", isPositive: true },
      fdv: "$4B",
      volume: "$1B",
      chart: { data: chartData, isPositive: true },
    },
    {
      sn: 7,
      name: "USDC",
      price: "10,000",
      "1h_change": { value: "0.07%", isPositive: false },
      "1d_change": { value: "0.07%", isPositive: true },
      fdv: "$4B",
      volume: "$1B",
      chart: { data: chartData, isPositive: false },
    },
  ];
}

export default function TokenTable() {
  const data = getData();

  return (
    <div className="w-full">
      <DataTable
        className="overflow-hidden rounded-b-3xl text-sm font-light [&_th:first-child]:flex [&_th:first-child]:justify-center [&_th]:border-y [&_th]:border-gunmetal/40 [&_th]:font-light [&_tr]:!border-none"
        tableCellClassName="!cursor-pointer py-2"
        tableRowClassName="hover:bg-transparent"
        tableHeadClassName="text-cool-grey text-sm font-semibold"
        columns={tokenColumns}
        data={data}
      />
    </div>
  );
}
