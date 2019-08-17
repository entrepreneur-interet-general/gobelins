import React from "react";
import { Link } from "react-router-dom";

import { useSelections } from "../context/selections-context";
import CrossSimple from "../icons/CrossSimple";
import MySelections from "./MySelections";
import SelectionsList from "./SelectionsList";

class SelectionsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
}

function MobNatSelections(props) {
  const selectionsContext = useSelections();

  return (
    <div className="Selections__users">
      <ul className="SelectionsList">
        <SelectionsList
          selections={selectionsContext.mobNatSelections}
          rightHeader={
            <h1 className="Selections__inset-header">
              Explorer les sélections du Mobilier national
            </h1>
          }
        />
      </ul>
    </div>
  );
}

function UserSelections(props) {
  const selectionsContext = useSelections();

  return (
    <div className="Selections__users">
      <ul className="SelectionsList">
        <SelectionsList
          selections={selectionsContext.userSelections}
          rightHeader={
            <h1 className="Selections__inset-header">
              Dernières sélections des utilisateurs
            </h1>
          }
        />
      </ul>
    </div>
  );
}

export default SelectionsIndex;
