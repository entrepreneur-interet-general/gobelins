import React from "react";
import classNames from "classnames";

import ArrowCta from "../icons/ArrowCta";
import Plus from "../icons/Plus";
import Gear from "../icons/Gear";
import Pencil from "../icons/Pencil";
import CrossSimple from "../icons/CrossSimple";
import TrashCan from "../icons/TrashCan";

export default function Button(props) {
  const tinyIconSizes = props.tiny ? { width: "8px", height: "8px" } : {};
  return (
    <button
      onClick={props.onClick}
      className={classNames(
        "Button",
        {
          Button__small: props.small,
          Button__tiny: props.tiny,
          Button__round: props.round,
          Button__dark: props.dark,
          Button__red: props.red
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
            {props.icon === "trashcan" && <TrashCan />}
            {props.icon === "cross" && <CrossSimple {...tinyIconSizes} />}
          </div>
        )}
        {props.children && (
          <div className="Button__label">{props.children}</div>
        )}
        {props.popOver && (
          <div
            className={classNames(
              "Button__pop-over",
              props.popOverPlacement &&
                `Button__pop-over--at-${props.popOverPlacement}`
            )}
          >
            {props.popOver}
          </div>
        )}
      </div>
    </button>
  );
}
