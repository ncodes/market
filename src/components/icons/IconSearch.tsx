import React from "react";

export function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="25" height="24" viewBox="0 0 25 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path d="M.624 0h24v24h-24z" />
        <path
          d="M14.917 16.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1-1.414 1.414l-4-4z"
          fill="#F2F2F5"
          fillRule="nonzero"
          opacity=".3"
        />
        <path
          d="M11.624 16a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2a7 7 0 1 1 0-14 7 7 0 0 1 0 14z"
          fill="#F2F2F5"
          fillRule="nonzero"
        />
      </g>
    </svg>
  );
}
