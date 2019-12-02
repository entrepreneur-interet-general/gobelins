import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Bricks from "bricks.js";
import arrayToSentence from "array-to-sentence";

import notifier from "../utils/notifier";
import { useSelections } from "../context/selections-context";
import { useAuth } from "../context/auth-context";
import CrossSimple from "../icons/CrossSimple";
import ArrowBack from "../icons/ArrowBack";
import PadlockTiny from "../icons/PadlockTiny";
import Heart from "../icons/Heart";
import Button from "../ui/Button";
import CollectionGridItem from "../Collection/CollectionGridItem";
import EditSelectionModal from "./EditSelectionModal";
import SelectionsBlank from "../icons/SelectionsBlank";

function SelectionDetail(props) {
  const authContext = useAuth();
  const selectionsContext = useSelections();
  // const selection_id = parseInt(props.match.params.selection_id, 10);

  let selection = selectionsContext.detailSelection;

  const userId = authContext.data.authenticated && authContext.data.user.id;
  const isMine = Boolean(userId && selection.users.find(u => u.id === userId));

  let masonryContainerRef = React.createRef();

  useEffect(() => {
    // Force scroll to top on mount.
    window.scrollTo(0, 0);
    window.document.title = `${selection.name} — Collection du Mobilier national`;
  }, []);

  useEffect(() => {
    // If we aren't displaying the container (because no products)
    // then bail.
    if (!masonryContainerRef.current) {
      return;
    }
    const bricksInstance = Bricks({
      container: masonryContainerRef.current,
      packed: "packed",
      sizes: [
        { columns: 2, gutter: 15 },
        { mq: "768px", columns: 3, gutter: 40 },
        { mq: "1025px", columns: 3, gutter: 80 },
        { mq: "1440px", columns: 3, gutter: 100 },
        { mq: "1600px", columns: 4, gutter: 85 },
        { mq: "2200px", columns: 5, gutter: 100 }
      ],
      position: true
    });
    bricksInstance.resize(false);
    bricksInstance.pack();

    let ticking = false;
    function resizeHandler() {
      if (!ticking) {
        window.requestAnimationFrame(forceRepack);
        ticking = true;
      }
    }
    function forceRepack() {
      bricksInstance.pack();
      ticking = false;
    }
    window.addEventListener("resize", resizeHandler);
  }, [selection.products]);

  const [editModalOpen, setEditModalOpen] = useState(false);

  function handleRemoveFromSelection(product) {
    selectionsContext.remove(product.inventory_id, selection.id).then(() => {
      notifier(
        `L’objet ${product.inventory_id} a bien été retiré de la sélection`
      );
    });
  }

  function handleDeleteSelection() {
    selectionsContext.destroy(selection, () => {
      props.history.replace("/selections");
      notifier("La sélection a bien été supprimée");
    });
  }

  return (
    <div
      className={classNames("SelectionDetail", {
        "SelectionDetail--is-mine": isMine
      })}
    >
      <div className="SelectionDetail__cross-nav-bar">
        <Link
          className="Selections__close SelectionDetail__close"
          to="/recherche"
        >
          <CrossSimple />
        </Link>
        <Link className="SelectionDetail__back-to-selections" to="/selections/">
          <ArrowBack />
        </Link>
      </div>
      <div className="SelectionDetail__header">
        <div className="SelectionDetail__header-left">
          {isMine && (
            <Button
              dark
              small
              icon="pencil"
              className="SelectionDetail__edit-button"
              onClick={() => setEditModalOpen(true)}
            >
              modifier
            </Button>
          )}
          {editModalOpen && (
            <EditSelectionModal
              selection={selection}
              onClose={() => setEditModalOpen(false)}
              onDelete={handleDeleteSelection}
            />
          )}
          <hgroup className="SelectionDetail__header-line">
            <h1>{selection.name}</h1>
            {Boolean(selection.products) && Boolean(selection.products.length) && (
              <span className="SelectionsListItem__count">
                {selection.products.length} objet
                {selection.products.length > 1 ? "s" : ""}
              </span>
            )}
            <span>
              {" "}
              par{" "}
              {arrayToSentence(selection.users.map(u => u.name), {
                lastSeparator: " et "
              })}
            </span>
            {selection.public !== true && (
              <PadlockTiny
                width="17"
                height="17"
                className="SelectionDetail__padlock"
              />
            )}
          </hgroup>
        </div>
        <div className="SelectionDetail__header-right">
          {selection.description}
        </div>
      </div>
      <div className="SelectionDetail__grid">
        {selection.products.length ? (
          <div className="SelectionDetail__masonry-container">
            <div ref={masonryContainerRef}>
              {selection.products.map((prod, i) => {
                return (
                  <CollectionGridItem
                    className="SelectionDetail__grid-item"
                    datum={prod}
                    onObjectClick={props.onObjectClick}
                    onSelectionClick={null}
                    onRemoveFromSelection={isMine && handleRemoveFromSelection}
                    key={i}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="SelectionDetail__blankslate">
            <SelectionsBlank />
            <span className="SelectionDetail__blankslate-txt">
              Commencer à ajouter des objets en cliquant sur les
              <Heart />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectionDetail;
