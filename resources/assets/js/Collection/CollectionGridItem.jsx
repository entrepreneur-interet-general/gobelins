import React from "react";
import imageUrl from "../utils/image-url";
import classNames from "classnames";

import Heart from "../icons/Heart";
import RemoveButton from "../ui/RemoveButton";

export default function CollectionGridItem({
  onObjectClick,
  onSelectionClick,
  datum,
  className,
  onRemoveFromSelection
}) {
  let hasImages = datum.images && datum.images.length > 0;

  let img600 = hasImages ? imageUrl(datum.images[0].path, 600) : "";
  let img330 = hasImages ? imageUrl(datum.images[0].path, 330) : "";

  let display_name =
    datum.title_or_designation ||
    datum.denomination ||
    (datum.product_types && datum.product_types.length > 0
      ? datum.product_types.find(t => t.is_leaf).name
      : "");

  const renderHeartButton = datum => {
    return (
      <button
        type="button"
        className="Collection__image-selection-button"
        onClick={onSelectionClick.bind(this, datum)}
      >
        <Heart />
      </button>
    );
  };

  const renderRemoveFromSelection = datum => {
    return (
      <RemoveButton
        onRemove={onRemoveFromSelection.bind(this, datum)}
        className="Collection__remove-button"
      />
    );
  };

  return (
    <a
      href={`/objet/${datum.inventory_id}`}
      onClick={onObjectClick.bind(this, datum)}
      className={classNames("Collection__cell", className)}
    >
      {hasImages ? (
        <figure
          className="Collection__image-container"
          style={{
            "--aspect-ratio": datum.images[0].width / datum.images[0].height
          }}
        >
          <img
            sizes="(min-width: 1800px) calc((100vw - 288px - (40px * 6)) / 6),
                       (min-width: 1600px) and (max-width: 1799px) calc((100vw - 288px - (40px * 5)) / 5),
                       (min-width: 1440px) and (max-width: 1599px) calc((100vw - 288px - (40px * 4)) / 4),
                       (min-width: 1025px) and (max-width: 1439px) calc((100vw - 288px - (40px * 3)) / 3),
                       (min-width: 800px) and (max-width: 1024px) calc((100vw - (40px * 4)) / 3),
                       calc(100vw - (3 * 15px) / 2)"
            srcSet={`${img330} 330w, ${img600} 600w`}
          />
          {/* <img
                sizes="(min-width: 1800px) calc((100vw - 288px - (40px * 6)) / 6),
                       (min-width: 1600px) and (max-width: 1799px) calc((100vw - 288px - (40px * 5)) / 5),
                       (min-width: 1440px) and (max-width: 1599px) calc((100vw - 288px - (40px * 4)) / 4),
                       (min-width: 1024px) and (max-width: 1439px) calc((100vw - 288px - (40px * 3)) / 3),
                       (min-width: 800px) and (max-width: 1023px) calc((100vw - (40px * 4)) / 3),
                       calc(100vw - (3 * 15px) / 2)"
                srcSet={
                  imgRoot +
                  "300 300w,\n" +
                  imgRoot +
                  "380 380w,\n" +
                  imgRoot +
                  "600 600w,\n" +
                  imgRoot +
                  "760 760w"
                }
              /> */}
          {onSelectionClick && renderHeartButton(datum)}
          {onRemoveFromSelection && renderRemoveFromSelection(datum)}
        </figure>
      ) : (
        <div className="Collection__image-container--empty">
          {onSelectionClick && renderHeartButton(datum)}
          {onRemoveFromSelection && renderRemoveFromSelection(datum)}
        </div>
      )}
      <div className="Collection__cell-label">
        <h2 className="Collection__cell-title">
          {display_name}
          {datum.authors && datum.authors.length > 0 ? ", " : ""}
        </h2>
        <small className="Collection__cell-authors">
          {datum.authors
            .map(a => [a.last_name, a.first_name].join(" "))
            .join(", ")}
        </small>
      </div>
    </a>
  );
}
