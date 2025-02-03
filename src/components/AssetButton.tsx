import { AllNetworksIcon } from "@/assets";
import AssetAvatar from "@/components/avatar/AssetAvatar";
import { Avatar } from "@/components/avatar/Avatar";
import IconArrowRight from "@/components/icons/IconArrowRight";
import IconClose from "@/components/icons/IconClose";
import IconDropDown from "@/components/icons/IconDropDown";
import { IconSearch } from "@/components/icons/IconSearch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";
import { Assets, Networks } from "@/libs/wallets";
import { useState } from "react";
import IconCircleActive from "./icons/IconCircleActive";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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
            <span className="text-base font-bold text-anti-flash-white">{text}</span>
            <IconDropDown />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="-mt-[20px] w-[450px] border-none bg-transparent px-0 pr-2 pt-0" hideCloseButton>
        <div className="rounded-3xl border border-gunmetal bg-raisin-black font-poppins">
          <div className="flex items-center justify-between border-b border-gunmetal px-5 py-3">
            <Label className="text-[20px] font-normal tracking-wider text-lotion">Select a token</Label>
            <div
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gunmetal"
              onClick={() => setOpen(false)}
            >
              <IconClose />
            </div>
          </div>
          <div className="flex justify-between border-b border-gunmetal px-3 py-2 pr-0">
            <div className="flex h-11 w-full items-center justify-between gap-1 rounded-3xl bg-black-coral/20 px-3 py-1">
              <IconSearch className="opacity-40" />
              <input
                type="text"
                className="w-full border-none bg-transparent text-white outline-none placeholder:text-cool-grey active:border-none active:bg-transparent active:outline-none"
                placeholder="Search tokens"
              />
            </div>
            <NetworkSelectorButton />
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
        <div className="flex flex-col gap-1">
          <Label className="text-anti-flash-white">{name}</Label>
          <label className="text-sm text-cool-grey">{network}</label>
        </div>
      </div>
      <IconArrowRight className="hidden group-hover:block" />
    </div>
  );
}

function NetworkSelectorButton() {
  const [selectedNetworkIndex, setSelectedNetworkIndex] = useState(0);

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"ghost"} className="w-20 gap-1 rounded-none hover:bg-transparent">
          {Networks[selectedNetworkIndex].name.toLowerCase() === "all" && (
            <Label className="cursor-pointer font-poppins text-xs tracking-[2px] text-lotion"></Label>
          )}
          <img
            src={
              Networks[selectedNetworkIndex].name.toLowerCase() === "all"
                ? AllNetworksIcon
                : Networks[selectedNetworkIndex].logo
            }
            alt=""
            className="h-6 w-6"
          />
          <IconDropDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="mr-6 border-none bg-transparent px-0 py-0">
        <div className="ml-[73px] mt-1 flex w-[240px] flex-col gap-2 rounded-3xl rounded-se-none rounded-ss-none border border-gunmetal bg-raisin-black px-3 py-4 font-poppins">
          {Networks.map((network, index) => (
            <div
              key={index}
              className="flex h-7 w-full cursor-pointer justify-between"
              onClick={() => setSelectedNetworkIndex(index)}
            >
              <div className="flex gap-2">
                <img src={network.logo} className="h-[22px] w-auto" />
                <Label className="cursor-pointer font-poppins text-sm text-anti-flash-white">
                  {network.name.toLowerCase() === "all" ? "All Networks" : network.name}
                </Label>
              </div>
              {selectedNetworkIndex === index && <IconCircleActive />}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
