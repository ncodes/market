import { isEqlStr } from "@/libs/string";

/**
 * TokenInfo describes an ERC20-like token EVM chain
 */
export default class NetTokenInfo {
  address?: string;
  name?: string;
  symbol?: string;
  decimals?: number;
  logoURI?: string;
  abi?: any;

  constructor(props: Partial<NetTokenInfo>) {
    if (props) {
      this.address = props.address;
      this.name = props.name;
      this.symbol = props.symbol;
      this.decimals = props.decimals;
      this.logoURI = props.logoURI;
      this.abi = props.abi;
    }
  }

  /**
   * Checks whether the object is equal to o
   * @param o - The other object
   */
  isEqual(o: NetTokenInfo) {
    return isEqlStr(this.address, o.address);
  }
}
