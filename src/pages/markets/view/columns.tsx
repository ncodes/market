"use client";
import { SolanaIcon, USDCIcon } from "@/assets";
import { Avatar } from "@/components/avatar/Avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

export type LiquidityTableProps = {
  sn: number;
  token: string;
  tvl: string;
  "30d_vol": string;
  "1d_vol": string;
  action?: string;
};

export type TransactionsTableProps = {
  sn: number;
  time: string;
  type: { from: string; to: string };
  value: string;
  quote: string;
  base: string;
};

export const liquidityColumns: ColumnDef<LiquidityTableProps>[] = [
  {
    accessorKey: "sn",
    header: "#",
  },
  {
    accessorKey: "token",
    header: "Token Name",
    cell: (props) => (
      <div className="flex items-center py-1.5">
        <div className="flex">
          <div className="relative w-12">
            <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6 z-10" />
            <Avatar src={SolanaIcon} className="h-6 w-6" rootClassName="absolute bottom-0 right-2 h-6 w-6 z-0" />
          </div>
        </div>
        <Label className="text-sm font-light text-gray-300">{props.getValue() as any}</Label>
      </div>
    ),
  },
  {
    accessorKey: "tvl",
    header: "TVL",
  },
  {
    accessorKey: "30d_vol",
    header: "30D Vol",
  },
  {
    accessorKey: "1d_vol",
    header: "1D Vol",
  },
  {
    accessorKey: "action",
    header: "",
    cell: (_) => (
      <Button
        variant={"ghost"}
        className="h-8 py-0 text-center text-sm font-semibold text-screaming-green hover:bg-screaming-green/30 hover:text-screaming-green"
      >
        {"Swap >"}
      </Button>
    ),
  },
];

export const transactionsColumns: ColumnDef<TransactionsTableProps>[] = [
  {
    accessorKey: "sn",
    header: "#",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (props) => (
      <div className="flex items-center gap-1 py-1.5">
        <div className="flex gap-0.5">
          <Label className="text-sm font-light text-white">Swap</Label>
          <Label className="text-sm font-semibold text-white">{(props.getValue() as any).from}</Label>
        </div>
        <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6 z-10" />
        <ChevronRight className="text-screaming-green" />
        <div className="flex gap-0.5">
          <Avatar src={SolanaIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6 z-10" />
          <Label className="text-sm font-semibold text-white">{(props.getValue() as any).to}</Label>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "quote",
    header: "Quote Amount",
    cell: (props) => (
      <div className="flex items-center gap-1">
        <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6 z-10" />
        <Label className="text-sm font-light text-white">{props.getValue() as any}</Label>
      </div>
    ),
  },
  {
    accessorKey: "base",
    header: "Base Amount",
    cell: (props) => (
      <div className="flex items-center gap-1">
        <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6 z-10" />
        <Label className="text-sm font-light text-white">{props.getValue() as any}</Label>
      </div>
    ),
  },
];
