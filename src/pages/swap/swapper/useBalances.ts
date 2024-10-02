import { useEffect } from "react";
import { useBalance } from "wagmi";
import { toHD } from "../../../libs/helpers";
import { getTokenType, isERC20, isNative } from "../utils";
import { SwapPageType } from "./types";

export function useBalances({
  state,
  setState,
  address,
}: {
  state: SwapPageType;
  setState: React.Dispatch<React.SetStateAction<SwapPageType>>;
  address: `0x${string}`;
}) {
  const nativeBalQry = useBalance({ address: address, scopeKey: "native" });

  const baseBalQry = useBalance({
    token: state.buyToken?.address as `0x${string}`,
    address: address,
    scopeKey: "base",
    query: { enabled: !!state.buyToken },
  });

  const quoteBalQry = useBalance({
    token: state.sellToken?.address as `0x${string}`,
    address: address,
    scopeKey: "quote",
    query: { enabled: !!state.sellToken },
  });

  // Listen for balance updates for sell and buy tokens
  useEffect(() => {
    if (nativeBalQry.data) {
      setState((prev) => ({ ...prev, nativeBalance: toHD(nativeBalQry.data.value) }));
    }

    if (baseBalQry.data) {
      if (isERC20(state.buyToken)) {
        setState((prev) => ({ ...prev, baseBalance: baseBalQry.data.value.toString() }));
      } else if (isNative(getTokenType(state.buyToken)) && nativeBalQry.data) {
        setState((prev) => ({ ...prev, baseBalance: nativeBalQry.data.value.toString() }));
      }
    }

    if (quoteBalQry.data) {
      if (isERC20(state.sellToken)) {
        setState((prev) => ({ ...prev, quoteBalance: quoteBalQry.data.value.toString() }));
      } else if (isNative(state.sellToken) && nativeBalQry.data) {
        setState((prev) => ({ ...prev, quoteBalance: nativeBalQry.data.value.toString() }));
      }
    }
  }, [nativeBalQry.data, baseBalQry.data, quoteBalQry.data, state.buyToken, state.sellToken]);

  return { nativeBalQry, baseBalQry, quoteBalQry };
}
