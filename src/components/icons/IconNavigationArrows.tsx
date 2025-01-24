import React from "react";

export default function IconNavigationArrows(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z" />
        <rect fill="#FFF" opacity=".3" transform="rotate(-90 12 12)" x="7" y="11" width="10" height="2" rx="1" />
        <path
          d="M6.707 8.707a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.383-.03l6 5.5a1 1 0 0 1-1.352 1.474L12.03 3.384 6.707 8.707z"
          fill="#8F90A6"
          fill-rule="nonzero"
        />
        <path
          d="M17.293 15.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.383.03l-6-5.5a1 1 0 1 1 1.352-1.474l5.294 4.853 5.323-5.323z"
          fill="#FFF"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  );
}
