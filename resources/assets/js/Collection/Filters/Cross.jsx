import React from "react";

const Cross = props => (
  <svg width={6} height={6} fill="none" {...props}>
    <path
      d="M5 1L3.006 2.936M1 1l1.994 1.936M1 5.004l1.994-1.936M5 5.004L3.006 3.068"
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Cross;
