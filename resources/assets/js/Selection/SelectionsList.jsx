import React, { useState, useEffect } from "react";
import Bricks from "bricks.js";
import { Media } from "react-breakpoints";

export default function SelectionsList(props) {
  let masonryContainerRef = React.createRef();

  useEffect(() => {
    // If we aren't displaying the container
    // (because no selections or mobile breakpoint)
    // then bail.
    if (!masonryContainerRef.current) {
      return;
    }
    const bricksInstance = Bricks({
      container: masonryContainerRef.current,
      packed: "packed",
      sizes: [{ columns: 2, gutter: 0 }],
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
  }, [props.children]);

  return (
    <Media>
      {({ breakpoints, currentBreakpoint }) =>
        breakpoints[currentBreakpoint] >= breakpoints.small ? (
          <div className="SelectionsList__masonry-container">
            <div ref={masonryContainerRef}>{props.children}</div>
          </div>
        ) : (
          <div className="SelectionsList__mobile-container">
            {props.children}
          </div>
        )
      }
    </Media>
  );
}
