import { Link } from "react-router-dom";
import { ConnectButton } from "../../hooks/connectors/components/ConnectButton.tsx";
import { SearchBar } from "@/components/searchBar.tsx";
import { NetworkSelector } from "@/components/header/networkSelector.tsx";

export function Header() {
  return (
    <header className="relative flex select-none items-center justify-between p-4">
      <div className="relative -top-2 flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <img src="/images/logo.svg" alt="Logo" />
        </div>
        <nav className="relative left-2 top-0.5 flex space-x-5 font-medium tracking-wider">
          <Link to="#" className="text-gray-200 hover:text-white">
            Swap
          </Link>
          <Link to="#" className="text-gray-200 hover:text-white">
            Explore
          </Link>
          <Link to="#" className="text-gray-200 hover:text-white">
            Markets
          </Link>
        </nav>
      </div>

      <SearchBar />
      <div className="relative -top-1 flex items-center space-x-2">
        <NetworkSelector />
        <ConnectButton noSessionCreation />
      </div>
    </header>
  );
}
