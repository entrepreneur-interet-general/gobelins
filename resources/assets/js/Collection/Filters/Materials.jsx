import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
//import find from "lodash/find";

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
    this.handleAddAllClick = this.handleAddAllClick.bind(this);
  }

  handleFirstColumnClick(mat, ev) {
    ev.stopPropagation();
    if (mat.children.length > 0) {
      // Expand the second column panel.
      this.setState({ expandedMaterial: mat });
    } else {
      this.setState({ expandedMaterial: MaterialNullObject });
      this.props.onFilterAdd({ material_ids: [mat.id] });
    }
  }
  handleSecondColumnClick(mat, ev) {
    ev.stopPropagation();
    // if (this mat's parent is in the selected ids)
    //      remove the parent's id
    //      and add all the ids of the siblings of this mat
    // else,
    //      if (ALL the siblings of this mat are in the selected ids)
    //          remove the sibling ids
    //          add the parent's id
    //      else
    //          add this mat's id to the selected ids
    //
    this.props.onFilterAdd({ material_ids: [mat.id] });
  }
  handleAddAllClick(group, ev) {
    // remove all the selected ids that are children of the group.
    // add the id of this group.
    const filtersToDelete = {
      type: "material",
      ids: group.children.map(mat => mat.id),
      paramName: "material_ids"
    };
    console.log("filtersToAdd", { material_ids: [group.id] });
    console.log("filtersToDelete", filtersToDelete);

    this.props.onFilterChange(
      // Add this id.
      { material_ids: [group.id] },
      // Remove these ids.
      filtersToDelete
    );
  }

  renderSecondColumnItem(mat, i) {
    return (
      <li className="Materials__lvl2-item" key={i}>
        <button
          type="button"
          onClick={ev => this.handleFirstColumnClick(mat, ev)}
          className={
            this.state.expandedMaterial.id === mat.id ? "is-selected" : null
          }
        >
          {mat.name}
        </button>
      </li>
    );
  }

  renderFirstColumnItem(mat, i) {
    let classes = "";
    classes += this.state.expandedMaterial.id === mat.id ? " is-selected" : "";
    classes += mat.children.length > 0 ? " has-children" : "";
    return (
      <li className="Materials__lvl1-item" key={i}>
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
                    this.state.expandedMaterial.id === mat.id
                      ? "is-selected"
                      : null
                  }
                >
                  Tous
                </button>
              </li>
              {mat.children.map(this.renderSecondColumnItem)}
            </ul>
          ) : null}
        </CSSTransitionGroup>
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
