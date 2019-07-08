import React from "react";
import ArrowCta from "../icons/ArrowCta";

export default function Button(props) {
  const classNames = props.className ? `Button ${props.className}` : "Button";
  return (
    <button onClick={props.onClick} className={classNames}>
      <div className="Button__inner">
        <div className="Button__icon">
          <ArrowCta />
        </div>
        <div className="Button__label">{props.children}</div>
      </div>
    </button>
  );
}
