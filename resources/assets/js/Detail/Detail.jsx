import React, { Component } from "react";
import { Route } from "react-router-dom";
import { hotkeys } from "react-keyboard-shortcuts";
import { Media } from "react-breakpoints";

import BackToCollection from "./BackToCollection.jsx";
import MainImage from "./MainImage.jsx";
import ImageList from "./ImageList.jsx";
import Title from "./Title.jsx";
import Data from "./Data.jsx";
import Info from "./Info.jsx";
import DetailZoomed from "./DetailZoomed.jsx";
import DownloadModal from "./DownloadModal.jsx";

class Detail extends Component {
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
    this.renderTitle = this.renderTitle.bind(this);
    this.hot_keys = {
      esc: {
        priority: 1,
        handler: this.props.onBackToCollection
      }
    };
  }

  componentDidMount() {
    let p = this.props.product;
    let title = [p.denomination, p.designation].join(" ").replace(/\n/g, " ");
    window.document.title = `${title} — Collection du Mobilier national MN/Lab`;
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

  renderTitle() {
    return (
      <Title
        denomination={this.props.product.denomination}
        designation={this.props.product.title_or_designation}
      />
    );
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path={this.props.match.path}
          render={props => (
            <article
              className={
                "Detail has-" +
                this.state.layoutOrientation +
                "-poster" +
                (this.hasSingleImage ? " has-single-image" : "")
              }
            >
              <div className="Detail__left-zone">
                <BackToCollection onClick={this.props.onBackToCollection} />

                <Media>
                  {({ breakpoints, currentBreakpoint }) =>
                    breakpoints[currentBreakpoint] < breakpoints.tablet &&
                    this.renderTitle()
                  }
                </Media>
                <MainImage
                  image={
                    this.hasImages
                      ? this.props.product.images[this.state.mainImageIndex]
                      : null
                  }
                  onZoom={() => this.setState({ zoomedMode: true })}
                  match={this.props.match}
                  onDownload={() => {
                    window.document.documentElement.classList.add(
                      "prevent-scroll"
                    );
                    this.setState({
                      downloadMode: true
                    });
                  }}
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

              <div className="Detail__right-zone">
                <Media>
                  {({ breakpoints, currentBreakpoint }) =>
                    breakpoints[currentBreakpoint] >= breakpoints.small &&
                    this.renderTitle()
                  }
                </Media>
                <div className="Detail__right-zone-dblcol">
                  <Data
                    product={this.props.product}
                    title={this.renderTitle()}
                    mainImage={
                      this.hasImages
                        ? this.props.product.images[this.state.mainImageIndex]
                        : null
                    }
                  />
                  <Info product={this.props.product} />
                </div>
              </div>
            </article>
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
        {this.state.downloadMode && (
          <DownloadModal
            onClose={() => {
              window.document.documentElement.classList.remove(
                "prevent-scroll"
              );
              this.setState({
                downloadMode: false
              });
            }}
            photographer={
              this.hasImages &&
              this.props.product.images[this.state.mainImageIndex].photographer
            }
            license={
              this.hasImages &&
              this.props.product.images[this.state.mainImageIndex].license
            }
          />
        )}
      </React.Fragment>
    );
  }
}

export default hotkeys(Detail);
