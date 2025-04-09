import { ProxyLPStructs } from "@/typechain/ProxyLP";
import { ZeroAddress } from "ethers";
import { Address } from "viem";
import { useConnectorContext } from "../../connectors/useConnectorContext";

/**
 * Providers utilities for reading and writing to the ProxyLP contract
 */
export default function useProxyLpContract() {
  const { simulateAndWriteContract } = useConnectorContext();

  /**
   * Create a market
   * @param market The market address
   * @param lid The liquidity ID
   * @param deduct Whether to deduct from or add to the liquidity
   * @param target The target address
   * @param amount The amount to add or deduct
   * @param price The price of the liquidity
   * @param wantOrIds The want OR IDs for when quote is NFT
   * @param wantAndIds The want AND IDs for when quote is NFT
   * @param limits Limit parameters
   * @param limits.{0}: minSwap: The minimum swap amount for the sender's liquidity. Must be less than maxSwap.
   * @param limits.{1}: maxSwap: The maximum swap amount for the sender's liquidity. Must be greater than minSwap.
   * @param limits.{2}: timeToPay: The maximum seconds within which payer must make payment.
   * @param limits.{3}: expireAt: The transaction deadline
   * @param limits.{4}: pause: Indicate whether to pause the liquidity
   */
  async function updateFungibleLiquidity(
    market: string,
    lid: bigint,
    deduct: boolean,
    target: Address,
    amount: bigint,
    price: bigint,
    wantOrIds: bigint[] = [],
    wantAndIds: bigint[] = [],
    crossLiquidity: {
      marketId: Address;
      price: bigint;
      usePriceFromRegistry: boolean;
      priceScaleBps: bigint;
    } = {
      marketId: ZeroAddress as `0x${string}`,
      price: 0n,
      usePriceFromRegistry: false,
      priceScaleBps: 0n,
    },
    timeToPay: bigint = 0n,
    expireAt: bigint = 0n,
    pause: boolean = false,
    usePriceFromRegistry: boolean = false,
    priceScaleBps: bigint = 0n,
    ethDeposit?: bigint,
  ) {
    const params: ProxyLPStructs.UpdateFungibleLiquidityParamsStruct = {
      marketId: market,
      lid,
      deduct,
      amount,
      target,
      price,
      timeToPay,
      expireAt,
      pause,
      usePriceFromRegistry,
      priceScaleBps,
      wantOrIds,
      wantAndIds,
      crossLiquidity,
    };

    return simulateAndWriteContract("proxyLP", "updateFungibleLiquidity", [params], ethDeposit, true, 1);
  }

  /**
   * Parse transaction error into human-friendly message
   * @param error The error object
   */
  function humanizeErrors(error: { message: string } | unknown): string {
    if (error instanceof Error) {
      if (error.message.includes("PR: STALE_PRICE")) return `Registry price is stale`;

      // Common
      if (error.message.includes("OC: AMOUNT_REQ")) return "Amount is required";
      if (error.message.includes("ERC20: transfer amount exceeds balance")) return "Insufficient balance";
      if (error.message.includes("User rejected the request")) return "Transaction was rejected";
      if (error.message.includes("replacement transaction underpriced")) {
        return "Rejected: Not enough gas to replace pending tx";
      }
    }

    return "Transaction failed";
  }

  return {
    updateFungibleLiquidity,
    humanizeErrors,
  };
}
