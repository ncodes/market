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

export default function AssetButton({
  text,
  assetImage,
  networkImage,
  className,
  textClassName,
}: {
  text: string;
  assetImage: string;
  networkImage?: string;
  className?: string;
  textClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "scale-btn bg-black-coral/20 hover:bg-black-coral/30 h-auto w-[140px] justify-start px-[4px] py-1 pr-2",
            className,
          )}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <AssetAvatar assetImage={assetImage} networkImage={networkImage} />
              <span className={cn("text-anti-flash-white text-base font-bold", textClassName)}>{text}</span>
            </div>
            <IconDropDown />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="top-[40%] w-[450px] border-none bg-transparent px-0 pr-2 pt-0" hideCloseButton>
        <div className="overflow-hidden rounded-3xl border border-eerie-black bg-chinese-black font-poppins">
          <div className="flex items-center justify-between px-5 py-3">
            <Label className="text-lotion text-[18px] font-normal tracking-wider">Select a token</Label>
            <div className="cursor-pointer" onClick={() => setOpen(false)}>
              <XIcon className="text-cool-grey/50 hover:text-cool-grey transition-all duration-300" size={20} />
            </div>
          </div>
          <div className="flex justify-between border-y border-eerie-black px-3 py-2 pr-0">
            <div className="flex h-11 w-full items-center justify-between gap-1 rounded-3xl bg-eerie-black px-3 py-1">
              <IconSearch className="opacity-40" />
              <input
                type="text"
                className="placeholder:text-cool-grey w-full border-none bg-transparent text-white outline-none active:border-none active:bg-transparent active:outline-none"
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
            <Label className="text-anti-flash-white font-light tracking-wide">{name}</Label>
            <span className="flex gap-2">
              <label className="text-cool-grey text-xs font-normal">{symbol}</label>
              <span className="text-cool-grey/40 text-xs">0x123...432</span>
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

function NetworkSelectorButton() {
  const [selectedIndex, setSelectedNetworkIndex] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button variant={"ghost"} className="w-20 gap-1 rounded-none hover:bg-transparent">
          {Networks[selectedIndex].name === "All" && (
            <Label className="text-lotion cursor-pointer font-poppins text-xs tracking-[2px]"></Label>
          )}
          <img
            src={Networks[selectedIndex].name === "All" ? AllNetworksIcon : Networks[selectedIndex].logo}
            alt=""
            className="h-6 w-6"
          />
          <IconDropDown
            className={cn("h-6 w-6 shrink-0 opacity-40 transition-all duration-300", open && "rotate-180")}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="bg-chinese-black border-gunmetal/50 w-[200px] rounded-2xl border px-0 py-0"
      >
        <div className="mt-1 flex flex-col gap-1 px-1 py-1 font-poppins">
          {Networks.map((network, index) => (
            <div
              key={index}
              className="flex w-full cursor-pointer justify-between p-0.5"
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
                  <Label className="text-anti-flash-white cursor-pointer font-poppins text-sm font-light tracking-wide">
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
