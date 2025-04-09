import { cn } from "@/libs/utils";
import { Avatar } from "./avatar";

export default function AssetAvatar({
  assetImage,
  networkImage,
  className,
  networkClassName,
  assetImageFallback,
  networkImageFallback,
}: {
  assetImage: string;
  assetImageFallback?: string;
  networkImage?: string | React.ReactNode;
  networkImageFallback?: string;
  className?: string;
  networkClassName?: string;
}) {
  const assetImageElement = assetImage ? (assetImage as unknown as () => React.ReactNode) : () => null;
  const netImageElement = networkImage ? (networkImage as unknown as () => React.ReactNode) : () => null;

  return (
    <div className="relative">
      {!!assetImage && typeof assetImage === "string" && (
        <Avatar
          src={assetImage}
          className={cn("h-10 w-10 shadow-sm drop-shadow-sm", className)}
          rootClassName={cn("h-10 w-10", className)}
          fallback={assetImageFallback}
        />
      )}

      {!!assetImage && typeof assetImage !== "string" && (
        <span className={cn("h-10 w-10 shadow-sm drop-shadow-sm", className)}>{assetImageElement()}</span>
      )}

      {!!networkImage && typeof networkImage === "string" && (
        <Avatar
          src={networkImage}
          className={cn("h-5 w-5", networkClassName)}
          rootClassName={cn(
            "absolute bottom-0 -right-1 size-4 border-2 border-gray-200/50 drop-shadow-md shadow-gray-100",
            networkClassName,
          )}
          fallback={networkImageFallback}
        />
      )}

      {!!networkImage && typeof networkImage !== "string" && (
        <span className="absolute -right-1 bottom-0 rounded-full border-2 border-gray-900 shadow-gray-100 drop-shadow-md [&>svg]:size-3">
          {netImageElement()}
        </span>
      )}
    </div>
  );
}
