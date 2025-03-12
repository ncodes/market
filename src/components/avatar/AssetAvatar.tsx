import { cn } from "@/libs/utils";
import { Avatar } from "./Avatar";
interface AssetAvatarProps {
  assetImage: string;
  networkImage?: string;
  className?: string;
  networkClassName?: string;
}

export default function AssetAvatar({ assetImage, networkImage, className, networkClassName }: AssetAvatarProps) {
  return (
    <div className="relative">
      <Avatar
        src={assetImage}
        className={cn("h-10 w-10 shadow-sm drop-shadow-sm", className)}
        rootClassName={cn("h-10 w-10", className)}
      />
      {networkImage && (
        <Avatar
          src={networkImage}
          className={cn("h-5 w-5", networkClassName)}
          rootClassName={cn(
            "absolute bottom-0  -right-1 h-5 w-5 border-2 border-gray-200/50 drop-shadow-md shadow-gray-100",
            networkClassName,
          )}
        />
      )}
    </div>
  );
}
