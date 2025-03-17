"use client";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";
import { ColumnDef } from "@tanstack/react-table";

export type LiquidityTransactionsProps = {
  time: string;
  type: string;
  usd: string;
  usdc: string;
  usdt: string;
  wallet: string;
};

export const liquidityTransactionsColumns: ColumnDef<LiquidityTransactionsProps>[] = [
  {
    accessorKey: "time",
    header: "Time",
    cell: (props) => <div className="min-w-[80px] text-sm font-light text-white">{props.getValue() as string}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (props) => (
      <div className="min-w-[80px]">
        <Label
          className={cn(
            "text-sm font-light text-ufo-green",
            (props.getValue() as string).toLowerCase() == "sell" && "text-sunset-orange",
          )}
        >
          {props.getValue() as string} USDC
        </Label>
      </div>
    ),
  },
  {
    accessorKey: "usd",
    header: "USD",
  },
  {
    accessorKey: "usdc",
    header: "USDC",
  },
  {
    accessorKey: "usdt",
    header: "USDT",
  },
  {
    accessorKey: "wallet",
    header: "Wallet",
    cell: (props) => (
      <div className="w-fit text-nowrap text-sm font-light text-white">{props.getValue() as string}</div>
    ),
  },
];
