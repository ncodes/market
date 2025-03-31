"use client";

import { SolanaIcon, USDCIcon } from "@/assets";
import { Avatar } from "@/components/avatar/avatar";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { Label } from "@/components/ui/label";
import { ColumnDef } from "@tanstack/react-table";
import EmojiAvatar from "../../../components/avatar/emoji-avatar";
import { AvatarSize } from "../../../components/avatar/useAvatar";
import { shortenAddress } from "../../../libs/string";

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
    cell: (props) => <Label className="ml-1 text-sm font-light text-gray-400">{props.getValue() as any}</Label>,
  },
  {
    accessorKey: "market",
    header: "Market",
    cell: (props) => (
      <div className="flex min-w-36 items-center py-1.5">
        <div className="flex">
          <div className="relative w-12">
            <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6 z-[1]" />
            <Avatar src={SolanaIcon} className="h-6 w-6" rootClassName="absolute bottom-0 right-2 h-6 w-6 z-0" />
          </div>
        </div>
        <Label className="text-sm font-light text-gray-300">{props.getValue() as any}</Label>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    meta: { tooltip: "Total amount of liquidity" },
    cell: (props) => {
      const { value } = props.getValue() as any;

      return (
        <div className="min-w-26 flex items-center gap-2">
          <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6" />
          <Label className="text-sm font-light text-gray-200">{value}</Label>
          {/* <Label className="text-xs text-cool-grey">{info}</Label> */}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    meta: { tooltip: "Price of 1 base asset" },
    cell: (props) => {
      const { value, info } = props.getValue() as any;

      return (
        <div className="flex min-w-[180px] flex-row items-start gap-1 lg:items-center">
          <span className="flex items-center gap-1">
            <Avatar src={USDCIcon} className="h-6 w-6 shadow-sm drop-shadow-sm" rootClassName="h-6 w-6" />
            <Label className="text-sm font-light">{value}</Label>
          </span>
          <Label className="rounded-xl border border-eerie-black bg-eerie-black/50 p-1 px-2 text-xs font-light text-gray-500">
            {info}
          </Label>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (_) => (
      <div className="flex w-11 items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-go-green"></div>
      </div>
    ),
  },
  {
    accessorKey: "oneDayVolume",
    header: "1D Vol.",
    cell: ({ row }) => <div className="min-w-[50px]">{row.getValue("oneDayVolume")}</div>,
  },
  {
    accessorKey: "thirtyDayVolume",
    header: "30D Vol.",
    cell: (props) => (
      <div className="min-w-[65px]">
        <Label className="text-sm font-light">{props.getValue() as string}</Label>
      </div>
    ),
  },
  {
    accessorKey: "target",
    header: "Target",
    meta: { tooltip: "Wallet address of the target taker" },
    cell: (props) => (
      <div className="flex justify-between">
        <span className="flex items-center gap-2">
          <EmojiAvatar size={AvatarSize.Micro} randomStr="👀" className="h-6 w-6" />
          <Label className="text-xs font-light text-gray-400">{shortenAddress(props.getValue() as string)}</Label>
        </span>
        <div className="h-6 w-6">
          <IconArrowRight className="hidden h-full w-full group-hover:block" />
        </div>
      </div>
    ),
  },
];
