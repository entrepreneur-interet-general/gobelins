import React from "react";

const Cross = props => (
  <svg width={14} height={14} fill="none" {...props}>
    <path
      d="M.646 12.647a.5.5 0 0 0 .708.706l-.708-.706zM6.984 7l.354.353a.5.5 0 0 0 0-.706L6.984 7zm5.662 6.353a.5.5 0 0 0 .708-.706l-.708.706zM7.016 7l-.354-.353a.5.5 0 0 0 0 .706L7.016 7zm6.338-5.647a.5.5 0 0 0-.708-.706l.708.706zm-12-.706a.5.5 0 1 0-.708.706l.708-.706zm0 12.706l5.984-6-.708-.706-5.984 6 .708.706zm12-.706l-5.984-6-.708.706 5.984 6 .708-.706zm-.708-12l-5.984 6 .708.706 5.984-6-.708-.706zm-12 .706l5.984 6 .708-.706-5.984-6-.708.706z"
      fill="currentColor"
    />
  </svg>
);

export default Cross;