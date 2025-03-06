import { AllNetworksIcon, BitcoinIcon } from "@/assets";
import AssetAvatar from "@/components/avatar/AssetAvatar";
import { Avatar } from "@/components/avatar/Avatar";
import IconArrowRight from "@/components/icons/IconArrowRight";
import IconDropDown from "@/components/icons/IconDropDown";
import { IconSearch } from "@/components/icons/IconSearch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";
import { Assets } from "@/libs/wallets";
import { CheckCircle2, XIcon } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function AssetButton({
  text,
  assetImage,
  networkImage,
  className,
  textClassName,
  assetClassName,
  networkClassName,
}: {
  text: string;
  assetImage: string;
  networkImage?: string;
  className?: string;
  textClassName?: string;
  assetClassName?: string;
  networkClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "scale-btn h-auto w-[140px] justify-start bg-black-coral/20 px-[4px] py-1 pr-2 hover:bg-black-coral/30",
            className,
          )}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <AssetAvatar
                assetImage={assetImage}
                networkImage={networkImage}
                className={assetClassName}
                networkClassName={networkClassName}
              />
              <span className={cn("text-base font-semibold text-anti-flash-white", textClassName)}>{text}</span>
            </div>
            <IconDropDown />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent
        className="relative left-1/2 top-0 !h-screen w-full -translate-x-1/2 border-none bg-transparent px-0 py-0 data-[state=open]:slide-in-from-bottom-[48%] lg:fixed lg:top-[60%] lg:h-fit lg:w-[450px] lg:translate-y-[-50%] lg:data-[state=open]:slide-in-from-top-[48%]"
        hideCloseButton
      >
        <div className="absolute -bottom-[342px] w-full overflow-hidden rounded-b-none rounded-t-3xl border border-eerie-black bg-chinese-black font-poppins lg:relative lg:bottom-0 lg:h-fit lg:rounded-b-3xl">
          <div className="flex items-center justify-between px-5 py-3">
            <Label className="text-[18px] font-normal tracking-wider text-lotion">Select a token</Label>
            <div className="cursor-pointer" onClick={() => setOpen(false)}>
              <XIcon className="text-cool-grey/50 transition-all duration-300 hover:text-cool-grey" size={20} />
            </div>
          </div>
          <div className="flex justify-between border-y border-eerie-black px-3 py-2 pr-0">
            <div className="flex h-11 w-full items-center justify-between gap-1 rounded-3xl bg-eerie-black px-3 py-1">
              <IconSearch className="opacity-40" />
              <input
                type="text"
                className="w-full border-none bg-transparent text-white outline-none placeholder:text-cool-grey active:border-none active:bg-transparent active:outline-none"
                placeholder="Search tokens"
              />
            </div>
            <NetworkSelectorButton />
          </div>
          <div className="flex w-full flex-col px-0">
            {Assets.map((asset, index) => (
              <AssetTile key={index} name={asset.name} logo={asset.logo} symbol={asset.symbol} />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AssetTile({ name, logo, symbol }: { name: string; logo: string; symbol: string }) {
  return (
    <Button
      variant={"ghost"}
      className="m-0 h-auto w-full justify-start rounded-none p-0 text-left hover:bg-transparent"
    >
      <div className="group flex w-full cursor-pointer items-center justify-between px-3 py-2 hover:bg-eerie-black">
        <div className="flex items-center gap-2">
          <Avatar src={logo} className="h-8 w-8" />
          <div className="flex flex-col gap-1">
            <Label className="font-light tracking-wide text-anti-flash-white">{name}</Label>
            <span className="flex gap-2">
              <label className="text-xs font-normal text-cool-grey">{symbol}</label>
              <span className="text-xs text-cool-grey/40">0x123...432</span>
            </span>
          </div>
        </div>
        <IconArrowRight className="hidden group-hover:block" />
      </div>
    </Button>
  );
}

const Networks = [
  { name: "All", logo: AllNetworksIcon },
  { name: "Bitcoin", logo: BitcoinIcon },
  { name: "Bitcoin", logo: BitcoinIcon },
  { name: "Bitcoin", logo: BitcoinIcon },
  { name: "Bitcoin", logo: BitcoinIcon },
  { name: "Bitcoin", logo: BitcoinIcon },
];

interface NetworkSelectorButtonProps {
  text?: string;
  className?: string;
}

export function NetworkSelectorButton({ text, className }: NetworkSelectorButtonProps) {
  const [selectedIndex, setSelectedNetworkIndex] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          variant={"ghost"}
          className={cn("gap-1 rounded-2xl px-2 hover:bg-eerie-black", className, { "bg-eerie-black": open })}
        >
          {Networks[selectedIndex].name === "All" && (
            <Label className="cursor-pointer font-poppins text-xs tracking-[2px] text-lotion"></Label>
          )}
          <img
            src={Networks[selectedIndex].name === "All" ? AllNetworksIcon : Networks[selectedIndex].logo}
            alt=""
            className="h-5 w-5"
          />
          {text}
          <IconDropDown
            className={cn("h-6 w-6 shrink-0 opacity-40 transition-all duration-300", open && "rotate-180")}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[200px] rounded-2xl border border-gunmetal/50 bg-chinese-black px-0 py-0"
      >
        <div className="mt-1 flex flex-col gap-1 px-1 py-0.5 pb-1 font-poppins">
          {Networks.map((network, index) => (
            <div
              key={index}
              className="flex w-full cursor-pointer justify-between"
              onClick={() => {
                if (index === selectedIndex) return;
                setSelectedNetworkIndex(index);
                setOpen(false);
              }}
            >
              <Button
                variant={"ghost"}
                className="m-0 flex h-auto w-full items-center justify-between rounded-xl p-[0.5rem] text-left hover:bg-eerie-black"
              >
                <span className="flex items-center gap-2">
                  <img src={network.logo} className="h-[22px] w-auto" />
                  <Label className="cursor-pointer font-poppins text-sm font-light tracking-wide text-anti-flash-white">
                    {network.name.toLowerCase() === "all" ? "All networks" : network.name}
                  </Label>
                </span>
                {selectedIndex === index && <CheckCircle2 size={20} className="text-green-400" />}
              </Button>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
