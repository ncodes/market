"use client";

import { cn } from "@/libs/utils";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export default function WaveformChart({
  isPositive = true,
  data,
}: {
  isPositive?: boolean;
  data: { value: number }[];
}) {
  return (
    <div className="h-full w-full rounded-lg bg-transparent">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={cn({ "#06c270": isPositive, "#ff3b3b": !isPositive })}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
