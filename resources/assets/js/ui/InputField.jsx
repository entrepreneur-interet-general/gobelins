import React, { useState, useRef } from "react";
import classNames from "classnames";

import ToggleVisibility from "../icons/ToggleVisibility";
import Plus from "../icons/Plus";
import Loader from "./Loader";

export default function InputField(props) {
  const [isDirty, setIsDirty] = useState();
  const [visible, setVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const inputEl = props.inputRef || useRef(null);
  const type = props.type === "password" && visible ? "text" : props.type;
  // Remove props that we don't want to pass down.
  const {
    isInvalid,
    onChange,
    withSubmit,
    withSubmitButton,
    withButton,
    onClickButton,
    isLoading,
    inputRef,
    ...otherProps
  } = props;

  function handleOnChange(ev) {
    setIsDirty(true);
    onChange(ev);
  }
  return (
    <label
      className={classNames(
        "InputField",
        {
          "with-submit": props.withSubmit,
          "with-button": props.withButton,
          "is-active": isActive,
          "is-dirty": isDirty,
          "is-loading": isLoading,
          "is-invalid":
            props.isInvalid ||
            (inputEl.current && !inputEl.current.validity.valid)
        },
        props.className
      )}
    >
      <span className="InputField__label">{props.label}</span>
      <span className="InputField__input-wrapper">
        <input
          ref={inputEl}
          {...otherProps}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          onChange={handleOnChange}
          type={type}
          className={classNames("InputField__input", props.className)}
        />
      </span>
      {props.type === "password" && (
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          className={`InputField__toggle-visibility ${
            visible ? "is-visible" : ""
          }`}
        >
          <ToggleVisibility />
        </button>
      )}
      {props.withSubmit && !isLoading && (
        <button
          className="InputField__plus-submit"
          type="submit"
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
        >
          {props.withSubmitButton || <Plus />}
        </button>
      )}
      {props.withButton && (
        <button
          className="InputField__end-button"
          type="button"
          onFocus={() => setIsActive(true)}
          onBlur={() => setIsActive(false)}
          onClick={props.onClickButton}
        >
          {props.withButton}
        </button>
      )}
      {isLoading && (
        <div className="InputField__loader-container">
          <Loader className="InputField__loader" />
        </div>
      )}
    </label>
  );
}
