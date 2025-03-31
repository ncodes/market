import { useConnectorContext } from "@/hooks/connectors/useConnectorContext";
import useCoreContract from "@/hooks/services/contracts/useCoreContract";
import { useBaseQuoteRate } from "@/hooks/useBaseQuoteRate";
import { logError } from "@/libs/helpers";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Address } from 'viem';

export type LiquidityCreatorState = {
    amount?: string;
    price?: string;
    minSwap?: string;
    maxSwap?: string;
    target?: string;
    paymentTime?: string;
    paused: number;
}

const defaultState: LiquidityCreatorState = {
    amount: undefined,
    price: undefined,
    minSwap: undefined,
    maxSwap: undefined,
    target: undefined,
    paused: 0,
};

export default function useLiquidityCreatorLogic(market: Market) {
    const [state, setState] = useState(defaultState);
    const { getTokenBalance, address } = useConnectorContext();
    const [baseAssetBalance, setBaseAssetBalance] = useState(0n);
    const { baseUsdRate, quoteUsdRate } = useBaseQuoteRate(market, true, true);
    const [selectedMarket, setSelectedMarket] = useState(market);
    const { updateFungibleLiquidity, humanizeErrors } = useCoreContract();
    const [isAdding, setAdding] = useState(false);

    useEffect(() => {
        (async () => {
            const bal = await getTokenBalance(selectedMarket.baseAddress, address);
            setBaseAssetBalance(bal);
        })();
    }, [selectedMarket]);

    /**
     * Function to handle the selection of a token
     * @param token - The token that was selected
     * @param meta - The metadata of the selected token
     */
    function onTokenSelect(token: any, meta: Record<string, any>) {

    }

    async function addLiquidity() {
        try {
            setAdding(true);

            await updateFungibleLiquidity(
                market.address,
                100000,
                false,
                state.target as Address,
                state.amount!,
                state.price!,
                [],
                [],
                [state.minSwap!, state.maxSwap!, state.paymentTime!, 0, state.paused],
            );

            toast.success("Liquidity successfully added", { description: "Your request to add liquidity was successful", position: "top-right" });


        } catch (error) {
            const msg = humanizeErrors(error);
            toast.error("Liquidity Creation Error", { description: msg, position: "top-right" });
            logError(error);
        } finally {
            setAdding(false);
        }
    }

    return { baseAssetBalance, baseUsdRate, quoteUsdRate, selectedMarket, isAdding, state, onTokenSelect };
}
