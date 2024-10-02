import { Button } from "@/components/ui/button.tsx";
import { motion } from "framer-motion";
import { InfoIcon, X } from "lucide-react";
import { ToolTip } from "../../../components/toolTip";
import { isSynth } from "../utils";
import { RoutesPathView } from "./SwapDrawerRouterSelector";
import { SwapPageType } from "./types";

export function PayRouteSection({
  state,
  setState,
}: {
  state: SwapPageType;
  setState: React.Dispatch<React.SetStateAction<SwapPageType>>;
}) {
  const { market } = state;
  const canShowRouteSelectButton = state.payRoutes!.length > 0 && state.selectedPayRoutes.length == 0;

  return (
    <>
      <motion.div
        className="p-3 pb-1 [&>button]:h-[70px]"
        animate={{
          opacity: canShowRouteSelectButton ? 100 : 0,
          height: canShowRouteSelectButton ? 70 : 0,
          display: canShowRouteSelectButton ? "block" : "none",
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
              {isSynth(market?.baseType) ? (
                <>{`Can't receive payment from ${state.selectedLiquidity?.paymentMethod?.name}?`}</>
              ) : (
                <>{`Can't make payment to ${state.selectedLiquidity?.paymentMethod?.name}?`}</>
              )}
            </span>
            <span className="font-medium text-alice-blue">
              {"> "}Use a Router{" <"}
            </span>
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
                      Payment routes allow you to send or receive payments between incompatible banks or wallets
                      worldwide. Routes are operated by members of the Swap community known as Routers.
                      <br />
                      <b className="font-semibold text-gray-100">
                        Payment routes add additional fees to the {isSynth(market?.quoteType) ? "sell" : "buy"} amount.
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

      {/* TODO: remove this section */}
      {/* {state.selectedPayRoutes?.length > 0 && (
        <div className="mt-3 flex hidden flex-col gap-1 border-t border-boulder/20 p-5 pb-1 pr-0 pt-3 text-white">
          <div className="flex items-center justify-between text-sm font-light tracking-wide text-boulder">
            <p className="flex items-center gap-1 text-sm font-light tracking-wide text-boulder">
              <span>Actual Sell Amount</span>
              <span>
                <ToolTip
                  tip={
                    <>
                      {isSynth(market?.quoteType) && (
                        <>
                          The actual amount you will send to the first router to cover the payment to the provider and
                          routing fees.
                        </>
                      )}
                      {!isSynth(market?.quoteType) && (
                        <>The actual amount you will sell to cover the payment to the provider and routing fees.</>
                      )}{" "}
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
            <span className="font-dosis text-gray-100">
              {applyRoutingFeeToAmount(state.sellAmount || "0", state.selectedPayRoutes, 4)}
            </span>{" "}
            {state.sellToken?.symbol}
          </span>
        </div>
      )} */}
    </>
  );
}
