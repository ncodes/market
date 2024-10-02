import { getLogoUrl } from "@jointlabs/meta";
import { InfoIcon } from "lucide-react";
import { Avatar } from "../../../components/avatar/Avatar";
import { ToolTip } from "../../../components/toolTip";
import { Button } from "../../../components/ui/button";
import useStore from "../../../hooks/store/useStore";
import { isSynth } from "../utils";
import { SwapPageType } from "./types";

export function PaymentMethodSection({
  state,
  setState,
}: {
  state: SwapPageType;
  setState: React.Dispatch<React.SetStateAction<SwapPageType>>;
}) {
  const user = useStore((x) => x.user);
  if (!state.selectedLiquidity) return null;
  const { market } = state;
  const hasSelectedRoutes = state.selectedPayRoutes.length > 0;

  if (!user || market?.instant) return null;

  return (
    <div className="rounded-2xl bg-mirage p-2 px-0">
      <div className="flex items-center justify-between gap-1 px-3 pr-3 text-sm font-light tracking-wide text-boulder">
        <div className="flex items-center gap-1">
          <span>Payment Method</span>
          <span>
            <ToolTip
              tip={
                isSynth(market?.baseType)
                  ? "The payment method the buyer will use to send payment to you. You can choose another one by clicking the 'Select' button on the right."
                  : `The payment method that you will use to send payment to the ${!hasSelectedRoutes ? "buyer" : "router"}.`
              }
              className="text-gray-400/30 transition-all duration-500 hover:text-gray-400"
            >
              <InfoIcon className="h-4 w-4" />
            </ToolTip>
          </span>
        </div>
        <div>
          <Button
            variant="link"
            className="h-auto bg-baltic-sea/60 p-1 px-3 text-gray-300 hover:bg-baltic-sea/90 hover:text-gray-200"
            onClick={() => {
              setState((prev) => ({
                ...prev,
                drawerContent: "payment-methods",
                openDrawer: !prev.openDrawer,
              }));
            }}
          >
            Select
          </Button>
        </div>
      </div>

      {user?.paymentMethod && (
        <div className="mt-1 px-3.5 pb-1 font-mono text-sm">
          <div className="flex flex-wrap items-center gap-2">
            <ToolTip tip={user?.paymentMethod.name} className="flex items-center gap-2">
              <span>
                <Avatar
                  className="h-5 w-5 rounded-full"
                  fallbackClassName="h-5 w-5"
                  fallback={user?.paymentMethod.name.substring(0, 1)}
                  rootClassName="h-5"
                  src={getLogoUrl(user?.paymentMethod.name) || ""}
                />
              </span>
              <span className="">{user?.paymentMethod.name}</span>
            </ToolTip>
            {user?.paymentMethod.accountId && <span className="text-gray-400">{user?.paymentMethod.accountId}</span>}
            {user?.paymentMethod.bankAccountName && (
              <div className="flex gap-2 text-gray-400">
                <span className="font-mono">{user?.paymentMethod.bankAccountName}</span>
                <span className="font-mono text-boulder/70">{user?.paymentMethod.bankAccountNumber}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
