import { ChevronDown } from "lucide-react";
import React from "react";
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

function CompanyMenu() {
  return (
    <span>
      <ChevronDown size={20} />
    </span>
  );
}

export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <LogoMark />
      <WordMark />
      <CompanyMenu />
    </div>
  );
}
