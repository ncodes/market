import { SolanaIcon, USDCIcon } from "@/assets";
import { Avatar } from "@/components/avatar/Avatar";
import Icon3Dots from "@/components/icons/Icon3Dots";
import IconActive from "@/components/icons/IconActive";
import IconDropDown from "@/components/icons/IconDropDown";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import PageLayout from "@/layouts/PageLayout";
import LiquiditySwap from "./swap";
import IconOpenLink from "@/components/icons/IconOpenLink";
import IconLock from "@/components/icons/IconLock";
import Tab from "@/components/ui/tab";
import LiquidityTransactions from "./transactions";
import LiquidityChart from "./chart";

export default function ViewLiquidityPage() {
  return (
    <PageLayout title="View Liquidity">
      <div className="flex w-full justify-center">
        <div className="flex gap-6">
          <div className="bg-chinese-black border-gunmetal w-screen max-w-3xl rounded-3xl border">
            <div className="border-gunmetal flex justify-between border-b p-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <div className="relative w-16">
                    <Avatar src={USDCIcon} className="h-8 w-8 shadow-sm drop-shadow-sm" rootClassName="h-8 w-8 z-10" />
                    <Avatar
                      src={SolanaIcon}
                      className="h-8 w-8"
                      rootClassName="absolute bottom-0 right-3 h-8 w-8 z-0"
                    />
                  </div>
                  <Label className="text-lg font-medium text-white">USDC/SOL</Label>
                </div>
                <Label className="text-light-periwinkle flex items-center gap-1 text-xs font-light">
                  <IconActive /> Active
                </Label>
              </div>
              <div className="flex items-center gap-6">
                <Label className="text-cool-grey flex items-center gap-1 text-xs font-semibold">
                  <IconLock /> Permissioned
                </Label>
                <Button
                  variant={"secondary"}
                  className="h-[30px] bg-white px-7 text-sm font-semibold hover:bg-white/70"
                >
                  Update
                </Button>
                <Button variant={"ghost"} className="p-0 hover:bg-transparent">
                  <Icon3Dots />
                </Button>
              </div>
            </div>
            <div className="border-gunmetal flex w-full items-center justify-between border-b px-6 py-4">
              <div className="flex flex-col">
                <Label className="text-cool-grey font-light">Amount</Label>
                <Label className="text-anti-flash-white font-dosis text-xl font-semibold">10,000,000 DOGWIFHAT…</Label>
              </div>
              <div className="flex flex-col">
                <Label className="text-cool-grey font-light">Price</Label>
                <Label className="text-anti-flash-white font-dosis text-xl font-semibold">10.5 SOL</Label>
                <div className="flex gap-1">
                  <Label className="text-cool-grey text-sm font-light">Auto</Label>
                  <Label className="text-ufo-green text-sm font-light">+15%</Label>
                </div>
              </div>
              <div className="flex flex-col">
                <Label className="text-cool-grey flex items-center font-light">
                  1 Day Volume <IconDropDown className="h-5 w-5" />
                </Label>
                <Label className="text-anti-flash-white font-dosis text-xl font-semibold">400 USDC</Label>
              </div>
            </div>
            <LiquidityChart/>
            <div className="w-full">
              <Tab
                headersClassName="gap-1"
                headerBorder="border-gunmetal"
                tabHeaders={[
                  <Label className="text-lotion cursor-pointer text-sm font-semibold">Transactions</Label>,
                  <Label className="text-lotion cursor-pointer text-sm font-semibold">Permitted LPs</Label>,
                  <Label className="text-lotion cursor-pointer text-sm font-semibold">Permitted Takers</Label>,
                ]}
                tabCompents={[<LiquidityTransactions />]}
              />
            </div>
          </div>
          <div className="flex w-screen max-w-[400px] flex-col gap-6">
            <LiquiditySwap />
            <div className="flex w-full flex-col gap-4">
              <Label className="text-lotion text-xl font-medium">Links</Label>
              <div className="flex w-full flex-col gap-4">
                {[1, 2, 3, 4].map((_) => (
                  <div className="flex w-full justify-between">
                    <div className="flex items-center">
                      <div className="relative w-10">
                        <Avatar
                          src={USDCIcon}
                          className="h-6 w-6 shadow-sm drop-shadow-sm"
                          rootClassName="h-6 w-6 z-10"
                        />
                        <Avatar
                          src={SolanaIcon}
                          className="h-6 w-6"
                          rootClassName="absolute bottom-0 right-[2px] h-6 w-6 z-0"
                        />
                      </div>
                      <Label className="text-sm font-extralight text-white">USDC/USDT</Label>
                    </div>
                    <div className="flex">
                      <div className="bg-raisin-black border-vampire-black rounded-s-3xl border px-3">
                        <Label className="text-cool-grey text-xs font-light">0x12345879867</Label>
                      </div>
                      <div className="bg-gunmetal border-gunmetal flex items-center rounded-e-3xl border px-1">
                        <Label className="text-chinese-green text-xs font-semibold">View</Label>
                        <IconOpenLink />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
