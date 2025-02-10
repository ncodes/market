import PageLayout from "@/layouts/PageLayout";
import LiquidityTable from "./liquidity-table";
import { Label } from "@/components/ui/label";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { cn } from "@/libs/utils";

export default function MyLiquidityPage() {
  return (
    <PageLayout title="My Liquidity">
      <div className="flex w-full justify-center">
        <div className="mt-6 flex w-full max-w-7xl gap-[30px]">
          <LiquidityTable />
          <div className="flex w-full max-w-[330px] flex-col gap-6">
            <div className="flex flex-col">
              <Label className="text-sm font-light text-white">Learn About</Label>
              <Label className="text-lotion text-2xl font-semibold">Liquidity Provision</Label>
            </div>
            <div className="border-gunmetal bg-chinese-black w-full rounded-3xl border">
              {[1, 2, 3, 4].map((item) => (
                <div
                  className={cn(
                    "border-gunmetal flex w-full cursor-pointer items-center gap-3 p-4",
                    item !== 4 && "border-b",
                  )}
                >
                  <div className="bg-vampire-black h-[68px] !w-[75px] cursor-pointer rounded-[10px]"></div>
                  <Label className="w-[187px] cursor-pointer text-sm font-semibold text-white">
                    How to become a Liquidity Provider on Joint Exchange
                  </Label>
                  <IconArrowRight className="h-6 w-6 text-3xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
