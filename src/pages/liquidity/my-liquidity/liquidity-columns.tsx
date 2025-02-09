"use client";

import { SolanaIcon, USDCIcon } from "@/assets";
import { Avatar } from "@/components/avatar/Avatar";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";

export type LiquidityProps = {
  id: string;
  market: string;
  amount: { value: string; info: string };
  price: { value: string; info: string };
  target: string;
  status: string;
  oneDayVolume: string;
  thirtyDayVolume: string;
};

export const liquidityColumns: ColumnDef<LiquidityProps>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "market",
    header: "Market",
    cell: (props) => (
      <div className="flex items-center">
        <div className="flex">
          <div className="relative w-12">
            <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6 z-10" />
            <Avatar src={SolanaIcon} className="h-6 w-6" rootClassName="absolute bottom-0 right-2 h-6 w-6 z-0" />
          </div>
        </div>
        <Label className="text-sm font-light">{props.getValue() as any}</Label>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (props) => {
      const { value, info } = props.getValue() as any;

      return (
        <div className="flex flex-col">
          <Label className="text-sm font-light">{value}</Label>
          <Label className="text-cool-grey text-xs">{info}</Label>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: (props) => {
      const { value, info } = props.getValue() as any;

      return (
        <div className="flex flex-col">
          <Label className="text-sm font-light">{value}</Label>
          <Label className="text-cool-grey text-xs">{info}</Label>
        </div>
      );
    },
  },
  {
    accessorKey: "target",
    header: "Target",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (_) => <div className="bg-go-green h-2 w-2 rounded-full"></div>,
  },
  {
    accessorKey: "oneDayVolume",
    header: "1D Vol.",
  },
  {
    accessorKey: "thirtyDayVolume",
    header: "30D Vol.",
  },
];
