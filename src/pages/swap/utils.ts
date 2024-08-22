import { AssetType } from "@/types/enums.ts";
import { TokenList } from "../../../../jointlabs/meta/src";

/**
 * Get the token type
 * @param token - The token object
 */
export function getTokenType(token: TokenList.Token): AssetType {
  if (!token) return;
  if (token.type == "ERC20") return AssetType.ERC20;
  if (token.type == "SYNTHETIC") return AssetType.SYNTH;
  if (token.type == "ERC721") return AssetType.ERC721;
  if (token.type == "ERC1155") return AssetType.ERC1155;
  if (token.type == "NATIVE") return AssetType.NATIVE;
  throw new Error("unknown token type");
}
