import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelections } from "../context/selections-context";
import CrossSimple from "../icons/CrossSimple";
import MySelections from "./MySelections";
import SelectionsList from "./SelectionsList";

function SelectionsIndex(props) {
  const selectionsContext = useSelections();

  useEffect(() => {
    if (
      selectionsContext.loading === false &&
      selectionsContext.userSelections.length < 1
    ) {
      selectionsContext.fetchAll();
    }
  }, []);

  return (
    <div className="Selections">
      <Link className="Selections__close" to="/recherche">
        <CrossSimple />
      </Link>

      <MySelections />
      <MobNatSelections />
      <UserSelections />
    </div>
  );
}

function MobNatSelections(props) {
  const selectionsContext = useSelections();

  return (
    <div className="Selections__mobnat">
      <ul className="SelectionsList">
        <SelectionsList selections={selectionsContext.mobNatSelections} />
        <h1 className="Selections__inset-header">
          Explorer les sélections
          <br />
          du Mobilier national
        </h1>
        <fieldset className="Selections__inset-search">
          <input type="search" />
        </fieldset>
      </ul>
    </div>
  );
}

function UserSelections(props) {
  const selectionsContext = useSelections();

  return (
    <div className="Selections__users">
      <ul className="SelectionsList">
        <SelectionsList selections={selectionsContext.userSelections} />
        <h1 className="Selections__inset-header">
          Dernières sélections des utilisateurs
        </h1>
      </ul>
    </div>
  );
}

export default SelectionsIndex;
