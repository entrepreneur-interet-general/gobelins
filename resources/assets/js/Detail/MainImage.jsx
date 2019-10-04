import React, { Component } from "react";
import ImageLoader from "react-loading-image";
import { Link } from "react-router-dom";

import MagnifyingGlass from "../icons/MagnifyingGlass";
import Download from "../icons/Download";
import Loader from "../Loader";

class MainImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let imgUrl = this.props.image
      ? `/media/xl/${encodeURIComponent(
          this.props.image.path.replace(".JPG", ".jpg")
        )}`
      : "";
    let downloadFilename = "";
    let downloadFilenameRes = this.props.image
      ? this.props.image.path.match(/.*\/(.+)(\.jpg)$/i)
      : null;
    if (downloadFilenameRes) {
      downloadFilename =
        downloadFilenameRes[1] +
        " © Mobilier national" +
        downloadFilenameRes[2];
    }
    return (
      <section className="DetailMainImage">
        {this.props.image ? (
          <figure className="DetailMainImage__fig">
            <ImageLoader
              src={imgUrl}
              alt=""
              image={props => (
                <Link to={`${this.props.match.url}/zoom`}>
                  <img src={imgUrl} alt="" className="DetailMainImage__img" />
                </Link>
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
              <button
                type="button"
                onClick={this.props.onDownload}
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
