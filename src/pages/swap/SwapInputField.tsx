import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Avatar } from "@/components/avatar/Avatar.tsx";

export function SwapInputField({
  avatarSrc,
  tokenSymbol,
  defaultValue,
  price,
  direction,
  onRequestModal,
}: {
  avatarSrc: string;
  tokenSymbol: string;
  defaultValue?: string;
  price: string;
  direction?: "Sell" | "Buy";
  onRequestModal?: () => void;
}) {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div className="flex items-center justify-between rounded-2xl bg-baltic-sea p-4 py-2">
      <div className="flex w-full flex-col space-y-1">
        <div className="text-lg font-light text-gray-500">{direction}</div>
        <div className="font-regular flex items-center justify-between">
          <div className="">
            <Input
              type="number"
              step="0.01"
              className="border-0 bg-transparent !text-5xl outline-0 placeholder:!text-gray-600"
              onChange={(e) => setValue(e.target.value)}
              placeholder="0"
              value={value}
            />
          </div>
          <Button
            variant="ghost"
            className="flex h-12 cursor-pointer items-center space-x-2 rounded-full bg-bright-gray/80 px-1 pr-2 transition-all duration-300 hover:scale-105 hover:bg-bright-gray hover:text-white"
            onClick={onRequestModal}
          >
            <span>
              <Avatar src={avatarSrc} fallback={tokenSymbol} className="w-[65px]" />
            </span>
            <span className="text-lg font-medium tracking-wider">{tokenSymbol}</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <span>${price}</span>
          <span>
            <span className="text-gray-500">Bal:</span> 34.5
          </span>
        </div>
      </div>
    </div>
  );
}
