import React from "react";

const MagnifyingGlass = props => (
  <svg
    width={17}
    height={17}
    fill="none"
    viewBox="0 0 17 17"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <path
      d="M10.153 11.699c-3.229 0-5.847-2.463-5.847-5.5 0-3.038 2.618-5.5 5.847-5.5C13.383.7 16 3.161 16 6.2c0 3.037-2.618 5.5-5.847 5.5zM6.377 10.566L1 15.698"
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default MagnifyingGlass;
