import AssetAvatar from "@/components/avatar/asset-avatar";
import IconArrowRight from "@/components/icons/IconArrowRight";
import IconDropDown from "@/components/icons/IconDropDown";
import { IconSearch } from "@/components/icons/IconSearch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { shortenAddress } from "@/libs/string";
import { cn } from "@/libs/utils";
import { ChainInfo, TokenList, TokenLists } from "@jointlabs/meta";
import { CheckCircle2 } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { getSupportedChainInfo } from "../hooks/connectors/common";
import { useConnectorContext } from "../hooks/connectors/useConnectorContext";
import CloseIcon from "./close-icon";
import Modal from "./modal";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function AssetButton({
  text,
  assetImage,
  networkImage,
  className,
  textClassName,
  assetClassName,
  networkClassName,
  onSelectAsset,
  onChainSelected,
}: {
  text: string;
  assetImage: string;
  networkImage?: string;
  className?: string;
  textClassName?: string;
  assetClassName?: string;
  networkClassName?: string;
  onSelectAsset?: (asset: TokenList.Token) => void;
  onChainSelected?: (chain: ChainInfo) => void;
}) {
  const { chainInfo } = useConnectorContext();
  const [open, setOpen] = useState(false);
  const [assets, setAssets] = useState<TokenList.Token[]>([]);
  const [selectedChain, setSelectedChain] = useState<ChainInfo | undefined>(chainInfo);

  useEffect(() => {
    if (!chainInfo) return;
    const tokenLists = TokenLists[chainInfo.queryName];
    setAssets(tokenLists.tokens);
  }, [chainInfo]);

  function handleSearchInput({ currentTarget }: React.ChangeEvent<HTMLInputElement>) {
    if (!chainInfo) return;
    const tokenLists = TokenLists[chainInfo.queryName];
    const { value } = currentTarget;

    if (value) {
      const filteredAssets = tokenLists.tokens.filter(
        (asset) =>
          asset.name?.toLowerCase().includes(value.toLowerCase()) ||
          asset.symbol?.toLowerCase().includes(value.toLowerCase()),
      );
      setAssets(filteredAssets ?? []);
    } else {
      setAssets(tokenLists.tokens);
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={(open) => setOpen(open)}
      desktopClassName="w-[450px] h-[500px]"
      triggerComponent={
        <Button
          className={cn(
            "scale-btn h-auto w-[140px] justify-start bg-black-coral/20 py-1 pl-[4px] pr-2 hover:bg-black-coral/30",
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
      }
      content={
        <div className="flex w-full flex-col overflow-hidden rounded-b-none rounded-t-3xl border border-eerie-black bg-chinese-black md:rounded-b-3xl">
          <div className="flex h-fit items-center justify-between px-5 py-3 pr-3">
            <Label className="text-lg font-semibold tracking-wider text-lotion md:text-2xl">Select a token</Label>
            <CloseIcon setOpen={setOpen} />
          </div>
          <div className="flex h-fit justify-between gap-2 border-y border-eerie-black px-3 py-2 pr-1">
            <div className="flex h-11 w-full items-center justify-between gap-1 rounded-3xl bg-eerie-black px-3 py-1">
              <IconSearch className="opacity-40" />
              <input
                type="text"
                className="w-full border-none bg-transparent tracking-wider text-white outline-none placeholder:text-cool-grey/60 active:border-none active:bg-transparent active:outline-none"
                placeholder="Search tokens"
                onChange={handleSearchInput}
              />
            </div>
            <NetworkSelectorButton
              onChainSelected={(chainInfo) => {
                onChainSelected?.(chainInfo);
                setSelectedChain(chainInfo);
              }}
            />
          </div>
          <div className="flex h-[70vh] w-full flex-col overflow-y-auto px-0">
            {assets.map((asset, index) => (
              <AssetTile
                key={index}
                asset={asset}
                chainImg={selectedChain?.logo}
                selectAsset={onSelectAsset}
                setOpen={setOpen}
              />
            ))}
          </div>
        </div>
      }
    />
  );
}

function AssetTile({
  asset,
  selectAsset,
  setOpen,
  chainImg,
}: {
  asset: TokenList.Token;
  chainImg: ReactNode;
  setOpen: (open: boolean) => void;
  selectAsset?: (asset: TokenList.Token) => void;
}) {
  return (
    <Button
      onClick={() => {
        setOpen(false);
        selectAsset?.(asset);
      }}
      variant={"ghost"}
      className="m-0 h-auto w-full justify-start rounded-none p-0 text-left hover:bg-transparent"
    >
      <div className="group flex w-full cursor-pointer items-center justify-between px-3 py-2 hover:bg-eerie-black">
        <div className="flex cursor-pointer items-center gap-2">
          <AssetAvatar
            assetImage={asset.logoURI ?? ""}
            networkImage={chainImg}
            assetImageFallback={asset.symbol}
            className="h-8 w-8 cursor-pointer"
          />
          <div className="flex flex-col gap-1">
            <Label className="text-sm font-semibold tracking-wider text-anti-flash-white">{asset.name}</Label>
            <span className="flex items-center gap-2">
              <label className="text-xs font-normal text-cool-grey">{asset.symbol}</label>
              <span className="text-xs text-cool-grey/40">{shortenAddress(asset.address ?? "")}</span>
            </span>
          </div>
        </div>
        <IconArrowRight className="hidden group-hover:block" />
      </div>
    </Button>
  );
}

export function NetworkSelectorButton({
  text,
  className,
  imgClassName,
  disableAutoSwitch,
  onChainSelected,
}: {
  text?: string;
  className?: string;
  imgClassName?: string;
  disableAutoSwitch?: boolean;
  onChainSelected?: (chain: ChainInfo) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedChain, setSelectedChain] = useState<ChainInfo | undefined>();
  const { chainInfo, switchNetwork } = useConnectorContext();
  const supportedChains = getSupportedChainInfo();

  useEffect(() => {
    if (!selectedChain) return;
    if (!disableAutoSwitch && selectedChain) switchNetwork(selectedChain.chainId);
    onChainSelected?.(selectedChain);
    setOpen(false);
  }, [selectedChain]);

  if (!chainInfo) return null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn("h-auto rounded-full p-2 hover:bg-eerie-black", className, {
            "!bg-eerie-black": open,
            "!bg-transparent": !open,
          })}
        >
          {chainInfo.queryName.toLowerCase() === "all" && (
            <Label className="cursor-pointer font-poppins text-xs tracking-[2px] text-lotion">
              {chainInfo.displayName}
            </Label>
          )}
          {chainInfo?.logo({ width: 25, height: 25 })}
          <span className="hidden xs:block">{text}</span>
          <IconDropDown
            className={cn("h-6 w-6 shrink-0 opacity-60 transition-all duration-300", open && "rotate-180")}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-[200px] rounded-2xl border border-gunmetal/50 bg-chinese-black px-0 py-0"
      >
        <div className="mt-1 flex flex-col gap-1 px-1 py-0.5 pb-1 font-poppins">
          {supportedChains.map((chain, index) => (
            <Button
              key={index}
              onClick={() => {
                setSelectedChain(chain);
              }}
              variant={"ghost"}
              className="m-0 flex h-auto w-full items-center justify-between rounded-xl p-[0.5rem] text-left hover:bg-eerie-black"
            >
              <span className="flex items-center gap-2">
                {(chain?.logo as any)({ width: 25, height: 22 })}
                <Label className="cursor-pointer font-poppins text-sm font-light tracking-wide text-anti-flash-white">
                  {chain.displayName.toLowerCase() === "all" ? "All networks" : chain.displayName}
                </Label>
              </span>
              {chainInfo.chainId === chain.chainId && <CheckCircle2 size={20} className="text-green-400" />}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
