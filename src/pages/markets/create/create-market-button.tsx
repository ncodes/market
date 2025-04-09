import { ConfirmModalHeader } from "@/components/confirm-modal-header";
import Modal from "@/components/modal";
import { ToolTip } from "@/components/tool-tip";
import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { isPairInteractive } from "@/libs/asset";
import { AppPages } from "@/libs/pages";
import { shortenAddress } from "@/libs/string";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Switch } from "../../../components/ui/switch";
import { cn } from "../../../libs/utils";
import { AssetOverview } from "./asset-overview";
import { MarketCreatorState } from "./useMarketCreator";

export function CreateMarketButton({
  state,
  errors,
  handleCreateMarket: onConfirm,
  disabled,
}: {
  state: MarketCreatorState;
  errors: Record<string, string[]>;
  disabled: boolean;
  handleCreateMarket: () => Promise<string | null>;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function canCreate(open: boolean) {
    if (Object.keys(errors).length === 0) {
      if (open === false && loading) {
        return;
      }

      setOpen(open);
    }
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const marketId = await onConfirm();
      if (marketId) {
        setOpen(false);
        navigate(AppPages.viewMarket(marketId));
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <Modal
      open={open}
      onOpenChange={canCreate}
      triggerClassName="w-full"
      triggerComponent={
        <Button variant={"secondary"} className="btn" disabled={disabled}>
          Create
        </Button>
      }
      desktopClassName="w-full md:max-w-full lg:max-w-[450px]"
      content={
        <div className="w-full md:max-w-full lg:max-w-[450px]">
          <div className="mb-1 w-full rounded-b-none rounded-t-3xl border border-eerie-black bg-chinese-black font-poppins md:rounded-b-3xl">
            <ConfirmModalHeader
              loading={loading}
              setOpen={() => setOpen(false)}
              title="Confirm Market Creation"
              description="Verify the details, then click 'Confirm' to proceed."
            />
            <div className="flex flex-col gap-5 px-6 py-4">
              <div className="flex gap-14">
                <AssetOverview
                  title="Base Asset"
                  asset={state.baseToken?.symbol ?? ""}
                  assetImage={state.baseToken?.logoURI ?? ""}
                  inputWrapperClassName="bg-black-coral/10 gap-1.5"
                  labelClassName="text-lotion/60 font-normal"
                  className="w-32"
                />
                <AssetOverview
                  title={"Quote Asset"}
                  asset={state.quoteToken?.symbol ?? ""}
                  assetImage={state.quoteToken?.logoURI ?? ""}
                  inputWrapperClassName="bg-black-coral/10 gap-1.5"
                  labelClassName="text-lotion/60 font-normal"
                  className="w-32"
                />
              </div>
              <div className="flex gap-14">
                <div className="flex w-32 flex-col gap-2">
                  <Label className="text-sm tracking-wider text-lotion/60">Commission</Label>
                  <div className="flex w-[89px] items-center justify-center rounded-full bg-black-coral/10 p-2 px-[14px]">
                    <Label className="text-center text-base text-gray-100">{state.commission}%</Label>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-sm tracking-wider text-lotion/60">Market Manager</Label>
                  <ToolTip
                    tip={state.marketManager ? state.marketManager : "Not set"}
                    className="opacity-50 hover:opacity-100"
                    className2="w-max px-2 pr-5 box-content"
                  >
                    <div className="flex items-center rounded-full bg-black-coral/10 p-2 px-[14px]">
                      <Label
                        className={cn("w-full text-base text-gray-100", {
                          "flex items-center justify-center": !state.marketManager,
                        })}
                      >
                        {state.marketManager ? shortenAddress(state.marketManager) : "-"}
                      </Label>
                    </div>
                  </ToolTip>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 border-t border-gunmetal/40 px-5 py-3">
              <div className="flex items-center justify-between">
                <Label className="text-lotion/60">Anyone can add liquidity</Label>
                <Switch checked={state.permPut} />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-lotion/60">Anyone can swap</Label>
                <Switch checked={state.permSwap} />
              </div>
              {!!state.baseToken && !!state.quoteToken && isPairInteractive(state.baseToken, state.quoteToken) && (
                <div className="flex items-center justify-between">
                  <Label className="text-lotion/60">Select Mediator Pool</Label>
                  <div className="flex items-center rounded-full bg-black-coral/10 p-2 px-[14px]">
                    <Label
                      className={cn("w-full text-base text-gray-100", {
                        "flex items-center justify-center": !state.marketManager,
                      })}
                    >
                      {state.mediatorPool?.name ?? "-"}
                    </Label>
                  </div>
                </div>
              )}
            </div>

            <div className="block w-full px-5 pb-3 lg:hidden">
              <Button
                disabled={loading}
                onClick={handleSubmit}
                variant={"secondary"}
                className="btn flex w-full gap-1 font-semibold"
              >
                {loading && <Loader2 className="animate-spin" />}
                Confirm
              </Button>
            </div>
          </div>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            variant={"secondary"}
            className="btn mt-2 hidden w-full gap-1 text-lg font-semibold lg:flex"
          >
            {loading && <Loader2 className="animate-spin" />}
            {!loading ? "Confirm" : "Creating..."}
          </Button>
        </div>
      }
    />
  );
}
