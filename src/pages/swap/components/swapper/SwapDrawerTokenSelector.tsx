import { Avatar } from "@/components/avatar/Avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useConnectorContext } from "@/hooks/connectors/useConnectorContext.tsx";
import { TokenList } from "@jointlabs/meta";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { GlobeIcon, SearchIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useOnClickOutside } from "usehooks-ts";
import { SwapSide } from "./types";

const defaultState: {
  tokenListsPages: TokenList.Token[][];
  page: number;
  searchQuery?: string;
} = {
  tokenListsPages: [],
  page: 0,
  searchQuery: "",
};

export function SwapDrawerTokenSelector({
  tokenLists,
  drawerRef,
  selectedToken,
  side,
  containerHeight,
  closeRequested,
  onSelect,
}: {
  drawerRef: React.RefObject<HTMLDivElement>;
  tokenLists: TokenList.TokenData;
  selectedToken?: { sell?: TokenList.Token; buy?: TokenList.Token };
  side?: SwapSide;
  containerHeight?: number;
  closeRequested?: () => void;
  onSelect?: (token: TokenList.Token) => void;
}) {
  const { chainInfo } = useConnectorContext();
  const [state, setState] = useState(defaultState);
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: listRef });

  useOnClickOutside(drawerRef, () => {
    closeRequested?.();
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, mounted: true }));
  }, []);

  useEffect(() => {
    setState((prev) => ({ ...prev, tokenListsPages: paginate(tokenLists.tokens) }));
  }, [tokenLists]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.9) {
      setState((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  });

  useEffect(() => {
    findTokens(state.searchQuery || "");
  }, [state.searchQuery]);

  function paginate(tokenLists: TokenList.Token[], limit = 10) {
    const pages: TokenList.Token[][] = [];
    for (let i = 0; i < tokenLists.length; i += limit) {
      pages.push(tokenLists.slice(i, i + limit));
    }
    return pages;
  }

  function isSelected(token: TokenList.Token) {
    const { buy, sell } = selectedToken || {};
    const { address, symbol } = token;
    if (side == "Buy") return buy?.address === token.address && buy?.symbol === symbol;
    return sell?.address === address && sell?.symbol === symbol;
  }

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

  return (
    <div className="relative m-0 rounded-3xl py-4 pb-0">
      <div>
        <h2 className="mb-4 flex items-center justify-between px-4 font-medium tracking-wider text-white">
          <span>Select a token</span>
          <span>
            <Button
              variant="ghost"
              className="h-auto p-0"
              onClick={() => {
                closeRequested?.();
              }}
            >
              <XIcon className="h-5 w-5 cursor-pointer text-white opacity-30 transition-all duration-300 hover:opacity-100" />
            </Button>
          </span>
        </h2>

        <div className="relative mb-4 flex px-4">
          <SearchIcon className="absolute left-7 top-4 h-5 w-5 text-[#6b6b6b]" />
          <input
            type="text"
            placeholder="Search by name, ticker or address"
            className="w-full rounded-full bg-baltic-sea px-4 py-3 pl-10 text-lg font-medium text-white placeholder:text-[#6b6b6b] focus:outline-none"
            value={state.searchQuery}
            onChange={(e) => {
              setState((prev) => ({ ...prev, searchQuery: e.target.value }));
            }}
          />
        </div>
      </div>

      <div
        ref={listRef}
        className="min-h-[200px] w-full overflow-auto"
        style={{ maxHeight: containerHeight! * 0.6 + "px" }}
      >
        <ul className="pb-2">
          {getPage(state.page).map((token) => (
            <TokenItem
              key={token.name + "_" + token.address}
              token={token}
              blockExplorer={chainInfo?.blockExplorer}
              isSelected={isSelected(token)}
              onClick={(token: TokenList.Token) => {
                onSelect?.(token);
                closeRequested?.();
              }}
            />
          ))}
        </ul>
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
    <li className="mx-2 flex cursor-pointer items-center justify-between rounded-3xl px-2 py-2 pr-4 transition-all duration-300 hover:scale-[1.01] hover:bg-baltic-sea/50 hover:text-white">
      <Button
        onClick={() => {
          onClick?.(token);
        }}
        variant="ghost"
        className="m-0 flex flex-1 items-center justify-start space-x-3 rounded-none p-0 hover:bg-transparent"
      >
        <Avatar
          src={token.logoURI as string}
          fallback={token.symbol}
          fallbackClassName="w-10 h-10"
          className="h-10 w-10"
        />
        <div className="flex space-x-2 text-white">
          <span className="font-bold">{token.name}</span> <span className="text-[#6b6b6b]">{token.symbol}</span>
        </div>
      </Button>
      {!token.native && (
        <Link to={`${blockExplorer}/token/${token.address}`} className="opacity-90 hover:opacity-100" target="_blank">
          <GlobeIcon className="h-4 w-4 text-[#6b6b6b]" />
        </Link>
      )}
    </li>
  );
}
