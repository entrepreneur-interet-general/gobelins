import React from "react";
import classNames from "classnames";

import ArrowCta from "../icons/ArrowCta";
import Plus from "../icons/Plus";
import Gear from "../icons/Gear";
import Pencil from "../icons/Pencil";

export default function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className={classNames(
        "Button",
        {
          Button__small: props.small,
          Button__round: props.round,
          Button__dark: props.dark
        },
        props.className
      )}
    >
      <div className="Button__inner">
        {props.icon && (
          <div className="Button__icon">
            {props.icon === "arrow" && <ArrowCta />}
            {props.icon === "plus" && <Plus />}
            {props.icon === "gear" && <Gear />}
            {props.icon === "pencil" && <Pencil />}
          </div>
        )}
        {props.children && (
          <div className="Button__label">{props.children}</div>
        )}
      </div>
    </button>
  );
}
