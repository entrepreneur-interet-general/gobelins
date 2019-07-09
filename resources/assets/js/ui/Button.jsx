import React from "react";
import ArrowCta from "../icons/ArrowCta";

export default function Button(props) {
  const classNames = props.className ? `Button ${props.className}` : "Button";
  return (
    <button onClick={props.onClick} className={classNames}>
      <div className="Button__inner">
        {props.icon && (
          <div className="Button__icon">
            {props.icon === "arrow" && <ArrowCta />}
          </div>
        )}

        <div className="Button__label">{props.children}</div>
      </div>
    </button>
  );
}
