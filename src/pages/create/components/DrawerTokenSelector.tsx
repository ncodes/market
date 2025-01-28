import { Button } from "@/components/ui/button.tsx";
import { ChainNames, TokenList, TokenLists } from "@jointlabs/meta";
import { useQuery } from "@tanstack/react-query";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { AlertOctagon, GlobeIcon, SearchIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useOnClickOutside } from "usehooks-ts";
import { isAddress } from "viem";
import { Avatar } from "../../../components/avatar/Avatar";
import { ToolTip } from "../../../components/ToolTip";
import { useConnectorContext } from "../../../hooks/connectors/useConnectorContext";
import { useMiscService } from "../../../hooks/services/backend/useMiscService";

const defaultState: {
  tokenListsPages: TokenList.Token[][];
  page: number;
  searchQuery?: string;
} = {
  tokenListsPages: [],
  page: 0,
  searchQuery: "",
};

export function DrawerTokenSelector({
  drawerRef,
  drawerMeta,
  containerHeight,
  closeRequested,
  onSelect,
}: {
  drawerRef: React.RefObject<HTMLDivElement>;
  drawerMeta: { base: boolean; baseSelected: TokenList.Token; quoteSelected: TokenList.Token };
  containerHeight?: number;
  closeRequested?: () => void;
  onSelect?: (token: TokenList.Token) => void;
}) {
  const [state, setState] = useState({ ...defaultState });
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: listRef });
  const { chainInfo, getTokenName, getTokenSymbol, getTokenDecimals } = useConnectorContext();
  const tokenLists = TokenLists[chainInfo?.queryName as ChainNames];
  const selected = drawerMeta[drawerMeta.base ? "baseSelected" : "quoteSelected"];
  const { getTokenInfo } = useMiscService();
  const page = getPage(state.page);
  const isAddressButUnlisted = !!state.searchQuery && isAddress(state.searchQuery) && page.length == 0;

  useOnClickOutside(drawerRef, () => {
    closeRequested?.();
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, mounted: true }));
  }, []);

  // Break down the token list into pages
  useEffect(() => {
    setState((prev) => ({ ...prev, tokenListsPages: paginate(tokenLists.tokens) }));
  }, [tokenLists]);

  // Update page number when scrolling down
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.9) {
      setState((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  });

  // Search for a token by name, ticker or address
  useEffect(() => {
    findTokens(state.searchQuery || "");
  }, [state.searchQuery]);

  // Query info of an unlisted token address
  const qryUnlistedTokenInfo = useQuery({
    queryKey: ["queryUnlistedTokenInfo", { network: "ethereum", address: state.searchQuery! }],
    queryFn: getTokenInfo,
    enabled: isAddressButUnlisted,
  });

  /**
   * Break down the token list into pages
   * @param tokenLists - The token list to paginate
   * @param limit - The number of tokens per page
   * @returns The token list broken down into pages
   */
  function paginate(tokenLists: TokenList.Token[], limit = 10) {
    const pages: TokenList.Token[][] = [];
    for (let i = 0; i < tokenLists.length; i += limit) {
      pages.push(tokenLists.slice(i, i + limit));
    }
    return pages;
  }

  /**
   * Get page by number
   * @param page - The page number to get
   * @returns The page of tokens
   */
  function getPage(page: number) {
    if (state.tokenListsPages.length == 0) return [];

    if (page >= state.tokenListsPages.length) {
      page = state.tokenListsPages.length - 1;
    }

    const pages: TokenList.Token[] = [];
    for (let i = 0; i <= page; i++) {
      pages.push(...state.tokenListsPages[i]);
    }

    return pages;
  }

  /**
   * Find tokens by name, ticker or address from the tokens list
   * @param query - The query to search for
   * @returns The tokens found
   */
  function findTokens(query: string) {
    query = query.trim();
    const result: TokenList.Token[] = [];
    for (let i = 0; i < tokenLists.tokens.length; i++) {
      const token = tokenLists.tokens[i];
      if (token.name!.toLowerCase().includes(query.toLowerCase())) {
        result.push(token);
      } else if (token.symbol!.toLowerCase().includes(query.toLowerCase())) {
        result.push(token);
      } else if (token.address!.toLowerCase().includes(query.toLowerCase())) {
        result.push(token);
      }
    }
    setState((prev) => ({ ...prev, tokenListsPages: paginate(result), page: 0 }));
  }

  /**
   * Find token info from a contract address
   * @param address - The address to search for
   */
  async function findTokenFromContract(address: string) {
    try {
      const name = await getTokenName(address);
      const symbol = await getTokenSymbol(address);
      const decimals = await getTokenDecimals(address);
      onSelect?.({
        type: "ERC20",
        address,
        name,
        symbol,
        decimals,
        logoURI: "https://files.joint.exchange/images/unknown.png",
      });
      closeRequested?.();
    } catch (error) {
      toast.error("Unable to fetch token info", { position: "top-right" });
    }
  }

  return (
    <div className="max-w-[650px] rounded-3xl py-2 pb-0">
      <div>
        <h2 className="mb-2 flex items-center justify-between px-4 font-medium tracking-wider text-white">
          <span>Select a token</span>
          <span>
            <Button
              variant="link"
              className="h-auto p-0"
              onClick={() => {
                closeRequested?.();
              }}
            >
              <XIcon className="h-5 w-5 cursor-pointer text-white opacity-30 transition-all duration-300 hover:opacity-100" />
            </Button>
          </span>
        </h2>

        <div className="relative mb-2 flex px-4">
          <SearchIcon className="absolute left-6 top-2.5 h-5 w-5 text-[#6b6b6b]" />
          <input
            type="text"
            placeholder="Search by name, ticker or paste an address"
            className="w-full rounded-full bg-baltic-sea px-4 py-2.5 pl-9 text-sm font-medium text-white placeholder:text-[#6b6b6b] focus:outline-none"
            value={state.searchQuery}
            onChange={(e) => {
              setState((prev) => ({ ...prev, searchQuery: e.target.value }));
            }}
          />
        </div>
      </div>

      <div
        ref={listRef}
        className="h-[300px] w-full overflow-auto"
        style={{ maxHeight: containerHeight! * 0.6 + "px" }}
      >
        {page.length > 0 ? (
          <ul className="pb-2">
            {page.map((token) => (
              <TokenItem
                key={token.name + "_" + token.address}
                token={token}
                blockExplorer={chainInfo?.blockExplorer}
                isSelected={selected?.address === token.address && selected?.symbol === token.symbol}
                onClick={(token: TokenList.Token) => {
                  onSelect?.(token);
                  closeRequested?.();
                }}
              />
            ))}
          </ul>
        ) : (
          <>
            {!isAddressButUnlisted && (
              <div className="flex h-full items-center justify-center">
                <span className="text-sm text-boulder">Token not found</span>
              </div>
            )}
            {isAddressButUnlisted && (
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <span className="text-sm text-boulder">Token not found in our managed lists</span>
                <Button
                  variant="link"
                  className="h-auto gap-1 rounded-2xl p-0 text-light-green"
                  onClick={() => {
                    if (qryUnlistedTokenInfo.data) {
                      onSelect?.({
                        type: qryUnlistedTokenInfo.data?.type,
                        asset: qryUnlistedTokenInfo.data?.asset,
                        address: qryUnlistedTokenInfo.data?.address,
                        name: qryUnlistedTokenInfo.data?.name,
                        symbol: qryUnlistedTokenInfo.data?.symbol,
                        logoURI: qryUnlistedTokenInfo.data?.logoURI,
                        decimals: qryUnlistedTokenInfo.data?.decimals,
                      } as TokenList.Token);
                      closeRequested?.();
                    } else {
                      findTokenFromContract(state.searchQuery!);
                    }
                  }}
                >
                  Add
                  <ToolTip tip="Tokens that are not part of our managed list maybe unsafe and harmful.">
                    <AlertOctagon className="h-3 w-3" />
                  </ToolTip>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function TokenItem({
  token,
  blockExplorer,
  isSelected,
  onClick,
}: {
  token: TokenList.Token;
  blockExplorer?: string;
  isSelected?: boolean;
  onClick?: (token: TokenList.Token) => void;
}) {
  if (isSelected) return;

  return (
    <li className="bg-red-400x mx-2 flex cursor-pointer items-center justify-between rounded-3xl px-2 py-0 pr-4 transition-all duration-300 hover:scale-[1.01] hover:bg-baltic-sea/50 hover:text-white">
      <Button
        onClick={() => {
          onClick?.(token);
        }}
        variant="ghost"
        className="m-0 flex flex-1 items-center justify-start space-x-3 rounded-none p-0 hover:bg-transparent"
      >
        <Avatar src={token.logoURI as string} fallback={token.symbol} fallbackClassName="w-7 h-7" className="h-7 w-7" />
        <div className="flex space-x-2 text-xs text-white">
          <span className="font-bold">{token.name}</span> <span className="text-[#6b6b6b]">{token.symbol}</span>
        </div>
      </Button>
      {!token.native && (
        <Link to={`${blockExplorer}/token/${token.address}`} className="opacity-90 hover:opacity-100" target="_blank">
          <GlobeIcon className="h-3 w-3 text-[#6b6b6b]" />
        </Link>
      )}
    </li>
  );
}
