import React from "react";

const PadlockTiny = props => (
  <svg width={9} height={11} viewBox="0 0 9 11" fill="none" {...props}>
    <path
      d="M8 5.9H1v4.2h7V5.9z"
      fill="#A6A6A6"
      stroke="#A6A6A6"
      strokeMiterlimit={10}
    />
    <path
      d="M2.4 5.9V3.155S2.424 1 4.518 1C6.54 1 6.6 3.155 6.6 3.155V5.9"
      stroke="#A6A6A6"
      strokeMiterlimit={10}
    />
  </svg>
);

export default PadlockTiny;
