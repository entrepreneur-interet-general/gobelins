import React, { Component } from "react";

import Styles from "./Styles";
import ArrowBack from "../../icons/ArrowBack";

const StylesMobile = props => {
  return (
    <div className="FilterPanelMobile__filter-container StylesMobile">
      <div className="FilterPanelMobile__header StylesMobile__header">
        <button
          onClick={props.onBackToFiltersList}
          className="FilterPanelMobile__back-button StylesMobile__back-button"
        >
          <ArrowBack />
        </button>
        <div className="FilterPanelMobile__col-title StylesMobile__col-title">
          Styles
        </div>
        {props.closeButton}
      </div>
      <Styles {...props} />
    </div>
  );
};

export default StylesMobile;
