"use client";
import { SolanaIcon, USDCIcon } from "@/assets";
import { Avatar } from "@/components/avatar/avatar";
import IconTriangleDown from "@/components/icons/IconTriangleDown";
import IconTriangleUp from "@/components/icons/IconTriangleUp";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import WaveformChart from "@/components/waveform-chart";
import { cn } from "@/libs/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";
import EmojiAvatar from "../../components/avatar/emoji-avatar";
import { AvatarSize } from "../../components/avatar/useAvatar";
import { shortenAddress } from "../../libs/string";

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
  provider: string;
  lastSwapAt: string;
};

export type MarketsProps = {
  sn: number;
  token: string;
  feePct: string;
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
    cell: (props) => (
      <div className="flex items-center justify-center gap-1 py-1.5">
        <span className="text-sm font-light text-gray-400">{props.getValue() as any}</span>
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Token Name",
    cell: (props) => (
      <div className="flex w-20 min-w-[100px] items-center gap-1 py-1.5 lg:w-32">
        <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6" />
        <Label className="text-sm font-light text-gray-300">{props.getValue() as any}</Label>
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (props) => (
      <div className="flex w-20 items-center gap-1 py-1.5 lg:w-32">
        <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6" />
        <Label className="text-sm font-light text-white">{props.getValue() as any}</Label>
      </div>
    ),
  },
  {
    accessorKey: "1h_change",
    header: "1h Change",
    cell: (props) => {
      const { value, isPositive } = props.getValue() as any;

      return (
        <div className="flex min-w-[90px] items-center py-1.5">
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
        <div className="flex min-w-[100px] items-center py-1.5">
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
    cell: (props) => <div className="w-20 text-sm font-light">{props.getValue() as any}</div>,
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: (props) => <div className="w-20 text-sm font-light">{props.getValue() as any}</div>,
  },
  {
    accessorKey: "chart",
    header: "",
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
    cell: (props) => (
      <div className="flex items-center justify-center">
        <span className="text-sm font-light text-gray-400">{props.getValue() as any}</span>
      </div>
    ),
  },
  {
    accessorKey: "token",
    header: "Token Name",
    cell: (props) => (
      <div className="flex items-center">
        <div className="flex">
          <div className="relative w-12">
            <Avatar
              src={USDCIcon}
              className="h-6 w-6 shadow-sm drop-shadow-sm"
              rootClassName="h-6 w-6 z-10 border border-gunmetal/90"
            />
            <Avatar
              src={SolanaIcon}
              className="h-6 w-6"
              rootClassName="absolute border border-gunmetal/90 bottom-0 right-2 h-6 w-6 z-0"
            />
          </div>
        </div>
        <Label className="text-sm font-light text-gray-100">{props.getValue() as any}</Label>
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
    cell: ({ row }) => <div className="min-w-[60px]">{row.getValue("30d_vol")}</div>,
  },
  {
    accessorKey: "1d_vol",
    header: "1D Vol",
    cell: ({ row }) => <div className="min-w-[50px]">{row.getValue("1d_vol")}</div>,
  },
  {
    accessorKey: "provider",
    header: "Provider",
    cell: (props) => (
      <div className="flex w-32 items-center gap-1 py-1.5">
        <EmojiAvatar randomStr={props.getValue() as string} size={AvatarSize.Micro} />
        <span className="text-sm font-light text-gray-300">{shortenAddress(props.getValue() as any)}</span>
      </div>
    ),
  },
  {
    accessorKey: "lastSwapAt",
    header: "Last Swap Time",
    cell: (props) => (
      <div className="min-w-[120px]">
        <span className="text-sm font-light text-gray-500">{props.getValue() as any}</span>
      </div>
    ),
  },
  {
    accessorKey: "action",
    header: "",
    cell: (_) => (
      <Button
        variant="ghost"
        className="w-28 cursor-pointer text-xs text-gray-300 hover:bg-screaming-green hover:text-gray-800"
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
    cell: (props) => (
      <div className="flex items-center justify-center gap-1 py-1.5">
        <span className="text-sm font-light text-gray-400">{props.getValue() as any}</span>
      </div>
    ),
  },
  {
    accessorKey: "token",
    header: "Token Name",
    cell: (props) => (
      <div className="flex min-w-[150px] items-center py-1.5">
        <div className="flex">
          <div className="relative w-12">
            <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6 z-[1]" />
            <Avatar src={SolanaIcon} className="h-6 w-6" rootClassName="absolute bottom-0 right-2 h-6 w-6 z-0" />
          </div>
        </div>
        <Label className="text-sm font-light text-gray-100">{props.getValue() as any}</Label>
      </div>
    ),
  },
  {
    accessorKey: "feePct",
    header: "Fee",
    cell: (props) => (
      <div className="min-w-16">
        <span className="text-xs text-gray-400">{props.getValue() as string}</span>
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
    cell: ({ row }) => <div className="min-w-[60px]">{row.getValue("30d_vol")}</div>,
  },
  {
    accessorKey: "1d_vol",
    header: "1D Vol",
    cell: ({ row }) => <div className="min-w-[50px]">{row.getValue("1d_vol")}</div>,
  },
  {
    accessorKey: "7d_vol",
    header: "7D Vol",
    cell: ({ row }) => <div className="min-w-[50px]">{row.getValue("7d_vol")}</div>,
  },
];

export const transactionsColumns: ColumnDef<TransactionsTableProps>[] = [
  {
    accessorKey: "sn",
    header: "#",
    cell: (props) => (
      <div className="flex items-center justify-center gap-1 py-1.5">
        <span className="text-sm font-light text-gray-400">{props.getValue() as any}</span>
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: (props) => (
      <div className="min-w-20">
        <span className="text-xs font-light text-gray-500">{props.getValue() as any}</span>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: (props) => (
      <div className="mr-4 flex items-center gap-1 py-1.5">
        <div className="flex items-center gap-1.5">
          <Label className="text-sm font-light text-gray-400">Swap</Label>
          <Label className="text-sm font-semibold text-white">{(props.getValue() as any).from}</Label>
        </div>
        <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6" />
        <ChevronRight className="text-gray-600" />
        <div className="flex items-center gap-1">
          <Avatar src={SolanaIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6" />
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
    accessorKey: "base",
    header: "Base Amount",
    cell: (props) => (
      <div className="mr-3 flex min-w-28 items-center gap-1">
        <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6" />
        <Label className="text-nowrap text-sm font-light text-white">{props.getValue() as any}</Label>
      </div>
    ),
  },
  {
    accessorKey: "quote",
    header: "Quote Amount",
    cell: (props) => (
      <div className="mr-3 flex min-w-28 items-center gap-1">
        <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6" />
        <Label className="text-nowrap text-sm font-light text-white">{props.getValue() as any}</Label>
      </div>
    ),
  },
  {
    accessorKey: "wallet",
    header: "Wallet",
    cell: (props) => (
      <div className="flex items-center gap-1">
        <EmojiAvatar randomStr={props.getValue() as string} size={AvatarSize.Micro} />
        <Label className="text-nowrap text-sm font-light text-gray-400">{props.getValue() as any}</Label>
      </div>
    ),
  },
];
