import { Card, CardContent, CardFooter } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Header } from "@/components/header/header.tsx";
import { ChevronsUp, Settings } from "lucide-react";
import { SwapInputField } from "@/pages/swap/SwapInputField.tsx";
import { AvatarSize } from "@/components/avatar/useAvatar.tsx";
import EmojiAvatar from "@/components/avatar/EmojiAvatar.tsx";
import { useRef } from "react";
import { cn } from "@/libs/utils.ts";
import { SwapDrawer } from "@/pages/swap/SwapDrawer.tsx";
import { ConnectButton } from "@/hooks/connectors/components/ConnectButton.tsx";
import { TokenList } from "@jointlabs/meta";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { useSwapLogic } from "@/pages/swap/useSwapLogic.ts";
import { SwapPageType } from "@/pages/swap/types.ts";

export default function SwapPage() {
  const swapSectionRef = useRef<HTMLDivElement | null>(null);
  const { ready } = useConnectorContext();
  const { state, setState } = useSwapLogic();

  return (
    <div className="overflow-hidden font-poppins text-white">
      <Header />
      <div className="relative mx-auto mt-10 flex w-[537px] flex-col overflow-hidden rounded-b-3xl">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-3xl font-normal tracking-wider">Swap</h1>
          <Button
            variant="ghost"
            className="h-auto p-0 opacity-80 hover:scale-105 hover:opacity-100"
            onClick={() => {
              setState((prev) => ({ ...prev, drawerContent: "advance-settings" }));
              setState((prev) => ({ ...prev, openDrawer: !prev.openDrawer }));
            }}
          >
            <div className="rounded-xl border border-ragoon-green bg-eerie-black p-2">
              <Settings className="h-5 w-5 text-gray-500" />
            </div>
          </Button>
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
              value={state.sellAmount}
              price="0"
              side="Sell"
              tokenLists={state.tokenLists}
              selected={state.sellToken}
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
              value={state.buyAmount}
              price="0"
              side="Buy"
              selected={state.buyToken}
              tokenLists={state.tokenLists}
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

            <div className="hidden rounded-2xl bg-mirage p-2 px-0 text-boulder">
              <div className="flex justify-between px-4 text-sm font-light tracking-wide text-gray-400">
                <span className="font-medium">Swap Fee</span>
                <span>
                  <span className="font-semibold">0.064286 ETH</span> ($0.43)
                </span>
              </div>
              <div className="mt-2 flex justify-between px-4">
                <p className="text-sm">Market Fee (1.5%)</p>
                <p className="text-sm">0.064286 ETH ($0.43)</p>
              </div>
              <div className="mt-2 flex justify-between px-4">
                <p className="text-sm">Protocol Fee (0%)</p>
                <p className="text-sm">0 ETH</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 px-0">
            {ready && (
              <Button
                className={cn(
                  "h-auto w-full rounded-2xl bg-light-green/90 py-3 text-xl font-medium text-black animate-in fade-in-10 hover:bg-light-green",
                  {
                    "bg-baltic-sea text-gray-500": !canSwap(state),
                  },
                )}
                disabled={!canSwap(state)}
              >
                {!state.insufficientLiquidity && (
                  <>
                    {canSwap(state) && "Swap"}
                    {!state.isMarketUnknown && !isTokensSelected(state) && "Select a token"}

                    {state.isMarketUnknown && "Market not found"}

                    {!state.isMarketUnknown &&
                      isTokensSelected(state) &&
                      (isEmptyOrZero(state.sellAmount) || isEmptyOrZero(state.buyAmount)) &&
                      "Enter an amount"}
                  </>
                )}

                {state.insufficientLiquidity && "Insufficient liquidity"}
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
  if (state.isMarketUnknown || state.insufficientLiquidity) return false;
  return state.sellToken && state.buyToken && !isEmptyOrZero(state.sellAmount) && !isEmptyOrZero(state.buyAmount);
}

function isEmptyOrZero(value?: number | string) {
  return !value || value === 0 || value === "";
}
