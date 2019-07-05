import React from "react";

export default function SelectionPick(props) {
  return (
    <fieldset className="SelectionModal__pick-fieldset">
      <legend className="SelectionModal__pick-legend">
        {props.username
          ? `${
              props.username
            }, à quelle sélection souhaitez-vous l’ajouter\u00a0?`
          : "À quelle sélection souhaitez-vous l’ajouter\u00a0?"}
      </legend>
      {props.selections.map((s, i) => (
        <span
          tabIndex="0"
          role="button"
          className="SelectionModal__pick-button"
          onClick={() => props.onPick(s)}
          key={i}
        >
          {s.name}
        </span>
      ))}
    </fieldset>
  );
}