import { SwapDrawerContent } from "@/pages/swap/SwapDrawer.tsx";
import { TokenList } from "@jointlabs/meta";

export const SideBuy = "Buy";
export const SideSell = "Sell";
export const SideQuote = "quote";
export const SideBase = "base";
export enum SwapSide {
  Buy = "Buy",
  Sell = "Sell",
}

export interface SwapPageType {
  slippage?: number;
  expires?: number;
  sellAmount?: string;
  buyAmount?: string;
  focusSide?: SwapSide;
  drawerContent?: SwapDrawerContent | undefined;
  openDrawer?: boolean;
  tokenLists?: TokenList.TokenData;
  sellToken?: TokenList.Token;
  buyToken?: TokenList.Token;
  isMarketUnknown?: boolean;
  market?: Market;
  insufficientLiquidity?: boolean;
  lastSideUpdated?: SwapSide;
  takerPaysFee?: boolean;
  mktFee?: string;
  protoFee?: string;
  feeSideSymbol?: string;
  mktFeePct?: number;
  protoFeePct?: number;
  showFeeDetails?: boolean;
  nativeBalance?: string;
  baseBalance?: string;
  quoteBalance?: string;
  insufficientBalance?: boolean;
  openDrawerSide?: SwapSide;
  allowanceOk: boolean;
  approveLoading: boolean;
  swapLoading: boolean;
  autoInitiateSwap: boolean;
}
