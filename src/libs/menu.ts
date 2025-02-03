import { AfrikaansIcon, EnglishIcon, FrenchIcon, GermanIcon } from "@/assets";

export interface MenuItem {
  title: string;
  url?: string;
  children: { title: string; url: string }[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    title: "Trade",
    url: "#",
    children: [
      { title: "Swap", url: "#" },
      { title: "Pay", url: "#" },
    ],
  },
  {
    title: "Explore",
    url: "#",
    children: [
      { title: "Markets", url: "#" },
      { title: "Liquidity", url: "#" },
      { title: "Tokens", url: "#" },
      { title: "Transactions", url: "#" },
    ],
  },
  {
    title: "Liquidity",
    url: "#",
    children: [
      { title: "Create", url: "#" },
      { title: "My Liquidity", url: "#" },
    ],
  },
];

export const REGIONS = [
  { name: "English", image: EnglishIcon },
  { name: "Afrikaans", image: AfrikaansIcon },
  { name: "French", image: FrenchIcon },
  { name: "German", image: GermanIcon },
];
