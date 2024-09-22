import EmojiAvatar from "@/components/avatar/EmojiAvatar.tsx";
import { AvatarSize } from "@/components/avatar/useAvatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { formatToHighDenom, shortenAddress } from "@/libs/helpers.ts";
import { TokenList } from "@jointlabs/meta";
import { CheckCircle, InfoIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ToolTip } from "../../../components/toolTip";

const defaultState: {
  selectedLiquidity?: Liquidity;
} = {
  selectedLiquidity: undefined,
};

export function SwapDrawerProviderSelector({
  closeRequested,
  sellToken,
  containerHeight,
  liquidities,
  selectedLiquidity,
  onSelected,
}: {
  sellToken: TokenList.Token;
  selectedLiquidity: Liquidity;
  containerHeight?: number;
  liquidities: Liquidity[];
  closeRequested?: () => void;
  onSelected?: (liqId: string) => void;
}) {
  const [state, setState] = useState({ ...defaultState, selectedLiquidity });

  useEffect(() => {
    setState({ ...state, selectedLiquidity });
  }, [selectedLiquidity]);

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

      <div className="min-h-[120px] w-full overflow-auto" style={{ maxHeight: containerHeight! * 0.6 + "px" }}>
        <div className="space-y-2 px-2 pb-1 pt-1">
          {liquidities.map((liquidity) => (
            <TokenItem
              key={`${liquidity.provider}_${liquidity.lid}`}
              address={liquidity.provider}
              nickname={""}
              cpRate={100}
              price={liquidity.price}
              priceSymbol={sellToken.symbol!}
              selected={state.selectedLiquidity?.id === liquidity.id}
              paymentMethod={liquidity.paymentMethod}
              onClick={() => {
                onSelected?.(liquidity.id);
                closeRequested?.();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TokenItem({
  address,
  nickname,
  cpRate,
  price,
  priceSymbol,
  selected,
  paymentMethod,
  onClick,
}: {
  address: string;
  nickname: string;
  cpRate?: number;
  price: string;
  priceSymbol: string;
  selected?: boolean;
  paymentMethod: PaymentMethod;
  onClick?: () => void;
}) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className="flex h-auto w-full cursor-pointer items-center justify-between rounded-3xl px-2 py-2 text-left transition-all duration-300 hover:scale-[1.01] hover:bg-baltic-sea/50 hover:text-white"
    >
      <div className="flex items-center space-x-3">
        <EmojiAvatar randomStr={address} size={AvatarSize.Large} />
        <div className="flex flex-col text-white">
          <span className="flex items-center space-x-2">
            <span className="font-bold">{nickname || shortenAddress(address)}</span>
          </span>
          <span className="flex items-center gap-3 text-xs text-gray-300">
            <span>
              <span className="text-sm text-boulder/80"> Price:</span> {formatToHighDenom(price)} {priceSymbol}
            </span>
            <span className="flex items-center gap-1 font-light tracking-wider text-gray-400">
              <span className="flex items-center gap-1">
                <span className="font-normal text-gray-400">{paymentMethod.name}</span>
              </span>
              <span>
                <ToolTip
                  tip={`This provider accepts payment via ${paymentMethod.name}. You can select this provider if you can send the payment to the provider or use a router.`}
                  className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                >
                  <InfoIcon className="h-4 w-4" />
                </ToolTip>
              </span>
            </span>
          </span>
        </div>
      </div>
      <div className="flex space-x-3 text-right tracking-wider">
        <div className="flex items-center justify-center">
          {selected && (
            <ToolTip tip="Current selected liquidity" className="mt-2">
              <span className="inline-block rounded-full bg-green-400 p-0.5 text-xs text-gray-800">
                <CheckCircle className="h-3 w-3 text-gray-800" />
              </span>
            </ToolTip>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] text-boulder/60">CP RATE</span>
          <span className="text-sm font-normal text-gray-400">{cpRate}%</span>
        </div>
      </div>
    </Button>
  );
}
