import { TokenList, TokenLists } from "@jointlabs/meta";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { decodeEventLog, isAddress } from "viem";
import { z } from "zod";
import { useConnectorContext } from "../../../hooks/connectors/useConnectorContext";
import useMarketContract from "../../../hooks/services/contracts/useMarketContract";
import { logError } from "../../../libs/helpers";
import { AssetType } from "../../../types/enums";
import { DrawerCallerInstruction, DrawerContentType } from "../components/Drawer";
type MarketCreatorState = {
  drawer: DrawerCallerInstruction;
  baseToken?: TokenList.Token;
  quoteToken?: TokenList.Token;
  advancedSettingsOpen: boolean;
  commission?: number;
  marketManager: string;
  confirmed: boolean;
};

// Default State
const defaultState: MarketCreatorState = {
  drawer: {
    open: false,
    content: undefined,
    meta: {},
    onSelect: undefined,
  },
  baseToken: undefined,
  quoteToken: undefined,
  advancedSettingsOpen: false,
  commission: undefined,
  marketManager: "",
  confirmed: false,
};

const schema = z.object({
  commission: z.optional(z.number().min(0).max(100, { message: "Commission must be between 0 and 100" })),
  marketManager: z.optional(z.string()).refine((val) => val === "" || isAddress(val as string), {
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
  const [state, setState] = useState<MarketCreatorState>({ ...defaultState, drawer: { ...defaultState.drawer } });
  const { chainInfo, getChainInfo } = useConnectorContext();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { createMarket, createMarketWithManager, humanizeErrors } = useMarketContract();

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
      manager: string;
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
    if (!chainInfo) return;
    const tokenLists = TokenLists[chainInfo.queryName];
    const eth = tokenLists.tokens.find((token) => token.symbol === "ETH");
    const join = tokenLists.tokens.find((token) => token.symbol === "JOIN");
    setState((prev) => ({
      ...prev,
      baseToken: eth,
      quoteToken: join,
      drawer: {
        ...prev.drawer,
        meta: {
          ...prev.drawer.meta,
          baseSelected: eth,
          quoteSelected: join,
        },
      },
    }));
  }, [chainInfo]);

  /**
   * Function to handle the selection of a token
   * @param token - The token that was selected
   * @param meta - The metadata of the selected token
   */
  function onTokenSelect(token: any, meta: Record<string, any>) {
    if (meta.base) {
      setState((prev) => ({
        ...prev,
        baseToken: token,
        drawer: {
          ...prev.drawer,
          meta: { ...prev.drawer.meta, baseSelected: token },
        },
      }));
    } else {
      setState((prev) => ({
        ...prev,
        quoteToken: token,
        drawer: {
          ...prev.drawer,
          meta: {
            ...prev.drawer.meta,
            quoteSelected: token,
          },
        },
      }));
    }
  }

  function openDrawer(contentType: DrawerContentType, meta: Record<string, any>, transparent?: boolean) {
    setState((prev) => ({
      ...prev,
      drawer: {
        ...prev.drawer,
        open: true,
        content: contentType,
        meta,
        transparent,
      },
    }));
  }

  /**
   * onConfirm handles the confirmation of the market creation
   */
  async function onConfirm() {
    if (!state.baseToken || !state.quoteToken) return;

    try {
      setState((prev) => ({ ...prev, confirmed: true }));

      const [, txReceipt] = await mutCreateMarket.mutateAsync({
        baseAddress: state.baseToken?.address as `0x${string}`,
        quoteAddress: state.quoteToken?.address as `0x${string}`,
        baseType: tokenTypeToAssetType(state.baseToken.type!),
        quoteType: tokenTypeToAssetType(state.quoteToken.type!),
        permSwap: false,
        permPut: false,
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

      setTimeout(() => {
        openDrawer("successfulMarketCreation", { marketId: event.args.id }, true);
      }, 100);

      setState((prev) => ({ ...prev, commission: undefined, marketManager: "", confirmed: false }));
    } catch (error) {
      const msg = humanizeErrors(error);
      toast.error("Market Creation Error", { description: msg, position: "top-right" });
      logError(error);
    }
  }

  return { state, setState, onTokenSelect, errors, onConfirm, mutCreateMarket, openDrawer };
}
