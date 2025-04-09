import { Avatar } from "@/components/avatar/avatar";
import CloseIcon from "@/components/close-icon";
import { IconSearch } from "@/components/icons/IconSearch";
import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/libs/utils";
import { Networks } from "@/libs/wallets";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";

export function SelectChainButton() {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedNetworkIndex] = useState(0);

  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      triggerComponent={
        <Button
          variant={"ghost"}
          className="group h-auto w-full justify-between rounded-xl p-2 px-2 py-2 pr-0 font-light text-cool-grey hover:bg-eerie-black hover:text-white"
        >
          Chain(All)
          <ChevronRight className="text-cool-grey group-hover:text-white" />
        </Button>
      }
      content={
        <div className="flex w-full flex-col overflow-hidden rounded-b-none rounded-t-3xl border border-eerie-black bg-chinese-black md:rounded-b-3xl">
          <div className="flex h-fit items-center justify-between px-5 py-3">
            <Label className="text-[18px] font-normal tracking-wider text-lotion">Choose Chain</Label>
            <CloseIcon setOpen={setOpen} />
          </div>
          <div className="flex h-fit justify-between border-y border-eerie-black px-3 py-2">
            <div className="flex h-11 w-full items-center justify-between gap-1 rounded-3xl bg-eerie-black px-3 py-1">
              <input
                type="text"
                className="w-full border-none bg-transparent text-white outline-none placeholder:text-cool-grey active:border-none active:bg-transparent active:outline-none"
                placeholder="Search"
              />
              <IconSearch />
            </div>
          </div>
          <div className="flex h-[70vh] w-full flex-col overflow-y-auto px-0">
            {Networks.map((network, index) => (
              <NetworkTile
                key={index}
                name={network.name}
                logo={network.logo}
                symbol={network.symbol}
                isSelected={selectedIndex === index}
                onClick={() => {
                  setSelectedNetworkIndex(index);
                  setOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      }
    />
  );
}

function NetworkTile({
  name,
  logo,
  symbol,
  isSelected,
  onClick,
}: {
  name: string;
  logo: string;
  symbol: string;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  return (
    <Button
      variant={"ghost"}
      className={cn("m-0 h-auto w-full justify-start rounded-none p-0 text-left hover:bg-transparent", {
        "bg-eerie-black": isSelected,
      })}
      onClick={onClick}
    >
      <div className="group flex w-full cursor-pointer items-center justify-between px-3 py-2">
        <div className="flex items-center gap-2">
          <Avatar src={logo} className="h-8 w-8" />
          <div className="flex flex-col gap-1">
            <Label className="font-light tracking-wide text-anti-flash-white">{name}</Label>
            <span className="flex gap-2">
              <label className="text-xs font-normal text-cool-grey">{symbol}</label>
            </span>
          </div>
        </div>
        {isSelected && <CheckCircle2 size={20} className="text-green-400" />}
      </div>
    </Button>
  );
}
