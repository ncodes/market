import { cn } from "@/libs/utils";
import { Avatar } from "./Avatar";
interface AssetAvatarProps {
  assetImage: string;
  networkImage?: string;
  className?: string;
}

export default function AssetAvatar({ assetImage, networkImage, className }: AssetAvatarProps) {
  return (
    <div className="relative">
      <Avatar
        src={assetImage}
        className={cn("h-10 w-10 shadow-sm drop-shadow-sm", className)}
        rootClassName="h-10 w-10"
      />
      {networkImage && (
        <Avatar
          src={networkImage}
          className="h-5 w-5"
          rootClassName="absolute bottom-0 right-0 h-5 w-5 border border-white"
        />
      )}
    </div>
  );
}
