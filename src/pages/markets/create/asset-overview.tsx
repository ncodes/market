import AssetAvatar from "@/components/avatar/AssetAvatar.tsx";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "../../../libs/utils";

export function AssetOverview({
  asset,
  assetImage,
  title,
  className,
  inputWrapperClassName,
}: {
  asset: string;
  assetImage: string;
  title: string;
  className?: string;
  inputWrapperClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label className="text-sm font-light tracking-wider text-lotion/80">{title}</Label>
      <div className={cn("flex w-[125px] items-center rounded-3xl p-1", inputWrapperClassName)}>
        <AssetAvatar assetImage={assetImage} className="h-8 w-8" />
        <Label className="font-inter text-base font-semibold text-gray-100">{asset}</Label>
      </div>
    </div>
  );
}
