import React from "react";

const Pencil = props => (
  <svg width={15} height={15} viewBox="0 0 15 15" fill="none" {...props}>
    <path
      d="M11.095 1L2.22 9.56 1 14l4.511-1.23 8.894-8.578S14.11 1.41 11.095 1z"
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.183 9.56l3.254 3.156"
      stroke="currentColor"
      strokeMiterlimit={10}
    />
    <path
      d="M5.125 12.5l-3.094-3L1 14l4.125-1.5zM2.188 9.5l7.5-7 3 3-7 7-3.5-3z"
      fill="currentColor"
    />
  </svg>
);

export default Pencil;
