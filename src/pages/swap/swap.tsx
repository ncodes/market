import { BNBIcon, BSCIcon, SolanaIcon, USDCIcon } from "@/assets";
import IconGeneralSettings from "@/components/icons/IconGeneralSettings";
import IconNavigateUpDown from "@/components/icons/IconNavigateUpDown";
import IconNavigationArrows from "@/components/icons/IconNavigationArrows";
import IconWallet from "@/components/icons/IconWallet";
import { Button } from "@/components/ui/button";
import Tab from "@/components/ui/tab";
import useStore from "@/hooks/store/useStore";
import PageLayout from "@/layouts/PageLayout";
import { cn } from "../../libs/utils";
import AssetButton from "@/components/AssetButton";

export default function SwapPage() {
  const { setOpenConnectWalletSheet } = useStore((s) => ({
    setOpenConnectWalletSheet: s.setOpenConnectWalletSheet,
  }));

  return (
    <PageLayout title="Swap">
      <div className="mt-16 flex w-full justify-center">
        <div className="relative w-full max-w-xl">
          <div className="border-gunmetal/30 bg-raisin-black/40 h-full w-full rounded-3xl border">
            <Tab
              tabHeaders={["Swap", "Limit", "Send", "Buy"]}
              headerRight={<SwapSettings />}
              tabCompents={[<SwapTab />]}
            />
          </div>
          <div className="absolute bottom-[-42px] left-0 right-0 flex h-16 justify-center">
            <Button
              variant={"secondary"}
              className="scale-btn absolute"
              onClick={() => setOpenConnectWalletSheet(true)}
            >
              <div className="flex items-center gap-8">
                <span>Connect Wallet</span>
                <IconWallet />
              </div>
            </Button>
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
      <AssetSelect title="Sell" balance="0.00" assetImage={USDCIcon} networkImage={SolanaIcon} text="USDC" />

      <div className="relative flex w-full justify-center py-3">
        <div className="bg-gunmetal z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full">
          <IconNavigationArrows />
        </div>
        <div className="bg-raisin-black absolute top-[28px] z-0 h-[1px] w-full"></div>
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
  text,
}: {
  title: string;
  balance: string;
  assetImage: string;
  networkImage: string;
  text: string;
}) {
  return (
    <div className="flex flex-col items-start justify-between gap-2 px-5 py-4">
      <div className="flex w-full items-center justify-between pl-2">
        <p className="text-sm font-extralight tracking-wider text-[#fafafa]">{title}</p>
        <p className="text-sm font-light tracking-wider">
          <span className="text-gray-500">Balance:</span> <span className="text-[#fafafa]/70">{balance}</span>
        </p>
      </div>
      <AssetButton assetImage={assetImage} networkImage={networkImage} text={text} />
      <AssetAmountInput className="-mt-2 pl-2" />
      <div className="-mt-1 flex gap-1 pl-2">
        <IconNavigateUpDown className="h-5 w-5 opacity-50" />
        <span className="text-sm font-light text-[#8f90a6]">$0.00</span>
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
          "placeholder:text-cool-grey h-[40px] w-full bg-transparent p-0 font-dosis text-5xl text-white outline-none placeholder:text-5xl",
          className,
        )}
        placeholder="0.00"
      />
    </div>
  );
}
