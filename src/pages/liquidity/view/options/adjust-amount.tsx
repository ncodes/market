import AssetField from "@/components/asset-field";
import CloseIcon from "@/components/close-icon";
import InfoLabel from "@/components/info-label";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import useStore from "@/hooks/store/useStore";
import { formatToMoney } from "@/libs/numbers";
import { cn } from "@/libs/utils";
import { useState } from "react";

export default function AdjustAmount() {
  const { setOpenAdjustAmount, openAdjustAmount } = useStore();
  const [isSubmitted, setSubmitted] = useState(false);
  const currentAmount = 10000;
  const [newAmount, setNewAmount] = useState(10000);

  return (
    <Modal
      open={openAdjustAmount}
      onOpenChange={(open) => setOpenAdjustAmount(open)}
      content={
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-b-none rounded-t-3xl border border-gunmetal bg-chinese-black md:rounded-b-3xl">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-base font-semibold text-lotion lg:text-2xl">
                {isSubmitted ? "Confirm" : "Adjust Amount"}
              </Label>
              <CloseIcon setOpen={setOpenAdjustAmount} />
            </div>
            <div className="flex flex-col gap-3 px-5 py-[14px] pb-[17px]">
              <Label className="text-sm font-light text-cool-grey">Add or Remove Liquidity</Label>
              <div className={cn("flex flex-col gap-1", { "opacity-50": isSubmitted })}>
                <InfoLabel text="Current" info="Current" className="text-sm font-light text-light-periwinkle" />
                <AssetField
                  width={120}
                  placeholder="10,000 USDC"
                  value={formatToMoney(currentAmount)}
                  readOnly
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-1">
                <InfoLabel text="New" info="New" className="text-sm font-light text-light-periwinkle" />
                <AssetField
                  width={120}
                  type={isSubmitted ? "text" : "number"}
                  placeholder="0.00"
                  value={isSubmitted ? formatToMoney(newAmount) : newAmount}
                  onChange={({ currentTarget }) => setNewAmount(Number(currentTarget.value))}
                  readOnly={isSubmitted}
                />
              </div>
              {isSubmitted && (
                <div className="flex flex-col gap-1">
                  <InfoLabel text="Returned" info="Returned" className="text-sm font-light text-light-periwinkle" />
                  <AssetField width={120} placeholder="0.00" type="text" value={formatToMoney(newAmount)} readOnly />
                </div>
              )}
              {!isSubmitted && (
                <Slider
                  defaultValue={[newAmount]}
                  value={[newAmount]}
                  max={currentAmount * 2}
                  step={1}
                  min={0}
                  className="mt-2 border-none bg-transparent"
                  rangeClassName="bg-screaming-green h-[6px] border-none"
                  trackClassName="bg-black-coral/90 border-none"
                  thumbClassName="border-screaming-green bg-screaming-green"
                  onValueChange={(value) => setNewAmount(value[0])}
                />
              )}
            </div>
            <div className="flex w-full px-5 py-3 lg:hidden">
              <Button
                variant={"secondary"}
                className="h-12 w-full text-lg font-semibold text-gunmetal"
                onClick={isSubmitted ? () => setOpenAdjustAmount(false) : () => setSubmitted(true)}
              >
                {isSubmitted ? "Update" : "Confirm"}
              </Button>
            </div>
          </div>
          <Button
            variant={"secondary"}
            className="hidden h-12 text-lg font-semibold text-gunmetal lg:flex"
            onClick={isSubmitted ? () => setOpenAdjustAmount(false) : () => setSubmitted(true)}
          >
            {isSubmitted ? "Update" : "Confirm"}
          </Button>
        </div>
      }
    />
  );
}
