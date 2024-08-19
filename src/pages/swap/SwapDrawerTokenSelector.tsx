import { Button } from "@/components/ui/button.tsx";
import { GlobeIcon, SearchIcon, XIcon } from "lucide-react";
import React from "react";
import { Avatar } from "@/components/avatar/Avatar.tsx";
import { Link } from "react-router-dom";

export function SwapDrawerTokenSelector({ closeRequested }: { closeRequested?: () => void }) {
  return (
    <div className="relative m-0 max-w-[650px] rounded-3xl py-4 pb-0">
      <div>
        <h2 className="mb-4 flex items-center justify-between px-4 font-medium tracking-wider text-white">
          <span>Select a token</span>
          <span>
            <Button
              variant="ghost"
              className="h-auto p-0"
              onClick={() => {
                closeRequested?.();
              }}
            >
              <XIcon className="h-5 w-5 cursor-pointer text-white opacity-30 transition-all duration-300 hover:opacity-100" />
            </Button>
          </span>
        </h2>

        <div className="relative mb-4 flex px-4">
          <SearchIcon className="absolute left-7 top-4 h-5 w-5 text-[#6b6b6b]" />
          <input
            type="text"
            placeholder="Search by name, ticker or address"
            className="w-full rounded-full bg-baltic-sea px-4 py-3 pl-10 text-lg font-medium text-white placeholder:text-[#6b6b6b] focus:outline-none"
          />
        </div>
      </div>

      <div className="max-h-[400px] min-h-[200px] w-full overflow-auto">
        <ul className="pb-2">
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png"
            tokenSymbol="UNI"
            name="Uniswap"
          />
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x221657776846890989a759BA2973e427DfF5C9bB/logo.png"
            tokenSymbol="REP"
            name="Reputation"
          />
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEX"
            name="HEX"
          />
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEX"
            name="HEX"
          />
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEX"
            name="HEX"
          />
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEX"
            name="HEX"
          />
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEX"
            name="HEX"
          />
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEX"
            name="HEX"
          />
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEX"
            name="HEX"
          />
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEX"
            name="HEX"
          />
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEX"
            name="HEX"
          />
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEX"
            name="HEX"
          />{" "}
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEX"
            name="HEX"
          />{" "}
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEX"
            name="HEX"
          />{" "}
          <TokenItem
            src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39/logo.png"
            tokenSymbol="HEXx"
            name="HEXx"
          />
        </ul>
      </div>
    </div>
  );
}

function TokenItem({ src, tokenSymbol, name }: { src: string; tokenSymbol: string; name: string }) {
  return (
    <li className="mx-2 flex cursor-pointer items-center justify-between rounded-3xl px-2 py-2 pr-4 transition-all duration-300 hover:scale-[1.01] hover:bg-baltic-sea/50 hover:bg-bright-gray hover:text-white">
      <div className="flex items-center space-x-3">
        <Avatar src={src} fallback={tokenSymbol} className="h-10 w-10" />
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
