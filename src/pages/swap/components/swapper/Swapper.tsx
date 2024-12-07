import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { ConnectButton } from "@/hooks/connectors/components/ConnectButton.tsx";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { isZero, toDec, trimZeros } from "@/libs/helpers.ts";
import { cn } from "@/libs/utils.ts";
import { SwapInputField } from "@/pages/swap/components/swapper/SwapInputField";
import { TokenList } from "@jointlabs/meta";
import { motion } from "framer-motion";
import { ChevronDown, Loader2, Settings } from "lucide-react";
import { useRef } from "react";
import LinkAccountButton from "../../../../components/header/LinkAccountButton";
import useStore from "../../../../hooks/store/useStore";
import { isSynth } from "../../utils";
import { SwapDrawer } from "../SwapDrawer";
import { PaymentMethodSection } from "./PaymentMethodSection";
import { ProviderSection } from "./ProviderSection";
import { SwapPageState, SwapSide } from "./types";
import { useSwapLogic } from "./useSwapLogic";

export function Swapper() {
  const { ready } = useConnectorContext();
  const { user } = useStore((state) => ({ user: state.user }));
  const { state, setState, approveSell, swap, getSellAmount, getBuyAmount } = useSwapLogic();
  const swapSectionRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative mx-auto mt-5 flex w-[537px] flex-col overflow-hidden rounded-b-3xl">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-normal tracking-wider text-gray-400">Swap</h1>
        <div className="flex items-center space-x-0">
          {!!state.slippage && (
            <Button
              variant="ghost"
              disabled={!canSwap(state, user)}
              className="flex h-auto items-center space-x-2 rounded-xl rounded-r-none border border-ragoon-green bg-eerie-black p-2 px-3 text-gray-400 opacity-100 animate-in slide-in-from-right-20 hover:text-gray-400 disabled:opacity-50 disabled:hover:opacity-50"
              onClick={() => {
                setState((prev: SwapPageState) => ({
                  ...prev,
                  drawerContent: "advance-settings",
                  openDrawer: !prev.openDrawer,
                }));
              }}
            >
              <div className="flex items-center space-x-1">
                <span className="text-gray-400">slippage</span>
                <span className="text-sm font-medium text-gray-300">{state.slippage}%</span>
              </div>
            </Button>
          )}
          <Button
            variant="ghost"
            className="h-auto p-0 opacity-80 hover:scale-105 hover:opacity-100 disabled:opacity-50 disabled:hover:opacity-50"
            disabled={!canSwap(state, user)}
            onClick={() => {
              setState((prev) => ({ ...prev, drawerContent: "advance-settings" }));
              setState((prev) => ({ ...prev, openDrawer: !prev.openDrawer }));
            }}
          >
            <div
              className={cn("rounded-xl rounded-l-none border border-ragoon-green bg-eerie-black p-2", {
                "rounded-l-xl": !state.slippage,
              })}
            >
              <Settings className="h-5 w-5 text-gray-500" />
            </div>
          </Button>
        </div>
      </div>
      <Card
        ref={swapSectionRef}
        className={cn(
          "w-full rounded-3xl border border-gray-800/50 bg-gradient-to-b from-eerie-black to-onyx p-3 pb-0 text-gray-300",
        )}
      >
        <CardContent className="space-y-2 p-0">
          <SwapInputField
            direction={SwapSide.Sell}
            value={getSellAmount() || ""}
            price="0"
            side={SwapSide.Sell}
            balance={!isSynth(state.sellToken!) ? state.quoteBalance : undefined}
            selected={state.sellToken || state.tokenLists?.tokens[0]}
            disabled={state.swapLoading || state.approveLoading}
            onRequestModal={(selected?: TokenList.Token) => {
              setState((prev: SwapPageState) => ({
                ...prev,
                openDrawer: !prev.openDrawer,
                drawerContent: "token-selector",
                sellToken: selected,
                openDrawerSide: SwapSide.Sell,
              }));
            }}
            onChange={(value) => {
              setState((prev: SwapPageState) => ({ ...prev, sellAmount: value }));
            }}
            onFocus={() => {
              setState((prev: SwapPageState) => ({ ...prev, focusSide: SwapSide.Sell }));
            }}
            onBlur={() => {
              setState((prev: SwapPageState) => ({ ...prev, focusSide: undefined }));
            }}
          />

          <SwapInputField
            direction={SwapSide.Buy}
            value={getBuyAmount() || ""}
            price="0"
            side={SwapSide.Buy}
            balance={!isSynth(state.buyToken!) ? state.baseBalance : undefined}
            selected={state.buyToken}
            disabled={state.swapLoading || state.approveLoading}
            onRequestModal={(selected?: TokenList.Token) => {
              setState((prev: SwapPageState) => ({
                ...prev,
                openDrawer: !prev.openDrawer,
                drawerContent: "token-selector",
                buyToken: selected,
                openDrawerSide: SwapSide.Buy,
              }));
            }}
            onChange={(value) => {
              setState((prev: SwapPageState) => ({ ...prev, buyAmount: value }));
            }}
            onFocus={() => {
              setState((prev: SwapPageState) => ({ ...prev, focusSide: SwapSide.Buy }));
            }}
            onBlur={() => {
              setState((prev: SwapPageState) => ({ ...prev, focusSide: undefined }));
            }}
          />

          <ProviderSection state={state} setState={setState} />

          <PaymentMethodSection state={state} setState={setState} />

          {canSwap(state, user) && state.takerPaysFee && (
            <motion.div className="slide-in-from-up-20 rounded-2xl bg-mirage p-2 px-0 text-gray-400/90 animate-in">
              <Button
                variant="ghost"
                className="hover:none hover:text-gray flex h-auto w-full cursor-pointer items-center !justify-between rounded-2xl bg-none px-4 py-0 text-sm font-light tracking-wide hover:bg-none"
                onClick={() => {
                  setState((prev: SwapPageState) => ({ ...prev, showFeeDetails: !state.showFeeDetails }));
                }}
              >
                <span className="flex items-center space-x-1 font-light text-boulder">
                  Swap Fee
                  <ChevronDown
                    className={cn("h-4 w-4 text-gray-400 transition-all duration-300", {
                      "rotate-180 transition-all duration-300": state.showFeeDetails,
                    })}
                  />
                </span>
                <span className="flex items-center space-x-1">
                  <span className="font-medium">
                    {trimZeros(toDec(state.protoFee!).add(state.mktFee!).toFixed(8))} {state.feeSideSymbol}
                  </span>
                  <span>($0.43)</span>
                </span>
              </Button>

              <motion.div
                initial={{ height: 0, overflow: "hidden" }}
                animate={{ height: state.showFeeDetails ? "auto" : "0", overflow: "auto" }}
                className="text-gray-500"
              >
                <div className="mt-2 flex justify-between px-4">
                  <p className="text-xs">Market Fee ({state.mktFeePct}%)</p>
                  <p className="text-xs">
                    {state.mktFee} {state.feeSideSymbol} ($0.43)
                  </p>
                </div>
                <div className="mt-2 flex justify-between px-4">
                  <p className="text-xs">Protocol Fee ({state.protoFeePct}%)</p>
                  <p className="text-xs">
                    {state.protoFee} {state.feeSideSymbol} ($0.43)
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="p-4 px-0">
          {ready && !requiresWalletLink(state, user) && (
            <Button
              className={cn(
                "h-[55px] w-full rounded-2xl bg-light-green/90 text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-light-green",
                {
                  "bg-baltic-sea text-gray-400": !canSwap(state, user),
                  "bg-alice-blue/90 text-black hover:bg-alice-blue": canSwap(state, user) && !state.allowanceOk,
                },
              )}
              disabled={!canSwap(state, user) || state.approveLoading || state.swapLoading}
              onClick={() => {
                if (canSwap(state, user) && !state.allowanceOk) void approveSell();
                if (canSwap(state, user) && state.allowanceOk) void swap();
              }}
            >
              {!state.insufficientLiquidity && !state.insufficientBalance && (
                <>
                  {canSwap(state, user) && state.allowanceOk && !state.swapLoading && "Swap"}
                  {canSwap(state, user) && state.allowanceOk && state.swapLoading && (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin" />
                      <span>Swapping</span>
                    </span>
                  )}

                  {canSwap(state, user) && !state.allowanceOk && !state.approveLoading && "Approve"}
                  {canSwap(state, user) && !state.allowanceOk && state.approveLoading && (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                      <span className="text-gray-500">Approving</span>
                    </span>
                  )}

                  {!state.isMarketUnknown && !isTokensSelected(state) && "Select a token"}

                  {state.isMarketUnknown && "Market not found"}

                  {!!state.selectedLiquidity &&
                    !state.market?.instant &&
                    !user?.paymentMethod &&
                    !!user &&
                    "Select a payment method"}

                  {!state.isMarketUnknown &&
                    isTokensSelected(state) &&
                    (isZero(state.sellAmount) || isZero(state.buyAmount)) &&
                    "Enter an amount"}
                </>
              )}

              {state.insufficientLiquidity && "Insufficient liquidity"}
              {state.insufficientBalance &&
                !state.insufficientLiquidity &&
                `Insufficient ${state.sellToken?.symbol} balance`}
            </Button>
          )}

          {ready && requiresWalletLink(state, user) && (
            <LinkAccountButton onLoading={(loading) => setState((prev) => ({ ...prev, linkWalletLoading: loading }))}>
              <Button
                disabled={state.linkWalletLoading}
                className={cn(
                  "h-[55px] w-full rounded-2xl bg-alice-blue/90 text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-alice-blue",
                  {},
                )}
              >
                {!state.linkWalletLoading && "Link Wallet"}
                {state.linkWalletLoading && <Loader2 className="h-6 w-6 animate-spin" />}
              </Button>
            </LinkAccountButton>
          )}

          {!ready && (
            <ConnectButton
              connectBtnText="Connect wallet"
              renderNullOnConnect={true}
              className="h-auto w-full rounded-2xl bg-light-green/60 py-3 text-xl font-medium text-[#c3faad] animate-in fade-in-30 hover:scale-[1.01] hover:bg-light-green/65"
            />
          )}
        </CardFooter>
      </Card>
      <SwapDrawer
        swapperState={state}
        setSwapperState={setState}
        containerHeight={swapSectionRef.current?.clientHeight}
      />
    </div>
  );
}

function isTokensSelected(state: SwapPageState) {
  return !!state.sellToken && !!state.buyToken;
}

function canSwap(state: SwapPageState, user?: User) {
  if (state.isMarketUnknown || state.insufficientLiquidity || state.insufficientBalance) return false;
  return (
    state.sellToken &&
    state.buyToken &&
    !isZero(state.sellAmount) &&
    !isZero(state.buyAmount) &&
    (state.market?.instant || user?.paymentMethod)
  );
}

function requiresWalletLink(state: SwapPageState, user?: User) {
  return state.market && !state.market.instant && !user;
}
