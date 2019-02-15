import React, { Component } from "react";
import { Route } from "react-router-dom";

import BackToCollection from "./BackToCollection.jsx";
import MainImage from "./MainImage.jsx";
import ImageList from "./ImageList.jsx";
import Title from "./Title.jsx";
import Data from "./Data.jsx";
import Info from "./Info.jsx";
import DetailZoomed from "./DetailZoomed.jsx";
import DownloadModal from "./DownloadModal.jsx";

class DetailDesktop extends Component {
  constructor(props) {
    super(props);
    this.hasImages =
      props.product &&
      props.product.images &&
      props.product.images instanceof Array &&
      props.product.images.length > 0;
    this.hasSingleImage =
      props.product &&
      props.product.images &&
      props.product.images instanceof Array &&
      props.product.images.length === 1;
    this.state = {
      mainImageIndex: 0,
      layoutOrientation: this.computeLayoutOrientation(),
      zoomedMode: false,
      downloadMode: false
    };
    this.computeLayoutOrientation = this.computeLayoutOrientation.bind(this);
    this.handleMainImageIndex = this.handleMainImageIndex.bind(this);
  }

  computeLayoutOrientation() {
    if (this.hasImages) {
      const img = this.props.product.images[0];
      return img.height >= img.width ? "portrait" : "landscape";
    } else {
      return "landscape";
    }
  }

  handleMainImageIndex(index) {
    this.setState({ mainImageIndex: index });
  }

  render() {
    return (
      <article className="Detail">
        <Route
          exact
          path={this.props.match.path}
          render={props => (
            <div
              className={
                "DetailDesktop has-" +
                this.state.layoutOrientation +
                "-poster" +
                (this.hasSingleImage ? " has-single-image" : "")
              }
            >
              <div className="DetailDesktop__left-zone">
                <BackToCollection onClick={this.props.onBackToCollection} />

                <MainImage
                  image={
                    this.hasImages
                      ? this.props.product.images[this.state.mainImageIndex]
                      : null
                  }
                  onZoom={() => this.setState({ zoomedMode: true })}
                  match={this.props.match}
                  onDownload={() =>
                    this.setState({
                      downloadMode: true
                    })
                  }
                />
                {this.hasImages && this.props.product.images.length > 1 ? (
                  <ImageList
                    images={this.hasImages ? this.props.product.images : []}
                    onChangeMainImageIndex={this.handleMainImageIndex}
                  />
                ) : (
                  <div className="DetailImageList--spacer" />
                )}
              </div>

              <div className="DetailDesktop__right-zone">
                <Title
                  denomination={this.props.product.denomination}
                  designation={this.props.product.title_or_designation}
                />
                <div className="DetailDesktop__right-zone-dblcol">
                  <Data
                    product={this.props.product}
                    mainImage={
                      this.hasImages
                        ? this.props.product.images[this.state.mainImageIndex]
                        : null
                    }
                  />
                  <Info product={this.props.product} />
                </div>
              </div>
            </div>
          )}
        />
        <Route
          path={`${this.props.match.path}/zoom`}
          render={props => (
            <DetailZoomed
              images={this.hasImages ? this.props.product.images : []}
              zoomedImage={this.props.product.images[this.state.mainImageIndex]}
              detailPath={this.props.match.url}
            />
          )}
        />
        {this.state.downloadMode ? (
          <DownloadModal
            onDownload={() => this.setState({ downloadMode: true })}
            onClose={() =>
              this.setState({
                downloadMode: false
              })
            }
            photographer={
              this.hasImages
                ? this.props.product.images[this.state.mainImageIndex]
                    .photographer
                : null
            }
            license={
              this.hasImages
                ? this.props.product.images[this.state.mainImageIndex].license
                : null
            }
          />
        ) : null}
      </article>
    );
  }
}

export default DetailDesktop;
