import { AssetType } from "@/types/enums.ts";
import { TokenList } from "@jointlabs/meta";
import Decimal from "decimal.js";
import moment from "moment";
import { toDec } from "../../../libs/helpers";

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

export function isSynth(v?: AssetType | TokenList.Token) {
  if (v == undefined) return false;
  if (typeof v == "number") return v == AssetType.SYNTH;
  return getTokenType(v) == AssetType.SYNTH;
}

export function isInstantMarket(market?: Market) {
  if (!market) return false;
  return !isSynth(market.baseType) && !isSynth(market.quoteType);
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
  if ((isERC20(baseType) || isNative(baseType)) && isSynth(quoteType)) {
    payer = swap.taker;
  } else if (isSynth(baseType) && isSynth(quoteType)) {
    payer = swap.taker;
  } else if (isSynth(baseType) && (isERC20(quoteType) || isNFT(quoteType) || isNative(quoteType))) {
    payer = swap.provider;
  } else if (isNFT(baseType) && isSynth(quoteType)) {
    payer = swap.taker;
  }
  return payer;
}

/**
 * Calculate the total fee of the given routes
 * @param paths - The routes to calculate the fee for
 * @param startIndex - The index to start calculating the fee from
 * @returns The total fee of the given routes
 * @returns
 */
export function calculateRoutesFee(paths: PayRouterRoute[], startIndex = 0) {
  return paths.slice(startIndex).reduce((acc, path) => acc + (path.fee || 0), 0);
}

/**
 * Calculate the total fee of the given routes. It's different from calculateRoutesFee
 * because it accepts an array of fees instead of an array of routes
 * @param fees - The fees to calculate the total fee for
 * @param startIndex - The index to start calculating the fee from
 * @returns The total fee of the given routes
 */
export function calculateRoutesFee2(fees: number[], startIndex = 0) {
  return fees.slice(startIndex).reduce((acc, fee) => acc + fee, 0);
}

export function isSwapCounterparty(swap: Swap, account: string) {
  return swap.provider == account || swap.taker == account;
}

export function isSellerOrBuyer(order: Swap, address: string, opposite?: boolean, capitalize?: boolean) {
  let label = "";
  if (order.provider == address) label = "buyer";
  if (order.taker == address) label = "seller";
  label = !opposite ? label : label == "seller" ? "buyer" : "seller";
  return capitalize ? label.charAt(0).toUpperCase() + label.slice(1) : label;
}

/**
 * Checks if an address is a router in the order
 * @param order The order to check
 * @param address The address to check
 * @returns true if the address is a router in the order, false otherwise
 */
export function isOrderRouter(order: Swap, address: string) {
  if (!order.payRouterRequest) return false;
  return order.payRouterRequest.routes.some((route) => route.owner == address);
}

/**
 * Convert currency from one currency to another
 * @param amount - The amount to convert
 * @param fromCurrency - The currency to convert from
 * @param toCurrency - The currency to convert to
 * @param rates - The rates to use for the conversion. The rates should be in the format of { "USD": 1, "EUR": 0.85, "JPY": 110 }
 * @returns The converted amount
 */
export function convertCurrency(
  amount: number | string | Decimal,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>,
) {
  const amt = toDec(amount);
  if (!rates[fromCurrency] || !rates[toCurrency]) throw new Error("Invalid currency code");
  const amountInUSD = amt.div(rates[fromCurrency]);
  const amountInTargetCurrency = amountInUSD.mul(rates[toCurrency]);
  return amountInTargetCurrency.toFixed(6);
}

/**
 * Calculate actual amount with routing fees added
 * @param amount - The amount to apply the fee to
 * @param payRoutes - The pay routes to calculate the fee for
 * @param decimals - The number of decimals to round the amount to. Defaults to 2
 * @returns The actual amount
 */
export function applyRoutingFeeToAmount(amount: string, payRoutes: PayRouterRoute[], decimals = 2) {
  if (!amount) return "0";
  const routingFee = calculateRoutesFee(payRoutes);
  return toDec(amount)
    .div(toDec(1).minus(toDec(routingFee).div(100)))
    .toFixed(decimals);
}

/**
 * Deduct routing fee from the amount
 * @param amount - The amount to deduct the fee from
 * @param payRoutes - The pay routes to deduct the fee for
 * @param decimals - The number of decimals to round the amount to. Defaults to 2
 * @returns The amount after deducting the fee
 */
export function deductRoutingFeeFromAmount(amount: string, payRoutes: PayRouterRoute[], decimals = 2) {
  if (!amount) return "0";
  const routingFee = calculateRoutesFee(payRoutes);
  return toDec(amount)
    .mul(toDec(1).minus(toDec(routingFee).div(100)))
    .toFixed(decimals);
}

export function isOrderExpired(order: Swap) {
  return (
    !order.paid &&
    moment(order.cancelAt).isBefore(moment()) &&
    (!order.finalizedAt || moment(order.finalizedAt).isAfter(moment(order.cancelAt)))
  );
}

export function getAppealerStr(order: Swap, capitalize = true) {
  const appealer = order.appeal.creator.address;
  const isAppealerRouter = isOrderRouter(order, appealer);
  if (isAppealerRouter) {
    const routes = order.payRouterRequest?.routes ?? [];
    const routeIdx = routes?.findIndex((route) => route.owner == appealer) ?? 0;
    return `Router #${routeIdx}`;
  }
  return isSellerOrBuyer(order, appealer, false, capitalize);
}
