import React from "react";

const Cross = props => (
  <svg width={8} height={8} fill="none" {...props}>
    <path
      d="M7 1L4.009 3.904M1 1l2.991 2.905M1 7.005L3.991 4.1M7 7.005L4.009 4.1"
      stroke="#000"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default Cross;
