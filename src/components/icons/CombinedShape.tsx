import React from "react";

export default function CombinedShape(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19.191 18h-5.757v-2.77h2.879l-.001-2.307h2.88V18zM16.313 2.308 5.757 2.307v2.769H2.878v10.155l7.357-.001v-2.307h3.199V9.931h2.878V2.308zm-2.879 2.769V9.93h-3.199v2.992H5.757V5.076h7.677zm5.757 4.854h-2.879v2.992h-2.878v2.307h-3.199V18H0V5.077l2.878-.001V2.308l2.879-.001V0h13.434v9.931z"
        fill="#FFF"
        fill-rule="evenodd"
      />
    </svg>
  );
}
