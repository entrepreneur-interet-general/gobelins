import React, { Component } from "react";

import Dimensions from "./Dimensions";
import ArrowBack from "../../icons/ArrowBack";

const DimensionsMobile = props => {
  return (
    <div className="FilterPanelMobile__filter-container DimensionsMobile">
      <div className="FilterPanelMobile__header DimensionsMobile__header">
        <button
          onClick={props.onBackToFiltersList}
          className="FilterPanelMobile__back-button DimensionsMobile__back-button"
        >
          <ArrowBack />
        </button>
        <div className="FilterPanelMobile__col-title DimensionsMobile__col-title">
          Dimensions
        </div>
        {props.closeButton}
      </div>
      <Dimensions {...props} />
    </div>
  );
};

export default DimensionsMobile;
