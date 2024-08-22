import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input.tsx";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { Avatar } from "@/components/avatar/Avatar.tsx";
import { TokenList } from "../../../../jointlabs/meta";
import { cn } from "@/libs/utils.ts";

const defaultState: {
  selected?: TokenList.Token;
} = {
  selected: undefined,
};

export function SwapInputField({
  price,
  direction,
  onRequestModal,
  selected,
  onChange,
  value,
  onFocus,
  onBlur,
}: {
  value: "";
  price: string;
  direction?: "Sell" | "Buy";
  onRequestModal?: (selected?: TokenList.Token) => void;
  tokenLists?: TokenList.TokenData;
  selected?: TokenList.Token;
  side?: SwapSide;
  onChange?: (value: number) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  const [state, setState] = useState({ ...defaultState });

  useEffect(() => {
    setState((prev) => ({ ...prev, selected }));
  }, [selected]);

  return (
    <div className="flex items-center justify-between rounded-2xl bg-baltic-sea p-4 py-2">
      <div className="flex w-full flex-col space-y-1">
        <div className="text-lg font-light text-gray-500">{direction}</div>
        <div className="font-regular flex items-center justify-between">
          <div className="">
            <Input
              type="text"
              step="0.01"
              min={0}
              className="border-0 bg-transparent !text-5xl outline-0 placeholder:!text-gray-600"
              onChange={(e) => {
                let val = e.target.value;
                if (isNaN(val)) return;

                val = val.replace(/[^\d.]/g, "");
                if (parseFloat(val) == 0 && val != "0") return;

                onChange?.(val ?? "");
              }}
              placeholder="0"
              value={value}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
          <Button
            variant="ghost"
            className={cn(
              "h-12 cursor-pointer items-center justify-start space-x-2 rounded-full bg-bright-gray/80 p-0 pl-1 pr-2 transition-all " +
                "text-gray-400 duration-300 hover:scale-105 hover:bg-bright-gray hover:text-white",
              {
                "bg-[#6CC649] text-white hover:bg-[#6CC649]": !state.selected,
              },
            )}
            onClick={() => {
              onRequestModal?.(state.selected);
            }}
          >
            {state.selected && (
              <div className="flex w-auto shrink-0 items-center space-x-2">
                <div className="size-[40px] rounded-full">
                  <Avatar
                    src={state.selected?.logoURI as string}
                    fallback={state.selected.symbol}
                    className="w-full"
                    fallbackClassName="size-[40px] bg-gray-200 font-bold"
                  />
                </div>
                <span className="text-lg font-medium tracking-wider text-gray-100">{state.selected.symbol}</span>
              </div>
            )}

            {!state.selected && (
              <span className="inline-block w-[160px] shrink-0 pl-4 text-xl font-medium tracking-wider">
                Select token
              </span>
            )}

            <ChevronDownIcon className="h-6 w-6 shrink-0" />
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
