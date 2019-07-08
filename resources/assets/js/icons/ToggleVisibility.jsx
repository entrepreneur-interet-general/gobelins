import React from "react";

const ToggleVisibility = props => (
  <svg width={17} height={17} viewBox="0 0 17 17" fill="none" {...props}>
    <path
      d="M.415 15.341L16.17 2.903"
      stroke="#fff"
      className="ToggleVisibility__strike"
    />
    <path
      d="M16.42 9.039c-.167-.166-3.567-4.976-8.21-5.142C5.224 3.814 2.737 6.053 0 9.04c.166.166 3.566 4.478 8.21 4.726.083 0-.083 0 0 0 2.736 0 5.638-1.658 8.21-4.726zm-8.21 3.814c-2.737-.083-5.059-1.907-6.303-3.15a.902.902 0 0 1 0-1.245C3.98 6.302 6.054 4.81 8.293 4.892c2.736.083 5.14 2.24 6.385 3.566a.902.902 0 0 1 0 1.244c-2.24 2.073-4.23 3.234-6.468 3.151z"
      fill="#fff"
    />
    <path
      d="M8.21 10.78a1.99 1.99 0 1 0 0-3.98 1.99 1.99 0 0 0 0 3.98z"
      fill="#fff"
    />
    <path
      d="M8.21 0v1.99M4.145.663l.663 1.825M.498 2.902l1.41 1.41M12.355.663l-.746 1.825"
      stroke="#fff"
      strokeMiterlimit={10}
    />
  </svg>
);

export default ToggleVisibility;
