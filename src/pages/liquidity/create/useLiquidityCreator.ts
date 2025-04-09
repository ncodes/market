import { TokenList, TokenLists } from "@jointlabs/meta";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ZeroAddress } from "ethers";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Log, decodeEventLog, isAddress } from "viem";
import { useBalance } from "wagmi";
import { z } from "zod";
import { Operator } from "../../../constants";
import { useConnectorContext } from "../../../hooks/connectors/useConnectorContext";
import { useMarketService } from "../../../hooks/services/backend/useMarketService";
import { useMiscService } from "../../../hooks/services/backend/useMiscService";
import useCoreContract from "../../../hooks/services/contracts/useCoreContract";
import useProxyLpContract from "../../../hooks/services/contracts/useProxyLpContract";
import { isErc20, isNative } from "../../../libs/asset";
import { logError } from "../../../libs/logging";
import { toDec, toHD, toHDD, toLD, toLDD } from "../../../libs/numbers";
import { isEqlStr } from "../../../libs/string";
import { getRandomSeed } from "../../../libs/utils";

export type LiquidityCreatorState = {
  baseToken?: TokenList.Token;
  quoteToken?: TokenList.Token;
  isLoading: boolean;
  autoPrice: boolean;
  pause: boolean;
  amount?: string;
  margin?: number;
  price?: string;
  target?: string;
  baseAllowance?: bigint;
  requiresAllowance: boolean;
  isCreated: boolean;
  isCreating: boolean;
  isApproving: boolean;
  isApproved: boolean;
};

// Default State
const defaultState: LiquidityCreatorState = {
  baseToken: undefined,
  quoteToken: undefined,
  isLoading: false,
  autoPrice: false,
  pause: false,
  amount: undefined,
  price: undefined,
  target: undefined,
  baseAllowance: 0n,
  requiresAllowance: false,
  isCreated: false,
  isCreating: false,
  isApproving: false,
  isApproved: false,
};

const schema = z
  .object({
    amount: z.string().min(1, { message: "Amount is required" }),
    autoPrice: z.boolean(),
    price: z.optional(z.string()),
    target: z.optional(z.string()).refine((val) => val === "" || val === undefined || isAddress(val as string), {
      message: "Target address is invalid",
    }),
    pause: z.boolean(),
    balance: z.object({
      decimals: z.number(),
      value: z.bigint(),
    }),
  })
  .refine((data) => data.autoPrice || (data.price && data.price.length > 0), {
    message: "Price is required",
    path: ["price"],
  })
  .refine((data) => toHDD(data.balance.value, data.balance.decimals).gte(data.amount || 0), {
    message: "Insufficient balance",
    path: ["amount"],
  });

/**
 * Hook for the Liquidity Creator
 * @returns Liquidity Creator State and Functions
 */
export default function useLiquidityCreator() {
  const [state, setState] = useState<LiquidityCreatorState>(defaultState);
  const { chainInfo, ready, address, getTokenAllowance, approveAllowance, humanizeErc20Errors } = useConnectorContext();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { listMarkets } = useMarketService();
  const { updateFungibleLiquidity: coreUpdateFL, humanizeErrors: coreHumanizeErrors } = useCoreContract();
  const { updateFungibleLiquidity: proxyLpUpdateFL, humanizeErrors: proxyLpHumanizeErrors } = useProxyLpContract();
  const { getCryptoRate } = useMiscService();
  const { countLiquidity } = useCoreContract();
  const navigate = useNavigate();

  // Find market that matches the base and quote tokens and owned by the operator
  const { data: markets, isLoading: isLoadingSelectedMarket } = useQuery({
    queryKey: [
      "getSelectedMarket",
      {
        network: chainInfo?.queryName ?? "",
        marketFilter: {
          base: state.baseToken?.address,
          quote: state.quoteToken?.address,
          creator: Operator,
        },
      },
    ],
    queryFn: listMarkets,
    enabled: !!state.baseToken?.address && !!state.quoteToken?.address && !!chainInfo,
  });

  // Get USD rate of base token
  const { data: baseTokenUsdRate } = useQuery({
    queryKey: ["getCryptoRate", { net: chainInfo?.queryName ?? "", address: state.baseToken?.address ?? "" }],
    queryFn: getCryptoRate,
    enabled: !!chainInfo && !!state.baseToken?.address,
  });

  // Get USD rate of quote token
  const { data: quoteTokenUsdRate } = useQuery({
    queryKey: ["getCryptoRate", { net: chainInfo?.queryName ?? "", address: state.quoteToken?.address ?? "" }],
    queryFn: getCryptoRate,
    enabled: !!chainInfo && !!state.quoteToken?.address,
  });

  // Get the balance of the base token
  const { data: balance } = useBalance({
    address: address as `0x${string}`,
    token: isNative(state.baseToken) ? undefined : (state.baseToken?.address as `0x${string}`),
  });

  // Calculate the balance in USD
  const balanceUsd =
    balance && baseTokenUsdRate ? toDec(toHD(balance.value, balance.decimals)).mul(baseTokenUsdRate).toFixed() : "0";

  // Calculate the initial price if auto price is enabled
  const autoInitialPrice = calcInitialPrice();

  // Mutation to create a new liquidity
  const mutCreateLiquidity = useMutation({
    mutationFn: async (params: {
      instantMarket: boolean;
      nativeBaseAsset: boolean;
      marketAddress: string;
      amount: string;
      price: string;
      autoPrice: boolean;
      margin: number;
      target: string;
      pause: boolean;
    }) => {
      const now = moment();
      const expireAt = now.add(5, "minutes").unix();
      const { instantMarket, nativeBaseAsset, marketAddress, amount, price, autoPrice, margin, target, pause } = params;
      const marginBps = (margin ?? 0) * 100;

      if (instantMarket) {
        const proxyLP = chainInfo?.contracts?.proxyLP;
        const numLiq = await countLiquidity(marketAddress, proxyLP?.address as `0x${string}`);

        return proxyLpUpdateFL(
          marketAddress,
          numLiq,
          false,
          target as `0x${string}`,
          BigInt(amount),
          BigInt(price),
          [],
          [],
          undefined,
          0n,
          BigInt(expireAt),
          pause,
          autoPrice,
          BigInt(marginBps),
          nativeBaseAsset ? BigInt(amount) : undefined,
        );
      } else {
        const core = chainInfo?.contracts?.core;
        const numLiq = await countLiquidity(marketAddress, core?.address as `0x${string}`);

        return coreUpdateFL(
          marketAddress,
          numLiq,
          BigInt(amount),
          BigInt(price),
          false,
          target as `0x${string}`,
          [],
          [],
          0n,
          BigInt(expireAt),
          pause,
          autoPrice,
          BigInt(marginBps),
          nativeBaseAsset ? BigInt(amount) : undefined,
        );
      }
    },
  });

  // Mutation to approve the allowance of the base token
  const mutApprove = useMutation({
    mutationFn: async (params: { tokenAddress: `0x${string}`; spenderAddress: `0x${string}`; amount: bigint }) => {
      return approveAllowance(params.tokenAddress, params.spenderAddress, params.amount);
    },
  });

  // Set the default base and quote tokens
  useEffect(() => {
    if (!chainInfo) return;
    const tokenLists = TokenLists[chainInfo.queryName];
    setState((prev) => ({
      ...prev,
      baseToken: getRandomSeed(tokenLists.tokens),
      quoteToken: getRandomSeed(tokenLists.tokens),
    }));
  }, [chainInfo]);

  // Get the allowance of the base token
  useEffect(() => {
    if (!state.baseToken || !markets || markets.markets.length === 0 || !ready || !isErc20(state.baseToken)) return;
    const spender = getAllowanceSpenderAddress();
    getTokenAllowance(state.baseToken.address, address as `0x${string}`, spender as `0x${string}`).then((allowance) => {
      setState((prev) => ({
        ...prev,
        baseAllowance: allowance,
        requiresAllowance: requiresAllowance(allowance),
      }));
    });
  }, [state.amount, state.baseToken, markets, chainInfo, mutApprove.data]);

  // Re-validate the already set amount field
  // when the base token changes
  useEffect(() => {
    if (!state.amount) return;
    validate("amount");
  }, [state.baseToken, markets]);

  /**
   * Function to handle the selection of a token
   * @param token - The token that was selected
   * @param meta - The metadata of the selected token
   */
  function onTokenSelect(token: any, meta: Record<string, any>) {
    setState((prev) => {
      if (meta.base) {
        return { ...prev, baseToken: token };
      } else {
        return { ...prev, quoteToken: token };
      }
    });
  }

  /**
   * Validate the state and return the errors for the given field
   * @param field - The field to return the errors for
   */
  function validate(field: string) {
    const result = schema.safeParse({
      ...state,
      balance: { decimals: balance?.decimals ?? 18, value: balance?.value ?? 0n },
    });
    const errs = !result.success ? result.error.flatten().fieldErrors : {};
    if (!field) {
      setErrors(errs);
    } else {
      setErrors({ ...errors, [field]: (errs as Record<string, string[]>)[field] });
    }
  }

  /**
   * Calculate the initial price
   * @returns The initial price
   */
  function calcInitialPrice() {
    const { autoPrice, baseToken, quoteToken } = state;
    if (!baseToken || !quoteToken) return undefined;
    if (!autoPrice) return undefined;
    if (baseToken.address == quoteToken.address) return 1;
    if ((isNative(baseToken) || isNative(quoteToken)) && (!!baseToken?.nativeWrapper || !!quoteToken?.nativeWrapper))
      return 1;
    return (baseTokenUsdRate ?? 0) * (quoteTokenUsdRate ?? 1);
  }

  /**
   * Handle the creation of a new liquidity
   * @returns undefined
   */
  async function handleCreateLiquidity() {
    if (!state.baseToken || !state.quoteToken || !markets || !chainInfo) return;

    const market = markets.markets[0];

    try {
      const price = toLD(state.price ?? "0", state.quoteToken.decimals);
      const amount = toLD(state.amount ?? "0", state.baseToken.decimals);

      const [, txReceipt] = await mutCreateLiquidity.mutateAsync({
        instantMarket: market.instant,
        nativeBaseAsset: isNative(state.baseToken),
        marketAddress: market.address,
        amount: amount,
        price: price,
        autoPrice: state.autoPrice,
        margin: state.margin!,
        target: state.target || ZeroAddress,
        pause: state.pause,
      });

      // Get new liquidity id from the event log
      let abi: any, log: Log<bigint, number, false> | undefined;
      if (market.instant) {
        log = txReceipt.logs.find((log) => isEqlStr(log.address, chainInfo.contracts?.proxyLP?.address));
        abi = chainInfo.contracts?.proxyLP?.abi;
      } else {
        log = txReceipt.logs[0];
        abi = chainInfo.contracts?.core?.abi;
      }

      const event = decodeEventLog({ abi: abi, data: log!.data, topics: log!.topics }) as {
        args: { liq: string };
      };

      const id = event.args.liq;

      toast.success("Liquidity Created", {
        description: "Your position was created successfully",
        position: "top-right",
        duration: 5000,
      });

      setState((prev) => ({
        ...prev,
        amount: undefined,
        price: undefined,
        target: undefined,
        autoPrice: false,
        pause: false,
        baseAllowance: 0n,
        requiresAllowance: false,
        margin: 0,
      }));

      setTimeout(() => {
        mutApprove.reset();
        mutCreateLiquidity.reset();
      }, 1000);

      return id;
    } catch (error) {
      const msg = (market.instant ? proxyLpHumanizeErrors : coreHumanizeErrors)(error);
      toast.error("Liquidity Creation Error", { description: msg, position: "top-right" });
      logError(error);
    }
  }

  /**
   * Handle the approval of base token amount spend
   * @returns undefined
   */
  async function handleApprove() {
    if (!requiresAllowance() || !state.baseToken) return;

    try {
      const spender = getAllowanceSpenderAddress();
      await mutApprove.mutateAsync({
        tokenAddress: state.baseToken.address as `0x${string}`,
        spenderAddress: spender as `0x${string}`,
        amount: BigInt(toLD(state.amount!, state.baseToken.decimals)),
      });

      toast.success("Approved", {
        description: "Allowance approved",
        position: "top-right",
        duration: 5000,
      });

      // Initiate the creation of the liquidity and navigate to the
      // liquidity page after the liquidity is created
      handleCreateLiquidity().then((id) => {
        if (id) {
          setTimeout(() => {
            navigate(`/liquidity/${id}`);
          }, 3000);
        }
      });
    } catch (error) {
      const msg = humanizeErc20Errors(error);
      toast.error("Approve Error", { description: msg, position: "top-right" });
      logError(error);
    }
  }

  /**
   * Check if there are any errors
   * @returns True if there are any errors, false otherwise
   */
  function hasErrors() {
    return Object.values(errors).some((error) => error && error.length > 0);
  }

  /**
   * Check if the state is ready for executing contract calls
   * @returns True if the state is ready, false otherwise
   */
  function isReady() {
    return (
      !hasErrors() &&
      (markets?.markets ?? []).length &&
      !!state.baseToken &&
      !!state.quoteToken &&
      !!state.amount &&
      (state.autoPrice || !!state.price)
    );
  }

  /**
   * Get the contract address will be approved to spend the
   * base token of the connected wallet
   * @returns The spender address
   */
  function getAllowanceSpenderAddress() {
    const market = markets!.markets[0];
    return market.instant ? chainInfo?.contracts?.proxyLP?.address : chainInfo?.contracts?.core?.address;
  }

  /**
   * Check if allowance is required
   * @param baseAllowance - The allowance of the base token (optional)
   * @returns True if allowance is required, false otherwise
   */
  function requiresAllowance(baseAllowance?: bigint) {
    if (!isErc20(state.baseToken)) return false;
    const amtLD = toLDD(state.amount || "0", state.baseToken!.decimals || 0);
    return amtLD.gt(toDec(baseAllowance ?? state.baseAllowance ?? 0n));
  }

  return {
    state,
    errors,
    selectedMarketExists: (markets?.markets ?? []).length > 0,
    isLoadingSelectedMarket,
    autoInitialPrice,
    balance,
    balanceUsd,
    requiresAllowance: state.requiresAllowance,
    isApproving: mutApprove.isPending,
    isApproved: mutApprove.isSuccess,
    isCreating: mutCreateLiquidity.isPending,
    isCreated: mutCreateLiquidity.isSuccess,
    setState,
    onTokenSelect,
    handleCreateLiquidity,
    validate,
    hasErrors,
    isReady,
    handleApprove,
  };
}
