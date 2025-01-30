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
      { title: "Item 1", url: "#" },
      { title: "Item 2", url: "#" },
    ],
  },
  {
    title: "Liquidity",
    url: "#",
    children: [
      { title: "Item 1", url: "#" },
      { title: "Item 2", url: "#" },
    ],
  },
  {
    title: "Explore",
    url: "#",
    children: [
      { title: "Item 1", url: "#" },
      { title: "Item 2", url: "#" },
    ],
  },
];
