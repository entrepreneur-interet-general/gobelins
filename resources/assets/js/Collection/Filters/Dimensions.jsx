import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import DesktopOverlayZone from "./DesktopOverlayZone";
import DimensionSlider from "./DimensionSlider";

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
    this.renderFormBlock = this.renderFormBlock.bind(this);
  }

  renderFormBlock(dimension) {
    return (
      <div className="Dimensions__form-block" key={dimension[0]}>
        <div className="Dimensions__label">
          <b>{dimension[1]}</b> comprise entre
        </div>
        <div className="Dimensions__slider-container">
          <DimensionSlider
            dimension={dimension[0]}
            min={this.state[dimension[0] + "_gte"] || 0}
            max={
              this.state[dimension[0] + "_lte"] ||
              this.props.dimensions["max_" + dimension[0]]
            }
            domainMin={0}
            domainMax={this.props.dimensions["max_" + dimension[0]]}
            onFilterAdd={this.props.onFilterAdd}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Dimensions">
        <div
          className="Dimensions__illustrations"
          onClick={ev => ev.stopPropagation()}
        >
          <img
            src="/images/ilu-dimensions@2x.png"
            alt=""
            width="200"
            height="622"
          />
        </div>
        <div className="Dimensions__form" onClick={ev => ev.stopPropagation()}>
          {[
            ["length_or_diameter", "Longueur"],
            ["depth_or_width", "Largeur"],
            ["height_or_thickness", "Hauteur"]
          ].map(this.renderFormBlock)}
        </div>
        <CSSTransitionGroup
          transitionName="DesktopOverlayZone"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.props.filterPanelOpen ? (
            <DesktopOverlayZone
              onClick={this.props.onClickOverlay}
              offsetLeft={288 + 288}
              filterPanelsWidth={288 + 288 + 288}
            >
              {this.props.totalHitsComponent}
            </DesktopOverlayZone>
          ) : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Dimensions;
