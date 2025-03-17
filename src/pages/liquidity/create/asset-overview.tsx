import AssetAvatar from "@/components/avatar/AssetAvatar.tsx";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "../../../libs/utils";

export function AssetOverview({
  asset,
  assetImage,
  title,
  className,
  inputWrapperClassName,
  labelClassName,
}: {
  asset: string;
  assetImage: string;
  title: string;
  className?: string;
  inputWrapperClassName?: string;
  labelClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label className={cn("text-sm tracking-wide text-lotion/80", labelClassName)}>{title}</Label>
      <div className={cn("flex w-[125px] items-center rounded-3xl bg-black-coral/30 px-1", inputWrapperClassName)}>
        <AssetAvatar assetImage={assetImage} className="h-8 w-8" />
        <Label className="font-inter text-base font-semibold text-gray-100">{asset}</Label>
      </div>
    </div>
  );
}
