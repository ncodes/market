import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Header } from "@/components/header/header.tsx";
import { ChevronDown, ChevronsUp, Loader2, Settings } from "lucide-react";
import { SwapInputField } from "@/pages/swap/SwapInputField.tsx";
import { AvatarSize } from "@/components/avatar/useAvatar.tsx";
import EmojiAvatar from "@/components/avatar/EmojiAvatar.tsx";
import { useRef } from "react";
import { cn } from "@/libs/utils.ts";
import { SwapDrawer } from "@/pages/swap/SwapDrawer.tsx";
import { ConnectButton } from "@/hooks/connectors/components/ConnectButton.tsx";
import { TokenList } from "@jointlabs/meta";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { useSwapLogic } from "@/pages/swap/useSwapLogic.tsx";
import { SwapPageType } from "@/pages/swap/types.ts";
import { toDec, trimZeros } from "@/libs/helpers.ts";
import { motion } from "framer-motion";

export default function SwapPage() {
  const swapSectionRef = useRef<HTMLDivElement | null>(null);
  const { ready } = useConnectorContext();
  const { state, setState, approveSell, swap } = useSwapLogic();

  return (
    <div className="overflow-hidden font-poppins text-white">
      <Header />
      <div className="relative mx-auto mt-10 flex w-[537px] flex-col overflow-hidden rounded-b-3xl">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-xl font-normal tracking-wider text-gray-400">Swap</h1>
          <div className="flex items-center space-x-0">
            {!!state.slippage && (
              <Button
                variant="ghost"
                disabled={!canSwap(state)}
                className="flex h-auto items-center space-x-2 rounded-xl rounded-r-none border border-ragoon-green bg-eerie-black p-2 px-3 text-gray-400 opacity-100 animate-in slide-in-from-right-20 hover:text-gray-400 disabled:opacity-50 disabled:hover:opacity-50"
                onClick={() => {
                  setState((prev) => ({ ...prev, drawerContent: "advance-settings" }));
                  setState((prev) => ({ ...prev, openDrawer: !prev.openDrawer }));
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
              disabled={!canSwap(state)}
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
            "w-full rounded-3xl border border-gray-800/50 bg-gradient-to-b from-eerie-black to-onyx p-4 pb-0 text-gray-300",
          )}
        >
          <CardContent className="space-y-4 p-0">
            <SwapInputField
              direction="Sell"
              value={state.sellAmount || ""}
              price="0"
              side="Sell"
              balance={state.quoteBalance}
              selected={state.sellToken || state.tokenLists?.tokens[0]}
              disabled={state.swapLoading || state.approveLoading}
              onRequestModal={(selected?: TokenList.Token) => {
                setState((prev) => ({
                  ...prev,
                  openDrawer: !prev.openDrawer,
                  drawerContent: "token-selector",
                  sellToken: selected,
                  openDrawerSide: "Sell",
                }));
              }}
              onChange={(value) => {
                setState((prev) => ({ ...prev, sellAmount: value }));
              }}
              onFocus={() => {
                setState((prev) => ({ ...prev, focusSide: "Sell" }));
              }}
              onBlur={() => {
                setState((prev) => ({ ...prev, focusSide: undefined }));
              }}
            />

            <SwapInputField
              direction="Buy"
              value={state.buyAmount || ""}
              price="0"
              side="Buy"
              balance={state.baseBalance}
              selected={state.buyToken}
              disabled={state.swapLoading || state.approveLoading}
              onRequestModal={(selected?: TokenList.Token) => {
                setState((prev) => ({
                  ...prev,
                  openDrawer: !prev.openDrawer,
                  drawerContent: "token-selector",
                  buyToken: selected,
                  openDrawerSide: "Buy",
                }));
              }}
              onChange={(value) => {
                setState((prev) => ({ ...prev, buyAmount: value }));
              }}
              onFocus={() => {
                setState((prev) => ({ ...prev, focusSide: "Buy" }));
              }}
              onBlur={() => {
                setState((prev) => ({ ...prev, focusSide: undefined }));
              }}
            />

            <div className="hidden rounded-2xl bg-mirage p-2 px-0">
              <p className="px-4 text-sm font-light tracking-wide text-boulder">Provider</p>
              <div className="flex justify-between px-4">
                <div className="mt-2 flex items-center space-x-2">
                  <EmojiAvatar randomStr="stuff" size={AvatarSize.Medium} />
                  <span className="font-regular text-[16px] tracking-wide text-boulder">0xLiquifyPro</span>
                </div>
                <div>
                  <div className="flex flex-col text-right tracking-wide">
                    <span className="text-sm font-light text-boulder">CP Rate:</span>
                    <span className="font-bold text-gray-100">100%</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex w-full items-center justify-center border-t border-gray-800/50 pt-2 text-sm text-boulder/90">
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:text-boulder"
                  onClick={() => {
                    setState((prev) => ({ ...prev, drawerContent: "provider-selector", openDrawer: !prev.openDrawer }));
                  }}
                >
                  Select provider
                  <ChevronsUp className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>

            {canSwap(state) && state.takerPaysFee && (
              <motion.div className="slide-in-from-up-20 rounded-2xl bg-mirage p-2 px-0 text-gray-400/90 animate-in">
                <Button
                  variant="ghost"
                  className="hover:none hover:text-gray flex h-auto w-full cursor-pointer items-center !justify-between rounded-2xl bg-none px-4 py-0 text-sm font-light tracking-wide hover:bg-none"
                  onClick={() => {
                    setState((prev) => ({ ...prev, showFeeDetails: !state.showFeeDetails }));
                  }}
                >
                  <span className="flex items-center space-x-1 font-medium">
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
            {ready && (
              <Button
                className={cn(
                  "h-[55px] w-full rounded-2xl bg-light-green/90 text-xl font-medium text-black duration-500 animate-in fade-in-10 hover:scale-[1.01] hover:bg-light-green",
                  {
                    "bg-baltic-sea text-gray-400": !canSwap(state),
                    "bg-alice-blue/90 text-black hover:bg-alice-blue": canSwap(state) && !state.allowanceOk,
                  },
                )}
                disabled={!canSwap(state) || state.approveLoading || state.swapLoading}
                onClick={() => {
                  if (canSwap(state) && !state.allowanceOk) void approveSell();
                  if (canSwap(state) && state.allowanceOk) void swap();
                }}
              >
                {!state.insufficientLiquidity && !state.insufficientBalance && (
                  <>
                    {canSwap(state) && state.allowanceOk && !state.swapLoading && "Swap"}
                    {canSwap(state) && state.allowanceOk && state.swapLoading && (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span>Swapping</span>
                      </span>
                    )}
                    {canSwap(state) && !state.allowanceOk && !state.approveLoading && "Approve"}
                    {canSwap(state) && !state.allowanceOk && state.approveLoading && (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
                        <span className="text-gray-500">Approving</span>
                      </span>
                    )}
                    {!state.isMarketUnknown && !isTokensSelected(state) && "Select a token"}
                    {state.isMarketUnknown && "Market not found"}
                    {!state.isMarketUnknown &&
                      isTokensSelected(state) &&
                      (isEmptyOrZero(state.sellAmount) || isEmptyOrZero(state.buyAmount)) &&
                      "Enter an amount"}
                  </>
                )}

                {state.insufficientLiquidity && "Insufficient liquidity"}
                {state.insufficientBalance &&
                  !state.insufficientLiquidity &&
                  `Insufficient ${state.sellToken?.symbol} balance`}
              </Button>
            )}

            {!ready && (
              <ConnectButton
                connectBtnText="Connect wallet"
                renderNullOnConnect={true}
                className="h-auto w-full rounded-2xl bg-light-green/30 py-3 text-xl font-medium text-[#AAFA8A] animate-in fade-in-30 hover:scale-[1.01] hover:bg-light-green hover:bg-light-green/35"
              />
            )}
          </CardFooter>
        </Card>
        <SwapDrawer
          slippage={state.slippage}
          expires={state.expires}
          updateSlippage={(slippage: number) => setState((prev) => ({ ...prev, slippage }))}
          updateExpires={(expires: number) => setState((prev) => ({ ...prev, expires }))}
          canSwap={canSwap(state)}
          open={state.openDrawer}
          height={swapSectionRef.current?.clientHeight}
          content={state.drawerContent}
          tokenLists={state.tokenLists}
          selectedToken={{ sell: state.sellToken, buy: state.buyToken }}
          side={state.openDrawerSide}
          onClose={() => setState((prev) => ({ ...prev, openDrawer: false }))}
          onTokenSelect={(token: TokenList.Token) => {
            if (state.openDrawerSide === "Sell") {
              setState((prev) => ({ ...prev, sellToken: token }));
            } else {
              setState((prev) => ({ ...prev, buyToken: token }));
            }
          }}
        />
      </div>
    </div>
  );
}

function isTokensSelected(state: SwapPageType) {
  return !!state.sellToken && !!state.buyToken;
}

function canSwap(state: SwapPageType) {
  if (state.isMarketUnknown || state.insufficientLiquidity || state.insufficientBalance) return false;
  return state.sellToken && state.buyToken && !isEmptyOrZero(state.sellAmount) && !isEmptyOrZero(state.buyAmount);
}

function isEmptyOrZero(value?: number | string) {
  value = typeof value == "number" ? value.toString() : value;
  return !value || value == 0 || value == "0" || value === "";
}
