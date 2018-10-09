import React, { Component } from "react";
import ImageLoader from "react-loading-image";
import MagnifyingGlass from "./MagnifyingGlass";
import Download from "./Download";
import Loader from "../Loader.jsx";

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
                "/image/" + encodeURIComponent(this.props.image.path) + "?w=800"
              }
              alt=""
              image={props => (
                <img
                  src={
                    "/image/" +
                    encodeURIComponent(this.props.image.path) +
                    "?w=800"
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
              <button
                type="button"
                onClick={this.props.onZoom}
                className="DetailMainImage__button DetailMainImage__button--magnifying-glass"
              >
                <MagnifyingGlass />
              </button>
              <button
                type="button"
                className="DetailMainImage__button DetailMainImage__button--download"
              >
                <Download />
              </button>
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
