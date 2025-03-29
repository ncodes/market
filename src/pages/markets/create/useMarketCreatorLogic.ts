import { useConnectorContext } from "@/hooks/connectors/useConnectorContext";
import useMarketContract from "@/hooks/services/contracts/useMarketContract";
import useStore from "@/hooks/store/useStore";
import { logError } from "@/libs/helpers";
import { defaultChain } from "@/libs/utils";
import { AssetType } from "@/types/enums";
import { TokenList, TokenLists } from "@jointlabs/meta";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { decodeEventLog, isAddress } from "viem";
import { z } from "zod";

export type MarketCreatorState = {
  baseToken?: TokenList.Token;
  quoteToken?: TokenList.Token;
  commission: number;
  permPut: boolean;
  permSwap: boolean;
  isLoading: boolean;
  mediatorPool?: MediatorPool;
  marketManager?: string;
};

// Default State
const defaultState: MarketCreatorState = {
  baseToken: undefined,
  quoteToken: undefined,
  commission: 0,
  permPut: false,
  permSwap: false,
  isLoading: false,
};

const schema = z.object({
  commission: z.optional(z.number().min(0).max(100, { message: "Commission must be between 0 and 100" })),
  marketManager: z.optional(z.string()).refine((val) => val === "" || val === undefined || isAddress(val as string), {
    message: "Invalid market manager address",
  }),
});

function tokenTypeToAssetType(type: string) {
  switch (type) {
    case "ERC20":
      return AssetType.ERC20;
    case "ERC721":
      return AssetType.ERC721;
    case "ERC1155":
      return AssetType.ERC1155;
    default:
      return AssetType.NATIVE;
  }
}

/**
 * Hook for the Market Creator
 * @returns Market Creator State and Functions
 */
export default function useMarketCreatorLogic() {
  const [state, setState] = useState<MarketCreatorState>(defaultState);
  const { getChainInfo, switchNetwork } = useConnectorContext();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { createMarket, createMarketWithManager, humanizeErrors } = useMarketContract();
  const { selectedChain } = useStore();

  const mutCreateMarket = useMutation({
    mutationFn: async (params: {
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
      if (!params.manager) {
        return createMarket(
          params.baseAddress,
          params.quoteAddress,
          params.baseType,
          params.quoteType,
          params.permSwap,
          params.permPut,
          params.commission,
          params.poolId,
        );
      } else {
        return createMarketWithManager(
          params.baseAddress,
          params.quoteAddress,
          params.baseType,
          params.quoteType,
          params.permSwap,
          params.permPut,
          params.commission,
          params.poolId,
          params.manager,
        );
      }
    },
  });

  // Validate form fields
  useEffect(() => {
    const result = schema.safeParse(state);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
    } else {
      setErrors({});
    }
  }, [state.commission, state.marketManager]);

  // Set the default base and quote tokens
  useEffect(() => {
    if (!defaultChain) return;

    const tokenLists = TokenLists[defaultChain.queryName];
    const eth = tokenLists.tokens.find((token) => token.symbol === "ETH");
    const join = tokenLists.tokens.find((token) => token.symbol === "JOIN");

    setState((prev) => ({
      ...prev,
      baseToken: eth,
      quoteToken: join,
    }));
  }, [defaultChain]);

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
   * Function to set commission
   * @param value - The commission value to be set
   */
  function setCommission(value: number) {
    setState((prev) => ({
      ...prev,
      commission: value,
    }));
  }

  /**
   * handleCreateMarket handles the confirmation of the market creation
   */
  async function handleCreateMarket() {
    if (!state.baseToken || !state.quoteToken) return null;

    try {
      await switchNetwork(selectedChain.chainId);

      const [, txReceipt] = await mutCreateMarket.mutateAsync({
        baseAddress: state.baseToken?.address as `0x${string}`,
        quoteAddress: state.quoteToken?.address as `0x${string}`,
        baseType: tokenTypeToAssetType(state.baseToken.type!),
        quoteType: tokenTypeToAssetType(state.quoteToken.type!),
        permSwap: state.permSwap,
        permPut: state.permPut,
        commission: state.commission || 0,
        poolId: 0,
        manager: state.marketManager,
      });

      const event = decodeEventLog({
        abi: getChainInfo().contracts?.marketCore?.abi,
        data: txReceipt.logs[0].data,
        topics: txReceipt.logs[0].topics,
      }) as { args: { id: string } };

      toast.success("Market Created", { description: "Your market was created successfully", position: "top-right" });

      const tokenLists = TokenLists[defaultChain.queryName];
      const eth = tokenLists.tokens.find((token) => token.symbol === "ETH");
      const join = tokenLists.tokens.find((token) => token.symbol === "JOIN");

      setState((prev) => ({
        ...prev,
        baseToken: eth,
        quoteToken: join,
        commission: 0,
        marketManager: undefined,
        permPut: false,
        permSwap: false,
      }));

      return event.args.id;
    } catch (error) {
      const msg = humanizeErrors(error);
      toast.error("Market Creation Error", { description: msg, position: "top-right" });
      logError(error);

      return null;
    }
  }

  return { state, setState, onTokenSelect, errors, handleCreateMarket, mutCreateMarket, setCommission };
}
