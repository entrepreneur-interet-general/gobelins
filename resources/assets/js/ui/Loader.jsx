import React from "react";
import classNames from "classnames";

export default function Loader(props) {
  return (
    <div className={classNames("Loader__spinner", props.className)}>
      <div className="Loader__double-bounce1"></div>
      <div className="Loader__double-bounce2"></div>
    </div>
  );
}
