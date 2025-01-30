import { Button } from "@/components/ui/button";
import { TokenList } from "@jointlabs/meta";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { Avatar } from "../../../components/avatar/Avatar";
import { cn } from "../../../libs/utils";

const defaultState: {
  mounted: boolean;
} = {
  mounted: false,
};

export function DrawerConfirmMarketCreation({
  drawerRef,
  drawerMeta,
  containerHeight,
  closeRequested,
}: {
  drawerRef: React.RefObject<HTMLDivElement>;
  drawerMeta: {
    base: TokenList.Token;
    quote: TokenList.Token;
    commission: number;
    marketManager: string;
    onConfirm: () => void;
  };
  containerHeight?: number;
  closeRequested?: () => void;
}) {
  const [, setState] = useState({ ...defaultState });

  useOnClickOutside(drawerRef, () => {
    closeRequested?.();
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, mounted: true }));
  }, []);

  return (
    <div className="max-w-[650px] rounded-3xl bg-gray-200/10 py-2 pb-0 backdrop-blur-2xl">
      <div>
        <h2 className="mb-2 flex items-center justify-between px-4 font-medium tracking-wider text-white">
          <span>Confirm Market</span>
          <span>
            <Button
              variant="link"
              className="h-auto p-0"
              onClick={() => {
                closeRequested?.();
              }}
            >
              <XIcon className="h-5 w-5 cursor-pointer text-white opacity-30 transition-all duration-300 hover:opacity-100" />
            </Button>
          </span>
        </h2>
      </div>

      <div className="h-[350px] w-full overflow-auto" style={{ maxHeight: containerHeight! * 0.6 + "px" }}>
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="mt-5 flex flex-col items-center gap-2">
              <span className="text-sm text-gray-500">Market Pair</span>
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="flex h-12 w-[155px] shrink-0 cursor-pointer items-center justify-start space-x-2 rounded-full bg-bright-gray/30 p-0 px-2 text-gray-400 transition-all duration-300">
                  <div className="rounded-full">
                    <Avatar
                      src={drawerMeta.base.logoURI || ""}
                      fallback={drawerMeta.base.symbol}
                      className="h-[30px] w-[30px]"
                      fallbackClassName="size-[40px] bg-gray-200 font-bold"
                    />
                  </div>
                  <span className="text-sm font-medium tracking-wider text-gray-100">{drawerMeta.base.symbol}</span>
                </span>

                <span className="text-gray-600">/</span>

                <span className="flex h-12 w-[155px] shrink-0 cursor-pointer items-center justify-start space-x-2 rounded-full bg-bright-gray/30 p-0 px-2 text-gray-400 transition-all duration-300">
                  <div className="rounded-full">
                    <Avatar
                      src={drawerMeta.quote.logoURI || ""}
                      fallback={drawerMeta.quote.symbol}
                      className="h-[30px] w-[30px]"
                      fallbackClassName="size-[40px] bg-gray-200 font-bold"
                    />
                  </div>
                  <span className="text-sm font-medium tracking-wider text-gray-100">{drawerMeta.quote.symbol}</span>
                </span>
              </div>
            </div>

            <div className="mt-5 flex flex-col items-center gap-2">
              <span className="text-sm text-gray-500">Commission</span>
              <span className="text-gray-200">{drawerMeta.commission || 0}%</span>
            </div>

            <div className="mt-5 flex flex-col items-center gap-2">
              <span className="text-sm text-gray-500">Market Manager</span>
              <span className="text-gray-200">{drawerMeta.marketManager || "None"}</span>
            </div>
          </div>

          <div className="p-3">
            <Button
              variant="secondary"
              className={cn("h-auto rounded-2xl p-2.5")}
              size="full"
              onClick={() => {
                drawerMeta.onConfirm();
                closeRequested?.();
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
