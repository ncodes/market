import { BitcoinIcon, BNBIcon, EthereumIcon, MetaMaskIcon, SolanaIcon } from "@/assets";

export const Wallets = [
  {
    name: "Metamask",
    logo: MetaMaskIcon,
  },
  {
    name: "CTRL Wallet",
    logo: MetaMaskIcon,
  },
  {
    name: "Coinbase",
    logo: MetaMaskIcon,
  },
  {
    name: "Trust Wallet",
    logo: MetaMaskIcon,
  },
  {
    name: "Browser Wallet",
    logo: MetaMaskIcon,
  },
  {
    name: "Wallet Connect",
    logo: MetaMaskIcon,
  },
];

export const Assets = [
  { name: "BNB", symbol: "BNB", logo: BNBIcon },
  { name: "Polygon", symbol: "POL", logo: EthereumIcon },
  { name: "Bitcoin", symbol: "BTC", logo: BitcoinIcon },
  { name: "Avalance", symbol: "AVAX", logo: SolanaIcon },
  { name: "Base", symbol: "ETH", logo: EthereumIcon },
  { name: "Avalance", symbol: "AVAX", logo: SolanaIcon },
  { name: "Solana", symbol: "SOL", logo: SolanaIcon },
  { name: "Ethereum", symbol: "ETH", logo: EthereumIcon },
];

export enum PriceMethod {
  AUTO = "auto",
  MANUAL = "manual",
}

export enum TransactionType {
  SOLD = 'sold',
  ADDED_LIQUIDITY = 'added liquidity',
  BOUGHT = 'bought',
  REMOVED_LIQUITY = 'removed liquidity',
  UPDATED_MARKET = 'updated market',
}