import React, { Component } from "react";
import { source, target } from "react-aim";
import { CSSTransitionGroup } from "react-transition-group";

import DesktopOverlayZone from "./DesktopOverlayZone";

const MaterialNullObject = {
  id: null,
  children: []
};

@target()
class SecondColMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderSecondColumnItem = this.renderSecondColumnItem.bind(this);
  }
  renderSecondColumnItem(mat, parentIsSelected, i) {
    return (
      <li className="Materials__lvl2-item" key={i}>
        <button
          type="button"
          onClick={ev => this.props.onSecondColumnClick(mat, ev)}
          className={
            "Materials__lvl2-button" +
            (parentIsSelected || this.props.selectedIds.indexOf(mat.id) >= 0
              ? " is-selected"
              : "")
          }
        >
          {mat.name}
        </button>
      </li>
    );
  }
  render() {
    const parentIsSelected =
      this.props.selectedIds.indexOf(this.props.parentMat.id) >= 0;
    return (
      <ul className="Materials__lvl2">
        <li className="Materials__lvl2-item" key="All">
          <button
            type="button"
            onClick={ev => this.props.onAddAllClick(this.props.parentMat, ev)}
            className={
              "Materials__lvl2-button" +
              (parentIsSelected ? " is-selected" : "")
            }
          >
            Tous
          </button>
        </li>
        {this.props.items.map((m, i) =>
          this.renderSecondColumnItem(m, parentIsSelected, i)
        )}
      </ul>
    );
  }
}

@source({
  mouseEnter: (props, component) => props.onActiveSecondCol(props.mat)
})
class FirstColMenuItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const mat = this.props.mat;
    let classes = "Materials__lvl1-button";
    classes += this.props.selected ? " is-selected" : "";
    classes += mat.children.length > 0 ? " has-children" : "";
    classes += mat.id === this.props.expandedMaterial.id ? " is-hovered" : "";

    let secondCol =
      mat.children.length > 0 && this.props.expandedMaterial.id === mat.id ? (
        <SecondColMenu
          parentMat={mat}
          items={mat.children}
          selectedIds={this.props.selectedIds}
          onSecondColumnClick={this.props.onSecondColumnClick}
          onAddAllClick={this.props.onAddAllClick}
        />
      ) : null;
    return (
      <li className="Materials__lvl1-item" key={this.props.key}>
        <button
          type="button"
          onClick={ev => this.props.onFirstColumnClick(mat, ev)}
          className={classes}
        >
          {this.props.mat.name}
          <svg
            width="6"
            height="10"
            fill="none"
            className="Materials__lvl1-chevron"
          >
            <path d="M1 1L5 5L1 9" stroke="currentColor" />
          </svg>

          {/* <span className="Materials__objcount">15340</span> */}
        </button>

        {secondCol}
      </li>
    );
  }
}

class Materials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedMaterial: MaterialNullObject
    };
    this.handleFirstColumnClick = this.handleFirstColumnClick.bind(this);
    this.handleAddAllClick = this.handleAddAllClick.bind(this);
    this.handleActiveSecondCol = this.handleActiveSecondCol.bind(this);
    this.handleSecondColumnClick = this.handleSecondColumnClick.bind(this);
  }

  handleFirstColumnClick(mat, ev) {
    ev.stopPropagation();

    if (this.props.selectedIds.indexOf(mat.id) >= 0) {
      this.props.onFilterRemove({
        type: "material",
        ids: [mat.id],
        paramName: "material_ids"
      });
    } else {
      if (mat.children.length > 0) {
        const childrenIds = mat.children.map(c => c.id);
        const materialsToRemove = this.props.selectedIds.filter(
          id => childrenIds.indexOf(id) >= 0
        );

        if (materialsToRemove.length > 0) {
          const removeObj = {
            type: "material",
            ids: materialsToRemove,
            paramName: "material_ids"
          };
          this.props.onFilterChange({ material_ids: [mat.id] }, removeObj);
        } else {
          this.props.onFilterAdd({ material_ids: [mat.id] });
        }
      } else {
        this.props.onFilterAdd({ material_ids: [mat.id] });
      }
    }
  }

  handleSecondColumnClick(mat, ev) {
    ev.stopPropagation();

    // Is this material's parent selected ?
    if (this.props.selectedIds.indexOf(this.state.expandedMaterial.id) >= 0) {
      // Remove the parent id, and add the clicked item.
      const filtersToDelete = {
        type: "material",
        ids: [this.state.expandedMaterial.id],
        paramName: "material_ids"
      };
      this.props.onFilterChange({ material_ids: [mat.id] }, filtersToDelete);
    } else {
      // Simply toggle this material on/off
      if (this.props.selectedIds.indexOf(mat.id) >= 0) {
        this.props.onFilterRemove({
          type: "material",
          ids: [mat.id],
          paramName: "material_ids"
        });
      } else {
        this.props.onFilterAdd({
          material_ids: [mat.id]
        });
      }
    }
  }

  handleAddAllClick(group, ev) {
    ev.stopPropagation();
    const filtersToDelete = {
      type: "material",
      ids: group.children.map(mat => mat.id),
      paramName: "material_ids"
    };

    this.props.onFilterChange(
      // Add this id.
      { material_ids: [group.id] },
      // Remove these ids.
      filtersToDelete
    );
  }

  handleActiveSecondCol(mat) {
    this.setState({ expandedMaterial: mat });
  }

  render() {
    return (
      <div className="Materials">
        <ul className="Materials__lvl1">
          {this.props.materials.map((mat, i) => {
            return (
              <FirstColMenuItem
                mat={mat}
                selected={this.props.selectedIds.indexOf(mat.id) >= 0}
                key={i}
                onActiveSecondCol={this.handleActiveSecondCol}
                expandedMaterial={this.state.expandedMaterial}
                selectedIds={this.props.selectedIds}
                onSecondColumnClick={this.handleSecondColumnClick}
                onAddAllClick={this.handleAddAllClick}
                onFirstColumnClick={this.handleFirstColumnClick}
              />
            );
          })}
        </ul>
        <CSSTransitionGroup
          transitionName="DesktopOverlayZone"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.props.filterPanelOpen ? (
            <DesktopOverlayZone
              onClick={this.props.onClickOverlay}
              offsetLeft={288}
              filterPanelsWidth={288 + 288}
            >
              {this.props.totalHitsComponent}
            </DesktopOverlayZone>
          ) : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Materials;
