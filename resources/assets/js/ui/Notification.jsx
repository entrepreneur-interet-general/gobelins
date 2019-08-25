import React from "react";
import CrossSimple from "../icons/CrossSimple";

export default function Notification(props) {
  return (
    <div className="item Notification__item" role="alert">
      <span>{props.message}</span>
      <button
        type="button"
        onClick={props.onClosePanel}
        aria-label="Fermer la notification"
      >
        <CrossSimple />
      </button>
    </div>
  );
}
