import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SwapDrawerAdvanceSettings } from "@/pages/swap/SwapDrawerAdvanceSettings.tsx";
import { SwapDrawerTokenSelector } from "@/pages/swap/SwapDrawerTokenSelector.tsx";
import { SwapDrawerProviderSelector } from "@/pages/swap/SwapDrawerProviderSelector.tsx";

export type SwapDrawerContent = "advance-settings" | "provider-selector" | "token-selector";

export function SwapDrawer({
  height,
  open,
  content,
  onClose,
}: {
  height?: number;
  open?: boolean;
  content?: SwapDrawerContent;
  onClose?: () => void;
}) {
  const [show, setShow] = useState(open);

  useEffect(() => {
    setShow(open);
  }, [open]);

  return (
    <div>
      <AnimatePresence>
        {show && (
          <motion.div
            id="drawer"
            className="absolute ml-[0.3%] flex w-[99.5%] flex-col justify-end rounded-3xl border-black bg-black/50 backdrop-blur"
            transition={{ ease: "easeOut", duration: 0.2 }}
            style={{
              bottom: "2px",
              height: height + "px",
            }}
            onClick={(e) => {
              if ((e.target as HTMLElement).id === "drawer") {
                setShow(false);
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
                      setShow(false);
                      onClose?.();
                    }}
                  />
                )}

                {content === "token-selector" && (
                  <SwapDrawerTokenSelector
                    closeRequested={() => {
                      setShow(false);
                      onClose?.();
                    }}
                  />
                )}

                {content === "provider-selector" && (
                  <SwapDrawerProviderSelector
                    closeRequested={() => {
                      setShow(false);
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
