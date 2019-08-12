import React from "react";
import folkloreImage from "../vendor/folklore-image.js";

export default function SelectionsList(props) {
  return props.selections.map((sel, i) => (
    <SelectionsListItem
      selection={sel}
      extraHeader={i === 1 && props.rightHeader}
      key={sel.id}
    />
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

function SelectionsListItem({ selection, extraHeader }) {
  const illustrativeImages = collectImages(selection);

  return (
    <div className="SelectionsListItem">
      {extraHeader}
      <div className="SelectionsListItem__images-wrapper">
        <div className="SelectionsListItem__images">
          {illustrativeImages.map((image, i) => {
            const thumbUrl = folkloreImage.url(
              `/media/xl/${encodeURIComponent(image.path)}`,
              330
            );
            return <img src={thumbUrl} alt="" key={i} />;
          })}
        </div>
      </div>
      <div className="SelectionsListItem__title-line">
        <strong className="SelectionsListItem__name">{selection.name}</strong>{" "}
        {selection.products && selection.products.length && (
          <span className="SelectionsListItem__count">
            {selection.products.length} objet
            {selection.products.length > 1 ? "s" : ""}
          </span>
        )}{" "}
        <span>par {selection.users[0].name}</span>
      </div>
      <div className="SelectionsListItem__desc">{selection.description}</div>
    </div>
  );
}
