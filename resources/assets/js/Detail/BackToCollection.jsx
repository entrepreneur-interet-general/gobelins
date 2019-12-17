import React, { Component } from "react";
import { Link } from "react-router-dom";
import ArrowBack from "../icons/ArrowBack.jsx";

class BackToCollection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="BackToCollection">
        {this.props.prevPath && this.props.prevPath.match("selection") ? (
          <Link to={this.props.prevPath} className="BackToCollection__button">
            <ArrowBack />
          </Link>
        ) : (
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
        )}
      </div>
    );
  }
}

export default BackToCollection;
