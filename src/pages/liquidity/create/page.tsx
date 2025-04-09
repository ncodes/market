import PageLayout from "@/layouts/PageLayout.tsx";
import { cn } from "@/libs/utils.ts";
import { AlertTriangleIcon, Loader } from "lucide-react";
import { AssetButton } from "../../../components/asset-button.tsx";
import IconQuestionMark from "../../../components/icons/IconQuestionMark.tsx";
import InfoLabel from "../../../components/info-label.tsx";
import Input, { HeaderLeftLabel, HeaderRightLabel, LeftLabel } from "../../../components/input.tsx";
import { ToolTip } from "../../../components/tool-tip.tsx";
import { Label } from "../../../components/ui/label.tsx";
import { formatToHighDenom, formatToMoney } from "../../../libs/numbers.ts";
import { AdvanceSettings } from "./advance-settings.tsx";
import { CreateLiquidityButton } from "./create-liquidity-button.tsx";
import { PriceInput } from "./inputs.tsx";
import useLiquidityCreator from "./useLiquidityCreator.ts";

export default function CreateLiquidityPage() {
  const {
    state,
    errors,
    selectedMarketExists,
    isLoadingSelectedMarket,
    autoInitialPrice,
    balance,
    requiresAllowance,
    balanceUsd,
    isApproving,
    isApproved,
    isCreating,
    isCreated,
    setState,
    onTokenSelect,
    validate,
    isReady,
    handleApprove,
    handleCreateLiquidity,
  } = useLiquidityCreator();
  const { baseToken, quoteToken, pause, target, amount, price, margin } = state;
  const canCreate = isReady() && !!selectedMarketExists && !isLoadingSelectedMarket;

  /**
   * Handle the change of a field
   * @param value - The value to change
   * @param field - The field to change
   */
  function handleChange(value: string, field: keyof typeof state) {
    setState((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <PageLayout title="Create Liquidity">
      <div className="flex w-full justify-center px-4">
        <div className="mt-5 w-full max-w-sm lg:mt-10 lg:max-w-md">
          <div className="mb-2 w-full rounded-3xl border border-eerie-black bg-chinese-black">
            <div className="flex items-center gap-4 border-b border-eerie-black px-5 py-4">
              <Label className="text-xl font-semibold text-lotion lg:text-2xl">Create Liquidity</Label>
            </div>
            <div className="flex w-full flex-col gap-4 border-b border-eerie-black px-5 pb-4 pt-3">
              <div className="flex w-full flex-col gap-5 xs:flex-row">
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="You Sell" info="This is the asset you are selling. It is the base asset." />
                  <AssetButton
                    text={baseToken?.symbol ?? ""}
                    assetImage={baseToken?.logoURI ?? ""}
                    onSelectAsset={(asset) => onTokenSelect(asset, { base: true })}
                    className="h-11 w-full bg-black-coral/20 pl-1.5 hover:bg-black-coral/30"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
                <div className="flex w-full flex-col gap-1">
                  <InfoLabel text="You Buy" info="This is the asset you are buying. It is the quote asset." />
                  <AssetButton
                    text={quoteToken?.symbol ?? ""}
                    assetImage={quoteToken?.logoURI ?? ""}
                    onSelectAsset={(asset) => onTokenSelect(asset, { base: false })}
                    className="h-11 w-full bg-black-coral/20 pl-1.5 hover:bg-black-coral/30"
                    textClassName="text-cool-grey"
                    assetClassName="w-8 h-8"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col gap-1">
                <Input
                  type="text"
                  value={amount}
                  className="input-number"
                  onChange={(value) => handleChange(value, "amount")}
                  suffix={baseToken?.symbol ?? ""}
                  number={{
                    min: 0,
                    allowNegative: false,
                    defaultValue: "",
                  }}
                  containerClassName={cn("input-text-bold", { "input-error": !!errors.amount?.[0] })}
                  onKeyUp={() => {
                    validate("amount");
                  }}
                >
                  <HeaderLeftLabel
                    label={
                      <span className="mb-0.5 flex items-center gap-1 text-xs tracking-wide">
                        <span className="text-sm text-lotion">Amount</span>
                        <ToolTip
                          tip="Enter the amount of the base token you want to sell"
                          className="opacity-50 hover:opacity-100"
                        >
                          <IconQuestionMark className={"size-4 cursor-pointer"} />
                        </ToolTip>
                      </span>
                    }
                    className="mb-1 font-poppins text-sm font-normal tracking-wider text-lotion/90"
                  />

                  <HeaderRightLabel
                    label={
                      <div className="mb-0.5 flex gap-1 text-xs tracking-wide text-lotion">
                        <span>
                          <span className="text-cool-grey">Bal: </span>
                          <span className="text-anti-flash-white">
                            {balance ? formatToHighDenom(balance?.value || 0n, balance?.decimals) : "0"}
                          </span>
                        </span>
                        <span className="text-cool-grey">(${formatToMoney(balanceUsd || 0, "0,0.[00]")})</span>
                      </div>
                    }
                  />

                  <LeftLabel
                    label={
                      <span>
                        {errors.amount?.[0] ? (
                          <span className="flex items-center gap-1 text-xs tracking-wide text-red-500">
                            <AlertTriangleIcon className="h-3 w-3" />
                            <span>{errors.amount?.[0]}</span>
                          </span>
                        ) : (
                          <span></span>
                        )}
                      </span>
                    }
                  />
                </Input>
              </div>

              <PriceInput
                value={price}
                margin={margin}
                initialPrice={autoInitialPrice}
                onChange={(value) => handleChange(value, "price")}
                baseSymbol={baseToken?.symbol ?? ""}
                priceSymbol={quoteToken?.symbol ?? ""}
                onAutoPriceChange={(autoPrice) => setState((prev) => ({ ...prev, autoPrice }))}
                isCreated={isCreated}
                errors={errors}
                onKeyUp={() => {
                  validate("price");
                }}
                onMarginChange={(value) => {
                  handleChange(value.toString(), "margin");
                }}
              />
            </div>

            <div className="flex w-full flex-col gap-4 px-5 pb-2 pt-3">
              <AdvanceSettings
                target={target ?? ""}
                pause={pause}
                errors={errors}
                onPauseChange={(pause) => setState((prev) => ({ ...prev, pause }))}
                onTargetChange={(value) => handleChange(value, "target")}
                onTargetKeyUp={() => {
                  validate("target");
                }}
              />
            </div>
          </div>

          {!!state.baseToken && !!state.quoteToken && (
            <CreateLiquidityButton
              base={state.baseToken!}
              quote={state.quoteToken!}
              price={state.price!}
              autoPrice={state.autoPrice}
              margin={state.margin ?? 0}
              target={state.target!}
              amount={state.amount!}
              pause={state.pause}
              disabled={!canCreate}
              requiresAllowance={requiresAllowance}
              handleApprove={handleApprove}
              isApproving={isApproving}
              isApproved={isApproved}
              triggerClassName="scale-btn"
              handleCreate={handleCreateLiquidity}
              isCreating={isCreating}
              isCreated={isCreated}
            >
              {(isLoadingSelectedMarket || isApproving) && <Loader className="duration-2000 h-5 w-5 animate-spin" />}
              {isLoadingSelectedMarket && <span>Fetching market...</span>}
              {!isLoadingSelectedMarket && !selectedMarketExists && "No market found"}
              {!isLoadingSelectedMarket && selectedMarketExists && (
                <>
                  {!isApproving && !state.amount && "Enter an amount"}
                  {!isApproving && state.amount && !state.price && "Enter a price"}
                  {!isApproving && !!state.amount && !!state.price && "Confirm"}
                  {isApproving && "Approving..."}
                </>
              )}
            </CreateLiquidityButton>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
