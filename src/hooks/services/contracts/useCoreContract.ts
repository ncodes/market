import { Structs, StructsLib } from "@/typechain/Core";
import { ZeroAddress } from "ethers";
import { Address } from "viem";
import { useConnectorContext } from "../../connectors/useConnectorContext";

/**
 * Providers utilities for reading and writing to the Core contract
 */
export default function useCoreContract() {
  const { simulateAndWriteContract, readContract } = useConnectorContext();

  /**
   * Check if a liquidity exist
   * @param market The market address
   * @param provider The liquidity provider address
   * @param lid The liquidity ID
   */
  async function hasLiquidity(market: string, provider: string, lid: number) {
    return await readContract("core", "hashLiquidity", [market, provider, lid]);
  }

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
    amount: bigint,
    price: bigint,
    deduct: boolean,
    target: Address,
    wantOrIds: bigint[] = [],
    wantAndIds: bigint[] = [],
    timeToPay: bigint = 0n,
    expireAt: bigint = 0n,
    pause: boolean = false,
    usePriceFromRegistry: boolean = false,
    priceScaleBps: bigint = 0n,
    ethDeposit?: bigint,
  ) {
    const params: StructsLib.UpdateFungibleLiquidityParamsStruct = {
      marketId: market,
      target,
      lid,
      amount,
      price,
      wantOrIds,
      wantAndIds,
      timeToPay,
      expireAt,
      pause,
      usePriceFromRegistry,
      priceScaleBps,
      deduct,
    };

    return simulateAndWriteContract("core", "updateFungibleLiquidity", [params], ethDeposit, true, 1);
  }

  /**
   * Initiate a swap
   * @param marketId The market addres
   * @param provider The liquidity provider address
   * @param recipient The recipient address
   * @param lid The liquidity ID
   * @param amount The amount to swap
   * @param maxPrice The maximum price
   * @param ids The NFT IDs
   * @param txDeadline The transaction deadline
   * @param operator The operator ID
   * @param ethDeposit The amount of ETH to deposit if ETH is required
   */
  async function swapQuoteForBase(
    marketId: string,
    provider: string,
    recipient = ZeroAddress,
    lid: bigint,
    amount: bigint,
    maxPrice: bigint,
    ids: bigint[] = [],
    txDeadline: bigint,
    operator: bigint = 0n,
    marketMgrData: string,
    ethDeposit?: bigint,
  ) {
    const params: StructsLib.SwapQuoteForBaseParamsStruct = {
      marketId,
      provider,
      recipient,
      lid,
      amount,
      maxPrice,
      ids,
      expireAt: txDeadline,
      operator,
      marketMgrData,
    };

    return simulateAndWriteContract("core", "swapQuoteForBase", [params], ethDeposit, true, 1);
  }

  /**
   * Create an offer
   * @param marketId The market address
   * @param provider The liquidity provider address
   * @param recipient The recipient address
   * @param lid The liquidity ID
   * @param amount The amount of the offer
   * @param price The price of the offer
   * @param ids The NFT IDs if liquidity is NFT
   * @param txDeadline The transaction deadline
   * @param operator The operator ID
   */
  async function createOffer(
    marketId: string,
    provider: string,
    recipient: string | undefined,
    lid: bigint,
    amount: bigint,
    price: bigint,
    ids: bigint[] = [],
    txDeadline: bigint,
    operator: bigint = 0n,
  ) {
    return await simulateAndWriteContract("core", "createOffer", [
      marketId,
      provider,
      recipient,
      lid,
      amount,
      price,
      ids,
      txDeadline,
      operator,
    ]);
  }

  /**
   * Count the number of liquidity owned by an address in a market
   * @param marketAddress The market address
   * @param providerAddress The provider address
   * @returns The number of liquidity
   */
  async function countLiquidity(marketAddress: string, providerAddress: string): Promise<bigint> {
    return readContract("core", "countLiquidity", [marketAddress, providerAddress]);
  }

  /**
   * Update an offer
   * @param offerId The offer ID
   * @param amount The updated amount
   * @param price The updated price
   * @param ids The updated NFT IDs
   * @param txDeadline The transaction deadline
   * @returns
   */
  async function updateOffer(offerId: bigint, amount: bigint, price: bigint, ids: bigint[] = [], txDeadline: bigint) {
    return await simulateAndWriteContract("core", "updateOffer", [offerId, amount, price, ids, txDeadline]);
  }

  /**
   * Cancel an offer
   * @param offerId The offer ID
   */
  async function cancelOffer(offerId: bigint) {
    return await simulateAndWriteContract("core", "cancelOffer", [offerId]);
  }

  /**
   * Accept an offer
   * @param offerId The offer ID
   * @param execDelayDur The execution delay duration
   * @returns
   */
  async function acceptOffer(offerId: bigint, execDelayDur: bigint) {
    return await simulateAndWriteContract("core", "acceptOffer", [offerId, execDelayDur]);
  }

  /**
   * Unaccept an offer
   * @param offerId The offer ID
   * @returns
   */
  async function unacceptOffer(offerId: bigint) {
    return await simulateAndWriteContract("core", "unacceptOffer", [offerId]);
  }

  /**
   * Execute an offer
   * @param offerId The offer ID
   * @returns
   */
  async function executeOffer(offerId: bigint, txDeadline: bigint) {
    return await simulateAndWriteContract("core", "executeOffer", [offerId, txDeadline]);
  }

  /**
   * Set swap badges for a liquidity
   * @param market The market address
   * @param lid The liquidity ID
   * @param swapBadges The swap badges
   */
  async function setSwapBadgeForLiquidity(market: string, lid: bigint, swapBadges: string[][]) {
    const res = await simulateAndWriteContract("core", "setSwapBadgeForLiquidity", [market, lid, swapBadges]);
    return res[0];
  }

  /**
   * Compute swap fee
   * @param mid The market ID
   * @param provider The liquidity provider address
   * @param lid The liquidity ID
   * @param taker The taker address
   * @param orderAmt The order amount
   * @param orderPrice The order price
   */
  async function computeSwapFee(
    mid: string,
    provider: string,
    lid: number,
    taker: string,
    orderAmt: bigint,
    orderPrice: bigint,
  ): Promise<{
    protocolFee: bigint;
    marketFee: bigint;
    feeBp: bigint;
    marketFeeBp: bigint;
  }> {
    const res: [bigint, bigint, bigint, bigint] = await readContract("core", "computeSwapFee", [
      mid,
      provider,
      lid,
      taker,
      orderAmt,
      orderPrice,
    ]);
    return {
      protocolFee: res[0],
      marketFee: res[1],
      feeBp: res[2],
      marketFeeBp: res[3],
    };
  }

  /**
   * Cancel an order
   * @param orderId The order ID
   */
  async function cancelOrder(orderId: bigint) {
    return (await simulateAndWriteContract("core", "cancelOrder", [orderId]))[0];
  }

  /**
   * Mark an order as paid
   * @param orderId The order ID
   */
  async function markOrderAsPaid(orderId: bigint) {
    return (await simulateAndWriteContract("core", "markOrderAsPaid", [orderId], undefined, true, 1))[0];
  }

  /**
   * Release an order
   * @param orderId The order ID
   */
  async function releaseOrder(orderId: bigint) {
    return (await simulateAndWriteContract("core", "releaseOrder", [orderId]))[0];
  }

  /**
   * Get an order
   * @param orderId The order ID
   */
  async function getOrder(orderId: bigint): Promise<Structs.OrderStruct> {
    return readContract("core", "getOrder", [orderId]);
  }

  function state(): Promise<CoreContractState> {
    return readContract("core", "state", []);
  }

  /**
   * Parse transaction error into human-friendly message
   * @param error The error object
   */
  function humanizeErrors(error: { message: string } | unknown): string {
    if (error instanceof Error) {
      if (error.message.includes("OC: ZERO_LIQ")) return "Cannot perform action on empty liquidity";

      // updateFungibleLiquidity: MKT_BADGE_REQ
      if (error.message.includes("OC: MKT_BADGE_REQ"))
        return "Permission denied: You don't have a badge required by the market creator";

      if (error.message.includes("OC: LP_BADGE_REQ"))
        return "Permission denied: You don't have a badge required by the liquidity provider";

      if (error.message.includes("OC: LOW_TTP")) return "Payment time is too short";

      if (error.message.includes("OC: LOW_LIQ")) return "Not enough liquidity";

      // swapQuoteForBase
      if (error.message.includes("OC: OFFER_EXPIRED_TX")) return "Transaction expired";

      // cancelOrder
      if (error.message.includes("OC: NOT_CANCEL_TIME")) return "Cannot cancel order at this time";

      // createOffer, updateOffer
      if (error.message.includes("OC: MAX_PRICE_REQ")) return "Price is required";

      if (error.message.includes("OC: AMOUNT_ABOVE_MAX_SWAP"))
        return `'OUT' amount is above max swap amount. (OUT amount = OUT + fee)`;

      if (error.message.includes("OC: MAX_OPEN_ORDERS"))
        return `The liquidity provider has reached the maximum number of open orders allowed`;

      if (error.message.includes("OC: LOW_DEPOSIT")) return `Insufficient balance`;

      if (error.message.includes("PR: STALE_PRICE")) return `Registry price is stale. Contact support for assistance.`;

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
    hasLiquidity,
    getOrder,
    swapQuoteForBase,
    computeSwapFee,
    setSwapBadgeForLiquidity,
    humanizeErrors,
    cancelOrder,
    markOrderAsPaid,
    createOffer,
    cancelOffer,
    releaseOrder,
    acceptOffer,
    unacceptOffer,
    executeOffer,
    updateOffer,
    countLiquidity,
    state,
  };
}
