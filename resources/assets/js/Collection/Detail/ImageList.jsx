import React, { Component } from "react";

class ImageList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderListItem(img, index) {
    return (
      <li key={index}>
        <img
          src={"/image/" + encodeURIComponent(img.path) + "?w=160"}
          alt=""
          width="80"
          height="80"
        />
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
