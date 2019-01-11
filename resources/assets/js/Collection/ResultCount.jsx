import React from "react";
import ArrowDown from "./ArrowDown";

const ResultCount = props => (
  <div className="ResultCount">
    <div
      className={`ResultCount__count ${props.totalHits > 0 ? "as-button" : ""}`}
    >
      <ArrowDown />
      {props.totalHits || " "}
      {props.totalHits > 1 ? " résultats" : "Aucun résultat"}
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
