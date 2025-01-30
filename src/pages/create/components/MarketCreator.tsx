import { ToolTip } from "@/components/ToolTip";
import { Card } from "@/components/ui/card";
import { cn } from "@/libs/utils.ts";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { AlertTriangleIcon, ChevronDown, Loader2 } from "lucide-react";
import { useRef } from "react";
import { Avatar } from "../../../components/avatar/Avatar";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import useMarketCreatorLogic from "../hooks/useMarketCreatorLogic";
import { Drawer } from "./Drawer";

export function MarketCreator() {
  const { state, setState, onTokenSelect, errors, onConfirm, mutCreateMarket, openDrawer } = useMarketCreatorLogic();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const loading = mutCreateMarket.isPending;

  function canCreate() {
    if (mutCreateMarket.isPending) return false;
    if (Object.keys(errors).length === 0) return true;
    return false;
  }

  return (
    <div className="relative mx-auto mt-5 flex w-[537px] flex-col overflow-hidden rounded-b-3xl">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-normal tracking-wider text-gray-300">Create a Market</h1>
        <div className="flex items-center space-x-0"></div>
      </div>
      <Card
        ref={containerRef}
        className={cn(
          "h-[450px] w-full rounded-3xl border border-gray-800/50 bg-gradient-to-b from-eerie-black to-onyx p-2 pb-0 text-gray-300",
        )}
      >
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="flex gap-20 rounded-2xl bg-baltic-sea/70 p-3">
              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-1 text-sm font-light text-boulder">
                  <>Base</>
                  <ToolTip tip="The token that will be sold in this market." className="opacity-50 hover:opacity-100">
                    <InfoCircledIcon />
                  </ToolTip>
                </span>
                <Button
                  disabled={loading}
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      drawer: {
                        open: true,
                        content: "tokenSelector",
                        meta: { ...prev.drawer.meta, base: true },
                        onSelect: onTokenSelect,
                      },
                    }));
                  }}
                  className="flex h-12 w-[155px] shrink-0 cursor-pointer items-center justify-start space-x-2 rounded-full bg-bright-gray/30 p-0 px-2 text-gray-400 transition-all duration-300 hover:scale-105 hover:bg-bright-gray hover:text-white"
                >
                  <div className="rounded-full">
                    <Avatar
                      src={state.baseToken?.logoURI as string}
                      fallback={state.baseToken?.symbol}
                      className="h-[30px] w-[30px]"
                      fallbackClassName="size-[40px] bg-gray-200 font-bold"
                    />
                  </div>
                  <span className="text-sm font-medium tracking-wider text-gray-100">{state.baseToken?.symbol}</span>
                </Button>
              </div>

              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-1 text-sm font-light text-boulder">
                  <>Quote</>
                  <ToolTip
                    tip="The token that will be used to buy from this market."
                    className="opacity-50 hover:opacity-100"
                  >
                    <InfoCircledIcon />
                  </ToolTip>
                </span>
                <Button
                  disabled={loading}
                  onClick={() => {
                    setState((prev) => ({
                      ...prev,
                      drawer: {
                        open: true,
                        content: "tokenSelector",
                        meta: { ...prev.drawer.meta, base: false },
                        onSelect: onTokenSelect,
                      },
                    }));
                  }}
                  className="flex h-12 w-[155px] shrink-0 cursor-pointer items-center justify-start space-x-2 rounded-full bg-bright-gray/30 p-0 px-2 text-gray-400 transition-all duration-300 hover:scale-105 hover:bg-bright-gray hover:text-white"
                >
                  <div className="rounded-full">
                    <Avatar
                      src={state.quoteToken?.logoURI as string}
                      fallback={state.quoteToken?.symbol}
                      className="h-[30px] w-[30px]"
                      fallbackClassName="size-[40px] bg-gray-200 font-bold"
                    />
                  </div>
                  <span className="text-sm font-medium tracking-wider text-gray-100">{state.quoteToken?.symbol}</span>
                </Button>
              </div>
            </div>

            <div className="p-3 pb-2 pt-4">
              <span className="flex items-center gap-1 text-sm font-light text-boulder">
                <>Commission</>
                <ToolTip
                  tip="Fee percentage charged by the market owner on all transactions."
                  className="opacity-50 hover:opacity-100"
                >
                  <InfoCircledIcon />
                </ToolTip>
              </span>

              <Input
                value={state.commission || ""}
                onChange={(e) => {
                  let value = parseFloat(e.target.value || "0");
                  if (value > 100) {
                    value = 100;
                  }
                  setState((prev) => ({ ...prev, commission: value }));
                }}
                type="number"
                className={cn("input mt-2 !w-[100px]")}
                placeholder="0"
                disabled={loading}
              />

              {errors.commission?.[0] && (
                <span className="mt-2 flex items-center gap-1 text-xs tracking-wide text-red-500">
                  <AlertTriangleIcon className="h-3 w-3" />
                  <span>{errors.commission?.[0]}</span>
                </span>
              )}
            </div>

            <div className={cn("mt-2 rounded-2xl p-3 py-0 pt-0", { "bg-baltic-sea/40": state.advancedSettingsOpen })}>
              <Button
                variant="link"
                className={cn("gap-1.5 p-0 text-sm font-light text-boulder hover:text-gray-200", {
                  "text-gray-200": state.advancedSettingsOpen,
                })}
                onClick={() => setState((prev) => ({ ...prev, advancedSettingsOpen: !prev.advancedSettingsOpen }))}
              >
                Advanced Settings{" "}
                <ChevronDown
                  className={cn("size-4 transition-all duration-300", { "rotate-180": state.advancedSettingsOpen })}
                />
              </Button>

              <div className={cn("flex flex-col pb-3", { hidden: !state.advancedSettingsOpen })}>
                <span className="flex items-center gap-1 text-sm font-light text-boulder">
                  <>Market Manager</>
                  <ToolTip
                    tip="Set a market manager to manage the market. Can be an EOA or a smart contract."
                    className="opacity-50 hover:opacity-100"
                  >
                    <InfoCircledIcon />
                  </ToolTip>
                </span>

                <Input
                  value={state.marketManager}
                  onChange={(e) => setState((prev) => ({ ...prev, marketManager: e.target.value }))}
                  type="text"
                  className={cn("input mt-2")}
                  placeholder="Enter address (0x...)"
                  disabled={loading}
                />

                {errors.marketManager?.[0] && (
                  <span className="mt-2 flex items-center gap-1 text-xs tracking-wide text-red-500">
                    <AlertTriangleIcon className="h-3 w-3" />
                    <span>{errors.marketManager?.[0]}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="pb-2 pt-5">
            <Button
              className={cn("h-auto gap-1 rounded-2xl p-2.5", { "bg-boulder": !canCreate() })}
              size="full"
              disabled={!canCreate()}
              onClick={() => {
                openDrawer(
                  "confirmMarketCreation",
                  {
                    base: state.baseToken,
                    quote: state.quoteToken,
                    commission: state.commission,
                    marketManager: state.marketManager,
                    onConfirm,
                  },
                  true,
                );
              }}
            >
              {mutCreateMarket.isPending ? "Creating" : state.confirmed ? "Create" : "Confirm"}
              {mutCreateMarket.isPending && <Loader2 className="size-4 animate-spin" />}
            </Button>
          </div>
        </div>
      </Card>
      <Drawer callerState={state} setCallerState={setState} containerHeight={containerRef.current?.clientHeight} />
    </div>
  );
}
