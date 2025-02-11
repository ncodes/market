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
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (props) => (
      <Label
        className={cn(
          "text-ufo-green text-sm font-light",
          (props.getValue() as string).toLowerCase() == "sell" && "text-sunset-orange",
        )}
      >
        {props.getValue() as string} USDC
      </Label>
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
  },
];
