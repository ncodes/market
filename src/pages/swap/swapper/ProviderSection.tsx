import EmojiAvatar from "@/components/avatar/EmojiAvatar.tsx";
import { AvatarSize } from "@/components/avatar/useAvatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { isZero, shortenAddress, toDec } from "@/libs/helpers.ts";
import { motion } from "framer-motion";
import { ChevronsUp, InfoIcon, X } from "lucide-react";
import { ToolTip } from "../../../components/toolTip";
import { calculateRoutesFee, isInstantMarket } from "../utils";
import { RoutesPathView } from "./SwapDrawerRouterSelector";
import { SwapPageType } from "./types";

export function ProviderSection({
  state,
  setState,
}: {
  state: SwapPageType;
  setState: React.Dispatch<React.SetStateAction<SwapPageType>>;
}) {
  return (
    <motion.div
      initial={{ height: 0, overflow: "hidden" }}
      animate={{ height: canShowProviderSection(state) ? "auto" : "0", overflow: "auto" }}
    >
      <div className="rounded-2xl bg-mirage p-2 px-0">
        <p className="flex items-center gap-1 px-4 text-sm font-light tracking-wide text-boulder">
          <span>Provider</span>
          <span>
            <ToolTip
              tip={`The user that is providing the liquidity for this swap. Tap "Select provider" to change the provider.`}
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
              <span className="font-regular text-[16px] tracking-wider text-gray-300">
                {shortenAddress(state.selectedLiquidity?.provider || "")}
              </span>
              <span className="flex items-center gap-1 text-sm font-light tracking-wider text-gray-400">
                <span className="flex items-center gap-1">
                  <span className="font-normal text-gray-400">{state.selectedLiquidity?.paymentMethod.name}</span>
                </span>
                <span>
                  <ToolTip
                    tip={`The provider accepts payment via ${state.selectedLiquidity?.paymentMethod.name}. Only initiate swap if you can 
                            send the payment to the provider or use a router.`}
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
                    tip="CP rate: Percentage of successful swaps. Higher rate indicates greater provider reliability."
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

        <motion.div
          className="p-3 pb-1 [&>button]:h-[70px]"
          animate={{
            opacity: canShowRouteSelectButton(state) ? 100 : 0,
            height: canShowRouteSelectButton(state) ? 70 : 0,
            display: canShowRouteSelectButton(state) ? "block" : "none",
            transition: { ease: "easeIn", duration: 0.1 },
          }}
        >
          <Button
            variant="ghost"
            size="full"
            className="h-auto rounded-2xl bg-baltic-sea/60 py-2.5 text-lg transition-all duration-500 hover:bg-baltic-sea/80"
            onClick={() => {
              setState((prev) => ({
                ...prev,
                drawerContent: "router-selector",
                openDrawer: !prev.openDrawer,
              }));
            }}
          >
            <span className="flex flex-col">
              <span className="block text-xs tracking-wider text-boulder">
                Can't make payment to {state.selectedLiquidity?.paymentMethod.name}?
              </span>
              <span className="font-semibold text-alice-blue">Select a router</span>
            </span>
          </Button>
        </motion.div>

        {state.selectedPayRoutes?.length > 0 && (
          <div className="mt-3 flex flex-col gap-1 border-t border-boulder/20 p-5 pb-1 pr-0 pt-3 text-white">
            <div className="flex items-center justify-between text-sm font-light tracking-wide text-boulder">
              <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder">
                <span>Payment Routes</span>
                <span>
                  <ToolTip
                    tip={
                      <>
                        Payment routes are the banks or wallets your payment will be sent through to reach the provider.
                        You only need to pay to the first bank or wallet.
                        <br />
                        <b className="font-semibold text-gray-100">
                          Payment routes add additional fees to the sell amount.
                        </b>
                        <br />
                        <a href="#" className="text-light-green">
                          Learn more
                        </a>
                      </>
                    }
                    className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                  >
                    <InfoIcon className="h-4 w-4" />
                  </ToolTip>
                </span>
              </p>
              <span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-x-1 text-xs text-boulder/80 hover:text-boulder"
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      selectedPayRoutes: [],
                    }));
                  }}
                >
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              </span>
            </div>
            <RoutesPathView routes={state.selectedPayRoutes} />
          </div>
        )}

        {state.selectedPayRoutes?.length > 0 && (
          <div className="mt-3 flex flex-col gap-1 border-t border-boulder/20 p-5 pb-1 pr-0 pt-3 text-white">
            <div className="flex items-center justify-between text-sm font-light tracking-wide text-boulder">
              <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder">
                <span>Actual Sell Amount</span>
                <span>
                  <ToolTip
                    tip={
                      <>
                        The actual amount you will send to the first router to cover the payment to the provider and
                        routing fees.
                        <br />
                        <a href="#" className="text-light-green">
                          Learn more
                        </a>
                      </>
                    }
                    className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
                  >
                    <InfoIcon className="h-4 w-4" />
                  </ToolTip>
                </span>
              </p>
              <span></span>
            </div>
            <span className="font-dosis text-2xl font-semibold text-gray-300">
              <span className="font-dosis text-gray-100">{calcActualSellAmount(state)}</span> {state.sellToken?.symbol}
            </span>
          </div>
        )}

        {state.liquidities.length > 1 && (
          <div className="mt-2 flex w-full items-center justify-center border-t border-gray-800/50 pt-2 text-sm text-boulder/90">
            <Button
              variant="ghost"
              className="h-auto p-0 hover:text-boulder"
              onClick={() => {
                setState((prev) => ({
                  ...prev,
                  drawerContent: "provider-selector",
                  openDrawer: !prev.openDrawer,
                }));
              }}
            >
              Select provider
              <ChevronsUp className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function canShowProviderSection(state: SwapPageType) {
  return state.market && !isZero(state.sellAmount) && !isInstantMarket(state.market) && state.selectedLiquidity;
}

function calcActualSellAmount(state: SwapPageType) {
  const sellAmount = state.sellAmount;
  if (!sellAmount) return "0";
  const routingFee = calculateRoutesFee(state.selectedPayRoutes);
  return toDec(sellAmount)
    .div(toDec(1).minus(toDec(routingFee).div(100)))
    .toFixed(2);
}

function canShowRouteSelectButton(state: SwapPageType) {
  return state.payRoutes!.length > 0 && state.selectedPayRoutes.length == 0;
}
