import React, { Fragment } from "react";

export default function SelectionPick(props) {
  return (
    <div className="SelectionModal__pick-fieldset">
      <div className="SelectionModal__pick-legend">
        {props.username
          ? `${props.username}, à quelle sélection souhaitez-vous l’ajouter\u00a0?`
          : "À quelle sélection souhaitez-vous l’ajouter\u00a0?"}
      </div>
      <div className="SelectionModal__pick-container">
        {props.selections.map((s, i) => (
          <Fragment key={i}>
            <span
              tabIndex="0"
              role="button"
              className="SelectionModal__pick-button"
              onClick={() => props.onPick(s)}
            >
              {s.name}
            </span>{" "}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
