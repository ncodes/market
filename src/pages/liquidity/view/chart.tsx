"use client";
import { Button } from "@/components/ui/button";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { cn } from "@/libs/utils";
import { ChevronDown } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
    <div className="flex w-full flex-col gap-5 border-b border-eerie-black py-3 xs:py-3">
      <div className="flex w-full items-start justify-between px-2 xs:px-3 xs:pr-3 lg:items-center">
        <Label className="flex flex-col font-dosis text-5xl text-gray-100 xs:flex-row xs:gap-2">
          <div>$1.38b</div> <div className="text-lg text-gray-400 xs:self-end">Per day</div>
        </Label>
        <div className="flex items-center gap-1">
          <div className="hidden lg:flex">
            <ChartFilter text="1H" />
            <ChartFilter text="1D" isActive />
            <ChartFilter text="1W" />
            <ChartFilter text="1M" />
            <ChartFilter text="1Y" />
          </div>
          <SelectVolume />
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-[190px] w-full pl-2 text-left xs:pl-3 md:pl-6">
        <BarChart accessibilityLayer data={chartData} className="-ml-3 flex text-left">
          <XAxis dataKey="time" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} tick={{ textAnchor: "start", dx: -10 }} width={25} />
          <Bar dataKey="asset1" stackId={"b"} fill="var(--color-asset1)" radius={[5, 5, 5, 5]} maxBarSize={20} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="dot"
                className="border-gunmetal p-2 text-gray-100"
                tooltipSubLabel="text-cool-grey"
              />
            }
            cursor={false}
            defaultIndex={1}
            labelStyle={{ color: "red" }}
          />
        </BarChart>
      </ChartContainer>
      <div className="flex w-full justify-center lg:hidden">
        <div className="flex">
          <ChartFilter text="1H" />
          <ChartFilter text="1D" isActive />
          <ChartFilter text="1W" />
          <ChartFilter text="1M" />
          <ChartFilter text="1Y" />
        </div>
      </div>
    </div>
  );
}

function ChartFilter({ text, isActive }: { text: string; isActive?: boolean }) {
  return (
    <Button
      className={cn(
        "m-0 flex h-auto cursor-pointer items-center justify-center rounded-full bg-transparent px-2 py-0.5 hover:bg-transparent",
        isActive && "bg-white",
      )}
    >
      <Label className={cn("cursor-pointer text-sm font-semibold text-cool-grey", isActive && "text-gunmetal")}>
        {text}
      </Label>
    </Button>
  );
}

function SelectVolume() {
  return (
    <Select>
      <SelectTrigger
        hideCaret
        className="w-fit border-none p-0 outline-none focus:ring-0 active:border-none active:outline-none"
      >
        <Button
          variant={"ghost"}
          className="flex items-center font-light text-cool-grey hover:bg-transparent hover:text-cool-grey"
        >
          Volume <ChevronDown className="ml-1 h-5 w-5" />
        </Button>
      </SelectTrigger>
      <SelectContent className="border-eerie-black bg-chinese-black">
        {[1, 2, 3, 4, 5].map((item) => (
          <SelectItem
            className="cursor-pointer data-[state=checked]:!bg-eerie-black data-[state=unchecked]:!bg-transparent data-[state=checked]:!text-white data-[state=unchecked]:!text-cool-grey hover:!bg-eerie-black active:!bg-eerie-black"
            key={item}
            value={`Volume ${item}`}
          >{`Volume ${item}`}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
