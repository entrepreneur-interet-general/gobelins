import React, { Component } from "react";
import ImageLoader from "react-loading-image";
import { Link } from "react-router-dom";

import Loader from "../Loader.jsx";
import ZoomIn from "./ZoomIn";
import ZoomOut from "./ZoomOut";
import Cross from "./Cross";

class DetailZoomed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomedImage: props.zoomedImage
    };
    this.renderListItem = this.renderListItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index) {
    this.setState({ zoomedImage: this.props.images[index] });
  }

  renderListItem(image, index) {
    return (
      <li key={index}>
        <button type="button" onClick={this.handleClick.bind(this, index)}>
          <img
            src={"/image/" + encodeURIComponent(image.path) + "?w=145"}
            width="145"
            alt=""
          />
        </button>
      </li>
    );
  }

  render() {
    return (
      <section className="DetailZoomed">
        <figure className="DetailZoomed__fig">
          <ImageLoader
            src={"/image/" + encodeURIComponent(this.state.zoomedImage.path)}
            alt=""
            image={props => (
              <img
                src={
                  "/image/" + encodeURIComponent(this.state.zoomedImage.path)
                }
                alt=""
                className="DetailZoomed__img"
              />
            )}
            loading={() => <Loader className="DetailZoomed__spinner" />}
            error={() => <div>Error</div>}
            className="DetailZoomed__img"
          />

          <div className="DetailZoomed__toolbar">
            <button
              type="button"
              className="DetailZoomed__button DetailZoomed__button--magnifying-glass"
            >
              <ZoomIn />
            </button>
            <button
              type="button"
              className="DetailZoomed__button DetailZoomed__button--download"
            >
              <ZoomOut />
            </button>
          </div>
        </figure>
        <ul className="DetailZoom__thumbails">
          {this.props.images.map(this.renderListItem)}
        </ul>
        <Link className="DetailZoom__close" to={this.props.detailPath}>
          <Cross />
        </Link>
      </section>
    );
  }
}

export default DetailZoomed;
