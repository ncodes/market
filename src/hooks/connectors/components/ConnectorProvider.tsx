import theme from "@/hooks/connectors/components/theme.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";
import { Chain, http, HttpTransport } from "viem";
import { arbitrum, hardhat } from "viem/chains";
import { createConfig, WagmiProvider } from "wagmi";
import { AppIcon, AppName, AppUrl, InfuraId, WalletConnectId } from "../../../constants.ts";
import { isLocal } from "../../../libs/helpers.ts";
import { getSupportedChains } from "../common.ts";
import { ConnectorContext } from "../context";
import useConnector from "../useConnector";

interface ConnectorProviderProps {
  children: ReactNode;
}

function ConnectorContextWrapper({ children }: { children: ReactNode }) {
  const connector = useConnector();
  return <ConnectorContext.Provider value={connector}>{children}</ConnectorContext.Provider>;
}

const transports: Record<string, HttpTransport> = {};

if (isLocal()) {
  transports[hardhat.id] = http(hardhat.rpcUrls.default.http[0]);
} else {
  transports[arbitrum.id] = http(`https://arbitrum-mainnet.infura.io/v3/${InfuraId}`);
}

const config = createConfig(
  getDefaultConfig({
    walletConnectProjectId: WalletConnectId,
    appName: AppName,
    chains: getSupportedChains() as unknown as readonly [Chain, ...Chain[]],
    appDescription: "Swop allows you to swap tokens with regular people.",
    appUrl: AppUrl,
    appIcon: AppIcon,
    transports,
  } as any),
);

const lastChainId = localStorage.getItem("lastChainId");

const queryClient = new QueryClient();

export default function ConnectorProvider({ children }: ConnectorProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={theme}
          options={{
            initialChainId: lastChainId ? parseInt(lastChainId) : undefined,
          }}
        >
          <ConnectorContextWrapper>{children}</ConnectorContextWrapper>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
