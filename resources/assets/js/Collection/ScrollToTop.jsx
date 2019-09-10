import React, { useState, useEffect } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import ArrowTop from "../icons/ArrowTop";

export default function ScrollToTop(props) {
  const [isVisible, setVisibility] = useState(false);

  function onScroll() {
    setVisibility(Boolean(window.scrollY !== 0));
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  });

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <CSSTransitionGroup
      transitionName="scrollToTop"
      transitionEnterTimeout={200}
      transitionLeaveTimeout={200}
    >
      {isVisible && (
        <button className="ScrollToTop" onClick={scrollToTop} type="button">
          <ArrowTop />
        </button>
      )}
    </CSSTransitionGroup>
  );
}
