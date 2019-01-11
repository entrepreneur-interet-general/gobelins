import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import DesktopOverlayZone from "./DesktopOverlayZone";

class Styles extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
  }

  handleClick(style, ev) {
    ev.stopPropagation(); // To not close the filter panel.
    if (this.props.selectedIds.indexOf(style.id) >= 0) {
      this.props.onFilterRemove({
        type: "style",
        ids: [style.id],
        paramName: "style_ids"
      });
    } else {
      this.props.onFilterAdd({ style_ids: [style.id] });
    }
  }

  renderListItem(style) {
    return (
      <li className="Styles__col-item" key={style.id}>
        <button
          type="button"
          onClick={ev => this.handleClick(style, ev)}
          className={
            this.props.selectedIds.includes(style.id) ? "is-selected" : null
          }
        >
          {style.name}
          {/* <span className="Styles__objcount">15340</span> */}
          <div className="Styles__illustrations">
            {style.illustration_paths.map((s, i) => {
              return (
                <img
                  src={style.illustration_paths[i]}
                  alt=""
                  key={"illustration-" + s.id + "-" + i}
                />
              );
            })}
          </div>
        </button>
      </li>
    );
  }

  render() {
    return (
      <div className="Styles">
        <ul className="Styles__double-col">
          {this.props.styles.map(this.renderListItem)}
        </ul>
        <CSSTransitionGroup
          transitionName="DesktopOverlayZone"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.props.filterPanelOpen ? (
            <DesktopOverlayZone
              onClick={this.props.onClickOverlay}
              offsetLeft={450}
              filterPanelsWidth={288 + 450}
            >
              {this.props.totalHitsComponent}
            </DesktopOverlayZone>
          ) : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Styles;
