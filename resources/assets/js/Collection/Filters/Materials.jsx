import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import ReactHoverObserver from "react-hover-observer";
import difference from "lodash/difference";

const MaterialNullObject = {
  id: null,
  children: []
};

class Materials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedMaterial: MaterialNullObject
    };
    this.renderFirstColumnItem = this.renderFirstColumnItem.bind(this);
    this.renderSecondColumnItem = this.renderSecondColumnItem.bind(this);
    this.handleFirstColumnClick = this.handleFirstColumnClick.bind(this);
    this.handleHoverChange = this.handleHoverChange.bind(this);
    this.handleAddAllClick = this.handleAddAllClick.bind(this);
  }

  handleHoverChange(mat, { isHovering }) {
    if (isHovering && mat.children.length > 0) {
      this.setState({ expandedMaterial: mat });
    } else if (isHovering && mat.children.length === 0) {
      this.setState({ expandedMaterial: MaterialNullObject });
    }
  }

  handleFirstColumnClick(mat, ev) {
    ev.stopPropagation();
    if (mat.children.length > 0) {
      // Expand the second column panel.
      //   this.setState({ expandedMaterial: mat });
    } else {
      //   this.setState({ expandedMaterial: MaterialNullObject });
      this.props.onFilterAdd({ material_ids: [mat.id] });
    }
  }
  handleSecondColumnClick(mat, ev) {
    ev.stopPropagation();

    // Is this material's parent selected ?
    if (this.props.selectedIds.indexOf(this.state.expandedMaterial.id) >= 0) {
      // Remove the parent id, and add all the siblings.
      const filtersToDelete = {
        type: "material",
        ids: [this.state.expandedMaterial.id],
        paramName: "material_ids"
      };
      this.props.onFilterChange(
        // Add this id.
        {
          material_ids: this.state.expandedMaterial.children
            .map(m => m.id)
            .filter(id => id !== mat.id)
        }, // Remove these ids.
        filtersToDelete
      );
    } else {
      const otherSiblings = this.state.expandedMaterial.children
        .map(m => m.id)
        .filter(id => id !== mat.id);

      // Are all the siblings of this material already selected ?
      if (difference(otherSiblings, this.props.selectedIds).length === 0) {
        // We have a complete set, so we remove the ids of the siblings,
        // and add the id of the parent.
        const filtersToDelete = {
          type: "material",
          ids: otherSiblings,
          paramName: "material_ids"
        };
        this.props.onFilterChange(
          // Add this id.
          { material_ids: [this.state.expandedMaterial.id] }, // Remove these ids.
          filtersToDelete
        );
      } else {
        // Default case: simply add the id of the material.
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

  renderSecondColumnItem(mat, parentIsSelected, i) {
    return (
      <li className="Materials__lvl2-item" key={i}>
        <button
          type="button"
          onClick={ev => this.handleSecondColumnClick(mat, ev)}
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

  renderFirstColumnItem(mat, i) {
    let classes = "Materials__lvl1-button";
    classes +=
      this.props.selectedIds.indexOf(mat.id) >= 0 ? " is-selected" : "";
    classes += mat.children.length > 0 ? " has-children" : "";
    classes += mat.id === this.state.expandedMaterial.id ? " is-hovered" : "";
    return (
      <li className="Materials__lvl1-item" key={i}>
        <ReactHoverObserver
          hoverDelayInMs={300}
          hoverOffDelayInMs={300}
          onHoverChanged={this.handleHoverChange.bind(this, mat)}
          shouldDecorateChildren={false}
        >
          <button
            type="button"
            onClick={ev => this.handleFirstColumnClick(mat, ev)}
            className={classes}
          >
            {mat.name}
            {/* <span className="Materials__objcount">15340</span> */}
          </button>

          <CSSTransitionGroup
            transitionName="desktopFilterPanel"
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
          >
            {mat.children.length > 0 &&
            mat.id === this.state.expandedMaterial.id ? (
              <ul className="Materials__lvl2">
                <li className="Materials__lvl2-item" key="All">
                  <button
                    type="button"
                    onClick={ev => this.handleAddAllClick(mat, ev)}
                    className={
                      "Materials__lvl2-button" +
                      (this.props.selectedIds.indexOf(mat.id) >= 0
                        ? " is-selected"
                        : "")
                    }
                  >
                    Tous
                  </button>
                </li>
                {mat.children.map((m, i) =>
                  this.renderSecondColumnItem(
                    m,
                    this.props.selectedIds.indexOf(mat.id) >= 0,
                    i
                  )
                )}
              </ul>
            ) : null}
          </CSSTransitionGroup>
        </ReactHoverObserver>
      </li>
    );
  }

  render() {
    return (
      <div className="Materials">
        <ul className="Materials__lvl1">
          {this.props.materials.map(this.renderFirstColumnItem)}
        </ul>
      </div>
    );
  }
}

export default Materials;
