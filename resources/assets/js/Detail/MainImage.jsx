import React, { Component } from "react";
import ImageLoader from "react-loading-image";
import { Link } from "react-router-dom";
// import folkloreImage from "../vendor/folklore-image.js";

import MagnifyingGlass from "./MagnifyingGlass";
import Download from "./Download";
import Loader from "../Loader";

class MainImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let imgUrl = this.props.image
      ? `/media/xl/${encodeURIComponent(this.props.image.path)}`
      : "";
    let downloadFilename = "";
    let downloadFilenameRes = this.props.image.path.match(/.*\/(.+)(\.jpg)$/i);
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
                <img src={imgUrl} alt="" className="DetailMainImage__img" />
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
                href={`/media/orig/${encodeURIComponent(
                  this.props.image.path
                )}`}
                download={downloadFilename}
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
