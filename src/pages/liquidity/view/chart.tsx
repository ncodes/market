"use client";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import IconDropDown from "@/components/icons/IconDropDown";

const chartData = [
  { time: "1", asset1: 85, asset2: 15 },
  { time: "2", asset1: 70, asset2: 20 },
  { time: "3", asset1: 90, asset2: 20 },
  { time: "4", asset1: 90, asset2: 15 },
  { time: "5", asset1: 80, asset2: 20 },
  { time: "6", asset1: 85, asset2: 30 },
  { time: "7", asset1: 75, asset2: 30 },
  { time: "8", asset1: 95, asset2: 35 },
  { time: "9", asset1: 85, asset2: 40 },
  { time: "10", asset1: 75, asset2: 30 },
  { time: "11", asset1: 90, asset2: 15 },
  { time: "12", asset1: 80, asset2: 20 },
  { time: "13", asset1: 70, asset2: 25 },
];

const chartConfig = {
  asset1: {
    label: "Asset 1",
    color: "#bae148",
  },
  asset2: {
    label: "Asset 2",
    color: "rgba(232, 255, 165, 0.5)",
  },
} satisfies ChartConfig;

export default function LiquidityChart() {
  return (
    <div className="border-gunmetal flex w-full flex-col gap-5 border-b py-6">
      <div className="flex w-full items-center justify-between px-6">
        <Label className="text-cool-grey font-dosis text-5xl font-light">
          $1.38b <span className="text-base">Per day</span>
        </Label>
        <div className="flex items-center gap-4">
          <div className="flex">
            <ChartFilter text="1H" />
            <ChartFilter text="1D" isActive />
            <ChartFilter text="1W" />
            <ChartFilter text="1M" />
            <ChartFilter text="1Y" />
          </div>
          <Button
            variant={"ghost"}
            className="text-cool-grey hover:text-cool-grey flex items-center font-light hover:bg-transparent"
          >
            Volume <IconDropDown />
          </Button>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="m-0 h-[160px] w-full px-6 text-left">
        <BarChart
          accessibilityLayer
          data={chartData}
          className="m-0 flex w-full p-0 text-left"
          margin={{ left: 0, right: 0 }}
        >
          <XAxis dataKey="time" tickLine={false} tickMargin={10} axisLine={false} tick={{ dy: -8 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ textAnchor: "start", dx: -10 }} tickMargin={0} width={20}/>
          <Bar dataKey="asset1" stackId={"b"} fill="var(--color-asset1)" radius={[16, 16, 16, 16]} maxBarSize={8}/>
          <Bar dataKey="asset2" stackId="b" fill="var(--color-asset2)" radius={[16, 16, 0, 0]} maxBarSize={8} />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} defaultIndex={1} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function ChartFilter({ text, isActive }: { text: string; isActive?: boolean }) {
  return (
    <Button className="bg-transparent p-0 hover:bg-transparent">
      <div
        className={cn(
          "flex h-[30px] w-9 cursor-pointer items-center justify-center rounded-full",
          isActive && "bg-white",
        )}
      >
        <Label className={cn("text-cool-grey cursor-pointer text-sm font-semibold", isActive && "text-gunmetal")}>
          {text}
        </Label>
      </div>
    </Button>
  );
}
