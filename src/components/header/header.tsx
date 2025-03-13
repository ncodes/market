import { SearchBar } from "@/components/SearchBar";
import { ConnectButton } from "../../hooks/connectors/components/ConnectButton";
import Logo from "../icons/Logo";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { CustomNavigationMenu } from "./CustomNavigationMenu";
import RegionSelectorButton from "./RegionSelectorButton";
import SettingsButton from "./SettingsButton";
import Icon3Dots from "../icons/Icon3Dots";
import { Button } from "../ui/button";
import MobileHeader from "./MobileHeader";
import { IconSearch } from "../icons/IconSearch";
import { Search } from "lucide-react";

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
  return (
    <header className="relative flex w-full select-none items-center justify-between p-4">
      <DesktopViewHeader />
      <MobileHeader />

      <SearchBar />
      <div className="relative -top-1 flex w-fit items-center space-x-3">
        <div className="xl:hidden flex">
          <Button
            variant={"ghost"}
            className="flex !h-11 !w-11 cursor-pointer items-center justify-center rounded-full bg-chinese-black p-0 transition-all duration-500 hover:bg-raisin-black"
          >
            <Search />
          </Button>
        </div>
        <RegionSelectorButton />
        <div className="hidden lg:flex">
          <SettingsButton />
        </div>
        <div className="flex lg:hidden">
          <Button
            variant={"ghost"}
            className="flex !h-11 !w-11 cursor-pointer items-center justify-center rounded-full bg-chinese-black p-0 transition-all duration-500 hover:bg-raisin-black"
          >
            <Icon3Dots className="rotate-90" />
          </Button>
        </div>
        <div className="flex lg:hidden">
          <ConnectButton hideTextOnMobile className="h-11 w-11 p-0" />
        </div>
        <div className="hidden lg:flex">
          <ConnectButton />
        </div>
      </div>
    </header>
  );
}

function DesktopViewHeader() {
  function onNavChange() {
    setTimeout(() => {
      const triggers = document.querySelectorAll('.submenu-trigger[data-state="open"]');
      if (triggers.length === 0) return;

      const firstTrigger = triggers[0] as HTMLElement;

      document.documentElement.style.setProperty("--menu-left-position", `${firstTrigger.offsetLeft}px`);
    });
  }

  return (
    <div className="relative -mt-3 hidden items-center space-x-4 md:flex">
      <Logo />
      <nav className="relative -top-0.5 left-2 hidden text-sm font-normal tracking-wider md:flex">
        <NavigationMenu
          onValueChange={onNavChange}
          viewportClassName={"rounded-xl border border-eerie-black bg-chinese-black tracking-wider"}
        >
          <NavigationMenuList className="gap-3">
            {MenuItems.map((menuItem, index) => (
              <CustomNavigationMenu key={index} menuItem={menuItem} />
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}
