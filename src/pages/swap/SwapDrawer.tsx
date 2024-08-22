import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SwapDrawerAdvanceSettings } from "@/pages/swap/SwapDrawerAdvanceSettings.tsx";
import { SwapDrawerTokenSelector } from "@/pages/swap/SwapDrawerTokenSelector.tsx";
import { SwapDrawerProviderSelector } from "@/pages/swap/SwapDrawerProviderSelector.tsx";
import { TokenList } from "../../../../jointlabs/meta";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";

export type SwapDrawerContent = "advance-settings" | "provider-selector" | "token-selector";

const defaultState: {
  tokenLists?: TokenList.TokenData;
  show?: boolean;
} = {
  tokenLists: undefined,
  show: false,
};

export function SwapDrawer({
  height,
  open,
  content,
  onClose,
  tokenLists,
  selectedToken,
  onTokenSelect,
  side,
}: {
  height?: number;
  open?: boolean;
  content?: SwapDrawerContent;
  onClose?: () => void;
  side?: SwapSide;
  tokenLists?: TokenList.TokenData;
  selectedToken?: { sell?: TokenList.Token; buy?: TokenList.Token };
  onTokenSelect?: (token: TokenList.Token) => void;
}) {
  const [state, setState] = useState({ ...defaultState, tokenLists });
  const { chainId } = useConnectorContext();

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

  return (
    <div>
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
                  <SwapDrawerAdvanceSettings
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
