import React from "react";

export default function IconNavigateUpDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g transform="translate(.5)" fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z" />
        <rect fill="#FFF" opacity=".3" transform="rotate(-180 6 11)" x="5" y="5" width="2" height="12" rx="1" />
        <path
          d="M8.293 14.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 1.414-1.414L6 16.586l2.293-2.293z"
          fill="#FFF"
          fill-rule="nonzero"
        />
        <rect fill="#FFF" opacity=".3" transform="matrix(-1 0 0 1 36 0)" x="17" y="7" width="2" height="12" rx="1" />
        <path
          d="M20.293 9.707a1 1 0 0 0 1.414-1.414l-3-3a1 1 0 0 0-1.414 0l-3 3a1 1 0 1 0 1.414 1.414L18 7.414l2.293 2.293z"
          fill="#FFF"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  );
}
