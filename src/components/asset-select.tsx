import { cn } from "@/libs/utils";
import { AssetButton } from "./asset-button";
import AssetAmountInput from "./asset-amount-Input";

export default function AssetSelect({
  title,
  balance,
  assetImage,
  networkImage,
  className,
  inputClassName,
  text,
  assetClassName,
  networkClassName,
}: {
  title: string;
  balance: string;
  assetImage: string;
  networkImage: string;
  text: string;
  className?: string;
  inputClassName?: string;
  assetClassName?: string;
  networkClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col items-start justify-between gap-2 px-3 py-4", className)}>
      <div className="flex w-full items-center justify-between pl-2">
        <p className="text-sm font-extralight tracking-wider text-gray-400">{title}</p>
        <p className="text-sm font-light tracking-wider">
          <span className="text-gray-500">Balance:</span> <span className="text-[#fafafa]/70">{balance}</span>
        </p>
      </div>
      <div className="flex w-full items-center justify-between">
        <AssetAmountInput className={cn("-mt-2 pl-2", inputClassName)} />
        <AssetButton
          assetImage={assetImage}
          networkImage={networkImage}
          text={text}
          assetClassName={assetClassName}
          networkClassName={networkClassName}
        />
      </div>
      <div>
        <div className="-mt-1 flex gap-1 pl-2">
          <span className="text-sm font-light text-gray-500">$0.00</span>
        </div>
      </div>
    </div>
  );
}
