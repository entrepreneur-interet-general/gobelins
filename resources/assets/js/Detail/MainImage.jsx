import React, { Component } from "react";
import ImageLoader from "react-loading-image";
import { Link } from "react-router-dom";

import MagnifyingGlass from "./MagnifyingGlass";
import Download from "./Download";
import Loader from "../Loader";

class MainImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <section className="DetailMainImage">
        {this.props.image ? (
          <figure className="DetailMainImage__fig">
            <ImageLoader
              src={
                "/image/" +
                encodeURIComponent(this.props.image.path) +
                "?q=40&fm=jpg&cache=1&w=1200"
              }
              alt=""
              image={props => (
                <img
                  src={
                    "/image/" +
                    encodeURIComponent(this.props.image.path) +
                    "?q=40&fm=jpg&cache=1&w=1200"
                  }
                  alt=""
                  className="DetailMainImage__img"
                />
              )}
              loading={() => <Loader className="DetailMainImage__spinner" />}
              error={() => <div>Error</div>}
              className="DetailMainImage__img"
            />

            <div className="DetailMainImage__toolbar">
              <Link
                to={`${this.props.match.url}/zoom`}
                className="DetailMainImage__button DetailMainImage__button--magnifying-glass"
              >
                <MagnifyingGlass />
              </Link>
              <a
                href={`/image/${encodeURIComponent(this.props.image.path)}`}
                download
                onClick={this.props.onDownload}
                className="DetailMainImage__button DetailMainImage__button--download"
              >
                <Download />
              </a>
            </div>
          </figure>
        ) : (
          <figure className="DetailMainImage__fig has-no-image">
            <span>Objet sans image</span>
          </figure>
        )}
      </section>
    );
  }
}

export default MainImage;
