import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { find } from "lodash";

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
          {productType.name}
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

  render() {
    return <div className="ProductTypes">{this.renderFirstColumn()}</div>;
  }
}

export default ProductTypes;
