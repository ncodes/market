import { DataTable } from "@/components/DataTable";
import { liquidityColumns, LiquidityProps } from "./liquidity-columns";
import InfoLabel from "@/components/InfoLabel";
import { Button } from "@/components/ui/button";
import IconDropDown from "@/components/icons/IconDropDown";
import { AllNetworksIcon } from "@/assets";
import { Label } from "@/components/ui/label";

function getData(): LiquidityProps[] {
  return Array.from({ length: 10 }, (_, i) => i + 1).map((value) => ({
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
    <div className="border-gunmetal bg-chinese-black w-full rounded-3xl border">
      <div className="flex w-full items-center justify-between px-6 py-4">
        <InfoLabel
          className="text-2xl font-semibold"
          info="My Liquidity"
          text="My Liquidity"
          toolTipClassname="w-6 h-6"
        />
        <div className="flex items-center gap-2">
          <Label className="font-medium text-white">Filter By:</Label>
          <Button
            variant={"ghost"}
            className="text-cool-grey hover:text-cool-grey gap-1 font-light hover:bg-transparent"
          >
            <img src={AllNetworksIcon} className="h-6 w-6" /> Chain <IconDropDown />
          </Button>
          <Button variant={"ghost"} className="text-cool-grey hover:text-cool-grey font-light hover:bg-transparent">
            Status <IconDropDown />
          </Button>
          <Button variant={"secondary"} className="h-[30px] bg-white px-7 text-sm font-semibold hover:bg-white/70">
            Add +
          </Button>
        </div>
      </div>
      <DataTable
        className="[&_th]:border-gunmetal text-sm font-light [&_th]:border-y [&_tr]:!border-none"
        columns={liquidityColumns}
        data={data}
      />
    </div>
  );
}
