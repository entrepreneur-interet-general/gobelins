import React, { Component } from "react";
import ImageLoader from "react-loading-image";
import { Link } from "react-router-dom";

import MagnifyingGlass from "../icons/MagnifyingGlass";
import Download from "../icons/Download";
import Heart from "../icons/Heart";
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
    let downloadUrl = this.props.image
      ? `${location.origin}/media/orig/${encodeURIComponent(
          this.props.image.path
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

            {this.props.onSelectionClick && (
              <div
                className="DetailMainImage__aspect-ratio-container"
                style={{
                  "--aspect-ratio":
                    this.props.image.width / this.props.image.height
                }}
              >
                <div>
                  <button
                    type="button"
                    className="DetailMainImage__button DetailMainImage__button--selection"
                    onClick={this.props.onSelectionClick.bind(
                      this,
                      this.props.product
                    )}
                    title="Ajouter l’objet à une sélection"
                  >
                    <Heart width="20" height="20" />
                  </button>
                </div>
              </div>
            )}

            <div className="DetailMainImage__toolbar">
              <Link
                to={`${this.props.match.url}/zoom`}
                className="DetailMainImage__button DetailMainImage__button--magnifying-glass"
                title="Agrandir l’image"
              >
                <MagnifyingGlass />
              </Link>
              <a
                href={downloadUrl}
                download={downloadFilename}
                onClick={() => this.props.onDownload(downloadUrl)}
                className="DetailMainImage__button DetailMainImage__button--download"
                title="Télécharger l’image en haute définition"
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
