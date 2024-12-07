import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { SwapDrawerAdvancedSettings } from "@/pages/swap/components/swapper/SwapDrawerAdvancedSettings";
import { TokenList } from "@jointlabs/meta";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../libs/utils";
import { isOrderRouter } from "../utils";
import { DrawerAppealCentre } from "./order/DrawerAppealCentre";
import { DrawerCreateAppeal } from "./order/DrawerCreateAppeal";
import { SwapOrderState } from "./order/useSwapOrderLogic";
import { SwapDrawerPaymentMethodSelector } from "./swapper/SwapDrawerPaymentMethodSelector";
import { SwapDrawerProviderSelector } from "./swapper/SwapDrawerProviderSelector";
import { SwapDrawerRouterSelector } from "./swapper/SwapDrawerRouterSelector";
import { SwapDrawerTokenSelector } from "./swapper/SwapDrawerTokenSelector";
import { SwapPageState as SwapperState } from "./swapper/types";

export type SwapDrawerContent =
  | "advance-settings"
  | "provider-selector"
  | "token-selector"
  | "router-selector"
  | "payment-methods"
  | "create-appeal"
  | "appeal-centre";

const defaultState: {
  show?: boolean;
} = {
  show: false,
};

export function SwapDrawer({
  containerHeight,
  swapperState,
  setSwapperState,
  swapOrderState,
  setSwapOrderState,
  order,
}: {
  containerHeight?: number;
  swapperState?: SwapperState;
  swapOrderState?: SwapOrderState;
  order?: Swap;
  setSwapperState?: React.Dispatch<React.SetStateAction<SwapperState>>;
  setSwapOrderState?: React.Dispatch<React.SetStateAction<SwapOrderState>>;
}) {
  const [state, setState] = useState({ ...defaultState });
  const { address, chainId } = useConnectorContext();
  const content = swapperState?.drawerContent ?? swapOrderState?.drawerContent;
  const selectedToken = { sell: swapperState?.sellToken, buy: swapperState?.buyToken };
  const ref = useRef(null);
  const isRouter = order && address ? isOrderRouter(order, address) : false;

  useEffect(() => {
    setState((prev) => ({ ...prev, show: swapperState?.openDrawer || swapOrderState?.openDrawer }));
  }, [swapperState?.openDrawer, swapOrderState?.openDrawer]);

  useEffect(() => {
    setState((prev) => ({ ...prev, show: false }));
    closeDrawer();
  }, [chainId]);

  function closeDrawer() {
    if (setSwapperState) {
      setSwapperState((prev: SwapperState) => ({ ...prev, openDrawer: false, drawerContent: undefined }));
    } else if (setSwapOrderState) {
      setSwapOrderState((prev: SwapOrderState) => ({ ...prev, openDrawer: false, drawerContent: undefined }));
    }
  }

  return (
    <div ref={ref}>
      <AnimatePresence>
        {state.show && (
          <motion.div
            id="drawer"
            className={cn(
              "absolute ml-[0.3%] flex w-[99.5%] flex-col justify-end border-black bg-black/50 backdrop-blur",
              { "rounded-3xl": !isRouter },
            )}
            transition={{ ease: "easeOut", duration: 0.2 }}
            style={{
              bottom: "0",
              height: containerHeight + "px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if ((e.target as HTMLElement).id === "drawer") {
                setState((prev) => ({ ...prev, show: false }));
                closeDrawer();
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
                {!!swapperState && !!setSwapperState && content === "advance-settings" && (
                  <SwapDrawerAdvancedSettings
                    drawerRef={ref}
                    slippage={swapperState.slippage}
                    expires={swapperState.expires}
                    updateSlippage={(slippage: number) =>
                      setSwapperState((prev: SwapperState) => ({ ...prev, slippage }))
                    }
                    updateExpires={(expires: number) => setSwapperState((prev: SwapperState) => ({ ...prev, expires }))}
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
                      closeDrawer();
                    }}
                  />
                )}

                {!!swapperState && !!setSwapperState && content === "token-selector" && (
                  <SwapDrawerTokenSelector
                    drawerRef={ref}
                    side={swapperState.openDrawerSide}
                    containerHeight={containerHeight}
                    tokenLists={swapperState.tokenLists!}
                    selectedToken={selectedToken}
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
                      closeDrawer();
                    }}
                    onSelect={(token: TokenList.Token) => {
                      if (swapperState.openDrawerSide === "Sell") {
                        setSwapperState((prev: SwapperState) => ({ ...prev, sellToken: token }));
                      } else {
                        setSwapperState((prev: SwapperState) => ({ ...prev, buyToken: token }));
                      }
                    }}
                  />
                )}

                {!!swapperState && !!setSwapperState && content === "provider-selector" && (
                  <SwapDrawerProviderSelector
                    drawerRef={ref}
                    sellToken={selectedToken!.sell!}
                    selectedLiquidity={swapperState.selectedLiquidity ?? swapperState.liquidities[0]}
                    onSelected={(liqId: string) => {
                      setSwapperState((prev: SwapperState) => ({
                        ...prev,
                        selectedLiquidity: swapperState.liquidities.find((liq: Liquidity) => liq.id === liqId),
                        selectedPayRoutes: [],
                      }));
                    }}
                    containerHeight={containerHeight}
                    liquidities={swapperState.liquidities}
                    market={swapperState.market}
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
                      closeDrawer();
                    }}
                  />
                )}

                {!!swapperState && !!setSwapperState && content === "router-selector" && (
                  <SwapDrawerRouterSelector
                    drawerRef={ref}
                    routesList={swapperState.payRoutes ?? []}
                    onSelected={(routes) => {
                      setSwapperState((prev: SwapperState) => ({ ...prev, selectedPayRoutes: routes }));
                    }}
                    containerHeight={containerHeight}
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
                      closeDrawer();
                    }}
                  />
                )}

                {!!swapperState && !!setSwapperState && content === "payment-methods" && (
                  <SwapDrawerPaymentMethodSelector
                    drawerRef={ref}
                    routesList={swapperState.payRoutes ?? []}
                    containerHeight={containerHeight}
                    onSelected={(pm: PaymentMethod) => {
                      setSwapperState((prev: SwapperState) => ({ ...prev, selectedPaymentMethod: pm }));
                    }}
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
                      closeDrawer();
                    }}
                  />
                )}

                {!!order && !!swapOrderState && !!setSwapOrderState && content === "create-appeal" && (
                  <DrawerCreateAppeal
                    drawerRef={ref}
                    swapOrderState={swapOrderState}
                    containerHeight={containerHeight}
                    order={order}
                    closeRequested={() => {
                      setSwapOrderState((prev) => ({ ...prev, show: false }));
                      closeDrawer();
                    }}
                  />
                )}

                {!!order && !!swapOrderState && !!setSwapOrderState && content === "appeal-centre" && (
                  <DrawerAppealCentre
                    drawerRef={ref}
                    swapOrderState={swapOrderState}
                    containerHeight={containerHeight}
                    order={order}
                    closeRequested={() => {
                      setSwapOrderState((prev) => ({ ...prev, show: false }));
                      closeDrawer();
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
