import { SwapDrawerContent } from "@/pages/swap/SwapDrawer.tsx";
import { TokenList } from "../../../../jointlabs/meta";

export interface SwapPageType {
  sellAmount?: number;
  buyAmount?: number;
  focusSide?: SwapSide;
  drawerContent: SwapDrawerContent | undefined;
  openDrawer: boolean;
  tokenLists?: TokenList.TokenData;
  sellToken?: TokenList.Token;
  buyToken?: TokenList.Token;
  openDrawerSide?: SwapSide;
  isMarketUnknown?: boolean;
  mounted?: boolean;
  market?: Market;
  insufficientLiquidity?: boolean;
  lastSideUpdated?: SwapSide;
  fillInfo?: FillInfo;
}
