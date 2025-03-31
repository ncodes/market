import { AssetType } from "@/types/enums";
import { TokenList } from "@jointlabs/meta";

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

/**
 * Checks if an asset is a synthetic
 * @param assetType The asset type
 */
export function isSynth(assetType: AssetType) {
	return assetType == AssetType.SYNTH;
}

/**
 * Checks if an asset is an ERC20
 * @param assetType The asset type
 */
export function isERC20(assetType: AssetType) {
	return assetType == AssetType.ERC20;
}