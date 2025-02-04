import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { DiscordIcon, TelegramIcon, XIcon } from "../../assets";
import { cn } from "../../libs/utils";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import LogoMark from "./LogoMark";

export function WordMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="96" height="18" viewBox="0 0 96 18" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fill-rule="evenodd">
        <path
          d="M17.424 0v14.4h-3.466V18H3.562v-3.6H.096v-3.6h6.931v3.6h3.466V0h6.93zM36.03 0v3.6h3.466v10.8H36.03V18H25.634v-3.6h-3.465V3.6h3.465V0H36.03zm15.142 18H44.24V6.4h6.93V18zM62.847 0v3.6h3.466v3.6h3.465V0h6.931v18h-6.93v-3.6h-3.466v-3.6h-3.466V18h-6.93V0h6.93zm32.469 0v3.6H91.85V18h-6.93V3.6h-3.466V0h13.862zM32.565 3.744h-3.466v10.512h3.466V3.744zM44.24 0h6.93v4.267h-6.93V0z"
          fill="#FFF"
          fill-rule="nonzero"
        />
        <path fill="#8DE969" d="M44.24 4.527h6.932V0H44.24z" />
      </g>
    </svg>
  );
}

export default function Logo() {
  const [openLegal, setOpenLegal] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
        <DropdownMenuTrigger>
          <Button className="m-0 h-auto justify-start gap-1 rounded-none bg-transparent p-0 text-start hover:bg-transparent">
            <div className="flex items-center gap-2">
              <LogoMark />
              <WordMark />
            </div>
            <ChevronDown size={20} className={cn("transition-all", { "rotate-180": openMenu })} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-chinese-black ml-3 w-52 border border-raisin-black p-2 font-poppins font-light tracking-wide">
          <DropdownMenuLabel className="text-xs font-light text-gray-600">Company</DropdownMenuLabel>
          <DropdownMenuGroup className="">
            <DropdownMenuItem className="text-gray-300 hover:!bg-eerie-black">Career</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:!bg-eerie-black">Blog</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:!bg-eerie-black">Docs</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuLabel className="text-xs font-light text-gray-600">Protocol</DropdownMenuLabel>
          <DropdownMenuGroup className="">
            <DropdownMenuItem className="text-gray-300 hover:!bg-eerie-black">Developer</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:!bg-eerie-black">$JOIN</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:!bg-eerie-black">Docs</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuLabel className="text-xs font-light text-gray-600">Need Help?</DropdownMenuLabel>
          <DropdownMenuGroup className="">
            <DropdownMenuItem className="text-gray-300 hover:!bg-eerie-black">Help & Support</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:!bg-eerie-black">Contact Us</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup className="mt-2 flex gap-2 px-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
              <img src={DiscordIcon} className="h-5 w-5" />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
              <img src={XIcon} className="h-5 w-5" />
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100">
              <img src={TelegramIcon} className="h-5 w-5" />
            </span>
          </DropdownMenuGroup>

          <Button
            variant="ghost"
            className="m-0 h-auto border-none p-0 hover:bg-transparent"
            onClick={() => setOpenLegal(!openLegal)}
          >
            <DropdownMenuLabel className="mt-3 flex items-center gap-1 text-xs font-light text-gray-600">
              <span>Legal</span>
              <span className="text-gray-500">
                <ChevronDown size={16} className={cn("transition-all", { "rotate-180": openLegal })} />
              </span>
            </DropdownMenuLabel>
          </Button>
          <DropdownMenuGroup className={cn("transition-all duration-300", { hidden: !openLegal })}>
            <DropdownMenuItem className="text-gray-300 hover:!bg-eerie-black">Terms of Service</DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:!bg-eerie-black">Privacy Policy</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup className="px-2">
            <span className="text-xs text-gray-600">&copy; 2025. All rights reserved.</span>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
