import React, { useState } from "react";
import ToggleVisibility from "../icons/ToggleVisibility";

export default function InputField(props) {
  const [visible, setVisible] = useState(false);
  const { className } = props;
  const type = props.type === "password" && visible ? "text" : props.type;
  return (
    <label className={`InputField ${className}`}>
      <span className="InputField__label">{props.label}</span>
      <input {...props} type={type} className="InputField__input" />
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
    </label>
  );
}
