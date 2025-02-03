import { SearchBar } from "@/components/SearchBar";
import { MENU_ITEMS } from "@/libs/menu.ts";
import { ConnectButton } from "../../hooks/connectors/components/ConnectButton";
import Logo from "../icons/Logo";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import { CustomNavigationMenu } from "./CustomNavigationMenu";
import RegionSelectorButton from "./RegionButton";
import SettingsButton from "./SettingsButton";

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
        <div className="flex gap-1">
          <Logo />
        </div>
        <nav className="relative left-2 flex text-sm font-normal tracking-wider">
          <NavigationMenu
            onValueChange={onNavChange}
            viewportClassName={
              "rounded-xl border border-gray-700/40 bg-gradient-to-b from-eerie-black to-onyx tracking-wider"
            }
          >
            <NavigationMenuList>
              {MENU_ITEMS.map((menuItem) => (
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
