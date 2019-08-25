import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Bricks from "bricks.js";

import notifier from "../utils/notifier";
import { useSelections } from "../context/selections-context";
import { useAuth } from "../context/auth-context";
import CrossSimple from "../icons/CrossSimple";
import ArrowPrev from "../icons/ArrowPrev";
import PadlockTiny from "../icons/PadlockTiny";
import Button from "../ui/Button";
import CollectionGridItem from "../Collection/CollectionGridItem";
import EditSelectionModal from "./EditSelectionModal";

function SelectionDetail(props) {
  const authContext = useAuth();
  const selectionsContext = useSelections();
  const selection_id = parseInt(props.match.params.selection_id, 10);

  let selection = selectionsContext.detailSelection;

  const userId = authContext.data.authenticated && authContext.data.user.id;
  const isMine = Boolean(userId && selection.users.find(u => u.id === userId));

  let masonryContainerRef = React.createRef();
  let bricksInstance;
  useEffect(() => {
    bricksInstance = Bricks({
      container: masonryContainerRef.current,
      packed: "packed",
      sizes: [
        { columns: 2, gutter: 15 },
        { mq: "800px", columns: 3, gutter: 40 },
        { mq: "1600px", columns: 4, gutter: 40 },
        { mq: "2200px", columns: 5, gutter: 40 }
      ],
      position: true
    });
    bricksInstance.pack();
  }, [selection.products]);

  const [editModalOpen, setEditModalOpen] = useState(false);

  function handleRemoveFromSelection(product) {
    selectionsContext.remove(product.inventory_id, selection.id).then(() => {
      notifier(
        `L’objet ${product.inventory_id} a bien été retiré de la sélection`
      );
    });
  }

  return (
    <div
      className={classNames("SelectionDetail", {
        "SelectionDetail--is-mine": isMine
      })}
    >
      <Link
        className="Selections__close SelectionDetail__close"
        to="/recherche"
      >
        <CrossSimple />
      </Link>
      <Link className="SelectionDetail__back-to-selections" to="/selections/">
        <ArrowPrev />
      </Link>
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
            <span> par {selection.users[0].name}</span>
            {selection.public !== true && <PadlockTiny />}
          </hgroup>
        </div>
        <div className="SelectionDetail__header-right">
          {selection.description}
        </div>
      </div>
      <div className="SelectionDetail__grid">
        <div className="SelectionDetail__masonry-container">
          <div ref={masonryContainerRef}>
            {selection.products.map((prod, i) => {
              return (
                <CollectionGridItem
                  className="SelectionDetail__grid-item"
                  datum={prod}
                  onObjectClick={() => null}
                  onSelectionClick={null}
                  onRemoveFromSelection={isMine && handleRemoveFromSelection}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectionDetail;
