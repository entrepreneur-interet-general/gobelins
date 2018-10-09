import React, { Component } from "react";

import BackToCollection from "./BackToCollection.jsx";
import MainImage from "./MainImage.jsx";
import ImageList from "./ImageList.jsx";
import Title from "./Title.jsx";
import Data from "./Data.jsx";
import Info from "./Info.jsx";
import DetailZoomed from "./DetailZoomed.jsx";

class DetailDesktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImageIndex: 0,
      layoutOrientation: this.computeLayoutOrientation(),
      zoomedMode: false
    };
    this.computeLayoutOrientation = this.computeLayoutOrientation.bind(this);
    this.handleMainImageIndex = this.handleMainImageIndex.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
  }

  computeLayoutOrientation() {
    if (
      this.props.product &&
      this.props.product.images &&
      this.props.product.images instanceof Array &&
      this.props.product.images.length > 0
    ) {
      const img = this.props.product.images[0];
      return img.height >= img.width ? "portrait" : "landscape";
    } else {
      return "landscape";
    }
  }

  handleMainImageIndex(index) {
    this.setState({ mainImageIndex: index });
  }

  handleZoom() {
    this.setState({
      zoomedMode: true
    });
  }

  render() {
    return (
      <article className="Detail">
        <div
          className={
            "DetailDesktop has-" + this.state.layoutOrientation + "-poster"
          }
        >
          <div className="DetailDesktop__left-zone">
            <BackToCollection onClick={this.props.onBackToCollection} />
            <MainImage
              image={this.props.product.images[this.state.mainImageIndex]}
              onZoom={this.handleZoom}
            />
            <ImageList
              images={this.props.product.images}
              onChangeMainImageIndex={this.handleMainImageIndex}
            />
          </div>

          <div className="DetailDesktop__right-zone">
            <Title
              denomination={this.props.product.denomination}
              designation={this.props.product.title_or_designation}
            />
            <div className="DetailDesktop__right-zone-dblcol">
              <Data product={this.props.product} />
              <Info product={this.props.product} />
            </div>
          </div>
        </div>
        {this.state.zoomedMode ? (
          <DetailZoomed
            images={this.props.product.images}
            zoomedImage={this.props.product.images[this.state.mainImageIndex]}
            onClose={() => this.setState({ zoomedMode: false })}
          />
        ) : null}
      </article>
    );
  }
}

export default DetailDesktop;
