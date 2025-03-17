import { EthereumIcon, USDTIcon } from "@/assets";
import AssetAvatar from "@/components/avatar/AssetAvatar";
import { IconSearch } from "@/components/icons/IconSearch";
import IconTriangleDown from "@/components/icons/IconTriangleDown";
import IconTriangleUp from "@/components/icons/IconTriangleUp";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";
import { Search } from "lucide-react";
import { useState } from "react";
import CloseIcon from "../CloseIcon";

export function SearchButton() {
  const [open, setOpen] = useState(false);

  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      triggerComponent={
        <Button
          variant={"ghost"}
          className="flex !h-11 !w-11 cursor-pointer items-center justify-center rounded-full bg-chinese-black p-0 transition-all duration-500 hover:bg-raisin-black"
        >
          <Search />
        </Button>
      }
      content={
        <div className="flex w-full flex-col overflow-hidden rounded-b-none rounded-t-3xl border border-eerie-black bg-chinese-black md:rounded-b-3xl">
          <div className="flex h-fit items-center justify-between px-5 py-3">
            <Label className="text-[18px] font-normal tracking-wider text-lotion">Search</Label>
            <CloseIcon setOpen={setOpen}/>
          </div>
          <div className="flex h-fit justify-between border-y border-eerie-black px-3 py-2">
            <div className="flex h-11 w-full items-center justify-between gap-1 rounded-3xl bg-eerie-black px-3 py-1">
              <input
                type="text"
                className="w-full border-none bg-transparent text-white outline-none placeholder:text-cool-grey active:border-none active:bg-transparent active:outline-none"
                placeholder="Search"
              />
              <IconSearch />
            </div>
          </div>
          <div className="flex h-[70vh] w-full flex-col overflow-y-auto px-0">
            <div className="mb-2">
              <Label className="px-3 text-lotion">Recent Search</Label>
            </div>

            <div className="flex flex-col">
              <Item
                token="Tether"
                tokenSymbol="USDT"
                amount="$10.60"
                percentage="20%"
                assetImge={USDTIcon}
                networkImage={EthereumIcon}
                isPositive
              />
              <Item
                token="Tether"
                tokenSymbol="USDT"
                amount="$10.60"
                percentage="20%"
                assetImge={USDTIcon}
                networkImage={EthereumIcon}
              />
              <Item
                token="Tether"
                tokenSymbol="USDT"
                amount="$10.60"
                percentage="20%"
                assetImge={USDTIcon}
                networkImage={EthereumIcon}
              />

              <div className="mt-2 py-2">
                <Label className="px-3 text-lotion">Popular Tokens</Label>
              </div>
              <Item
                token="Tether"
                tokenSymbol="USDT"
                amount="$10.60"
                percentage="20%"
                assetImge={USDTIcon}
                networkImage={EthereumIcon}
                isPositive
              />
              <Item
                token="Tether"
                tokenSymbol="USDT"
                amount="$10.60"
                percentage="20%"
                assetImge={USDTIcon}
                networkImage={EthereumIcon}
                isPositive
              />
              <Item
                token="Tether"
                tokenSymbol="USDT"
                amount="$10.60"
                percentage="20%"
                assetImge={USDTIcon}
                networkImage={EthereumIcon}
                isPositive
              />
            </div>
          </div>
        </div>
      }
    />
  );
}

function Item({
  token,
  tokenSymbol,
  assetImge,
  networkImage,
  amount,
  percentage,
  isPositive,
}: {
  token: string;
  tokenSymbol: string;
  assetImge: string;
  networkImage: string;
  amount: string;
  percentage: string;
  isPositive?: boolean;
}) {
  return (
    <div className="flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-eerie-black">
      <div className="flex cursor-pointer items-center gap-2">
        <div className="w-min">
          <AssetAvatar
            assetImage={assetImge}
            networkImage={networkImage}
            className="h-[33px] w-[33px]"
            networkClassName="w-[17px] h-[17px]"
          />
        </div>
        <div className="flex h-fit w-fit flex-col tracking-wider">
          <Label className="cursor-pointer text-sm text-anti-flash-white">{token}</Label>
          <Label className="cursor-pointer text-xs font-light text-cool-grey">{tokenSymbol}</Label>
        </div>
      </div>
      <div className="flex items-center">
        <Label className="cursor-pointer font-light text-anti-flash-white">{amount} - </Label>
        <div className="flex items-start">
          {isPositive && <IconTriangleUp className="m-1" />}
          {!isPositive && <IconTriangleDown className="m-[2px]" />}
          <Label className={cn("cursor-pointer text-base font-light text-coral-red", { "text-go-green": isPositive })}>
            {percentage}
          </Label>
        </div>
      </div>
    </div>
  );
}
