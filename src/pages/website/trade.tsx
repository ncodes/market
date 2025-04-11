import { Label } from "@/components/ui/label";
import WebsiteLayout from "@/layouts/WebsiteLayout";

export default function WebsiteTradePage() {
  return (
    <WebsiteLayout title="Trade">
      <div className="mt-16 w-full px-28">
        <div className="flex h-[245px] w-full flex-col justify-end gap-6 rounded-xl bg-chinese-black p-6">
          <h1 className="max-w-xs text-[36px] font-semibold leading-10 text-white">Trade the way you want</h1>
          <Label className="max-w-md text-xs text-light-periwinkle">
            Billions lost to CEX hacks and shutdowns. Joint lets you trade P2P with full control, security, and freedom.
          </Label>
        </div>
        <div className="mt-3 flex w-full gap-3">
          <div className="flex min-h-[190px] w-full flex-col justify-end rounded-xl bg-chinese-black p-4 relative">
            <h2 className="max-w-xs text-sm font-semibold leading-10 text-white">Instant Swap</h2>
            <Label className="max-w-xs text-xs text-light-periwinkle">
              Execute trades instantly with zero waiting time. Our advanced routing engine finds the best prices across
              multiple liquidity pools to ensure optimal execution.
            </Label>
          </div>
          <div className="flex min-h-[190px] w-full flex-col justify-end rounded-xl bg-chinese-black p-4 relative">
            <h2 className="max-w-xs text-sm font-semibold leading-10 text-white">Liquidity Positioning</h2>
            <Label className="max-w-xs text-xs text-light-periwinkle">
              Execute trades instantly with zero waiting time. Our advanced routing engine finds the best prices across
              multiple liquidity pools to ensure optimal execution.
            </Label>
          </div>
          <div className="flex min-h-[190px] w-full flex-col justify-end rounded-xl bg-chinese-black p-4 relative">
            <h2 className="max-w-xs text-sm font-semibold leading-10 text-white">Market Creation</h2>
            <Label className="max-w-xs text-xs text-light-periwinkle">
              Execute trades instantly with zero waiting time. Our advanced routing engine finds the best prices across
              multiple liquidity pools to ensure optimal execution.
            </Label>
          </div>
        </div>
      </div>
    </WebsiteLayout>
  );
}
