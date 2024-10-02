import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { SwapDrawerAdvancedSettings } from "@/pages/swap/swapper/SwapDrawerAdvancedSettings";
import { TokenList } from "@jointlabs/meta";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SwapDrawerPaymentMethodSelector } from "./SwapDrawerPaymentMethodSelector";
import { SwapDrawerProviderSelector } from "./SwapDrawerProviderSelector";
import { SwapDrawerRouterSelector } from "./SwapDrawerRouterSelector";
import { SwapDrawerTokenSelector } from "./SwapDrawerTokenSelector";
import { SwapSide } from "./types";

export type SwapDrawerContent =
  | "advance-settings"
  | "provider-selector"
  | "token-selector"
  | "router-selector"
  | "payment-methods";

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
  tokenLists,
  selectedToken,
  side,
  slippage,
  expires,
  liquidities,
  selectedLiquidity,
  routesList,
  market,
  onClose,
  onTokenSelect,
  updateSlippage,
  updateExpires,
  onSelectedLiquidity,
  updateSelectedPayRoutes,
  onSelectedPaymentMethod,
}: {
  height?: number;
  open?: boolean;
  content?: SwapDrawerContent;
  side?: SwapSide;
  tokenLists?: TokenList.TokenData;
  selectedToken?: { sell?: TokenList.Token; buy?: TokenList.Token };
  slippage?: number;
  expires?: number;
  liquidities: Liquidity[];
  selectedLiquidity?: Liquidity;
  routesList?: PayRouterRoute[][];
  market?: Market;
  onClose?: () => void;
  onTokenSelect?: (token: TokenList.Token) => void;
  updateSlippage?: (slippage: number) => void;
  updateExpires?: (expires: number) => void;
  onSelectedLiquidity?: (liqId: string) => void;
  updateSelectedPayRoutes?: (routes: PayRouterRoute[]) => void;
  onSelectedPaymentMethod?: (pm: PaymentMethod) => void;
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                layout
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ ease: "linear", duration: 0.2 }}
              >
                {content === "advance-settings" && (
                  <SwapDrawerAdvancedSettings
                    drawerRef={ref}
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
                    drawerRef={ref}
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
                    drawerRef={ref}
                    sellToken={selectedToken!.sell!}
                    selectedLiquidity={selectedLiquidity ?? liquidities[0]}
                    onSelected={onSelectedLiquidity}
                    containerHeight={height}
                    liquidities={liquidities}
                    market={market}
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
                      onClose?.();
                    }}
                  />
                )}

                {content === "router-selector" && (
                  <SwapDrawerRouterSelector
                    drawerRef={ref}
                    routesList={routesList ?? []}
                    onSelected={(routes) => {
                      updateSelectedPayRoutes?.(routes);
                    }}
                    containerHeight={height}
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
                      onClose?.();
                    }}
                  />
                )}

                {content === "payment-methods" && (
                  <SwapDrawerPaymentMethodSelector
                    drawerRef={ref}
                    routesList={routesList ?? []}
                    containerHeight={height}
                    onSelected={onSelectedPaymentMethod}
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
