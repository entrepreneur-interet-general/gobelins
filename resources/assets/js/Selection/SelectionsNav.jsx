import React from "react";

import Selections from "../icons/Selections";

export default function SelectionsNav(props) {
  return (
    <button type="button" className="SelectionsNav" onClick={props.onClick}>
      <Selections />
    </button>
  );
}
