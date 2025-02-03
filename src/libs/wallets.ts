import { BitcoinIcon, BNBIcon, EthereumIcon, MetamaskIcon, SolanaIcon } from "@/assets";

export const Wallets = [
  {
    name: "Metamask",
    logo: MetamaskIcon,
  },
  {
    name: "CTRL Wallet",
    logo: MetamaskIcon,
  },
  {
    name: "Coinbase",
    logo: MetamaskIcon,
  },
  {
    name: "Trust Wallet",
    logo: MetamaskIcon,
  },
  {
    name: "Browser Wallet",
    logo: MetamaskIcon,
  },
  {
    name: "Wallet Connect",
    logo: MetamaskIcon,
  },
];

export const Assets = [
  { name: "BNBChain", network: "BEP20", logo: BNBIcon },
  { name: "Polygon", network: "POS", logo: EthereumIcon },
  { name: "Bitcoin", network: "BTC", logo: BitcoinIcon },
  { name: "Avalance", network: "C-Chain", logo: SolanaIcon },
  { name: "Base", network: "BC", logo: EthereumIcon },
  { name: "Avalance", network: "C-Chain", logo: SolanaIcon },
  { name: "Solana", network: "SOL", logo: SolanaIcon },
  { name: "Ethereum", network: "ERC 20", logo: EthereumIcon },
];
