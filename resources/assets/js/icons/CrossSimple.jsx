import React from "react";

const CrossSimple = props => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    preserveAspectRatio="xMidYMid meet"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      d="M1 1l14 14M15 1L1 15"
      vectorEffect="non-scaling-stroke"
    />
  </svg>
);

export default CrossSimple;
