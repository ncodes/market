import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { SwapDrawerAdvancedSettings } from "@/pages/swap/components/swapper/SwapDrawerAdvancedSettings";
import { TokenList } from "@jointlabs/meta";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// import { cn } from "../../../libs/utils";
import { isOrderRouter } from "../common/utils";
import { SwapOrderState } from "../hooks/useSwapOrderLogic";
import { SwapPageState as SwapperState } from "../types/types";
import { DrawerAppealCentre } from "./order/DrawerAppealCentre";
import { DrawerCreateAppeal } from "./order/DrawerCreateAppeal";
import { SwapDrawerPaymentMethodSelector } from "./swapper/SwapDrawerPaymentMethodSelector";
import { SwapDrawerProviderSelector } from "./swapper/SwapDrawerProviderSelector";
import { SwapDrawerRouterSelector } from "./swapper/SwapDrawerRouterSelector";
import { SwapDrawerTokenSelector } from "./swapper/SwapDrawerTokenSelector";
// import { Image } from "@radix-ui/react-avatar";

import { GlobeIcon, SearchIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { ChevronRight } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogPortal } from "@radix-ui/react-dialog";
import { SearchBar } from "../../../components/searchBar";
import { Input } from "../../../components/ui/input";
import { cn } from "../../../libs/utils";
import { Select, SelectContent, SelectItem, SelectValue } from "../../../components/ui/select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SelectTrigger } from "../../../components/select";
import { IconSearch } from "../../../components/icons/IconSearch";
import { Avatar } from "@/components/avatar/Avatar.tsx";
import { Link } from "react-router-dom";
import { ScrollArea } from "../../../components/ui/scroll-area";

export type SwapDrawerContentType =
  | "advance-settings"
  | "provider-selector"
  | "token-selector"
  | "router-selector"
  | "payment-methods"
  | "create-appeal"
  | "appeal-centre";

const defaultState: {
  show?: boolean;
} = {
  show: false,
};

export function SwapModal({
  containerHeight,
  swapperState,
  setSwapperState,
  swapOrderState,
  setSwapOrderState,
  order,
}: {
  containerHeight?: number;
  swapperState?: SwapperState;
  swapOrderState?: SwapOrderState;
  order?: Swap;
  setSwapperState?: React.Dispatch<React.SetStateAction<SwapperState>>;
  setSwapOrderState?: React.Dispatch<React.SetStateAction<SwapOrderState>>;
}) {
  const [state, setState] = useState({ ...defaultState });
  const { address, chainId } = useConnectorContext();
  const content = swapperState?.drawerContentType ?? swapOrderState?.drawerContentType;
  const selectedToken = { sell: swapperState?.sellToken, buy: swapperState?.buyToken };
  const ref = useRef(null);
  const isRouter = order && address ? isOrderRouter(order, address) : false;
  const [open, setOpen] = useState(true);

  const [showSearch, setShowSearch] = useState(false);
  const [selectedValue, setSelectedValue] = useState("all");

  useEffect(() => {
    setState((prev) => ({ ...prev, show: swapperState?.openDrawer || swapOrderState?.openDrawer }));
  }, [swapperState?.openDrawer, swapOrderState?.openDrawer]);

  useEffect(() => {
    setState((prev) => ({ ...prev, show: false }));
    closeDrawer();
  }, [chainId]);

  function closeDrawer() {
    if (setSwapperState) {
      setSwapperState((prev: SwapperState) => ({ ...prev, openDrawer: false, drawerContentType: undefined }));
    } else if (setSwapOrderState) {
      setSwapOrderState((prev: SwapOrderState) => ({ ...prev, openDrawer: false, drawerContentType: undefined }));
    }
  }

  const options = [
    { value: "all", label: "ALL NETWORKS", image: "src/assets/all-chains.webp" },
    { value: "BTC", label: "Bitcoin", image: "src/assets/btc.png" },
    { value: "ATOM", label: "COSMOS", image: "src/assets/cosmos.png" },
    { value: "ETH", label: "Ethereum", image: "src/assets/ethereum.png" },
    { value: "DOT", label: "Polkadot", image: "src/assets/dot.avif" },
  ];

  const tokens = [
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png", tokenSymbol: "UNI", name: "Uniswap" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png", tokenSymbol: "WETH", name: "Wrapped Ethereum" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png", tokenSymbol: "USDC", name: "USD Coin" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png", tokenSymbol: "USDT", name: "Tether" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png", tokenSymbol: "MATIC", name: "Polygon" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png", tokenSymbol: "WBTC", name: "Wrapped Bitcoin" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png", tokenSymbol: "DAI", name: "Dai" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4Fabb145d64652a948d72533023f6E7A623C7C53/logo.png", tokenSymbol: "BUSD", name: "Binance USD" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png", tokenSymbol: "LINK", name: "Chainlink" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0D8775F648430679A709E98d2b0Cb6250d2887EF/logo.png", tokenSymbol: "BAT", name: "Basic Attention Token" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png", tokenSymbol: "UNI", name: "Uniswap" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png", tokenSymbol: "WETH", name: "Wrapped Ethereum" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png", tokenSymbol: "USDC", name: "USD Coin" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png", tokenSymbol: "USDT", name: "Tether" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png", tokenSymbol: "MATIC", name: "Polygon" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png", tokenSymbol: "WBTC", name: "Wrapped Bitcoin" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png", tokenSymbol: "DAI", name: "Dai" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x4Fabb145d64652a948d72533023f6E7A623C7C53/logo.png", tokenSymbol: "BUSD", name: "Binance USD" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x514910771AF9Ca656af840dff83E8264EcF986CA/logo.png", tokenSymbol: "LINK", name: "Chainlink" },
    { src: "https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0x0D8775F648430679A709E98d2b0Cb6250d2887EF/logo.png", tokenSymbol: "BAT", name: "Basic Attention Token" },
];

  return (
    <div ref={ref}>
        <AnimatePresence>
        {!!swapperState && !!setSwapperState && content === "token-selector" && <Dialog open={open} onOpenChange={setOpen}>
            <DialogPortal>
                <div className="backdrop-brightness-5 fixed inset-0 backdrop-blur-md" aria-hidden="true">
                {/* className="w-[90%] max-w-md bg-[#1A1B1F]/95 backdrop-blur-xl border-0 text-white shadow-2xl" */}
                {/* max-w-[451px] h-auto max-h-[716px] fixed rounded-lg border border-[#28293d] bg-[#1c1c28] backdrop-blur-md backdrop-brightness-75 */}
                <DialogContent
                    className="fixed h-[80vh] max-h-[716px] max-w-[451px] rounded-lg border border-[#28293d] bg-[#1c1c28] backdrop-blur-md backdrop-brightness-75"
                    hideCloseButton
                >
                    {/* Close Button */}
                    <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-3 top-3 ml-auto inline-flex h-[36px] w-[36px] items-center rounded-full border border-[#28293d] bg-[#28293d] p-1.5 text-sm text-gray-400 hover:bg-gray-900"
                    onClick={() => {
                        setState((prev) => ({ ...prev, show: false }));
                        closeDrawer();
                        // setOpen(false)
                    }}
                    >
                    <svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg">
                        <g transform="rotate(-45 15.242 4.174)" fill="#FFF" fillRule="evenodd">
                        <rect y="7" width="16" height="2" rx="1" />
                        <rect opacity=".3" transform="rotate(90 8 8)" y="7" width="16" height="2" rx="1" />
                        </g>
                    </svg>
                    </Button>

                    {/* Modal Header */}
                    <DialogHeader>
                    <DialogTitle className="text-lg font-semibold tracking-wider text-[#fafafa]">Choose Asset</DialogTitle>
                    </DialogHeader>

                    <div>
                    <Separator className="-mx-6 border border-solid border-[#28293d]" />
                    <div className="flex w-full items-center justify-between gap-x-4 px-0 py-2">
                        <div className="relative flex items-center flex-[3]">
                        <Input
                            type="text"
                            placeholder="Search"
                            className={cn("!rounded-full border-0 !bg-[#555770] py-2 pl-5 pr-10 !text-[16px] !text-[#8f90a6]", {})}
                            onFocus={() => {
                            setShowSearch(true);
                            }}
                            onBlur={() => {
                            setShowSearch(false);
                            }}
                        />
                        {/* SVG Icon */}
                        <IconSearch className="absolute right-3 h-5 w-5 text-gray-400" />
                        </div>
                        <div className="ml-4">
                        <Select defaultValue="all">
                        <SelectTrigger
                            isRightIcon={false}
                            className="flex-[1] border-0 text-[#fafafa] ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                        >
                        <SelectValue>
                                {/* Show only the image when selected */}
                                {selectedValue && (
                                    <img
                                    src={options.find((opt) => opt.value === selectedValue)?.image}
                                    alt={selectedValue}
                                    className="h-6 w-6"
                                    />
                                )}
                            </SelectValue>
                            <ChevronDownIcon className="h-8 w-6 text-gray-200" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {/* Show both image and text in the dropdown */}
                        {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center gap-2">
                            <img src={option.image} alt={option.label} className="h-6 w-6" />
                            <span>{option.label}</span>
                            </div>
                        </SelectItem>
                        ))}
                        </SelectContent>
                        </Select>
                        </div>
                    </div>

                    <Separator className="-mx-6 border border-solid border-[#28293d]" />
                    </div>
                    
                    <ScrollArea className="h-[calc(80vh-240px)] w-full rounded-md" type="scroll">
                        {tokens.map((token, index) => (
                            <Token
                            key={index}
                            src={token.src}
                            tokenSymbol={token.tokenSymbol}
                            name={token.name}
                            />
                        ))}
                    </ScrollArea>
                </DialogContent>
                </div>
            </DialogPortal>
            </Dialog>}
            
        </AnimatePresence>

    </div>
  );
}

function Token({ src, tokenSymbol, name }: { src: string; tokenSymbol: string; name: string }) {
  return (
    <li className="flex cursor-pointer items-center justify-between px-2 py-2 transition-all duration-300 hover:scale-[1.01] hover:rounded-none  hover:bg-baltic-sea/50 hover:bg-bright-gray hover:text-white">
      <div className="absolute left-0 right-0 -mx-4 h-full bg-transparent transition-all duration-300 hover:bg-baltic-sea/50 hover:bg-bright-gray" />
      
      <div className="relative flex items-center space-x-3 z-10">
        <Avatar src={src} fallback={tokenSymbol} className="h-8 w-8" />
        <div className="flex flex-col text-white">
          <span className="font-bold">{name}</span> 
          <span className="text-[#6b6b6b] text-sm leading-none">{tokenSymbol}</span>
        </div>
      </div>
    </li>
  );
}