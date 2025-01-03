import { TokenList } from "@jointlabs/meta";
import { SwapDrawerContentType } from "../components/SwapDrawer";

export const SideQuote = "quote";
export const SideBase = "base";
export enum SwapSide {
  Buy = "Buy",
  Sell = "Sell",
}

export interface SwapPageState {
  slippage?: number;
  expires?: number;
  sellAmount?: string;
  buyAmount?: string;
  sellAmountAfterFee?: string;
  buyAmountAfterFee?: string;
  focusSide?: SwapSide;
  drawerContentType?: SwapDrawerContentType | undefined;
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
  liquidities: Liquidity[];
  selectedLiquidity?: Liquidity;
  payRoutes?: PayRouterRoute[][];
  selectedPayRoutes: PayRouterRoute[];
  selectedPaymentMethod?: PaymentMethod;
  showFeeDetails?: boolean;
  nativeBalance?: string;
  baseBalance?: string;
  quoteBalance?: string;
  insufficientBalance?: boolean;
  openDrawerSide?: SwapSide;
  allowanceOk: boolean;
  approveLoading: boolean;
  linkWalletLoading: boolean;
  swapLoading: boolean;
  autoInitiateSwap: boolean;
  requiredMinBond?: string;
}
