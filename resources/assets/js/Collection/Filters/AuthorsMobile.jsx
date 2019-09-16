import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import Authors from "./Authors";
import ArrowBack from "../../icons/ArrowBack";

const AuthorsMobile = props => {
  return (
    <div className="AuthorsMobile">
      <div className="AuthorsMobile__header">
        <button
          onClick={props.onBackToFiltersList}
          className="AuthorsMobile__back-button"
        >
          <ArrowBack />
        </button>
        <div className="AuthorsMobile__col-title">Auteur</div>
        {props.closeButton}
      </div>
      <Authors {...props} />
    </div>
  );
};

export default AuthorsMobile;
