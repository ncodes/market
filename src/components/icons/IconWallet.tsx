import React from "react";

export default function IconWallet(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g transform="translate(.5)" fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z" />
        <circle fill="#28293D" opacity=".3" cx="20.5" cy="12.5" r="1.5" />
        <rect fill="#28293D" opacity=".3" transform="rotate(-15 12 6.5)" x="3" y="3" width="18" height="7" rx="1" />
        <path
          d="M20 4a2 2 0 0 1 2 2l.001 3.337a3.5 3.5 0 1 0 0 6.325L22 18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16z"
          fill="#28293D"
        />
      </g>
    </svg>
  );
}
