import React, { useState } from "react";
import classNames from "classnames";

import Button from "./Button";
import Loader from "../Loader";

export default function ConfirmedDelete(props) {
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleDeletion() {
    setLoading(true);
    props.onDelete();
  }

  return (
    <div
      className={classNames(
        "ConfirmedDelete",
        { "is-awaiting-confirmation": awaitingConfirmation },
        props.className
      )}
    >
      <div
        className="ConfirmedDelete__overlay"
        onClick={() => setAwaitingConfirmation(false)}
      />
      {loading ? (
        <Loader className="ConfirmedDelete__loader" />
      ) : (
        <div className="ConfirmedDelete__buttons-row-wrapper">
          <Button
            small
            dark
            round
            icon="trashcan"
            forceHover={awaitingConfirmation}
            type="button"
            onClick={() => {
              setAwaitingConfirmation(!awaitingConfirmation);
            }}
          />
          <div className="ConfirmedDelete__buttons-row">
            {awaitingConfirmation && (
              <>
                <Button
                  type="button"
                  onClick={handleDeletion}
                  warning
                  className="ConfirmedDelete__large-butt"
                >
                  {props.deleteLabel || "Supprimer"}
                </Button>
                <Button
                  type="button"
                  className="ConfirmedDelete__large-butt"
                  onClick={() => setAwaitingConfirmation(false)}
                >
                  {props.cancelLabel || "Annuler"}
                </Button>
                <div className="ConfirmedDelete__spacer-dot-gif" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
