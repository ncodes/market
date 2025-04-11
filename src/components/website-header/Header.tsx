import { ConnectButton } from "../../hooks/connectors/components/ConnectButton";
import Logo from "../icons/Logo";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { CustomNavigationMenu } from "./CustomNavigationMenu";
import MobileHeader from "./MobileHeader";
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
    title: "Liquidity",
    url: "#",
    children: [],
  },
  {
    title: "Explore",
    url: "#",
    children: [],
  },
  {
    title: "Markets",
    url: "#",
    children: [],
  },
];

export function WebsiteHeader() {
  function onNavChange() {
    setTimeout(() => {
      const triggers = document.querySelectorAll('.submenu-trigger[data-state="open"]');
      if (triggers.length === 0) return;

      const firstTrigger = triggers[0] as HTMLElement;

      document.documentElement.style.setProperty("--menu-left-position", `${firstTrigger.offsetLeft}px`);
    });
  }

  return (
    <header className="relative flex w-full select-none items-center p-4 justify-between md:justify-normal">
      <div className="hidden w-1/3 md:flex">
        <Logo />
      </div>
      <MobileHeader />

      <div className="flex w-fit md:w-1/3 justify-center">
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

      <div className="flex w-1/3 justify-end">
        <div className="relative -top-1 flex w-fit items-center space-x-3">
          <RegionSelectorButton />
          <SettingsButton />
          <div className="flex lg:hidden">
            <ConnectButton hideTextOnMobile className="h-11 w-11 p-0" />
          </div>
          <div className="hidden lg:flex">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}
