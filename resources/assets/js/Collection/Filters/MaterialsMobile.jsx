import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import ArrowBack from "../../icons/ArrowBack";

const MaterialNullObject = {
  id: null,
  children: []
};

class MaterialsMobile extends Component {
  constructor(props) {
    super(props);
    this.state = { expandedMaterial: MaterialNullObject };

    this.handleBackToFirstCol = this.handleBackToFirstCol.bind(this);
    this.handleFirstColClick = this.handleFirstColClick.bind(this);
    this.handleSecondColClick = this.handleSecondColClick.bind(this);
    this.handleAddAllClick = this.handleAddAllClick.bind(this);
  }

  handleBackToFirstCol() {
    this.setState({ expandedMaterial: MaterialNullObject });
  }

  handleFirstColClick(mat, ev) {
    if (mat.children.length > 0) {
      // Slide to next column
      this.setState({ expandedMaterial: mat });
    } else {
      // Toggle on/off
      if (this.props.selectedIds.indexOf(mat.id) >= 0) {
        this.props.onFilterRemove({
          type: "material",
          ids: [mat.id],
          paramName: "material_ids"
        });
      } else {
        this.props.onFilterAdd({ material_ids: [mat.id] });
      }
    }
  }
  handleSecondColClick(mat, ev) {
    // Is this material's parent selected ?
    if (this.props.selectedIds.indexOf(this.state.expandedMaterial.id) >= 0) {
      // Remove the parent id, and add the clicked item.
      const filtersToDelete = {
        type: "material",
        ids: [this.state.expandedMaterial.id],
        paramName: "material_ids"
      };
      this.props.onFilterChange(
        {
          material_ids: [mat.id]
        },
        filtersToDelete
      );
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
    // ev.stopPropagation();
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

  render() {
    return (
      <div className="MaterialsMobile">
        <FirstColumn
          onBack={this.props.onBackToFiltersList}
          onFirstColClick={this.handleFirstColClick}
          secondColVisible={Boolean(this.state.expandedMaterial.id)}
          onAddAllClick={this.handleAddAllClick}
          {...this.props}
        />
        <CSSTransitionGroup
          transitionName="MaterialsMobile__secondcoltransition"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.state.expandedMaterial.id ? (
            <SecondColumn
              onBack={this.handleBackToFirstCol}
              parentMaterial={this.state.expandedMaterial}
              items={this.state.expandedMaterial.children}
              selectedIds={this.props.selectedIds}
              secondColVisible={Boolean(this.state.expandedMaterial.id)}
              onSecondColClick={this.handleSecondColClick}
              onAddAllClick={this.handleAddAllClick}
              {...this.props}
            />
          ) : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

const FirstColumn = props => {
  return (
    <div
      className={
        "MaterialsMobile__col-container MaterialsMobile__col-container--first " +
        (props.secondColVisible ? "has-second-col-visible" : "")
      }
    >
      <div className="MaterialsMobile__header">
        <button onClick={props.onBack} className="MaterialsMobile__back-button">
          <ArrowBack />
        </button>
        <div className="MaterialsMobile__col-title">Matière</div>
        {props.closeButton}
      </div>
      <ul className="Materials__lvl1">
        {window.__INITIAL_STATE__.materials.map(mat => (
          <FirstColMenuItem
            material={mat}
            selected={props.selectedIds.indexOf(mat.id) >= 0}
            onFirstColClick={props.onFirstColClick}
            key={mat.id}
            {...props}
          />
        ))}
      </ul>
    </div>
  );
};

const FirstColMenuItem = props => {
  const mat = props.material;
  let classes = "Materials__lvl1-button";
  classes += props.selected ? " is-selected" : "";
  classes += mat.children.length > 0 ? " has-children" : "";
  classes +=
    mat.children.filter(val => -1 !== props.selectedIds.indexOf(val.id))
      .length > 0
      ? " has-selected-children"
      : "";

  return (
    <li className="Materials__lvl1-item" key={props.material.id}>
      <button
        type="button"
        onClick={ev => props.onFirstColClick(mat, ev)}
        className={classes}
      >
        <span>{props.material.name}</span>
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
};

const SecondColumn = props => {
  const parentIsSelected =
    props.selectedIds.indexOf(props.parentMaterial.id) >= 0;

  return (
    <div
      className={
        "MaterialsMobile__col-container MaterialsMobile__col-container--second " +
        (props.secondColVisible ? "has-second-col-visible" : "")
      }
    >
      <div className="MaterialsMobile__header">
        <button onClick={props.onBack} className="MaterialsMobile__back-button">
          <ArrowBack />
        </button>
        <div className="MaterialsMobile__col-title">
          {props.parentMaterial.name}
        </div>
        {props.closeButton}
      </div>
      <ul className="Materials__lvl2">
        <li className="Materials__lvl2-item" key="All">
          <button
            type="button"
            onClick={ev => props.onAddAllClick(props.parentMaterial, ev)}
            className={
              "Materials__lvl2-button" +
              (parentIsSelected ? " is-selected" : "")
            }
          >
            Tous
          </button>
        </li>
        {props.items.map((mat, i) => (
          <li className="Materials__lvl2-item" key={i}>
            <button
              type="button"
              onClick={ev => props.onSecondColClick(mat, ev)}
              className={
                "Materials__lvl2-button" +
                (props.selectedIds.indexOf(mat.id) >= 0 ? " is-selected" : "")
              }
            >
              {mat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialsMobile;
