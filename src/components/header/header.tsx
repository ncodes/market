<<<<<<< HEAD
import { SearchBar } from "@/components/SearchBar.tsx";
import { Link } from "react-router-dom";
=======
import { SearchBar } from "@/components/searchBar.tsx";
>>>>>>> 49c4381 (updated header and setup wallet connect popup)
import { ConnectButton } from "../../hooks/connectors/components/ConnectButton.tsx";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu.tsx";
import Logo from "../icons/Logo.tsx";
import CombinedShape from "../icons/CombinedShape.tsx";
import { MENU_ITEMS } from "@/libs/menu.ts";
import { CustomNavigationMenu } from "./CustomNavigationMenu.tsx";
import IconMore from "../icons/IconMore.tsx";
import { Button } from "../ui/button.tsx";
import IconDropDown from "../icons/IconDropDown.tsx";

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
      <div className="relative flex items-center space-x-4">
        <div className="flex gap-1">
          <CombinedShape />
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
        <Button variant={"gray"} className="bg-gray-800 px-2 py-2">
          <span className="text-2xl">🇬🇧</span>
          <IconDropDown />
        </Button>
        <div className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-800">
          <IconMore />
        </div>
        <ConnectButton title="Connect" />
      </div>
    </header>
  );
}
