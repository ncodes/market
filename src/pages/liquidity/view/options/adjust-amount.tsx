import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AssetField from "@/components/AssetField";
import InfoLabel from "@/components/InfoLabel";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import useStore from "@/hooks/store/useStore";
import { formatToMoney } from "@/libs/helpers";

export default function AdjustAmount() {
  const { setOpenAdjustAmount, openAdjustAmount } = useStore();
  const [isSubmitted, setSubmitted] = useState(false);
  const currentAmount = 10000;
  const [newAmount, setNewAmount] = useState(10000);

  return (
    <Dialog modal={true} open={openAdjustAmount} onOpenChange={(open) => setOpenAdjustAmount(open)}>
      <DialogTrigger></DialogTrigger>
      <DialogContent
        className="max-w-[360px] border-none bg-transparent p-0 tracking-wide transition-all duration-300"
        hideCloseButton
      >
        <div className="flex w-full flex-col gap-2">
          <div className="rounded-3xl border border-gunmetal bg-chinese-black">
            <div className="flex w-full justify-between border-b border-gunmetal/40 px-5 py-3">
              <Label className="text-2xl font-semibold text-lotion">{isSubmitted ? "Confirm" : "Adjust Amount"}</Label>
              <Button
                onClick={() => setOpenAdjustAmount(false)}
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
                  className="border-none bg-transparent mt-2"
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
            onClick={isSubmitted ? () => setOpenAdjustAmount(false) : () => setSubmitted(true)}
          >
            {isSubmitted ? "Update" : "Confirm"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
