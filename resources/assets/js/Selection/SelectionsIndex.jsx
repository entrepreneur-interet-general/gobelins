import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelections } from "../context/selections-context";
import CrossSimple from "../icons/CrossSimple";
import MySelections from "./MySelections";
import SelectionsList from "./SelectionsList";
import SelectionsListItem from "./SelectionsListItem";
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
          <SelectionsList>
            <h1 className="Selections__inset-header SelectionsList__masonry-item">
              Explorer les sélections
              <br />
              du Mobilier national
            </h1>
            {selectionsContext.mobNatSelections.map(sel => (
              <SelectionsListItem
                selection={sel}
                key={sel.id}
                className="SelectionsList__masonry-item"
                {...props}
              />
            ))}
            {selectionsContext.hasMoreMobNatSelections && (
              <div className="Selections__load-more SelectionsList__masonry-item">
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
          </SelectionsList>
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
          <SelectionsList>
            <h1 className="Selections__inset-header SelectionsList__masonry-item">
              Dernières sélections des utilisateurs
            </h1>
            {selectionsContext.userSelections.map(sel => (
              <SelectionsListItem
                selection={sel}
                key={sel.id}
                className="SelectionsList__masonry-item"
                {...props}
              />
            ))}
            {selectionsContext.hasMoreUserSelections && (
              <div className="Selections__load-more SelectionsList__masonry-item">
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
          </SelectionsList>
        )}
      </div>
    </div>
  );
}

export default SelectionsIndex;
