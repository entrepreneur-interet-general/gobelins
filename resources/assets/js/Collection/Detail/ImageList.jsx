import React, { Component } from "react";

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
    return (
      <li key={index}>
        <button type="button" onClick={this.handleClick.bind(null, index)}>
          <img
            src={"/image/" + encodeURIComponent(img.path) + "?w=160"}
            alt=""
          />
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
