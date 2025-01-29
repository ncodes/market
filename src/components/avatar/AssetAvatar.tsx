import { Avatar } from "./Avatar";
interface AssetAvatarProps {
  assetImage: string;
  networkImage: string;
}

export default function AssetAvatar({ assetImage, networkImage }: AssetAvatarProps) {
  return (
    <div className="relative h-8 w-8">
      <Avatar src={assetImage} className="h-8 w-8" rootClassName="h-8 w-8" />
      <Avatar
        src={networkImage}
        className="h-4 w-4"
        rootClassName="absolute bottom-0 right-0 h-4 w-4 border border-white"
      />
    </div>
  );
}
