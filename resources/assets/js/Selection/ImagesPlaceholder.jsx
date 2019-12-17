import React from "react";
import classNames from "classnames";

import PlusLarge from "../icons/PlusLarge";

export default function ImagesPlaceholder(props) {
  return (
    <div
      className={classNames("Selections__images-placeholder", props.className)}
    >
      <div className="Selections__images-placeholder-wrapper">
        <div className="Selections__images-placeholder-inner">
          <span>
            <PlusLarge />
          </span>
          <span>
            <PlusLarge />
          </span>
          <span>
            <PlusLarge />
          </span>
          <span>
            <PlusLarge />
          </span>
        </div>
      </div>
    </div>
  );
}
