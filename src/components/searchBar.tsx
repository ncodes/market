import { EthereumIcon, USDTIcon } from "@/assets";
import { Overlay } from "@/components/Overlay";
import { IconSearch } from "@/components/icons/IconSearch";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/libs/utils.ts";
import { motion } from "framer-motion";
import { useState } from "react";
import AssetAvatar from "./avatar/AssetAvatar";
import IconTriangleDown from "./icons/IconTriangleDown";
import IconTriangleUp from "./icons/IconTriangleUp";

export function SearchBar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div
      className={cn("pointer-events-none absolute left-0 top-0 hidden w-full items-center justify-center lg:flex", {
        "!pointer-events-auto": showSearch,
      })}
    >
      <div className="z-20 w-[500px]">
        <Card
          className={cn(
            "pointer-events-auto relative z-10 mt-3 flex w-full rounded-xl border border-gray-700/30 bg-raisin-black/30",
            {
              "border-pastel-green": showSearch,
            },
          )}
        >
          <CardContent className="flex w-full items-center p-0 pl-1">
            <IconSearch className="absolute ml-2 h-5 w-5 text-cool-grey opacity-50" />
            <Input
              type="text"
              placeholder="Search tokens"
              className={cn(
                "!rounded-xl border-0 bg-transparent py-2.5 pl-10 pr-4 !text-[16px] tracking-wider text-gray-300 outline-none placeholder:!text-boulder",
                {},
              )}
              onFocus={() => {
                setShowSearch(true);
              }}
              onBlur={() => {
                setShowSearch(false);
              }}
            />
            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-700">/</span>
          </CardContent>
        </Card>
        {showSearch && (
          <motion.div
            animate={{ minHeight: "200px", maxHeight: "500px" }}
            className="relative mt-2 h-auto w-full overflow-hidden rounded-xl border border-raisin-black bg-vampire-black"
          >
            <ScrollArea className="max-h-[500px] min-h-[200px] overflow-auto pt-2" orientation="vertical">
              <div className="mb-2">
                <Label className="px-3 text-lotion">Recent Search</Label>
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
            </ScrollArea>
          </motion.div>
        )}
      </div>
      {showSearch && (
        <Overlay
          onClick={() => {
            setShowSearch(false);
          }}
        />
      )}
    </div>
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
    <div className="flex cursor-pointer items-center justify-between from-[#1c1c28] to-[#1c1c28] px-3 py-2 hover:bg-gradient-to-l">
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
