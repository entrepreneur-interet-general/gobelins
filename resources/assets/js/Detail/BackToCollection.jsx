import React, { Component } from "react";
import ArrowBack from "../icons/ArrowBack.jsx";

class BackToCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="BackToCollection">
        <a
          href="#"
          className="BackToCollection__button"
          onClick={this.props.onClick}
        >
          <ArrowBack />
          <span className="BackToCollection__label">
            Collection du <b>Mobilier national</b>
          </span>
        </a>
      </div>
    );
  }
}

export default BackToCollection;
