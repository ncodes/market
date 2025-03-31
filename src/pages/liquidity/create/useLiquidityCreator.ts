import { TokenList, TokenLists } from "@jointlabs/meta";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { isAddress } from "viem";
import { z } from "zod";
import { Operator } from "../../../constants";
import { useConnectorContext } from "../../../hooks/connectors/useConnectorContext";
import { useMarketService } from "../../../hooks/services/backend/useMarketService";
import { getRandomSeed } from "../../../libs/utils";

export type LiquidityCreatorState = {
  baseToken?: TokenList.Token;
  quoteToken?: TokenList.Token;
  isLoading: boolean;
  autoPrice: boolean;
  pause: boolean;
  amount?: string;
  price?: string;
  target?: string;
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
  })
  .refine((data) => data.autoPrice || (data.price && data.price.length > 0), {
    message: "Price is required",
    path: ["price"],
  });

/**
 * Hook for the Liquidity Creator
 * @returns Liquidity Creator State and Functions
 */
export default function useLiquidityCreator() {
  const [state, setState] = useState<LiquidityCreatorState>(defaultState);
  const { chainInfo } = useConnectorContext();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { listMarkets } = useMarketService();
  // const { createMarket, createMarketWithManager, humanizeErrors } = useMarketContract();

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
    // enabled: !!state.baseToken?.address && !!state.quoteToken?.address && !!chainInfo,
    enabled: false,
  });

  const mutCreateLiquidity = useMutation({
    mutationFn: async (_params: {
      baseAddress: `0x${string}`;
      quoteAddress: `0x${string}`;
      baseType: number;
      quoteType: number;
      permSwap: boolean;
      permPut: boolean;
      commission: number;
      poolId: number;
      manager?: string;
    }) => {
      // if (!params.manager) {
      //   return createMarket(
      //     params.baseAddress,
      //     params.quoteAddress,
      //     params.baseType,
      //     params.quoteType,
      //     params.permSwap,
      //     params.permPut,
      //     params.commission,
      //     params.poolId,
      //   );
      // } else {
      //   return createMarketWithManager(
      //     params.baseAddress,
      //     params.quoteAddress,
      //     params.baseType,
      //     params.quoteType,
      //     params.permSwap,
      //     params.permPut,
      //     params.commission,
      //     params.poolId,
      //     params.manager,
      //   );
      // }
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

  //
  // useEffect(() => {
  //   if (state.amount == undefined) return;
  //   console.log("amount", state.amount == "");
  //   validate("amount");
  // }, [state.amount]);

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

  function validate(field: string) {
    const result = schema.safeParse(state);
    const errs = !result.success ? result.error.flatten().fieldErrors : {};
    if (!field) {
      setErrors(errs);
    } else {
      setErrors({ ...errors, [field]: (errs as Record<string, string[]>)[field] });
    }
  }

  async function handleCreateLiquidity() {
    if (!state.baseToken || !state.quoteToken) return null;

    // try {
    //   await switchNetwork(selectedChain.chainId);

    //   const [, txReceipt] = await mutCreateLiquidity.mutateAsync({
    //     baseAddress: state.baseToken?.address as `0x${string}`,
    //     quoteAddress: state.quoteToken?.address as `0x${string}`,
    //     baseType: tokenTypeToAssetType(state.baseToken.type!),
    //     quoteType: tokenTypeToAssetType(state.quoteToken.type!),
    //     permSwap: state.permSwap,
    //     permPut: state.permPut,
    //     commission: state.commission || 0,
    //     poolId: 0,
    //     manager: state.marketManager,
    //   });

    //   const event = decodeEventLog({
    //     abi: getChainInfo().contracts?.marketCore?.abi,
    //     data: txReceipt.logs[0].data,
    //     topics: txReceipt.logs[0].topics,
    //   }) as { args: { id: string } };

    //   toast.success("Market Created", { description: "Your market was created successfully", position: "top-right" });

    //   const tokenLists = TokenLists[defaultChain.queryName];
    //   const eth = tokenLists.tokens.find((token) => token.symbol === "ETH");
    //   const join = tokenLists.tokens.find((token) => token.symbol === "JOIN");

    //   setState((prev) => ({
    //     ...prev,
    //     baseToken: eth,
    //     quoteToken: join,
    //     commission: 0,
    //     marketManager: undefined,
    //     permPut: false,
    //     permSwap: false,
    //   }));

    //   return event.args.id;
    // } catch (error) {
    //   const msg = humanizeErrors(error);
    //   toast.error("Market Creation Error", { description: msg, position: "top-right" });
    //   logError(error);

    //   return null;
    // }
  }

  return {
    setState,
    onTokenSelect,
    handleCreateLiquidity,
    validate,
    state,
    errors,
    mutCreateLiquidity,
    selectedMarketExists: (markets?.markets ?? []).length > 0,
    isLoadingSelectedMarket,
  };
}
