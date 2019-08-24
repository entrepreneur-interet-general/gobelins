import React, { useState } from "react";
import classNames from "classnames";

import ToggleVisibility from "../icons/ToggleVisibility";
import Plus from "../icons/Plus";

export default function InputField(props) {
  const [visible, setVisible] = useState(false);
  const type = props.type === "password" && visible ? "text" : props.type;
  return (
    <label
      className={classNames(
        "InputField",
        { "with-submit": props.withSubmit },
        props.className
      )}
    >
      <span className="InputField__label">{props.label}</span>
      <input
        name={props.name}
        value={props.value}
        required={props.required}
        placeholder={props.placeholder}
        onChange={props.onChange}
        maxLength={props.maxLength}
        type={type}
        className="InputField__input"
      />
      {props.type === "password" && (
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className={`InputField__toggle-visibility ${
            visible ? "is-visible" : ""
          }`}
        >
          <ToggleVisibility />
        </button>
      )}
      {props.withSubmit && (
        <button className="InputField__plus-submit" type="submit">
          <Plus />
        </button>
      )}
    </label>
  );
}
