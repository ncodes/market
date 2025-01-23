import { SearchBar } from "@/components/searchBar.tsx";
import { Link } from "react-router-dom";
import { ConnectButton } from "../../hooks/connectors/components/ConnectButton.tsx";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu.tsx";
import LinkAccountButton from "./LinkAccountButton.tsx";
import { NetworkSelector } from "./networkSelector.tsx";

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
      <div className="relative -top-2 flex items-center space-x-4">
        <div className="flex items-center">
          <img src="/images/logo.svg" alt="Logo" className="h-[25px]" />
        </div>
        <nav className="relative left-2 flex text-sm font-normal tracking-wider">
          <NavigationMenu
            onValueChange={onNavChange}
            viewportClassName={
              "rounded-xl border border-gray-700/40 bg-gradient-to-b from-eerie-black to-onyx tracking-wider"
            }
          >
            <NavigationMenuList>
              <NavigationMenuItem className="mr-2">
                <Link to="#" className="text-gray-300 hover:text-white">
                  Swap
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="submenu-trigger data-[state=open]:!bg-transparent hover:bg-transparent">
                  <Link
                    to="#"
                    className="text-gray-300 transition-all duration-100 group-data-[state=open]:font-bold group-data-[state=open]:text-screaming-green"
                  >
                    Markets
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col p-2">
                  <NavigationMenuLink asChild className="w-[100px]">
                    <Link to="#" className="p-1 text-gray-300 hover:text-white">
                      Explore
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="#" className="p-1 text-gray-300 hover:text-white">
                      Create
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link to="#" className="p-1 text-gray-300 hover:text-white">
                      Manage
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="submenu-trigger data-[state=open]:!bg-transparent hover:bg-transparent">
                  <Link
                    to="#"
                    className="text-gray-300 transition-all duration-100 group-data-[state=open]:font-bold group-data-[state=open]:text-screaming-green"
                  >
                    Liquidity
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col p-2">
                  <NavigationMenuLink asChild className="w-[100px]">
                    <Link to="#" className="p-1 text-gray-300 hover:text-white">
                      Explore
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="w-[100px]">
                    <Link to="#" className="p-1 text-gray-300 hover:text-white">
                      Create
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="w-[100px]">
                    <Link to="#" className="p-1 text-gray-300 hover:text-white">
                      Manage
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="submenu-trigger data-[state=open]:!bg-transparent hover:bg-transparent">
                  <Link
                    to="#"
                    className="text-gray-300 transition-all duration-100 group-data-[state=open]:font-bold group-data-[state=open]:text-screaming-green"
                  >
                    PayRoute
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col p-2">
                  <NavigationMenuLink asChild className="w-[100px]">
                    <Link to="#" className="p-1 text-gray-300 hover:text-white">
                      Explore
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="w-[150px]">
                    <Link to="#" className="p-1 text-gray-300 hover:text-white">
                      Create Route
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="w-[150px]">
                    <Link to="#" className="p-1 text-gray-300 hover:text-white">
                      Manage Route
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild className="w-[100px]">
                    <Link to="#" className="p-1 text-gray-300 hover:text-white">
                      Dispute
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>
      </div>

      <SearchBar />
      <div className="relative -top-1 flex items-center space-x-2">
        <LinkAccountButton />
        <NetworkSelector />
        <ConnectButton noSessionCreation />
      </div>
    </header>
  );
}
