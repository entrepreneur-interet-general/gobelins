import React, { Component } from "react";

class Dimensions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height_or_thickness_gte: props.height_or_thickness_gte || 0,
      height_or_thickness_lte:
        props.height_or_thickness_lte ||
        props.dimensions.max_height_or_thickness,
      depth_or_width_gte: props.depth_or_width_gte || 0,
      depth_or_width_lte:
        props.depth_or_width_lte || props.dimensions.max_depth_or_width,
      length_or_diameter_gte: props.length_or_diameter_gte || 0,
      length_or_diameter_lte:
        props.length_or_diameter_lte || props.dimensions.max_length_or_diameter
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderFormBlock = this.renderFormBlock.bind(this);
  }

  handleChange(type, event) {
    this.setState({ [type]: event.target.value });
  }

  handleKeyDown(type, event) {
    let filterObj = {};
    if (event.keyCode == 13) {
      this.handleUpdate(type);
      //   [
      //     "height_or_thickness_lte",
      //     "height_or_thickness_gte",
      //     "depth_or_width_lte",
      //     "depth_or_width_gte",
      //     "length_or_diameter_lte",
      //     "length_or_diameter_gte"
      //   ].forEach(val => {
      //     if (this.state[val]) {
      //       filterObj[val] = this.state[val];
      //     }
      //   });
      //   if (Object.keys(filterObj).length > 0) {
      //     this.props.onFilterAdd(filterObj);
      //   }
    }
  }

  handleBlur(type, event) {
    // In case the user deleted the value, restore default ones.
    let notEmptyValues = {};
    if (this.state[type + "_gte"] == "") {
      notEmptyValues[type + "_gte"] = 0;
    }
    if (this.state[type + "_lte"] == "") {
      notEmptyValues[type + "_lte"] = this.props.dimensions["max_" + type];
    }
    this.handleUpdate(type);
  }

  handleUpdate(type) {
    let filterObj = {};
    filterObj[type + "_gte"] = this.state[type + "_gte"];
    filterObj[type + "_lte"] = this.state[type + "_lte"];
    this.props.onFilterAdd(filterObj);
  }

  renderFormBlock(dimension) {
    return (
      <div className="Dimensions__form-block" key={dimension[0]}>
        <div className="Dimensions__label">
          <b>{dimension[1]}</b> comprise entre
        </div>
        <div className="Dimensions__inputs-line">
          <div className="Dimensions__inputs-container">
            <input
              type="text"
              value={this.state[dimension[0] + "_gte"]}
              onChange={this.handleChange.bind(this, dimension[0] + "_gte")}
              onKeyDown={this.handleKeyDown.bind(this, dimension[0])}
              onBlur={this.handleBlur.bind(this, dimension[0])}
              placeholder="0"
            />
            et
            <input
              type="text"
              value={this.state[dimension[0] + "_lte"]}
              onChange={this.handleChange.bind(this, dimension[0] + "_lte")}
              onKeyDown={this.handleKeyDown.bind(this, dimension[0])}
              onBlur={this.handleBlur.bind(this, dimension[0])}
              placeholder={this.props.dimensions["max_" + dimension[0]]}
            />
          </div>
          m.
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Dimensions" onClick={ev => ev.stopPropagation()}>
        <div className="Dimensions__illustrations">
          <img
            src="/images/ilu-dimensions@2x.png"
            alt=""
            width="200"
            height="622"
          />
        </div>
        <div className="Dimensions__form">
          {[
            ["length_or_diameter", "Longueur"],
            ["depth_or_width", "Largeur"],
            ["height_or_thickness", "Hauteur"]
          ].map(this.renderFormBlock)}
        </div>
        >
      </div>
    );
  }
}

export default Dimensions;
