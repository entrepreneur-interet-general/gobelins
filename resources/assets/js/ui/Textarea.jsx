import React, { useState, useEffect } from "react";
import classNames from "classnames";
import TextareaAutosize from "react-textarea-autosize";

export default function Textarea(props) {
  const labelRef = React.createRef();
  const [indent, setIndent] = useState(0);

  useEffect(() => {
    const width = Math.floor(labelRef.current.getBoundingClientRect().width);
    setIndent(width + 10); // 10px margin right.
  }, []);

  return (
    <label className={classNames("Textarea", props.className)}>
      <div className="Textarea__scrollable">
        <span className="Textarea__label" ref={labelRef}>
          {props.label}
        </span>
        <TextareaAutosize
          name={props.name}
          value={props.value}
          required={props.required}
          placeholder={props.placeholder}
          onChange={props.onChange}
          maxLength={props.maxLength}
          style={{ textIndent: `${indent}px` }}
          className="Textarea__el"
        />
      </div>
    </label>
  );
}
