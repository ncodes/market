import { AssetType } from "@/types/enums.ts";
import { TokenList } from "@jointlabs/meta";

/**
 * Get the token type
 * @param token - The token object
 */
export function getTokenType(token?: TokenList.Token): AssetType | undefined {
  if (!token) return;
  if (token.type == "ERC20") return AssetType.ERC20;
  if (token.type == "SYNTHETIC") return AssetType.SYNTH;
  if (token.type == "ERC721") return AssetType.ERC721;
  if (token.type == "ERC1155") return AssetType.ERC1155;
  if (token.type == "NATIVE") return AssetType.NATIVE;
  throw new Error("unknown token type");
}

export function isERC20(v?: AssetType | TokenList.Token) {
  if (v == undefined) return false;
  if (typeof v == "number") return v == AssetType.ERC20;
  return getTokenType(v) == AssetType.ERC20;
}

export function isNative(v?: AssetType | TokenList.Token) {
  if (v == undefined) return false;
  if (typeof v == "number") return v == AssetType.NATIVE;
  return getTokenType(v) == AssetType.NATIVE;
}

export function isSynthetic(v?: AssetType | TokenList.Token) {
  if (v == undefined) return false;
  if (typeof v == "number") return v == AssetType.SYNTH;
  return getTokenType(v) == AssetType.SYNTH;
}

export function isInstantMarket(market?: Market) {
  if (!market) return false;
  return !isSynthetic(market.baseType) && !isSynthetic(market.quoteType);
}

export function isNFT(v?: AssetType | TokenList.Token) {
  if (v == undefined) return false;
  if (typeof v == "number") return v == AssetType.ERC721 || v == AssetType.ERC1155;
  return getTokenType(v) == AssetType.ERC721 || getTokenType(v) == AssetType.ERC1155;
}

/**
 * Determines who between the provider or the taker is expected to make off-chain payment
 * @param swap The swap object
 */
export function getPayer(swap: Swap) {
  let payer = "";
  const { baseType, quoteType } = swap.market;
  if ((isERC20(baseType) || isNative(baseType)) && isSynthetic(quoteType)) {
    payer = swap.taker;
  } else if (isSynthetic(baseType) && isSynthetic(quoteType)) {
    payer = swap.taker;
  } else if (isSynthetic(baseType) && (isERC20(quoteType) || isNFT(quoteType) || isNative(quoteType))) {
    payer = swap.provider;
  } else if (isNFT(baseType) && isSynthetic(quoteType)) {
    payer = swap.taker;
  }
  return payer;
}

export function calculateRoutesFee(paths: PayRouterRoute[]) {
  return paths.reduce((acc, path) => acc + (path.fee || 0), 0);
}

export function isSwapCounterparty(swap: Swap, account: string) {
  return swap.provider == account || swap.taker == account;
}

export function iamSellerOrBuyer(order: Swap, address: string, opposite?: boolean, capitalize?: boolean) {
  let label = "";
  if (order.provider == address) label = "buyer";
  if (order.taker == address) label = "seller";
  label = !opposite ? label : label == "seller" ? "buyer" : "seller";
  return capitalize ? label.charAt(0).toUpperCase() + label.slice(1) : label;
}
