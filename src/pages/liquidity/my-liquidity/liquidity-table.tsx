import { DataTable } from "@/components/DataTable";
import { liquidityColumns, LiquidityProps } from "./liquidity-columns";
import InfoLabel from "@/components/InfoLabel";

function getData(): LiquidityProps[] {
  return Array.from({ length: 11 }, (_, i) => i + 1).map((value) => ({
    id: value.toString(),
    market: "USDC/USDT",
    amount: { value: "10,000", info: "Base" },
    price: { value: "40 USDC", info: "(Auto - + 15%)" },
    target: "0x12345879867",
    status: "active",
    oneDayVolume: "$4M",
    thirtyDayVolume: "$20M",
  }));
}

export default function LiquidityTable() {
  const data = getData();

  return (
    <div className="border-gunmetal w-full rounded-3xl border bg-chinese-black">
      <div className="flex w-full items-center justify-between px-6 py-4">
        <InfoLabel
          className="text-2xl font-semibold"
          info="My Liquidity"
          text="My Liquidity"
          toolTipClassname="w-6 h-6"
        />
        <div></div>
      </div>
      <DataTable
        className="[&_th]:border-gunmetal text-sm font-light [&_th]:border-y [&_tr]:!border-none"
        columns={liquidityColumns}
        data={data}
      />
    </div>
  );
}
