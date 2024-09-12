import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { SwapDrawerAdvancedSettings } from "@/pages/swap/SwapDrawerAdvancedSettings.tsx";
import { SwapDrawerProviderSelector } from "@/pages/swap/SwapDrawerProviderSelector.tsx";
import { SwapDrawerTokenSelector } from "@/pages/swap/SwapDrawerTokenSelector.tsx";
import { SwapSide } from "@/pages/swap/types.ts";
import { TokenList } from "@jointlabs/meta";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

export type SwapDrawerContent = "advance-settings" | "provider-selector" | "token-selector";

const defaultState: {
  tokenLists?: TokenList.TokenData;
  show?: boolean;
} = {
  tokenLists: undefined,
  show: false,
};

export function SwapDrawer({
  canSwap,
  height,
  open,
  content,
  onClose,
  tokenLists,
  selectedToken,
  onTokenSelect,
  side,
  slippage,
  expires,
  updateSlippage,
  updateExpires,
}: {
  canSwap?: boolean;
  height?: number;
  open?: boolean;
  content?: SwapDrawerContent;
  onClose?: () => void;
  side?: SwapSide;
  tokenLists?: TokenList.TokenData;
  selectedToken?: { sell?: TokenList.Token; buy?: TokenList.Token };
  onTokenSelect?: (token: TokenList.Token) => void;
  slippage?: number;
  expires?: number;
  updateSlippage?: (slippage: number) => void;
  updateExpires?: (expires: number) => void;
}) {
  const [state, setState] = useState({ ...defaultState, tokenLists });
  const { chainId } = useConnectorContext();
  const ref = useRef(null);

  useEffect(() => {
    setState((prev) => ({ ...prev, tokenLists }));
  }, [tokenLists]);

  useEffect(() => {
    setState((prev) => ({ ...prev, show: open }));
  }, [open]);

  useEffect(() => {
    setState((prev) => ({ ...prev, show: false }));
    onClose?.();
  }, [chainId]);

  useOnClickOutside(ref, () => {
    setState((prev) => ({ ...prev, show: false }));
    onClose?.();
  });

  return (
    <div ref={ref}>
      <AnimatePresence>
        {state.show && (
          <motion.div
            id="drawer"
            className="absolute ml-[0.3%] flex w-[99.5%] flex-col justify-end rounded-3xl border-black bg-black/50 backdrop-blur"
            transition={{ ease: "easeOut", duration: 0.2 }}
            style={{
              bottom: "0",
              height: height + "px",
            }}
            onClick={(e) => {
              if ((e.target as HTMLElement).id === "drawer") {
                setState((prev) => ({ ...prev, show: false }));
                onClose?.();
              }
            }}
            onAnimationComplete={() => {}}
          >
            <div className="bottom-0 w-full rounded-3xl border-y border-gray-500/20 bg-gradient-to-b from-eerie-black to-onyx">
              <motion.div
                initial={{ height: "0px" }}
                animate={{
                  height: "auto",
                }}
                exit={{
                  height: 0,
                }}
              >
                {content === "advance-settings" && (
                  <SwapDrawerAdvancedSettings
                    canSwap={canSwap}
                    slippage={slippage}
                    expires={expires}
                    updateSlippage={updateSlippage}
                    updateExpires={updateExpires}
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
                      onClose?.();
                    }}
                  />
                )}

                {content === "token-selector" && (
                  <SwapDrawerTokenSelector
                    side={side}
                    containerHeight={height}
                    tokenLists={state.tokenLists as TokenList.TokenData}
                    selectedToken={selectedToken}
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
                      onClose?.();
                    }}
                    onSelect={onTokenSelect}
                  />
                )}

                {content === "provider-selector" && (
                  <SwapDrawerProviderSelector
                    containerHeight={height}
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
                      onClose?.();
                    }}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
