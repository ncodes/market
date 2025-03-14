import IconTriangleDown from "@/components/icons/IconTriangleDown";
import IconTriangleUp from "@/components/icons/IconTriangleUp";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";

export default function MarketStats({ className }: { className?: string }) {
  return (
    <div className={cn("w-full rounded-3xl border border-eerie-black/50 bg-chinese-black lg:block", className)}>
      <div className="border-b border-eerie-black/50 px-3 py-3 sm:px-6">
        <Label className="text-xl font-semibold text-lotion">Stats</Label>
      </div>
      <div className="flex w-full flex-col gap-4 px-3 py-3 sm:px-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:gap-0">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Label className="font-light tracking-wider text-cool-grey">Amount Available</Label>
              <Label className="tr font-dosis text-2xl font-semibold tracking-wide text-anti-flash-white">
                10M USDC
              </Label>
            </div>
            <div className="flex flex-col">
              <Label className="font-light tracking-wider text-cool-grey">24Hr Fees.</Label>
              <Label className="font-dosis text-2xl font-semibold tracking-wide text-anti-flash-white">$100k</Label>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Label className="font-light tracking-wider text-cool-grey">TVL</Label>
              <div className="flex items-center gap-3">
                <Label className="font-dosis text-2xl font-semibold tracking-wide text-anti-flash-white">$40.5</Label>
                <div className="flex items-center">
                  <IconTriangleUp />
                  <Label className="font-light text-go-green">0.03%</Label>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <Label className="font-light tracking-wider text-cool-grey">24Hr Vol.</Label>
              <div className="flex items-center gap-3">
                <Label className="font-dosis text-2xl font-semibold tracking-wide text-anti-flash-white">$80.5m</Label>
                <div className="flex items-center">
                  <IconTriangleDown />
                  <Label className="font-light text-coral-red">20%</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
