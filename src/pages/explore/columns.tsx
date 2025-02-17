"use client";
import { SolanaIcon, USDCIcon } from "@/assets";
import { Avatar } from "@/components/avatar/Avatar";
import IconTriangleDown from "@/components/icons/IconTriangleDown";
import IconTriangleUp from "@/components/icons/IconTriangleUp";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import WaveformChart from "@/components/WaveformChart";
import { cn } from "@/libs/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

export type TokenTableProps = {
  sn: number;
  name: string;
  price: string;
  "1h_change": { value: string; isPositive: boolean };
  "1d_change": { value: string; isPositive: boolean };
  fdv: string;
  volume: string;
  chart: {
    data: {
      value: number;
    }[];
    isPositive: boolean;
  };
};

export type LiquidyTableProps = {
  sn: number;
  token: string;
  tvl: string;
  "30d_vol": string;
  "1d_vol": string;
};

export type MarketsProps = {
  sn: number;
  token: string;
  percentage: string;
  tvl: string;
  "30d_vol": string;
  "1d_vol": string;
  "7d_vol": string;
};

export type TransactionsTableProps = {
  sn: number;
  time: string;
  type: { from: string; to: string };
  value: string;
  quote: string;
  base: string;
  wallet: string;
};

export const tokenColumns: ColumnDef<TokenTableProps>[] = [
  {
    accessorKey: "sn",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Token Name",
    cell: (props) => (
      <div className="flex items-center gap-1 py-1.5">
        <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6 z-10" />
        <Label className="text-sm font-light text-gray-300">{props.getValue() as any}</Label>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (props) => (
      <div className="flex flex-col py-1.5">
        <Label className="text-sm font-light text-white">{props.getValue() as any}</Label>
        <Label className="text-xs text-cool-grey">Base</Label>
      </div>
    ),
  },
  {
    accessorKey: "1h_change",
    header: "1h Change.",
    cell: (props) => {
      const { value, isPositive } = props.getValue() as any;

      return (
        <div className="flex items-center py-1.5">
          {isPositive ? <IconTriangleUp /> : <IconTriangleDown />}
          <Label className={cn("text-sm font-light", { "text-coral-red": !isPositive, "text-go-green": isPositive })}>
            {value}
          </Label>
        </div>
      );
    },
  },
  {
    accessorKey: "1d_change",
    header: "1D Change",
    cell: (props) => {
      const { value, isPositive } = props.getValue() as any;

      return (
        <div className="flex items-center py-1.5">
          {isPositive ? <IconTriangleUp /> : <IconTriangleDown />}
          <Label className={cn("text-sm font-light", { "text-coral-red": !isPositive, "text-go-green": isPositive })}>
            {value}
          </Label>
        </div>
      );
    },
  },
  {
    accessorKey: "fdv",
    header: "FDV",
  },
  {
    accessorKey: "volume",
    header: "Volume",
  },
  {
    accessorKey: "chart",
    header: "Chart",
    cell: (props) => {
      const { isPositive, data } = props.getValue() as any;

      return (
        <div className="h-10 w-[129px]">
          <WaveformChart data={data} isPositive={isPositive} />
        </div>
      );
    },
  },
];

export const liquidityColumns: ColumnDef<LiquidyTableProps>[] = [
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
        variant="ghost"
        className="cursor-pointer text-sm font-semibold text-white hover:bg-eerie-black hover:text-white"
      >
        {"Swap >"}
      </Button>
    ),
  },
];

export const marketsColumns: ColumnDef<MarketsProps>[] = [
  {
    accessorKey: "sn",
    header: "#",
  },
  {
    accessorKey: "token",
    header: "Token Name",
    cell: (props) => (
      <div className="flex w-fit items-center py-1.5">
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
    accessorKey: "percentage",
    header: "TVL",
    cell: (props) => (
      <div className="flex w-fit items-center rounded-xl bg-gunmetal px-2 py-1">
        <Label className="text-xs font-semibold text-chinese-green">{props.getValue() as string}</Label>
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
    accessorKey: "7d_vol",
    header: "7D Vol",
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
        <ChevronRight className="text-chinese-green" />
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
  {
    accessorKey: "wallet",
    header: "Wallet",
  },
];
