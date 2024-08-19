import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu.tsx";
import IconOptimism from "@/components/icons/IconOptimism.tsx";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button.tsx";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/libs/utils.ts";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { isLocal, isProd } from "@/libs/helpers.ts";
import { hardhat, sepolia } from "viem/chains";
import { ChainInfo, getChain, getChainsID } from "@jointlabs/meta";

export function NetworkSelector() {
  const [open, setOpen] = useState(false);
  const { switchNetwork, chainId, defaultNetwork } = useConnectorContext();
  const [curChain, setCurChain] = useState<ChainInfo | undefined>(getChain(defaultNetwork));
  const [testnetChainsID, setTestnetChainsID] = useState<number[]>([]);
  const [mainChainsID, setMainChainsID] = useState<number[]>([]);

  useEffect(() => {
    if (!chainId) return;
    setCurChain(getChain(chainId));
  }, [chainId]);

  // Determine which testnet chains to show
  useEffect(() => {
    if (!curChain) return;
    const chainsToIgnore = curChain.chainId ? [curChain?.chainId] : [];
    if (!isLocal()) {
      chainsToIgnore.push(hardhat.id);
      chainsToIgnore.push(sepolia.id);
    }

    let chains = getChainsID(true, false, chainsToIgnore);
    if (isProd()) {
      chains = chains.filter((id) => !getChain(id)?.testnet);
    }

    setTestnetChainsID(chains);
  }, [curChain]);

  // Get main chains
  useEffect(() => {
    setMainChainsID(getChainsID(false, true, curChain?.chainId ? [curChain?.chainId] : []));
  }, [curChain]);

  const switchNet = useCallback(
    async (chainId: number) => {
      await switchNetwork(chainId);
    },
    [switchNetwork],
  );

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "pointer-events-auto flex cursor-pointer items-center space-x-1 rounded-full bg-card px-1 py-1 font-poppins text-gray-400 transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/80 hover:text-white",
            {
              "scale-[1.02] bg-gray-800/80 text-white": open,
            },
          )}
        >
          {curChain?.logoPath({ width: 25, height: 25 })}
          <ChevronDownIcon className={cn("h-5 w-5 transition-all duration-300", { "rotate-180": open })} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-h-[200px] w-52 rounded-3xl border border-gray-700/40 bg-gradient-to-b from-eerie-black to-onyx tracking-wider">
        {mainChainsID.map((chainId) => (
          <Item
            chainId={chainId}
            onClick={async () => {
              void switchNet(chainId);
            }}
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Item({ chainId, onClick }: { chainId: number; onClick?: () => void }) {
  const chain = getChain(chainId);

  return (
    <Button
      variant="ghost"
      className="flex h-auto w-full items-center justify-start px-1 py-1.5 hover:scale-[1.01] hover:bg-baltic-sea/80"
      onClick={onClick}
    >
      <div className="flex items-center space-x-2">
        <div className="rounded-2xl">{chain.logoPath({ width: 25, height: 25 })}</div>
        <div className="text-sm font-medium text-gray-100">{chain.displayName}</div>
      </div>
    </Button>
  );
}
