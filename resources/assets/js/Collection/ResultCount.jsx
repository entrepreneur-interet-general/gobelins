import React from "react";
import classNames from "classnames";

import ArrowDown from "../icons/ArrowDown";

const ResultCount = props => {
  let label;
  switch (props.totalHits) {
    case 0:
      label = "Aucun résultat";
      break;
    case 1:
      label = "1 résultat";
      break;
    default:
      label = `${props.totalHits} résultats`;
      break;
  }

  return (
    <div className={classNames("ResultCount", props.className)}>
      <div
        className={`ResultCount__count ${props.totalHits > 0 && "as-button"}`}
      >
        <ArrowDown />
        {label}
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
};

export default ResultCount;
