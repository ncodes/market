import { BNBIcon, BSCIcon, SolanaIcon, USDCIcon } from "@/assets";
import IconGeneralSettings from "@/components/icons/IconGeneralSettings";
import IconNavigationArrows from "@/components/icons/IconNavigationArrows";
import { Button } from "@/components/ui/button";
import Tab from "@/components/ui/tab";
import PageLayout from "@/layouts/PageLayout";
import { ConnectButton } from "../../hooks/connectors/components/ConnectButton";
import AssetSelect from "@/components/AssetSelect";

export default function SwapPage() {
  return (
    <PageLayout title="Swap">
      <div className="mt-16 flex w-full justify-center">
        <div className="relative w-[500px]">
          <div className="bg-chinese-black w-full rounded-3xl border border-eerie-black/50">
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
        <div className="bg-gunmetal z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full">
          <IconNavigationArrows />
        </div>
      </div>

      <AssetSelect title="Buy" balance="0.00" assetImage={BNBIcon} networkImage={BSCIcon} text="USDC" />
    </div>
  );
}
