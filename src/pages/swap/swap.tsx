import { BNBIcon, BSCIcon, SolanaIcon, USDCIcon } from "@/assets";
import AssetButton from "@/components/AssetButton";
import IconGeneralSettings from "@/components/icons/IconGeneralSettings";
import IconNavigationArrows from "@/components/icons/IconNavigationArrows";
import { Button } from "@/components/ui/button";
import Tab from "@/components/ui/tab";
import PageLayout from "@/layouts/PageLayout";
import { ConnectButton } from "../../hooks/connectors/components/ConnectButton";
import { cn } from "@/libs/utils.ts";

export default function SwapPage() {
  return (
    <PageLayout title="Swap">
      <div className="mt-16 flex w-full justify-center">
        <div className="relative w-[500px]">
          <div className="w-full rounded-3xl border border-eerie-black/50 bg-chinese-black">
            <Tab tabHeaders={["Swap"]} headerRight={<SwapSettings />} tabCompents={[<SwapTab />]} />
          </div>
          <div className="mt-3">
            <ConnectButton className="h-auto w-full py-2 text-lg" hideIcon hideOnConnected />
          </div>
        </div>
      </div>
    </PageLayout>
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

function SwapTab() {
  return (
    <div className="w-full">
      <AssetSelect
        title="Sell"
        balance="0.00"
        assetImage={USDCIcon}
        networkImage={SolanaIcon}
        text="USDC"
        className="border-b border-eerie-black"
      />

      <div className="absolute -mt-4 flex w-full justify-center">
        <div className="z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gunmetal">
          <IconNavigationArrows />
        </div>
      </div>

      <AssetSelect title="Buy" balance="0.00" assetImage={BNBIcon} networkImage={BSCIcon} text="USDC" />
    </div>
  );
}

function AssetSelect({
  title,
  balance,
  assetImage,
  networkImage,
  className,
  text,
}: {
  title: string;
  balance: string;
  assetImage: string;
  networkImage: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-start justify-between gap-2 px-3 py-4", className)}>
      <div className="flex w-full items-center justify-between pl-2">
        <p className="text-sm font-extralight tracking-wider text-gray-400">{title}</p>
        <p className="text-sm font-light tracking-wider">
          <span className="text-gray-500">Balance:</span> <span className="text-[#fafafa]/70">{balance}</span>
        </p>
      </div>
      <div className="flex w-full items-center justify-between">
        <AssetAmountInput className="-mt-2 pl-2" />
        <AssetButton assetImage={assetImage} networkImage={networkImage} text={text} />
      </div>
      <div>
        <div className="-mt-1 flex gap-1 pl-2">
          <span className="text-sm font-light text-gray-500">$0.00</span>
        </div>
      </div>
    </div>
  );
}

function AssetAmountInput({ className }: { className?: string }) {
  return (
    <div className="mt-2">
      <input
        type="number"
        className={cn(
          "h-[40px] w-full bg-transparent p-0 font-dosis text-5xl text-white outline-none placeholder:text-5xl placeholder:text-gray-400",
          className,
        )}
        placeholder="0.00"
      />
    </div>
  );
}
