export const ONCHAIN_ASSET_TYPES = ["NATIVE", "ERC20", "ERC721", "ERC1155"];

export function isOnchain(assetType: string) {
  return ONCHAIN_ASSET_TYPES.includes(assetType);
}

export function isInteractive(assetA: string, assetB: string) {
  const isAssetAOnchain = isOnchain(assetA);
  const isAssetBOnchain = isOnchain(assetB);

  return !isAssetAOnchain || !isAssetBOnchain;
}
