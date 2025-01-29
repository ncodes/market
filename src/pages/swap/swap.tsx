import { BNBIcon, BSCIcon, SolanaIcon, USDCIcon } from "@/assets";
import AppLayout from "@/components/AppLayout";
import AssetAvatar from "@/components/avatar/AssetAvatar";
import IconDropDown from "@/components/icons/IconDropDown";
import IconGeneralSettings from "@/components/icons/IconGeneralSettings";
import IconNavigateUpDown from "@/components/icons/IconNavigateUpDown";
import IconNavigationArrows from "@/components/icons/IconNavigationArrows";
import IconWallet from "@/components/icons/IconWallet";
import { Button } from "@/components/ui/button";
import Tab from "@/components/ui/tab";
import useStore from "@/hooks/store/useStore";
import { cn } from "../../libs/utils";

export default function SwapPage() {
  const { setOpenConnectWalletSheet } = useStore((s) => ({
    setOpenConnectWalletSheet: s.setOpenConnectWalletSheet,
  }));

  return (
    <AppLayout title="Swap">
      <div className="mt-16 flex w-full justify-center">
        <div className="relative w-full max-w-xl">
          <div className="h-full w-full rounded-3xl border border-[#28293d]/30 bg-[#1c1c28]/40">
            <Tab
              tabHeaders={["Swap", "Limit", "Send", "Buy"]}
              headerRight={<SwapSettings />}
              tabCompents={[<SwapTab />]}
            />
          </div>
          <div className="absolute bottom-[-42px] left-0 right-0 flex h-16 justify-center">
            <Button variant={"secondary"} className="absolute" onClick={() => setOpenConnectWalletSheet(true)}>
              <div className="flex items-center gap-8">
                <span>Connect Wallet</span>
                <IconWallet />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function SwapSettings() {
  return (
    <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#28293d]">
      <IconGeneralSettings />
    </div>
  );
}

function SwapTab() {
  return (
    <div className="w-full">
      <div className="flex flex-col justify-between gap-2 px-5 py-4">
        <div className="flex items-center justify-between pl-2">
          <p className="text-sm font-extralight tracking-wider text-[#fafafa]">Sell</p>
          <p className="text-sm font-light tracking-wider">
            <span className="text-gray-500">Balance:</span> <span className="text-[#fafafa]/70">0.00</span>
          </p>
        </div>
        <AssetSelectorButton assetImage={USDCIcon} networkImage={SolanaIcon} text="USDC" className="" />
        <AssetAmountInput className="-mt-2 pl-2" />
        <div className="-mt-1 flex gap-1 pl-2">
          <IconNavigateUpDown className="h-5 w-5 opacity-50" />
          <span className="text-sm font-light text-[#8f90a6]">$0.00</span>
        </div>
      </div>

      <div className="relative flex w-full justify-center py-3">
        <div className="z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-600">
          <IconNavigationArrows />
        </div>
        <div className="absolute top-[28px] z-0 h-[1px] w-full bg-gray-800"></div>
      </div>

      <div className="flex flex-col justify-between gap-2 px-5 py-4">
        <div className="flex items-center justify-between pl-2">
          <p className="text-sm font-extralight tracking-wider text-[#fafafa]">Buy</p>
          <p className="text-sm font-light tracking-wider">
            <span className="text-gray-500">Balance:</span> <span className="text-[#fafafa]/70">0.00</span>
          </p>
        </div>
        <AssetSelectorButton assetImage={BNBIcon} networkImage={BSCIcon} text="USDC" />
        <AssetAmountInput className="-mt-2 pl-2" />
        <div className="-mt-1 flex gap-1 pl-2">
          <IconNavigateUpDown className="h-5 w-5 opacity-50" />
          <span className="text-sm font-light text-[#8f90a6]">$0.00</span>
        </div>
      </div>
    </div>
  );
}

function AssetSelectorButton({
  text,
  assetImage,
  networkImage,
  className,
}: {
  text: string;
  assetImage: string;
  networkImage: string;
  className?: string;
}) {
  return (
    <Button variant={"gray"} className={cn("h-auto w-[140px] justify-start px-[4px] py-1 pr-2", className)}>
      <div className="flex items-center gap-2">
        <AssetAvatar assetImage={assetImage} networkImage={networkImage} />
        <span className="text-base font-bold text-gray-100">{text}</span>
        <IconDropDown />
      </div>
    </Button>
  );
}

function AssetAmountInput({ className }: { className?: string }) {
  return (
    <input
      type="number"
      className={cn(
        "m-0 w-full bg-transparent p-0 font-dosis text-5xl text-gray-400 text-white outline-none placeholder:text-5xl placeholder:text-gray-400",
        className,
      )}
      placeholder="0.00"
    />
  );
}
