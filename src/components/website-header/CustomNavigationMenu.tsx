import { Link } from "react-router-dom";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { MenuItem } from "./Header";

export function CustomNavigationMenu({ menuItem }: { menuItem: MenuItem }) {
  const { title, url, children } = menuItem;

  if (!children || children.length == 0) {
    return (
      <NavigationMenuItem className="mr-2">
        <Link to={url ?? "#"} className="text-gray-300 hover:text-white">
          {title}
        </Link>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="submenu-trigger bg-transparent data-[state=open]:!bg-transparent hover:bg-transparent">
        <Link to={url ?? "#"} className="text-gray-300 transition-all duration-100 group-data-[state=open]:text-white">
          {title}
        </Link>
      </NavigationMenuTrigger>

      <NavigationMenuContent className="flex flex-col px-1 py-1 pb-2">
        {children.map((menu, index) => (
          <NavigationMenuLink key={index} asChild className="w-[120px]">
            <Link to={menu.url} className="rounded-lg p-2 px-2 text-gray-300 hover:bg-eerie-black hover:text-white">
              {menu.title}
            </Link>
          </NavigationMenuLink>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
