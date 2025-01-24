import React from "react";

export default function IconGeneralSettings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fill-rule="evenodd">
        <path d="M0 0h24v24H0z" />
        <path d="M17 3a4 4 0 1 1 0 8H7a4 4 0 1 1 0-8h10zM7 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="#FFF" />
        <path d="M17 13a4 4 0 1 1 0 8H7a4 4 0 1 1 0-8h10zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="#FFF" opacity=".3" />
      </g>
    </svg>
  );
}
