import { Avatar } from "./Avatar";
interface AssetAvatarProps {
  assetImage: string;
  networkImage?: string;
}

export default function AssetAvatar({ assetImage, networkImage }: AssetAvatarProps) {
  return (
    <div className="relative">
      <Avatar src={assetImage} className="h-10 w-10 shadow-sm drop-shadow-sm" rootClassName="h-10 w-10" />
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
