import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import IconClose from "@/components/icons/IconClose";
import { Assets } from "@/libs/wallets";
import { IconSearch } from "@/components/icons/IconSearch";
import AssetAvatar from "@/components/avatar/AssetAvatar";
import IconDropDown from "@/components/icons/IconDropDown";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { AllNetworksIcon } from "@/assets";
import { Avatar } from "@/components/avatar/Avatar";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { cn } from "@/libs/utils";

export default function AssetButton({
  text,
  assetImage,
  networkImage,
  className,
}: {
  text: string;
  assetImage: string;
  networkImage: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger>
        <Button
          variant={"gray"}
          className={cn("scale-btn h-auto w-[140px] justify-start px-[4px] py-1 pr-2", className)}
        >
          <div className="flex items-center gap-2">
            <AssetAvatar assetImage={assetImage} networkImage={networkImage} />
            <span className="text-anti-flash-white text-base font-bold">{text}</span>
            <IconDropDown />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="mt-[72px] border-none bg-transparent px-0 pr-2 pt-0" hideCloseButton>
        <div className="border-gunmetal bg-raisin-black rounded-3xl border font-poppins">
          <div className="border-gunmetal flex items-center justify-between border-b px-5 py-4">
            <Label className="text-lotion text-[28px] font-bold">Choose Asset</Label>
            <div
              className="bg-gunmetal flex h-11 w-11 cursor-pointer items-center justify-center rounded-full"
              onClick={() => setOpen(false)}
            >
              <IconClose />
            </div>
          </div>
          <div className="border-gunmetal flex gap-2 border-b px-6 py-2">
            <div className="bg-black-coral flex h-11 w-full items-center justify-between rounded-3xl px-4 py-1">
              <input
                type="search"
                className="placeholder:text-cool-grey w-full border-none bg-transparent text-white outline-none placeholder:font-semibold active:border-none active:bg-transparent active:outline-none"
                placeholder="Search"
              />
              <IconSearch />
            </div>
            <Button variant={"ghost"} className="min-w-28 gap-1 hover:bg-transparent">
              <Label className="text-lotion cursor-pointer font-poppins text-sm tracking-[2px]">ALL</Label>
              <img src={AllNetworksIcon} alt="" className="h-6 w-6" />
              <IconDropDown />
            </Button>
          </div>
          <div className="flex w-full flex-col px-0 py-3">
            {Assets.map((asset, index) => (
              <AssetTile key={index} name={asset.name} logo={asset.logo} network={asset.network} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AssetTile({ name, logo, network }: { name: string; logo: string; network: string }) {
  return (
    <div className="group flex cursor-pointer items-center justify-between from-gradientStart to-gradientEnd px-5 py-2 hover:bg-gradient-to-l">
      <div className="flex items-center gap-2">
        <Avatar src={logo} className="h-8 w-8" />
        <div className="flex flex-col">
          <Label className="text-anti-flash-white">{name}</Label>
          <label className="text-cool-grey text-sm">{network}</label>
        </div>
      </div>
      <IconArrowRight className="hidden group-hover:block" />
    </div>
  );
}
