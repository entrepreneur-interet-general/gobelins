import React, { Component } from "react";
import ImageLoader from "react-loading-image";
import { Link } from "react-router-dom";
import folkloreImage from "../vendor/folklore-image.js";
import PinchZoomPan from "../vendor/react-responsive-pinch-zoom-pan/PinchZoomPan";

import Loader from "../Loader";
import ZoomIn from "../icons/ZoomIn";
import ZoomOut from "../icons/ZoomOut";
import CrossSimple from "../icons/CrossSimple";
import ArrowPrev from "../icons/ArrowPrev";
import ArrowNext from "../icons/ArrowNext";

const CustomZoomButtons = ({
  scale,
  minScale,
  maxScale,
  onZoomInClick,
  onZoomOutClick
}) => {
  return (
    <div className="DetailZoomed__toolbar">
      <button
        type="button"
        className="DetailZoomed__button DetailZoomed__button--zoom-out"
        onClick={onZoomOutClick}
        disabled={scale <= minScale}
        title="Zoom arrière"
      >
        <ZoomOut />
      </button>
      <button
        type="button"
        className="DetailZoomed__button DetailZoomed__button--zoom-in"
        onClick={onZoomInClick}
        disabled={scale >= maxScale}
        title="Zoom avant"
      >
        <ZoomIn />
      </button>
    </div>
  );
};

class DetailZoomed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomedImage: props.zoomedImage,
      currentIndex: props.images.indexOf(props.zoomedImage)
    };

    this.renderListItem = this.renderListItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
  }

  handleClick(index) {
    this.setState({ zoomedImage: this.props.images[index] });
  }

  handlePrev() {
    const nextIndex =
      this.state.currentIndex === 0
        ? this.props.images.length - 1
        : this.state.currentIndex - 1;

    this.setState({
      zoomedImage: this.props.images[nextIndex],
      currentIndex: nextIndex
    });
  }

  handleNext() {
    const nextIndex =
      this.state.currentIndex === this.props.images.length - 1
        ? 0
        : this.state.currentIndex + 1;
    this.setState({
      zoomedImage: this.props.images[nextIndex],
      currentIndex: nextIndex
    });
  }

  renderListItem(image, index) {
    let thumbUrl = folkloreImage.url(
      `/media/xl/${encodeURIComponent(image.path)}`,
      330
    );
    return (
      <li key={index}>
        <button type="button" onClick={this.handleClick.bind(this, index)}>
          <img src={thumbUrl} width="145" alt="" />
        </button>
      </li>
    );
  }

  render() {
    let imageUrl = `/media/orig/${encodeURIComponent(
      this.state.zoomedImage.path
    )}`;

    return (
      <section className="DetailZoomed">
        <figure
          className={`DetailZoomed__fig ${
            this.props.images.length > 1 ? "has-thumbnails" : ""
          }`}
        >
          <ImageLoader
            src={imageUrl}
            alt=""
            image={props => (
              <PinchZoomPan
                position="center"
                zoomButtons={false}
                customZoomButtons={CustomZoomButtons}
              >
                <img src={imageUrl} alt="" className="DetailZoomed__img" />
              </PinchZoomPan>
            )}
            loading={() => <Loader className="DetailZoomed__spinner" />}
            error={() => <div>Error</div>}
            className="DetailZoomed__img"
          />

          <div className="DetailZoomed__toolbar">
            {this.props.images && this.props.images.length > 1 ? (
              <React.Fragment>
                <button
                  type="button"
                  className="DetailZoomed__button DetailZoomed__button--prev"
                >
                  <ArrowPrev onClick={this.handlePrev} />
                </button>
                <button
                  type="button"
                  className="DetailZoomed__button DetailZoomed__button--next"
                >
                  <ArrowNext onClick={this.handleNext} />
                </button>
              </React.Fragment>
            ) : null}
          </div>
        </figure>
        {this.props.images && this.props.images.length > 1 ? (
          <ul className="DetailZoom__thumbails">
            {this.props.images.map(this.renderListItem)}
          </ul>
        ) : null}
        <Link className="DetailZoom__close" to={this.props.detailPath}>
          <CrossSimple width={10} height={10} />
        </Link>
      </section>
    );
  }
}

export default DetailZoomed;
