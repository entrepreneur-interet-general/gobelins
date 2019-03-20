import React from "react";
import ArrowDown from "../icons/ArrowDown";

const ResultCount = props => (
  <div className="ResultCount">
    <div
      className={`ResultCount__count ${props.totalHits > 0 ? "as-button" : ""}`}
    >
      <ArrowDown />
      {props.totalHits || " "}
      {props.totalHits > 0 ? " résultats" : "Aucun résultat"}
    </div>
    {props.totalHits === 0 ? (
      <button
        type="button"
        className="ResultCount__reset"
        onClick={props.onFilterRemoveAll}
      >
        Réinitialiser la recherche
      </button>
    ) : null}
  </div>
);

export default ResultCount;
