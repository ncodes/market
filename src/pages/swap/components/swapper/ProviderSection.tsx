import EmojiAvatar from "@/components/avatar/EmojiAvatar.tsx";
import { AvatarSize } from "@/components/avatar/useAvatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { isZero, shortenAddress } from "@/libs/helpers.ts";
import { motion } from "framer-motion";
import { ChevronsUp, InfoIcon } from "lucide-react";
import { ToolTip } from "../../../../components/toolTip";
import { isInstantMarket, isSynth } from "../../common/utils";
import { SwapPageState } from "../../types/types";
import { PayRouteSection } from "./PayRouteSection";

export function ProviderSection({
  state,
  setState,
}: {
  state: SwapPageState;
  setState: React.Dispatch<React.SetStateAction<SwapPageState>>;
}) {
  const { market } = state;

  return (
    <motion.div
      initial={{ height: 0, overflow: "hidden" }}
      animate={{ height: canShowProviderSection(state) ? "auto" : "0", overflow: "auto" }}
    >
      <div className="rounded-2xl bg-mirage p-2 px-0">
        <p className="flex items-center gap-1 px-4 text-sm font-light tracking-wide text-boulder">
          <span>Buyer</span>
          <span>
            <ToolTip
              tip={`The user that is providing the liquidity for this swap. Tap "Select Buyer" to change the buyer.`}
              className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
            >
              <InfoIcon className="h-4 w-4" />
            </ToolTip>
          </span>
        </p>
        <div className="flex justify-between px-4">
          <div className="mt-2 flex items-center space-x-2">
            <EmojiAvatar randomStr={state.selectedLiquidity?.provider || ""} size={AvatarSize.Medium} />
            <div className="flex flex-col">
              <span className="font-regular text-sm tracking-wider text-gray-300">
                {shortenAddress(state.selectedLiquidity?.provider || "")}
              </span>
              <span className="flex items-center gap-1 text-sm font-light tracking-wider text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="text-xs font-normal text-gray-400">
                    {state.selectedLiquidity?.paymentMethod?.name}
                  </span>
                </span>
                <span>
                  <ToolTip
                    tip={
                      !isSynth(market?.baseType)
                        ? `The buyer accepts payment via ${state.selectedLiquidity?.paymentMethod?.name}. Only initiate swap if you can send the payment to the buyer or use a router.`
                        : `The buyer will send payment via ${state.selectedLiquidity?.paymentMethod?.name}. Only initiate swap if you can receive payment from the buyer or use a router.`
                    }
                    className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                  >
                    <InfoIcon className="h-4 w-4" />
                  </ToolTip>
                </span>
              </span>
            </div>
          </div>
          <div>
            <div className="flex flex-col text-right tracking-wide">
              <span className="flex items-center gap-1 text-xs font-light text-boulder">
                <span>CP Rate</span>
                <span>
                  <ToolTip
                    tip="CP rate: Percentage of successful swaps. Higher rate indicates greater buyer reliability."
                    className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                  >
                    <InfoIcon className="h-4 w-4" />
                  </ToolTip>
                </span>
              </span>
              <span className="font-semibold text-gray-100">100%</span>
            </div>
          </div>
        </div>

        <PayRouteSection state={state} setState={setState} />

        {state.liquidities.length > 1 && (
          <div className="mt-3 flex w-full items-center justify-center border-t border-gray-800/50 pt-2 text-sm text-gray-400">
            <Button
              variant="ghost"
              className="h-auto p-0 hover:text-gray-300"
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  drawerContentType: "provider-selector",
                  openDrawer: !prev.openDrawer,
                }));
              }}
            >
              Select Buyer
              <ChevronsUp className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function canShowProviderSection(state: SwapPageState) {
  return state.market && !isZero(state.sellAmount) && !isInstantMarket(state.market) && state.selectedLiquidity;
}
