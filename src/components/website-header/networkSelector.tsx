import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext";
import { isLocal, isProd } from "@/libs/helpers.ts";
import { cn } from "@/libs/utils.ts";
import { ChainInfo, getChain, getChainsID } from "@jointlabs/meta";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { hardhat, sepolia } from "viem/chains";

const defaultState: {
  open: boolean;
  curChain: ChainInfo | undefined;
  chainId: number | undefined;
  testnetChainsID: number[];
  mainChainsID: number[];
} = {
  open: false,
  curChain: undefined,
  chainId: undefined,
  testnetChainsID: [],
  mainChainsID: [],
};

export function NetworkSelector() {
  const [state, setState] = useState({ ...defaultState });
  const { switchNetwork, chainId, connected } = useConnectorContext();

  // Set the current chain on chain change
  useEffect(() => {
    if (!chainId) return;
    setState((prevState) => ({ ...prevState, curChain: getChain(chainId) }));
  }, [chainId]);

  // Determine which testnet chains to show
  useEffect(() => {
    if (!state.curChain) return;
    const chainsToIgnore = state.curChain.chainId ? [state.curChain?.chainId] : [];

    if (!isLocal()) {
      chainsToIgnore.push(hardhat.id);
      chainsToIgnore.push(sepolia.id);
    }

    let chains = getChainsID(true, false, chainsToIgnore);
    if (isProd()) {
      chains = chains.filter((id) => !getChain(id)?.testnet);
    }

    setState((prevState) => ({ ...prevState, testnetChainsID: chains }));
  }, [state.curChain]);

  // Get main chains
  useEffect(() => {
    const chainsToIgnore = state.curChain?.chainId ? [state.curChain?.chainId] : [];
    setState((prevState) => ({
      ...prevState,
      mainChainsID: getChainsID(false, true, chainsToIgnore),
    }));
  }, [state.curChain]);

  const switchNet = useCallback(
    async (chainId: number) => {
      await switchNetwork(chainId);
    },
    [switchNetwork],
  );

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        setState((prevState) => ({ ...prevState, open }));
      }}
    >
      <DropdownMenuTrigger disabled={!connected} asChild>
        <div
          className={cn(
            "pointer-events-auto flex cursor-pointer items-center space-x-1 rounded-full " +
              "bg-card px-1 py-1 font-poppins text-gray-400 transition-all duration-300" +
              "hover:scale-[1.02] hover:bg-gray-800/80 hover:text-white",
            {
              "scale-[1.02] bg-gray-800/80 text-white": state.open,
            },
          )}
        >
          {state.curChain?.logoPath({ width: 25, height: 25 })}
          <ChevronDownIcon className={cn("h-5 w-5 transition-all duration-300", { "rotate-180": state.open })} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={
          "min-h-[200px] w-52 rounded-3xl border border-gray-700/40 " +
          "bg-gradient-to-b from-eerie-black to-onyx tracking-wider"
        }
      >
        {state.mainChainsID.map((chainId) => (
          <Item
            key={chainId}
            chainId={chainId}
            onClick={async () => {
              void switchNet(chainId);
            }}
          />
        ))}
        {state.testnetChainsID.length > 0 && <Separator className="mb-1 border-t border-gray-800/80" />}
        {state.testnetChainsID.map((chainId) => (
          <Item
            key={chainId}
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
        <div className="rounded-2xl">{chain?.logoPath({ width: 25, height: 25 })}</div>
        <div className="text-sm font-medium text-gray-100">{chain?.displayName}</div>
      </div>
    </Button>
  );
}
