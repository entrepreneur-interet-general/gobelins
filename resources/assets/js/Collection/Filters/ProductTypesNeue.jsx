import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { source, target } from "react-aim";
import find from "lodash/find";

const ProductTypeNullObject = {
  id: null,
  children: []
};

class ProductTypes extends Component {
  constructor(props) {
    super(props);
    this.state = { expandedType: ProductTypeNullObject };
    this.renderListItem = this.renderListItem.bind(this);
    this.renderFirstColumn = this.renderFirstColumn.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleActiveSecondCol = this.handleActiveSecondCol.bind(this);
  }

  handleClick(productType, ev) {
    ev.stopPropagation(); // To not close the filter panel.
    this.props.onFilterAdd({ product_type_ids: [productType.id] });
    if (
      // Have you clicked on a leaf node?
      find(this.state.expandedType.children, el => el.id === productType.id)
    ) {
      // console.log("we've clicked a leaf node !");
      // Keep current state of expanded panel.
    } else if (productType.children.length > 0) {
      this.setState({ expandedType: productType });
    } else {
      this.setState({ expandedType: ProductTypeNullObject });
    }
  }

  renderListItem(productType, depth) {
    return (
      <li className="ProductTypes__colItem" key={productType.id}>
        <button
          type="button"
          onClick={ev => this.handleClick(productType, ev)}
          className={
            this.props.selectedIds.includes(productType.id) ||
            this.state.expandedType.id === productType.id
              ? "is-selected"
              : null
          }
        >
          <span>{productType.name}</span>
          {/* <span className="ProductTypes__objcount">15340</span> */}
        </button>
        {productType.children.length > 0
          ? this.renderList(productType, depth)
          : null}
      </li>
    );
  }

  renderList(productType, depth) {
    depth++;
    return (
      <CSSTransitionGroup
        transitionName="desktopFilterPanel"
        transitionEnterTimeout={150}
        transitionLeaveTimeout={150}
      >
        {depth === 1 || this.state.expandedType.id === productType.id ? (
          <ul className={depth === 3 ? "ProductTypes__col2" : ""}>
            {productType.children.map(pt => this.renderListItem(pt, depth))}
          </ul>
        ) : null}
      </CSSTransitionGroup>
    );
  }

  renderFirstColumn() {
    return (
      <ul className="ProductTypes__col1">
        {this.props.productTypes.map(pt => this.renderListItem(pt, 0))}
      </ul>
    );
  }

  handleActiveSecondCol(productType) {
    this.setState({ expandedType: productType });
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
              key={pt.id}
            />
          ))}
        </ul>
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
        <button
          type="button"
          //   onClick={ev => this.handleClick(productType, ev)}
          //   className={
          //     this.props.selectedIds.includes(productType.id) ||
          //     this.state.expandedType.id === productType.id
          //       ? "is-selected"
          //       : null
          //   }
        >
          <span>{this.props.productType.name}</span>
          {/* <span className="ProductTypes__objcount">15340</span> */}
        </button>
        {this.props.productType.children.length > 0 ? (
          <ul className="ProductTypes__col1-subitems">
            {this.props.productType.children.map(pt => (
              <FirstColMenuSubItem
                productType={pt}
                expandedType={this.props.expandedType}
                selectedIds={this.props.selectedIds}
                onActiveSecondCol={this.props.onActiveSecondCol}
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
    let classes = "ProductType__col1-button";
    classes += this.props.selected ? " is-selected" : "";
    classes += pt.children.length > 0 ? " has-children" : "";
    classes += pt.id === this.props.expandedType.id ? " is-hovered" : "";

    let secondCol =
      pt.children.length > 0 && this.props.expandedType.id === pt.id ? (
        <SecondColMenu
          parentProductType={pt}
          items={pt.children}
          selectedIds={this.props.selectedIds}
          onSecondColumnClick={this.props.onSecondColumnClick}
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
          onClick={ev => this.handleClick(pt, ev)}
          className={
            this.props.selectedIds.includes(pt.id) ||
            this.props.expandedType.id === pt.id
              ? "is-selected"
              : null
          }
        >
          <span>{this.props.productType.name}</span>
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
      <li className="ProductType__col2-item" key={i}>
        <button
          type="button"
          onClick={ev => this.props.onSecondColumnClick(pt, ev)}
          className={
            "ProductType__col2-button" +
            (parentIsSelected || this.props.selectedIds.indexOf(pt.id) >= 0
              ? " is-selected"
              : "")
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
      <ul className="ProductType__col2">
        <li className="ProductType__col2-item" key="All">
          <button
            type="button"
            onClick={ev =>
              this.props.onAddAllClick(this.props.parentProductType, ev)
            }
            className={
              "ProductType__col2-button" +
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
