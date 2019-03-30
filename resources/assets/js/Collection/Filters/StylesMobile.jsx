import React, { Component } from "react";

import Styles from "./Styles";
import ArrowBack from "../../icons/ArrowBack";

const StylesMobile = props => {
  return (
    <div className="StylesMobile">
      <div className="StylesMobile__header">
        <button
          onClick={props.onBackToFiltersList}
          className="StylesMobile__back-button"
        >
          <ArrowBack />
        </button>
        <div className="StylesMobile__col-title">Styles</div>
        {props.closeButton}
      </div>
      <Styles {...props} />
    </div>
  );
};

export default StylesMobile;
