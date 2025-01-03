import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { TokenList } from "@jointlabs/meta";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../../libs/utils";
import { DrawerConfirmMarketCreation } from "./DrawerConfirmMarketCreation";
import { DrawerSuccessfulMarketCreation } from "./DrawerSuccessfulMarketCreation";
import { DrawerTokenSelector } from "./DrawerTokenSelector";

// Drawer Caller Instruction
export type DrawerCallerInstruction = {
  open: boolean;
  content?: DrawerContentType;
  meta: Record<string, any>;
  transparent?: boolean;
  onSelect?: (data: any, meta: Record<string, any>) => void;
};

// Drawer Content Types
export type DrawerContentType = "tokenSelector" | "confirmMarketCreation" | "successfulMarketCreation";

const defaultState: { show?: boolean } = { show: false };

/**
 * Drawer Component
 * @param containerHeight - The height of the container the drawer is in
 * @param callerState - The caller state
 * @param setCallerState - The caller state setter
 * @returns Drawer Component
 */
export function Drawer({
  containerHeight,
  callerState,
  setCallerState,
}: {
  containerHeight?: number;
  callerState?: { drawer: DrawerCallerInstruction };
  setCallerState?: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [state, setState] = useState({ ...defaultState });
  const { chainId } = useConnectorContext();
  const content = callerState?.drawer.content;
  const ref = useRef(null);

  // Set the drawer to be shown or hidden based on the caller open state
  useEffect(() => {
    setState((prev) => ({ ...prev, show: callerState?.drawer.open }));
  }, [callerState?.drawer.open]);

  // Close the drawer when the chain changes
  useEffect(() => {
    setState((prev) => ({ ...prev, show: false }));
    closeDrawer();
  }, [chainId]);

  function closeDrawer() {
    if (setCallerState) {
      setCallerState((prev: any) => ({
        ...prev,
        drawer: { ...prev.drawer, open: false, content: undefined, onSelect: undefined },
      }));
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
              { "rounded-3xl": true },
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
            <div
              className={cn("bottom-0 w-full rounded-3xl border-y border-gray-500/20", {
                "bg-gradient-to-b from-eerie-black to-onyx": !callerState?.drawer.transparent,
              })}
            >
              <motion.div
                layout
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ ease: "linear", duration: 0.2 }}
              >
                {!!callerState && !!setCallerState && content === "tokenSelector" && (
                  <DrawerTokenSelector
                    containerHeight={containerHeight}
                    drawerRef={ref}
                    drawerMeta={
                      callerState?.drawer.meta as {
                        base: boolean;
                        baseSelected: TokenList.Token;
                        quoteSelected: TokenList.Token;
                      }
                    }
                    onSelect={(token) => {
                      callerState?.drawer.onSelect?.(token, callerState?.drawer.meta);
                    }}
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
                      closeDrawer();
                    }}
                  />
                )}

                {!!callerState && !!setCallerState && content === "confirmMarketCreation" && (
                  <DrawerConfirmMarketCreation
                    drawerRef={ref}
                    drawerMeta={
                      callerState?.drawer.meta as {
                        base: TokenList.Token;
                        quote: TokenList.Token;
                        commission: number;
                        marketManager: string;
                        onConfirm: () => void;
                      }
                    }
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
                      closeDrawer();
                    }}
                  />
                )}

                {!!callerState && !!setCallerState && content === "successfulMarketCreation" && (
                  <DrawerSuccessfulMarketCreation
                    drawerRef={ref}
                    containerHeight={containerHeight}
                    drawerMeta={
                      callerState?.drawer.meta as {
                        marketId: string;
                      }
                    }
                    closeRequested={() => {
                      setState((prev) => ({ ...prev, show: false }));
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
