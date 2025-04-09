import CloseIcon from "@/components/close-icon";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { AssetOverview } from "@/pages/liquidity/create/asset-overview.tsx";
import { TokenList } from "@jointlabs/meta";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmojiAvatar from "../../../components/avatar/emoji-avatar";
import { AvatarSize } from "../../../components/avatar/useAvatar";
import IconQuestionMark from "../../../components/icons/IconQuestionMark";
import { ToolTip } from "../../../components/tool-tip";
import { Switch } from "../../../components/ui/switch";
import { formatToMoney } from "../../../libs/numbers";
import { shortenAddress } from "../../../libs/string";
import { cn } from "../../../libs/utils";

export function CreateLiquidityButton({
  disabled,
  children,
  triggerClassName,
  base,
  quote,
  amount,
  price,
  autoPrice,
  margin,
  target,
  pause,
  requiresAllowance,
  isApproving,
  isApproved,
  isCreating,
  isCreated,
  handleApprove,
  handleCreate,
}: {
  disabled: boolean;
  children: React.ReactNode;
  triggerClassName?: string;
  base: TokenList.Token;
  quote: TokenList.Token;
  amount: string;
  price: string;
  autoPrice: boolean;
  margin: number;
  target: string;
  pause: boolean;
  requiresAllowance: boolean;
  isApproving: boolean;
  isApproved: boolean;
  isCreating: boolean;
  isCreated: boolean;
  handleApprove: () => Promise<void>;
  handleCreate: () => Promise<bigint | undefined>;
}) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (isCreated) setOpen(false);
  }, [isCreated]);

  function handleCreateAndRedirectOnSuccess() {
    handleCreate().then((id) => {
      if (id !== undefined) {
        setTimeout(() => {
          nav(`/liquidity/${id}`);
        }, 3000);
      }
    });
  }

  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      triggerClassName={cn("w-full", triggerClassName)}
      desktopClassName="xl:top-2/4"
      triggerComponent={
        <Button className="btn gap-1" disabled={disabled}>
          {children}
        </Button>
      }
      content={
        <div className="flex flex-col gap-2 md:w-[500px]">
          <div className="w-full rounded-b-none rounded-t-3xl border border-eerie-black bg-chinese-black font-poppins md:rounded-b-3xl">
            <div className="flex items-center justify-between border-b border-eerie-black px-5 py-4">
              <Label className="select-none text-xl font-semibold text-lotion lg:text-2xl">
                Confirm Liqudity Creation
              </Label>
              <CloseIcon setOpen={setOpen} />
            </div>
            <div className="flex flex-col gap-4 px-6 py-4">
              <div className="flex gap-6">
                <AssetOverview
                  title="You Sell"
                  asset={base.symbol}
                  assetImage={base.logoURI}
                  labelClassName="text-lotion/60"
                  inputWrapperClassName="bg-black-coral/10  p-1 gap-1.5"
                />
                <AssetOverview
                  title="You Get"
                  asset={quote.symbol}
                  assetImage={quote.logoURI}
                  labelClassName="text-lotion/60"
                  inputWrapperClassName="bg-black-coral/10 p-1 gap-1.5"
                />
              </div>
              <div className="flex gap-7">
                <div className="flex flex-col gap-2 tracking-wider">
                  <Label className="text-sm text-lotion/60">Amount</Label>
                  <div className="flex items-center gap-2 rounded-full bg-black-coral/10 p-1 pr-5">
                    <img src={base.logoURI} className="size-8" />
                    <Label className="flex gap-1.5 text-base text-gray-100">
                      <span className="font-dosis">{formatToMoney(amount || "0")}</span>
                      <span className="font-semibold text-gray-500">{base.symbol}</span>
                    </Label>
                  </div>
                </div>
                <div className="flex flex-col gap-2 tracking-wider">
                  <Label className="text-sm text-lotion/60">{!autoPrice ? "Price" : "Initial Price"}</Label>
                  <div className="flex items-center gap-2 rounded-full bg-black-coral/10 p-1 pr-5">
                    <img src={quote.logoURI} className="size-8" />
                    <Label className="flex gap-1.5 text-base text-gray-100">
                      <span className="font-dosis">{price ? formatToMoney(price || "0") : "-"}</span>
                      <span className="font-semibold text-gray-500">{quote.symbol}</span>
                    </Label>
                  </div>
                </div>
                {autoPrice && (
                  <div className="relative -left-6 flex w-[106px] flex-col gap-2">
                    <Label className="mt-1">&nbsp;</Label>
                    <div className="flex h-11 w-[84px] items-center justify-center rounded-full">
                      <Label className="flex items-center gap-1 font-poppins text-base font-semibold text-light-green">
                        <span>Auto</span>
                        <ToolTip
                          tip="Price will be automatically set to the market price"
                          className="opacity-50 hover:opacity-100"
                        >
                          <IconQuestionMark className="size-5 text-light-green" />
                        </ToolTip>
                      </Label>
                    </div>
                  </div>
                )}
              </div>
              {autoPrice && (
                <div className="flex gap-14">
                  <div className="flex w-[106px] flex-col gap-2">
                    <Label className="text-sm tracking-wider text-lotion/60">Margin</Label>
                    <div className="flex h-11 w-[84px] items-center justify-center rounded-full bg-black-coral/10">
                      <Label className="font-poppins text-base font-semibold text-gray-100">{margin}%</Label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 border-t border-eerie-black px-5 py-3">
              {!!target && (
                <div className="flex justify-between">
                  <Label className="tracking-wider text-lotion/60">Target</Label>
                  <div className="flex items-center gap-1">
                    <EmojiAvatar randomStr={target} size={AvatarSize.Micro} />
                    <ToolTip tip={target}>
                      <Label className="tracking-wider text-cool-grey">{shortenAddress(target)}</Label>
                    </ToolTip>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between">
                <Label className="tracking-wider text-lotion/60">Paused Initially</Label>
                <Switch checked={pause} />
              </div>
            </div>
            <div className="block px-5 pb-3 lg:hidden">
              <Button variant={"secondary"} className="btn w-full">
                Confirm
              </Button>
            </div>
          </div>
          <Button
            onClick={requiresAllowance ? handleApprove : handleCreateAndRedirectOnSuccess}
            variant={requiresAllowance && !isApproved ? "secondary" : "default"}
            className="btn hidden w-full gap-1 text-lg lg:flex"
            disabled={isApproving || isCreating || isCreated}
          >
            {(isApproving || isCreating) && <Loader className="duration-2000 h-5 w-5 animate-spin" />}
            {!isApproving && !isApproved && requiresAllowance && "Approve & Sign"}
            {isApproving && "Approving..."}
            {((isApproved && !isCreating) || (!requiresAllowance && !isCreating)) && "Sign"}
            {((isApproved && isCreating) || (!requiresAllowance && isCreating)) && "Signing..."}
          </Button>
        </div>
      }
    />
  );
}
