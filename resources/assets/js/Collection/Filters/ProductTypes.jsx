import React, { Component } from "react";
import { source, target } from "react-aim";
import { CSSTransitionGroup } from "react-transition-group";

import DesktopOverlayZone from "./DesktopOverlayZone";

const ProductTypeNullObject = {
  id: null,
  children: []
};

class ProductTypes extends Component {
  constructor(props) {
    super(props);
    this.state = { expandedType: ProductTypeNullObject };
    this.handleActiveSecondCol = this.handleActiveSecondCol.bind(this);
    this.handleFirstColClick = this.handleFirstColClick.bind(this);
    this.handleSecondColClick = this.handleSecondColClick.bind(this);
    this.handleAddAllClick = this.handleAddAllClick.bind(this);
    this.isSecondColVisible = this.isSecondColVisible.bind(this);
  }

  handleFirstColClick(pt, ev) {
    ev.stopPropagation();

    // Toggle this product type on/off
    if (this.props.selectedIds.indexOf(pt.id) >= 0) {
      this.props.onFilterRemove({
        type: "product_type",
        ids: [pt.id],
        paramName: "product_type_ids"
      });
    } else {
      if (pt.children.length > 0) {
        const childrenIds = pt.children.map(c => c.id);
        const typesToRemove = this.props.selectedIds.filter(
          id => childrenIds.indexOf(id) >= 0
        );

        if (typesToRemove.length > 0) {
          const removeObj = {
            type: "product_type",
            ids: typesToRemove,
            paramName: "product_type_ids"
          };
          this.props.onFilterChange({ product_type_ids: [pt.id] }, removeObj);
        } else {
          this.props.onFilterAdd({ product_type_ids: [pt.id] });
        }
      } else {
        this.props.onFilterAdd({ product_type_ids: [pt.id] });
      }
    }
  }

  handleSecondColClick(pt, ev) {
    ev.stopPropagation();

    // Is this product type's parent selected ?
    if (this.props.selectedIds.indexOf(this.state.expandedType.id) >= 0) {
      // Remove the parent id, and add the clicked item.
      const filtersToDelete = {
        type: "product_type",
        ids: [this.state.expandedType.id],
        paramName: "product_type_ids"
      };
      this.props.onFilterChange(
        {
          product_type_ids: [pt.id]
        },
        filtersToDelete
      );
    } else {
      // Simply toggle this product type on/off
      if (this.props.selectedIds.indexOf(pt.id) >= 0) {
        this.props.onFilterRemove({
          type: "product_type",
          ids: [pt.id],
          paramName: "product_type_ids"
        });
      } else {
        this.props.onFilterAdd({
          product_type_ids: [pt.id]
        });
      }
    }
  }

  handleAddAllClick(group, ev) {
    ev.stopPropagation();
    const filtersToDelete = {
      type: "product_type",
      ids: group.children.map(pt => pt.id),
      paramName: "product_type_ids"
    };

    this.props.onFilterChange(
      // Add this id.
      { product_type_ids: [group.id] },
      // Remove these ids.
      filtersToDelete
    );
  }

  handleActiveSecondCol(productType) {
    this.setState({ expandedType: productType });
  }

  isSecondColVisible() {
    return this.state.expandedType.children.length > 0;
  }

  render() {
    return (
      <div className="ProductTypes">
        <ul className="ProductTypes__col1">
          {this.props.productTypes.map(pt => (
            <FirstColMenuItem
              productType={pt}
              expandedType={this.state.expandedType}
              selectedIds={this.props.selectedIds}
              onActiveSecondCol={this.handleActiveSecondCol}
              onFirstColClick={this.handleFirstColClick}
              onSecondColClick={this.handleSecondColClick}
              onAddAllClick={this.handleAddAllClick}
              key={pt.id}
            />
          ))}
        </ul>
        <CSSTransitionGroup
          transitionName="DesktopOverlayZone"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.props.filterPanelOpen ? (
            <DesktopOverlayZone
              onClick={this.props.onClickOverlay}
              offsetLeft={this.isSecondColVisible() ? 288 + 288 : 288}
              filterPanelsWidth={
                this.isSecondColVisible() ? 288 + 288 + 288 : 288 + 288
              }
            >
              {this.props.totalHitsComponent}
            </DesktopOverlayZone>
          ) : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

class FirstColMenuItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li className="ProductTypes__col1-item" key={this.props.productType.id}>
        <strong className="ProductTypes__col1-set">
          <span>{this.props.productType.name}</span>
        </strong>
        {/* <span className="ProductTypes__objcount">15340</span> */}

        {this.props.productType.children.length > 0 ? (
          <ul className="ProductTypes__col1-subitems">
            {this.props.productType.children.map(pt => (
              <FirstColMenuSubItem
                productType={pt}
                expandedType={this.props.expandedType}
                selectedIds={this.props.selectedIds}
                selected={this.props.selectedIds.indexOf(pt.id) >= 0}
                onActiveSecondCol={this.props.onActiveSecondCol}
                onFirstColClick={this.props.onFirstColClick}
                onSecondColClick={this.props.onSecondColClick}
                onAddAllClick={this.props.onAddAllClick}
                key={pt.id}
              />
            ))}
          </ul>
        ) : null}
      </li>
    );
  }
}

@source({
  mouseEnter: (props, component) => {
    props.onActiveSecondCol(props.productType);
  }
})
class FirstColMenuSubItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const pt = this.props.productType;
    let classes = "ProductTypes__col1-button";
    classes += this.props.selected ? " is-selected" : "";
    classes += pt.children.length > 0 ? " has-children" : "";
    classes += pt.id === this.props.expandedType.id ? " is-hovered" : "";
    classes +=
      pt.children.filter(val => -1 !== this.props.selectedIds.indexOf(val.id))
        .length > 0
        ? " has-selected-children"
        : "";

    let secondCol =
      pt.children.length > 0 && this.props.expandedType.id === pt.id ? (
        <SecondColMenu
          parentProductType={pt}
          items={pt.children}
          selectedIds={this.props.selectedIds}
          onSecondColClick={this.props.onSecondColClick}
          onAddAllClick={this.props.onAddAllClick}
          onAddAllClick={this.props.onAddAllClick}
          expandedType={this.props.expandedType}
        />
      ) : null;

    return (
      <li
        className="ProductTypes__col1-subitem"
        key={this.props.productType.id}
      >
        <button
          type="button"
          onClick={ev => this.props.onFirstColClick(pt, ev)}
          className={classes}
        >
          <span>{this.props.productType.name}</span>
          <svg
            width="6"
            height="10"
            fill="none"
            className="ProductTypes__col1-chevron"
          >
            <path d="M1 1L5 5L1 9" stroke="currentColor" />
          </svg>
          {/* <span className="ProductTypes__objcount">15340</span> */}
        </button>
        {secondCol}
      </li>
    );
  }
}

@target()
class SecondColMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderSecondColumnItem = this.renderSecondColumnItem.bind(this);
  }
  renderSecondColumnItem(pt, parentIsSelected, i) {
    return (
      <li className="ProductTypes__col2-item" key={i}>
        <button
          type="button"
          onClick={ev => this.props.onSecondColClick(pt, ev)}
          className={
            "ProductTypes__col2-button" +
            (this.props.selectedIds.indexOf(pt.id) >= 0 ? " is-selected" : "")
          }
        >
          {pt.name}
        </button>
      </li>
    );
  }
  render() {
    const parentIsSelected =
      this.props.selectedIds.indexOf(this.props.parentProductType.id) >= 0;
    return (
      <ul className="ProductTypes__col2">
        <li className="ProductTypes__col2-item" key="All">
          <button
            type="button"
            onClick={ev =>
              this.props.onAddAllClick(this.props.parentProductType, ev)
            }
            className={
              "ProductTypes__col2-button" +
              (parentIsSelected ? " is-selected" : "")
            }
          >
            Tous
          </button>
        </li>
        {this.props.items.map((pt, i) =>
          this.renderSecondColumnItem(pt, parentIsSelected, i)
        )}
      </ul>
    );
  }
}
export default ProductTypes;
