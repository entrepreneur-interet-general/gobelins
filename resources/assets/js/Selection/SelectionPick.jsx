import React from "react";

export default function SelectionPick(props) {
  return (
    <div>
      <div>
        {props.username
          ? `${
              props.username
            } à quelle sélection souhaitez-vous ajouter cet objet ?`
          : "À quelle sélection souhaitez-vous ajouter cet objet ?"}
      </div>
      {props.selections.map((s, i) => (
        <button onClick={() => props.onPick(s)} key={i}>
          {s.name}
        </button>
      ))}
    </div>
  );
}
