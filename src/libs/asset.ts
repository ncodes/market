import { TokenList } from "@jointlabs/meta";
import { AssetType } from "../types/enums";

/**
 * Return AssetType equivalent of a token type
 * @param tokenType
 */
export function tokenTypeToAssetType(tokenType: "ERC20" | "SYNTHETIC" | "ERC721" | "ERC1155" | "NATIVE") {
  if (tokenType == "ERC20") return AssetType.ERC20;
  if (tokenType == "SYNTHETIC") return AssetType.SYNTH;
  if (tokenType == "ERC721") return AssetType.ERC721;
  if (tokenType == "ERC1155") return AssetType.ERC1155;
  if (tokenType == "NATIVE") return AssetType.NATIVE;
  throw new Error("unknown token type");
}

/**
 * Check if a token represnts a native token
 * @param token - The token
 */
export function isNative(token: TokenList.Token) {
  return tokenTypeToAssetType(token.type) == AssetType.NATIVE;
}

/**
 * List of supported on-chain asset types
 * @type {string[]}
 */
export const ONCHAIN_ASSET_TYPES: string[] = ["NATIVE", "ERC20", "ERC721", "ERC1155"];

/**
 * Checks if the given asset type is an on-chain asset
 * @param {string} assetType - The type of asset to check
 * @returns {boolean} True if the asset type is on-chain, false otherwise
 */
export function isOnchain(assetType: string): boolean {
  return ONCHAIN_ASSET_TYPES.includes(assetType);
}

/**
 * Determines if two assets can interact with each other
 * @param {string} typeA - The type of the first asset
 * @param {string} typeB - The type of the second asset
 * @returns {boolean} True if at least one asset is off-chain, false if both are on-chain
 */
export function isPairInteractive(tokenA: TokenList.Token, tokenB: TokenList.Token): boolean {
  const isAssetAOnchain = isOnchain(tokenA.type);
  const isAssetBOnchain = isOnchain(tokenB.type);
  return !isAssetAOnchain || !isAssetBOnchain;
}
