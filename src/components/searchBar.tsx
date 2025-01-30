import { Avatar } from "@/components/avatar/Avatar";
import { IconSearch } from "@/components/icons/IconSearch";
import { Overlay } from "@/components/Overlay";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/libs/utils.ts";
import { motion } from "framer-motion";
import { GlobeIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function SearchBar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div
      className={cn("pointer-events-none absolute left-0 top-0 flex w-full items-center justify-center", {
        "!pointer-events-auto": showSearch,
      })}
    >
      <div className="z-20 w-[500px]">
        <Card
          className={cn(
            "pointer-events-auto relative z-10 mt-3 flex w-full rounded-full border border-pastel-green/10 bg-[#28293d]/30",
            {
              "mx-auto rounded-none rounded-t-2xl border-b-0 border-gray-700/70": showSearch,
            },
          )}
        >
          <CardContent className="flex w-full items-center p-0 pl-1">
            <IconSearch className="absolute ml-2 h-5 w-5 text-cool-grey opacity-50" />
            <Input
              type="text"
              placeholder="Search tokens"
              className={cn(
                "!rounded-full border-0 bg-transparent py-2.5 pl-10 pr-4 !text-[16px] tracking-wider text-gray-300 outline-none placeholder:!text-boulder",
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
            className="relative h-auto w-full overflow-hidden rounded-2xl rounded-t-none border border-t-0 border-gray-700/70 bg-eerie-black"
          >
            <ScrollArea className="max-h-[500px] min-h-[200px] overflow-auto px-3 py-1" orientation="vertical">
              <Label className="tracking-wide text-cool-grey">Popular tokens</Label>
              <ul className="mx-0.5 mt-2 flex flex-col space-y-2">
                <Item
                  src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png"
                  tokenSymbol="UNI"
                  name="Uniswap"
                />
                <Item
                  src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x221657776846890989a759BA2973e427DfF5C9bB/logo.png"
                  tokenSymbol="REP"
                  name="Reputation"
                />
                <Item
                  src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
                  tokenSymbol="HEX"
                  name="HEX"
                />
                <Item
                  src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
                  tokenSymbol="HEX"
                  name="HEX"
                />
                <Item
                  src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
                  tokenSymbol="HEX"
                  name="HEX"
                />
                <Item
                  src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
                  tokenSymbol="HEX"
                  name="HEX"
                />
                <Item
                  src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
                  tokenSymbol="HEX"
                  name="HEX"
                />
                <Item
                  src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
                  tokenSymbol="HEX"
                  name="HEX"
                />
                <Item
                  src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
                  tokenSymbol="HEX"
                  name="HEX"
                />
                <Item
                  src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
                  tokenSymbol="HEX"
                  name="HEX"
                />
                <Item
                  src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
                  tokenSymbol="HEXx"
                  name="HEXx"
                />
              </ul>
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

function Item({ src, tokenSymbol, name }: { src: string; tokenSymbol: string; name: string }) {
  return (
    <li className="flex cursor-pointer items-center justify-between rounded-3xl pl-1 pr-3 transition-all duration-300 hover:scale-[1.01] hover:bg-baltic-sea/50 hover:bg-bright-gray hover:text-white">
      <div className="flex items-center space-x-3">
        <Avatar src={src} fallback={tokenSymbol} className="h-8 w-8" />
        <div className="flex space-x-2 text-white">
          <span className="font-bold">{name}</span> <span className="text-[#6b6b6b]">{tokenSymbol}</span>
        </div>
      </div>
      <Link to={""} className="opacity-90 hover:opacity-100">
        <GlobeIcon className="h-4 w-4 text-[#6b6b6b]" />
      </Link>
    </li>
  );
}
