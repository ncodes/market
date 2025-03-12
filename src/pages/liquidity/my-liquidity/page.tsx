import IconArrowRight from "@/components/icons/IconArrowRight";
import { Label } from "@/components/ui/label";
import PageLayout from "@/layouts/PageLayout";
import { cn } from "@/libs/utils";
import LiquidityTable from "./liquidity-table";

export default function MyLiquidityPage() {
  return (
    <PageLayout title="My Liquidity">
      <div className="flex w-full justify-center px-4">
        <div className="mt-6 flex w-full max-w-7xl flex-col gap-[30px] lg:flex-row">
          <LiquidityTable />
          <div className="flex w-full max-w-full flex-col gap-6 lg:max-w-[330px]">
            <div className="flex flex-col">
              <Label className="text-sm font-light tracking-wide text-white">Learn About</Label>
              <Label className="text-2xl font-semibold tracking-wide text-lotion">Liquidity Provision</Label>
            </div>
            <div className="w-full rounded-3xl border border-eerie-black/40 bg-chinese-black">
              {[1, 2, 3, 4].map((item) => (
                <div
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-3 border-eerie-black/70 p-4",
                    item !== 4 && "border-b",
                  )}
                >
                  <div className="!h-[68px] !w-[75px] cursor-pointer rounded-[10px] bg-eerie-black"></div>
                  <div className="flex flex-1 items-center justify-between">
                    <Label className="max-w-[187px] cursor-pointer text-sm font-semibold text-white">
                      How to become a Liquidity Provider on Joint Exchange
                    </Label>
                    <IconArrowRight className="h-6 w-6 text-3xl" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
