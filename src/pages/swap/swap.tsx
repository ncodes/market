import { USDCIcon } from "@/assets";
import AppLayout from "@/components/AppLayout";
import IconDropDown from "@/components/icons/IconDropDown";
import IconGeneralSettings from "@/components/icons/IconGeneralSettings";
import IconNavigateUpDown from "@/components/icons/IconNavigateUpDown";
import IconNavigationArrows from "@/components/icons/IconNavigationArrows";
import IconWallet from "@/components/icons/IconWallet";
import { Button } from "@/components/ui/button";
import Tab from "@/components/ui/tab";
import { showConnectWallet } from "@/hooks/connectors/components/ConnectButton";

export default function SwapPage() {
  return (
    <AppLayout title="Swap">
      <div className="mt-16 flex h-full w-full justify-center">
        <div className="relative w-full max-w-xl">
          <div className="h-full w-full rounded-3xl border border-gray-800 bg-gray-900">
            <Tab
              tabHeaders={["Swap", "Limit", "Send", "Buy"]}
              headerRight={<SwapSettings />}
              tabCompents={[<SwapTab />]}
            />
          </div>
          <div className="absolute bottom-[-42px] left-0 right-0 flex h-16 justify-center">
            <Button variant={"secondary"} className="absolute" onClick={showConnectWallet}>
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
    <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-600">
      <IconGeneralSettings />
    </div>
  );
}

function SwapTab() {
  return (
    <div className="w-full">
      <div className="flex justify-between px-4 py-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-extralight uppercase text-gray-50">SELL</p>
          <AssetButton image={USDCIcon} text="USDC" />
          <AssetAmountInput />
          <div className="flex gap-2">
            <IconNavigateUpDown />
            <span className="text-gray-400">0.00 USDC</span>
          </div>
        </div>
        <p className="text-sm font-extralight uppercase text-gray-50">Bal: 0.00</p>
      </div>
      <div className="relative flex w-full justify-center py-3">
        <div className="z-50 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-600">
          <IconNavigationArrows />
        </div>
        <div className="absolute top-[28px] z-0 h-[1px] w-full bg-gray-800"></div>
      </div>
      <div className="flex justify-between px-4 py-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-extralight uppercase text-gray-50">BUY</p>
          <AssetButton image={USDCIcon} text="USDC" />
          <AssetAmountInput />
          <div className="flex gap-2">
            <IconNavigateUpDown />
            <span className="text-gray-400">0.00 USDC</span>
          </div>
        </div>
        <p className="text-sm font-extralight uppercase text-gray-50">Bal: 0.00</p>
      </div>
    </div>
  );
}

function AssetButton({ text, image }: { text: string; image: string }) {
  return (
    <Button variant={"gray"} className="px-1">
      <div className="flex items-center gap-2">
        <img src={image} alt="usdc" className="h-8 w-8" />
        <span className="text-base font-bold">{text}</span>
        <IconDropDown />
      </div>
    </Button>
  );
}

function AssetAmountInput() {
  return (
    <input
      type="number"
      className="m-0 w-28 bg-transparent p-0 text-5xl text-gray-400 outline-none placeholder:text-5xl placeholder:text-gray-400"
      placeholder="0.00"
    />
  );
}
