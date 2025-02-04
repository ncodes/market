import { SearchBar } from "@/components/SearchBar";
import { ConnectButton } from "../../hooks/connectors/components/ConnectButton";
import Logo from "../icons/Logo";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { CustomNavigationMenu } from "./CustomNavigationMenu";
import RegionSelectorButton from "./RegionSelectorButton";
import SettingsButton from "./SettingsButton";

export interface MenuItem {
  title: string;
  url?: string;
  children: { title: string; url: string }[];
}

const MenuItems: MenuItem[] = [
  {
    title: "Swap",
    url: "#",
    children: [],
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

export function Header() {
  function onNavChange() {
    setTimeout(() => {
      const triggers = document.querySelectorAll('.submenu-trigger[data-state="open"]');
      if (triggers.length === 0) return;

      const firstTrigger = triggers[0] as HTMLElement;

      document.documentElement.style.setProperty("--menu-left-position", `${firstTrigger.offsetLeft}px`);
    });
  }

  return (
    <header className="relative flex select-none items-center justify-between p-4">
      <div className="relative -mt-3 flex items-center space-x-4">
        <Logo />
        <nav className="relative -top-0.5 left-2 flex text-sm font-normal tracking-wider">
          <NavigationMenu
            onValueChange={onNavChange}
            viewportClassName={"rounded-xl border border-eerie-black bg-chinese-black tracking-wider"}
          >
            <NavigationMenuList className="gap-3">
              {MenuItems.map((menuItem) => (
                <CustomNavigationMenu menuItem={menuItem} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>

      <SearchBar />
      <div className="relative -top-1 flex items-center space-x-3">
        <RegionSelectorButton />
        <SettingsButton />
        <ConnectButton />
      </div>
    </header>
  );
}
