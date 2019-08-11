import React from "react";
import folkloreImage from "../vendor/folklore-image.js";

export default function SelectionsList(props) {
  return props.selections.map(SelectionsListItem);
}

function collectImages(selection) {
  return selection.products
    .map(prod => {
      return prod.images.length ? prod.images[0] : null;
    })
    .filter(v => v)
    .slice(0, 4);
}

function SelectionsListItem(props) {
  const illustrativeImages = collectImages(props);

  return (
    <div className="SelectionsListItem" key={props.id}>
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
        <strong className="SelectionsListItem__name">{props.name}</strong>{" "}
        {props.products && props.products.length && (
          <span className="SelectionsListItem__count">
            {props.products.length} objet{props.products.length > 1 ? "s" : ""}
          </span>
        )}{" "}
        <span>par {props.users[0].name}</span>
      </div>
      <div className="SelectionsListItem__desc">{props.description}</div>
    </div>
  );
}
