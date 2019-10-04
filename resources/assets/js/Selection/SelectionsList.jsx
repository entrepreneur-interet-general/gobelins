import React from "react";
import imageUrl from "../utils/image-url";
import classNames from "classnames";
import { Link } from "react-router-dom";

import ImagesPlaceholder from "./ImagesPlaceholder";
import PadlockTiny from "../icons/PadlockTiny";
import { useSelections } from "../context/selections-context";

export default function SelectionsList(props) {
  return props.selections.map((sel, i) => (
    <SelectionsListItem selection={sel} key={sel.id} {...props} />
  ));
}

function collectImages(selection) {
  return selection.products
    .map(prod => {
      return prod.images.length ? prod.images[0] : null;
    })
    .filter(v => v)
    .slice(0, 4);
}

function SelectionsListItem({ selection, extraHeader, className }) {
  const illustrativeImages = collectImages(selection);
  const selectionContext = useSelections();

  return (
    <div className={classNames("SelectionsListItem", className)}>
      <Link
        to={{
          pathname: `/selections/${selection.id}`,
          state: { selection: selection }
        }}
        onClick={() => selectionContext.setDetailSelection(selection.id)}
      >
        <div className="SelectionsListItem__images-wrapper">
          <div className="SelectionsListItem__images">
            {illustrativeImages.length ? (
              illustrativeImages.map((image, i) => {
                const thumbUrl = imageUrl(image.path, 330);
                return <img src={thumbUrl} alt="" key={i} />;
              })
            ) : (
              <ImagesPlaceholder />
            )}
          </div>
        </div>
      </Link>
      <div className="SelectionsListItem__title-line">
        <strong className="SelectionsListItem__name">{selection.name}</strong>{" "}
        {Boolean(selection.products) &&
          Boolean(selection.products.length) && (
            <span className="SelectionsListItem__count">
              {selection.products.length} objet
              {selection.products.length > 1 ? "s" : ""}
            </span>
          )}{" "}
        <span>par {selection.users[0].name}</span>
        {selection.public !== true && <PadlockTiny />}
      </div>
      <div className="SelectionsListItem__desc">{selection.description}</div>
    </div>
  );
}
