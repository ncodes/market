import { Button } from "@/components/ui/button.tsx";
import { GlobeIcon, SearchIcon, XIcon } from "lucide-react";
import React from "react";
import { Avatar } from "@/components/avatar/Avatar.tsx";
import { Link } from "react-router-dom";
import EmojiAvatar from "@/components/avatar/EmojiAvatar.tsx";
import { AvatarSize } from "@/components/avatar/useAvatar.tsx";
import { shortenAddress } from "@/libs/helpers.ts";

export function SwapDrawerProviderSelector({ closeRequested }: { closeRequested?: () => void }) {
  return (
    <div className="relative m-0 max-w-[650px] rounded-3xl py-4 pb-0">
      <div>
        <h2 className="mb-4 flex items-center justify-between px-4 font-medium tracking-wider text-white">
          <span>Select a provider</span>
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
      </div>

      <div className="max-h-[400px] min-h-[200px] w-full overflow-auto">
        <ul className="pb-2">
          <TokenItem address="0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984" nickname="0xFoxyBrown" cpRate={100} />
          <TokenItem address="0x221657776846890989a759BA2973e427DfF5C9bB" nickname="LexLucas" cpRate={95} />
          <TokenItem address="0x5425890298aed601595a70AB815c96711a31Bc65" nickname="" cpRate={90} />
        </ul>
      </div>
    </div>
  );
}

function TokenItem({ address, nickname, cpRate }: { address: string; nickname: string; cpRate?: number }) {
  return (
    <li className="mx-2 flex cursor-pointer items-center justify-between rounded-3xl px-2 py-2 pr-4 transition-all duration-300 hover:scale-[1.01] hover:bg-baltic-sea/50 hover:bg-bright-gray hover:text-white">
      <div className="flex items-center space-x-3">
        <EmojiAvatar randomStr={address} size={AvatarSize.Large} />
        <div className="flex text-white">
          <span className="font-bold">{nickname || shortenAddress(address)}</span>
        </div>
      </div>
      <div className="flex flex-col space-x-3 tracking-wider">
        <span className="text-[11px] text-boulder/60">CP RATE</span>
        <span className="font-normal">{cpRate}%</span>
      </div>
    </li>
  );
}
