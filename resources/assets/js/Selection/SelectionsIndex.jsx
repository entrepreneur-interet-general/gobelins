import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelections } from "../context/selections-context";
import CrossSimple from "../icons/CrossSimple";
import MySelections from "./MySelections";
import SelectionsList from "./SelectionsList";
import ScrollToTop from "../Collection/ScrollToTop";
import Loader from "../Loader";
import ArrowBottomRight from "../icons/ArrowBottomRight";

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

  function handleLoadMore() {
    if (selectionsContext.hasMoreMobNatSelections) {
      selectionsContext.fetchMoreMobNat();
    }
  }

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
        {selectionsContext.hasMoreMobNatSelections && (
          <div className="Selections__load-more">
            {selectionsContext.loadingMoreMobNat ? (
              <Loader className="Selections__load-spinner" />
            ) : (
              <button
                onClick={handleLoadMore}
                type="button"
                className="Selections__load-more-button"
              >
                <ArrowBottomRight />
                Voir plus
              </button>
            )}
          </div>
        )}
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

  function handleLoadMore() {
    if (selectionsContext.hasMoreUserSelections) {
      selectionsContext.fetchMoreUser();
    }
  }

  return (
    <div className="Selections__users">
      <div className="SelectionsList">
        {selectionsContext.loadingUser ? (
          <Loader className="SelectionsList__loader" />
        ) : (
          <SelectionsList selections={selectionsContext.userSelections} />
        )}
        <h1 className="Selections__inset-header">
          Dernières sélections des utilisateurs
        </h1>
        {selectionsContext.hasMoreUserSelections && (
          <div className="Selections__load-more">
            {selectionsContext.loadingMoreUser ? (
              <Loader className="Selections__load-spinner" />
            ) : (
              <button
                onClick={handleLoadMore}
                type="button"
                className="Selections__load-more-button"
              >
                <ArrowBottomRight />
                Voir plus
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectionsIndex;
