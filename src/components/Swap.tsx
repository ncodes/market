import { BNBIcon, BSCIcon, SolanaIcon, USDCIcon } from "@/assets";
import { ConnectButton } from "@/hooks/connectors/components/ConnectButton";
import useStore from "@/hooks/store/useStore";
import { cn } from "@/libs/utils";
import AssetSelect from "./AssetSelect";
import SwapConfirmationModal from "./SwapConfirmation";
import IconGeneralSettings from "./icons/IconGeneralSettings";
import IconNavigationArrows from "./icons/IconNavigationArrows";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface SwapProps {
  hideHeader?: boolean;
  showEmbeddedButton?: boolean;
  inputClassName?: string;
  assetClassName?: string;
  networkClassName?: string;
  rootClassName?: string;
  closeButton?: React.ReactNode;
}

export default function Swap({
  hideHeader,
  showEmbeddedButton,
  inputClassName,
  assetClassName,
  networkClassName,
  rootClassName,
  closeButton,
}: SwapProps) {
  const { openSwapConfirmation, setOpenSwapConfirmation } = useStore();

  function performSwap() {
    setOpenSwapConfirmation(true);
  }

  function completeSwap() {
    setOpenSwapConfirmation(false);
  }

  return (
    <>
      <div
        className={cn(
          "relative w-full rounded-b-none rounded-t-3xl border border-eerie-black/50 bg-chinese-black md:rounded-b-3xl",
          rootClassName,
        )}
      >
        {!hideHeader && (
          <div className="flex w-full justify-between border-b border-eerie-black/50 py-2 pl-5 pr-3">
            <Label className="text-2xl font-medium tracking-wider text-white">Swap</Label>
            <div className="flex gap-3">
              <SwapSettings />
              {closeButton && closeButton}
            </div>
          </div>
        )}
        <div className="w-full">
          <AssetSelect
            title="Sell"
            balance="0.00"
            assetImage={USDCIcon}
            networkImage={SolanaIcon}
            text="USDC"
            className="border-b border-eerie-black"
            inputClassName={inputClassName}
            assetClassName={assetClassName}
            networkClassName={networkClassName}
          />

          <div className="absolute -mt-4 flex w-full justify-center">
            <div className="z-[1] flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gunmetal">
              <IconNavigationArrows />
            </div>
          </div>

          <AssetSelect
            title="Buy"
            balance="0.00"
            assetImage={BNBIcon}
            networkImage={BSCIcon}
            text="USDC"
            inputClassName={inputClassName}
            assetClassName={assetClassName}
            networkClassName={networkClassName}
          />
        </div>
        {showEmbeddedButton && (
          <div className="w-full pb-6 pl-5 pr-3">
            <ConnectButton
              className="h-auto w-full py-2 text-lg font-semibold text-gunmetal"
              hideIcon
              hideOnConnected
              showSwapButton
              onSwapClick={performSwap}
            />
          </div>
        )}
      </div>
      {!showEmbeddedButton && (
        <div className="mt-3">
          <ConnectButton
            className="h-auto w-full py-2 text-lg"
            hideIcon
            hideOnConnected
            showSwapButton
            onSwapClick={performSwap}
          />
        </div>
      )}

      <SwapConfirmationModal open={openSwapConfirmation} completeSwap={completeSwap} />
    </>
  );
}

function SwapSettings() {
  return (
    <Button
      variant="ghost"
      className="scale-btn flex h-auto w-auto items-center justify-center rounded-full bg-[#28293d]/70 p-1.5 hover:bg-[#28293d]"
    >
      <IconGeneralSettings className="h-5 w-5" />
    </Button>
  );
}
