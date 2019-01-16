import React, { Component } from "react";
import folkloreImage from "../vendor/folklore-image.js";

class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderListItem = this.renderListItem.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(index, event) {
    this.props.onChangeMainImageIndex(index);
  }

  renderListItem(img, index) {
    let thumbUrl = folkloreImage.url(
      `/media/xl/${encodeURIComponent(img.path)}`,
      160
    );
    return (
      <li key={index}>
        <button type="button" onClick={this.handleClick.bind(null, index)}>
          <img src={thumbUrl} alt="" />
        </button>
      </li>
    );
  }
  render() {
    return (
      <ul className="DetailImageList">
        {this.props.images.map(this.renderListItem)}
      </ul>
    );
  }
}

export default ImageList;
