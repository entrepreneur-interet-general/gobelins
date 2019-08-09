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
    <div className="SelectionsList__list-item" key={props.id}>
      <div className="SelectionsList__images">
        {illustrativeImages.map((image, i) => {
          const thumbUrl = folkloreImage.url(
            `/media/xl/${encodeURIComponent(image.path)}`,
            330
          );
          return <img src={thumbUrl} alt="" key={i} />;
        })}
      </div>
    </div>
  );
}
