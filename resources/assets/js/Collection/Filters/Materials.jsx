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

  hasRenderedTextileBanner = false;

  renderTextileBanner = mat => {
    if (mat.is_textile_technique && this.hasRenderedTextileBanner === false) {
      this.hasRenderedTextileBanner = true;
      return (
        <li className="Materials__lvl2-item is-textile-technique-banner">
          <span>Techniques de tissage :</span>
        </li>
      );
    }
  };

  renderSecondColumnItem(mat, parentIsSelected, i) {
    return (
      <React.Fragment key={i}>
        {this.renderTextileBanner(mat)}
        <li className="Materials__lvl2-item">
          <button
            type="button"
            onClick={ev => this.props.onSecondColumnClick(mat, ev)}
            className={
              "Materials__lvl2-button" +
              (this.props.selectedIds.indexOf(mat.id) >= 0
                ? " is-selected"
                : "")
            }
          >
            {mat.name}
          </button>
        </li>
      </React.Fragment>
    );
  }
  render() {
    this.hasRenderedTextileBanner = false;
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
  mouseEnter: (props, component) => {
    if (props.mat.children.length) {
      props.onActiveSecondCol(props.mat);
    } else {
      props.onActiveSecondCol(MaterialNullObject);
    }
  }
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
    classes +=
      mat.children.filter(val => -1 !== this.props.selectedIds.indexOf(val.id))
        .length > 0
        ? " has-selected-children"
        : "";

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
    this.isSecondColVisible = this.isSecondColVisible.bind(this);
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

  isSecondColVisible() {
    return this.state.expandedMaterial.children.length > 0;
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
              onClickOverlay={this.props.onClickOverlay}
              offsetLeft={this.isSecondColVisible() ? 288 + 288 : 288}
              filterPanelsWidth={
                this.isSecondColVisible() ? 288 + 288 + 288 : 288 + 288
              }
            >
              {this.props.totalHitsComponent}
            </DesktopOverlayZone>
          ) : null}
        </CSSTransitionGroup>
        {this.state.expandedMaterial.id ? (
          <SecondColMenu
            parentMat={this.state.expandedMaterial}
            items={this.state.expandedMaterial.children}
            selectedIds={this.props.selectedIds}
            onSecondColumnClick={this.handleSecondColumnClick}
            onAddAllClick={this.handleAddAllClick}
          />
        ) : null}
      </div>
    );
  }
}

export default Materials;
