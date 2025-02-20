import { SolanaIcon, USDCIcon } from "@/assets";
import AssetField from "@/components/AssetField";
import InfoLabel from "@/components/InfoLabel";
import { Avatar } from "@/components/avatar/Avatar";
import Icon3Dots from "@/components/icons/Icon3Dots";
import IconActive from "@/components/icons/IconActive";
import IconDropDown from "@/components/icons/IconDropDown";
import IconLock from "@/components/icons/IconLock";
import IconOpenLink from "@/components/icons/IconOpenLink";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/layouts/PageLayout";
import { ChevronRight, XIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LiquidityChart from "./chart";
import PauseLiquidity from "./options/pause-liquidity";
import UpdateManager from "./options/update-manager";
import UpdatePrice from "./options/update-price";
import LiquiditySwap from "./swap";
import LiquidityTransactions from "./transactions";
import { formatMoney } from "@telefonica/money-formatter";
import UpdateTarget from "./options/update-target";

export default function ViewLiquidityPage() {
  return (
    <PageLayout title="View Liquidity">
      <div className="flex w-full justify-center">
        <div className="flex gap-6">
          <div className="w-screen max-w-3xl rounded-3xl border border-eerie-black/50 bg-chinese-black">
            <div className="flex justify-between border-b border-eerie-black px-6 py-4">
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
                <Label className="flex items-center gap-1 text-xs font-light text-light-periwinkle">
                  <IconActive /> Active
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Label className="flex items-center gap-1 text-xs font-semibold text-cool-grey">
                  <IconLock /> Permissioned
                </Label>
                <EditLiquidity />
                <MoreButton />
              </div>
            </div>
            <div className="flex w-full items-start gap-32 border-b border-eerie-black px-6 py-4">
              <div className="flex flex-col">
                <Label className="h-4 text-sm font-light text-cool-grey">Amount</Label>
                <Label className="font-dosis text-2xl font-semibold text-anti-flash-white">
                  10,000,000 <span className="text-gray-400">JOIN</span>
                </Label>
              </div>
              <div className="flex flex-col">
                <Label className="h-4 text-sm font-light text-cool-grey">Price</Label>
                <Label className="font-dosis text-2xl font-semibold text-anti-flash-white">10.5 SOL</Label>
                <div className="flex gap-1">
                  <Label className="text-xs font-light text-cool-grey">Auto</Label>
                  <Label className="text-xs font-light text-ufo-green">+15%</Label>
                </div>
              </div>
              <div className="flex flex-col">
                <Label className="flex h-4 items-center text-sm font-light text-cool-grey">
                  1 Day Volume <IconDropDown className="h-5 w-5" />
                </Label>
                <Label className="font-dosis text-2xl font-semibold text-anti-flash-white">400 USDC</Label>
              </div>
            </div>
            <LiquidityChart />
            <div className="w-full">
              <Tabs defaultValue="transactions" className="w-full">
                <TabsList className="flex w-full justify-start gap-[29px] border-b border-eerie-black/50 bg-transparent px-6">
                  <TabHead value="transactions" title="Transactions" />
                  <TabHead value="lps" title="Permitted LPs" />
                  <TabHead value="takers" title="Permitted Takers" />
                </TabsList>
                <TabsContent value="transactions" className="w-full">
                  <LiquidityTransactions />
                </TabsContent>
              </Tabs>
            </div>
          </div>
          <div className="flex w-screen max-w-[400px] flex-col gap-6">
            <LiquiditySwap />
            <div className="flex w-full flex-col gap-4 p-2 px-5">
              <Label className="text-xl font-medium text-lotion">Links</Label>
              <div className="flex w-full flex-col gap-4">
                {[1, 2, 3, 4].map((_) => (
                  <div className="flex w-full justify-between tracking-wide">
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
                      <Label className="text-xs font-light text-white">USDC/USDT</Label>
                    </div>
                    <div className="flex">
                      <div className="rounded-s-3xl border border-vampire-black bg-eerie-black px-3">
                        <Label className="text-xs font-light text-cool-grey">0x123...9867</Label>
                      </div>
                      <Link to={"#"}>
                        <div className="flex items-center rounded-e-3xl border border-eerie-black bg-eerie-black px-1">
                          <Label className="text-xs font-normal text-screaming-green">View</Label>
                          <IconOpenLink />
                        </div>
                      </Link>
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

function TabHead({ value, title }: { value: string; title: string }) {
  return (
    <TabsTrigger
      value={value}
      className="flex items-center gap-1 p-0 text-sm font-semibold text-black-coral data-[state=active]:bg-transparent data-[state=active]:text-white"
    >
      {title}
    </TabsTrigger>
  );
}

function MoreButton() {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"ghost"} className="p-0 hover:bg-transparent">
          <Icon3Dots />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="flex w-[217px] flex-col gap-1 rounded-3xl border-none bg-vampire-black p-2"
        side="bottom"
        align="end"
      >
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Adjust Amount
          <ChevronRight className="text-cool-grey group-hover:text-white" />
        </Button>
        <UpdatePrice />
        <UpdateManager />
        <UpdateTarget />
        <PauseLiquidity />
      </PopoverContent>
    </Popover>
  );
}

function EditLiquidity() {
  const [open, setOpen] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const currentAmount = 10000;
  const [newAmount, setNewAmount] = useState(10000);

  return (
    <Dialog modal={true} open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>
        <Button variant={"secondary"} className="h-[30px] bg-white px-7 text-sm font-semibold hover:bg-white/70">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-[360px] border-none bg-transparent p-0 tracking-wide transition-all duration-300"
        hideCloseButton
      >
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-3xl border border-gunmetal bg-chinese-black">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-2xl font-semibold text-lotion">{isSubmitted ? "Confirm" : "Adjust Amount"}</Label>
              <Button
                onClick={() => setOpen(false)}
                variant="ghost"
                className="reset-btn text-gray-600 hover:bg-transparent hover:text-gray-100"
              >
                <XIcon className="size-5" />
              </Button>
            </div>
            <div className="flex flex-col gap-3 px-5 py-[14px] pb-[17px]">
              <Label className="text-sm font-light text-cool-grey">Add or Remove Liquidity</Label>
              <div className="flex flex-col gap-1">
                <InfoLabel text="Current" info="Current" className="text-sm font-light text-light-periwinkle" />
                <AssetField
                  width={120}
                  placeholder="10,000 USDC"
                  value={formatMoney({ amount: currentAmount, precision: 0, currency: "" })}
                  readOnly
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1">
                <InfoLabel text="New" info="New" className="text-sm font-light text-light-periwinkle" />
                <AssetField
                  width={120}
                  placeholder="0.00"
                  value={newAmount}
                  onChange={({ currentTarget }) => setNewAmount(Number(currentTarget.value))}
                />
              </div>
              {isSubmitted && (
                <div className="flex flex-col gap-1">
                  <InfoLabel text="Returned" info="Returned" className="text-sm font-light text-light-periwinkle" />
                  <AssetField
                    width={120}
                    placeholder="0.00"
                    type="text"
                    value={formatMoney({ amount: newAmount, precision: 0, currency: "" })}
                    readOnly
                  />
                </div>
              )}
              {!isSubmitted && (
                <Slider
                  defaultValue={[currentAmount]}
                  max={currentAmount * 2}
                  step={1}
                  min={0}
                  className="border-none bg-transparent"
                  rangeClassName="bg-screaming-green h-[6px] border-none"
                  trackClassName="bg-black-coral/90 border-none"
                  thumbClassName="border-screaming-green bg-screaming-green"
                  onValueChange={(value) => setNewAmount(value[0])}
                />
              )}
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="h-12 text-lg font-semibold text-gunmetal"
            onClick={isSubmitted ? () => setOpen(false) : () => setSubmitted(true)}
          >
            {isSubmitted ? "Update" : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
