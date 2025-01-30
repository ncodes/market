import { MenuItem } from "@/libs/menu";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Link } from "react-router-dom";

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
      <NavigationMenuTrigger className="submenu-trigger data-[state=open]:!bg-transparent hover:bg-transparent">
        <Link
          to={url ?? "#"}
          className="text-gray-300 transition-all duration-100 group-data-[state=open]:font-bold group-data-[state=open]:text-screaming-green"
        >
          {title}
        </Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent className="flex flex-col p-2">
        {children.map((menu) => (
          <NavigationMenuLink asChild className="w-[100px]">
            <Link to={menu.url} className="p-1 text-gray-300 hover:text-white">
              {menu.title}
            </Link>
          </NavigationMenuLink>
        ))}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
