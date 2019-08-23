import React, { useState } from "react";
import classNames from "classnames";

import Button from "./Button";
import Loader from "../Loader";

export default function RemoveButton(props) {
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div className={classNames("RemoveButton", props.className)}>
      {loading ? (
        <Loader className="RemoveButton__loader" />
      ) : awaitingConfirmation ? (
        <Button
          red
          small
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            setLoading(true);
            props.onRemove();
          }}
        >
          supprimer
        </Button>
      ) : (
        <Button
          tiny
          dark
          round
          icon="cross"
          className="RemoveButton__initial-cross"
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            setAwaitingConfirmation(true);
          }}
        />
      )}
    </div>
  );
}
