import React from "react";

function IconMinus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g transform="translate(.647)" fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z" />
        <circle fill="#FF5C5C" opacity=".3" cx="12" cy="12" r="10" />
        <rect fill="#FF5C5C" x="6" y="11" width="12" height="2" rx="1" />
      </g>
    </svg>
  );
}

export default IconMinus;
