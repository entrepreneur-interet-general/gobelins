import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelections } from "../context/selections-context";
import CrossSimple from "../icons/CrossSimple";
import MySelections from "./MySelections";
import SelectionsList from "./SelectionsList";
import ScrollToTop from "../Collection/ScrollToTop";
import Loader from "../Loader";

function SelectionsIndex(props) {
  useEffect(() => {
    window.document.title = "Sélections — Collection du Mobilier national";
  }, []);

  return (
    <div className="Selections">
      <Link className="Selections__close" to="/recherche">
        <CrossSimple />
      </Link>

      <div className="Selections__scroll-to-top">
        <ScrollToTop />
      </div>

      <MySelections />
      <MobNatSelections />
      <UserSelections />
    </div>
  );
}

function MobNatSelections(props) {
  const selectionsContext = useSelections();

  useEffect(() => {
    if (
      selectionsContext.loadingMobNat === false &&
      selectionsContext.mobNatSelections.length < 1
    ) {
      selectionsContext.fetchMobNat();
    }
  }, []);

  return (
    <div className="Selections__mobnat">
      <div className="SelectionsList">
        {selectionsContext.loadingMobNat ? (
          <Loader className="SelectionsList__loader" />
        ) : (
          <SelectionsList selections={selectionsContext.mobNatSelections} />
        )}
        <h1 className="Selections__inset-header">
          Explorer les sélections
          <br />
          du Mobilier national
        </h1>
        {/*
          <fieldset className="Selections__inset-search">
            <input type="search" />
          </fieldset>
        )*/}
      </div>
    </div>
  );
}

function UserSelections(props) {
  const selectionsContext = useSelections();

  useEffect(() => {
    if (
      selectionsContext.loadingUser === false &&
      selectionsContext.userSelections.length < 1
    ) {
      selectionsContext.fetchUser();
    }
  }, []);

  return (
    <div className="Selections__users">
      <div className="SelectionsList">
        {selectionsContext.loadingMobNat ? (
          <Loader className="SelectionsList__loader" />
        ) : (
          <SelectionsList selections={selectionsContext.userSelections} />
        )}
        <h1 className="Selections__inset-header">
          Dernières sélections des utilisateurs
        </h1>
      </div>
    </div>
  );
}

export default SelectionsIndex;
