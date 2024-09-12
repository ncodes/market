import { Avatar } from "@/components/avatar/Avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { formatToHighDenom } from "@/libs/helpers.ts";
import { cn } from "@/libs/utils.ts";
import { SwapSide } from "@/pages/swap/types.ts";
import { TokenList } from "@jointlabs/meta";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const defaultState: {
  selected?: TokenList.Token;
} = {
  selected: undefined,
};

export function SwapInputField({
  price,
  direction,
  onRequestModal,
  balance,
  disabled,
  selected,
  onChange,
  value,
  onFocus,
  onBlur,
}: {
  value: string | number;
  price: string;
  disabled?: boolean;
  direction?: "Sell" | "Buy";
  onRequestModal?: (selected?: TokenList.Token) => void;
  selected?: TokenList.Token;
  side?: SwapSide;
  onChange?: (value: string) => void;
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
        <div className="text-sm font-light text-gray-500">{direction}</div>
        <div className="font-regular flex items-center justify-between">
          <div className="">
            <Input
              type="text"
              step="0.01"
              min={0}
              disabled={disabled}
              className="border-0 bg-transparent font-dosis !text-5xl font-medium text-white outline-0 placeholder:!text-gray-600"
              onChange={(e) => {
                let val = e.target.value;
                if (isNaN(val as number)) return;

                val = val.replace(/[^\d.]/g, "");

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
            disabled={disabled}
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
        <div className="flex justify-between text-xs tracking-wide text-gray-400">
          <span>${price}</span>
          {selected && (
            <span>
              <span className="text-xs font-light text-gray-400">Balance:</span>{" "}
              {formatToHighDenom(balance, state.selected?.decimals)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
