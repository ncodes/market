import { BNBIcon, BSCIcon, SolanaIcon, USDCIcon } from "@/assets";
import AssetSelect from "./AssetSelect";
import IconNavigationArrows from "./icons/IconNavigationArrows";
import { Button } from "./ui/button";
import IconGeneralSettings from "./icons/IconGeneralSettings";
import { ConnectButton } from "@/hooks/connectors/components/ConnectButton";
import { Label } from "./ui/label";
import { cn } from "@/libs/utils";

interface SwapProps {
  hideHeader?: boolean;
  showEmbeddedButton?: boolean;
  inputClassName?: string;
  assetClassName?: string;
  networkClassName?: string;
  rootClassName?: string;
}

export default function Swap({
  hideHeader,
  showEmbeddedButton,
  inputClassName,
  assetClassName,
  networkClassName,
  rootClassName,
}: SwapProps) {
  return (
    <>
      <div className={cn("bg-chinese-black relative w-full rounded-3xl border border-eerie-black/50", rootClassName)}>
        {!hideHeader && (
          <div className="flex w-full justify-between border-b border-eerie-black/50 py-2 pl-5 pr-3">
            <Label className="text-primary-500 text-2xl font-medium tracking-wider">Swap</Label>
            <SwapSettings />
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
            <div className="bg-gunmetal z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full">
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
              className="text-gunmetal h-auto w-full py-2 text-lg font-semibold"
              hideIcon
              hideOnConnected
            />
          </div>
        )}
      </div>
      {!showEmbeddedButton && (
        <div className="mt-3">
          <ConnectButton className="h-auto w-full py-2 text-lg" hideIcon hideOnConnected />
        </div>
      )}
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
