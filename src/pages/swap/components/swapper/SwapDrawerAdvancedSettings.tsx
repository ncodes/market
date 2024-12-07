import { ToolTip } from "@/components/toolTip.tsx";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { cn } from "@/libs/utils.ts";
import { DefaultSwapExpireDurSec, DefaultSwapSlippage } from "@/pages/swap/constants.ts";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { AlertTriangle, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

const defaultState: {
  slippage: number;
  expires: number;
  customSlippage: string;
  customExpires: string;
} = {
  slippage: DefaultSwapSlippage,
  expires: DefaultSwapExpireDurSec,
  customSlippage: "",
  customExpires: "",
};

export function SwapDrawerAdvancedSettings({
  expires,
  slippage,
  closeRequested,
  updateSlippage,
  updateExpires,
  drawerRef,
}: {
  drawerRef: React.RefObject<HTMLDivElement>;
  expires?: number;
  slippage?: number;
  closeRequested?: () => void;
  updateSlippage?: (slippage: number) => void;
  updateExpires?: (expires: number) => void;
}) {
  const [state, setState] = useState({ ...defaultState, expires, slippage });

  useOnClickOutside(drawerRef, () => {
    closeRequested?.();
  });

  useEffect(() => {
    if (!slippage) return;

    if (![0.5, 1].includes(slippage)) {
      setState((prev) => ({ ...prev, customSlippage: slippage.toString(), slippage: undefined }));
    } else {
      setState((prev) => ({ ...prev, customSlippage: "", slippage: slippage }));
    }

    if (expires != undefined && ![600, 1200].includes(expires)) {
      setState((prev) => ({ ...prev, customExpires: expires.toString(), expires: undefined }));
    }
  }, []);

  useEffect(() => {
    updateSlippage?.(getCurSlippage() ?? 0);
    updateExpires?.(getCurExpires() ?? 0);
  }, [state.slippage, state.expires, state.customSlippage, state.customExpires]);

  function getCurSlippage() {
    return state.customSlippage ? parseFloat(state.customSlippage) : state.slippage;
  }

  function getCurExpires() {
    return state.customExpires ? parseInt(state.customExpires) : state.expires;
  }

  return (
    <div className="max-w-[650px] rounded-3xl p-4">
      <h2 className="mb-4 flex items-center justify-between font-medium tracking-wider text-white">
        <span>Advanced Settings</span>
        <span>
          <Button
            variant="ghost"
            className="h-auto p-0"
            onClick={() => {
              closeRequested?.();
            }}
          >
            <XIcon className="h-5 w-5 cursor-pointer text-white opacity-30 transition-all duration-300 hover:opacity-100" />
          </Button>
        </span>
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1 font-light text-boulder">
            Set slippage{" "}
            <ToolTip tip="Your transaction will revert if the price changes unfavorably by more than this percentage.">
              <InfoCircledIcon className="h-4 w-4 text-gray-500" />
            </ToolTip>
          </label>
          <div className="flex items-center space-x-2">
            <Button
              className={cn("w-16 rounded-lg bg-boulder/30 text-white hover:bg-gray-700", {
                "border-none bg-byzantine-blue hover:bg-byzantine-blue": state.slippage == 0.5,
              })}
              onClick={() => {
                if (state.slippage == 0.5) {
                  setState((prev) => ({ ...prev, slippage: undefined, customSlippage: "" }));
                } else {
                  setState((prev) => ({ ...prev, slippage: 0.5, customSlippage: "" }));
                }
              }}
            >
              0.5%
            </Button>
            <Button
              className={cn("w-16 rounded-lg bg-boulder/30 text-white hover:bg-gray-700", {
                "border-none bg-byzantine-blue hover:bg-byzantine-blue": state.slippage == 1,
              })}
              onClick={() => {
                if (state.slippage == 1) {
                  setState((prev) => ({ ...prev, slippage: undefined, customSlippage: "" }));
                } else {
                  setState((prev) => ({ ...prev, slippage: 1, customSlippage: "" }));
                }
              }}
            >
              1%
            </Button>
            <span>
              <Input
                type="text"
                className={cn(
                  "w-20 rounded-md border-0 bg-bright-gray px-2 py-2.5 text-white outline-0 focus-visible:bg-bright-gray focus-visible:ring-2 focus-visible:ring-boulder",
                  {
                    "ring-2 ring-byzantine-blue": !!state.customSlippage,
                  },
                )}
                placeholder="1.5"
                value={state.customSlippage}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val && isNaN(parseFloat(val))) return;

                  val = val.replace(/[^\d.]/g, "");

                  if (parseFloat(val) > 20) return;

                  setState((prev) => ({ ...prev, customSlippage: val, slippage: undefined }));
                }}
              />
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1 font-light text-boulder">
            Swap Expires after
            <ToolTip tip="Your transaction will revert if it is pending (unmined) for longer than this period of time.">
              <InfoCircledIcon className="h-4 w-4 text-gray-500" />
            </ToolTip>
          </label>
          <div className="flex items-center space-x-2">
            <Button
              className={cn("w-16 rounded-lg bg-boulder/30 text-white hover:bg-gray-700", {
                "border-none bg-byzantine-blue hover:bg-byzantine-blue": state.expires == 600,
              })}
              onClick={() => {
                if (state.expires == 600) {
                  setState((prev) => ({ ...prev, expires: undefined, customExpires: "" }));
                } else {
                  setState((prev) => ({ ...prev, expires: 600, customExpires: "" }));
                }
              }}
            >
              10m
            </Button>
            <Button
              className={cn("w-16 rounded-lg bg-boulder/30 text-white hover:bg-gray-700", {
                "border-none bg-byzantine-blue hover:bg-byzantine-blue": state.expires == 1200,
              })}
              onClick={() => {
                if (state.expires == 1200) {
                  setState((prev) => ({ ...prev, expires: undefined, customExpires: "" }));
                } else {
                  setState((prev) => ({ ...prev, expires: 1200, customExpires: "" }));
                }
              }}
            >
              20m
            </Button>
            <span>
              <Input
                type="number"
                className={cn(
                  "w-20 rounded-md border-0 bg-bright-gray px-2 py-2.5 text-white outline-0 focus-visible:bg-bright-gray focus-visible:ring-2 focus-visible:ring-boulder",
                  {
                    "ring-2 ring-byzantine-blue": !!state.customExpires,
                  },
                )}
                placeholder="300"
                value={state.customExpires}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val && isNaN(parseFloat(val))) return;
                  val = val.replace(/[^\d.]/g, "");
                  if (parseFloat(val) == 0 && val != "0") return;
                  if (parseFloat(val) > 7200) return;
                  setState((prev) => ({ ...prev, customExpires: val, expires: undefined }));
                }}
              />
            </span>
          </div>
        </div>

        {getCurSlippage()! >= 2 && (
          <Alert variant="warning" className="!border-yellow-500/5 tracking-wider animate-in slide-in-from-bottom-20">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Your transaction may be frontrun which may result in an unfavorable trade.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <div
        className="mt-6 flex justify-end"
        onClick={() => {
          setState((prev) => ({ ...prev, customSlippage: "", customExpires: "", slippage: undefined, expires: 600 }));
        }}
      >
        <Button variant="link" className="h-auto py-0 text-sm font-light text-gray-300">
          Reset
        </Button>
      </div>
    </div>
  );
}
