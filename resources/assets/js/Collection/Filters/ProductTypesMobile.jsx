import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import ArrowBack from "../../icons/ArrowBack";

const ProductTypeNullObject = {
  id: null,
  children: []
};

class ProductTypesMobile extends Component {
  constructor(props) {
    super(props);
    this.state = { expandedType: ProductTypeNullObject };

    this.handleBack = this.handleBack.bind(this);
  }

  handleBack() {
    this.props.onBackToFiltersList();
  }
  handleFirstColClick(pt) {
    this.setState({ expandedType: pt });
  }

  render() {
    return (
      <div className="ProductTypesMobile">
        <div className="ProductTypesMobile__header">
          <button
            onClick={this.handleBack}
            className="ProductTypesMobile__back-button"
          >
            <ArrowBack />
          </button>
          <div className="ProductTypesMobile__col-title">Type d’objet</div>
        </div>

        <div className="ProductTypesMobile__col-container">
          <ul className="ProductTypes__col1">
            {window.__INITIAL_STATE__.productTypes.map(pt => (
              <li className="ProductTypes__col1-item" key={pt.id}>
                <strong className="ProductTypes__col1-set">
                  <span>{pt.name}</span>
                </strong>
                {/* <span className="ProductTypesMobile__objcount">15340</span> */}

                {pt.children.length > 0 ? (
                  <ul className="ProductTypes__col1-subitems">
                    {pt.children.map(pt => (
                      <FirstColMenuSubItem
                        productType={pt}
                        // expandedType={this.props.expandedType}
                        selectedIds={this.props.selectedIds}
                        // selected={this.props.selectedIds.indexOf(pt.id) >= 0}
                        // onActiveSecondCol={this.props.onActiveSecondCol}
                        onFirstColClick={this.handleFirstColClick}
                        // onSecondColClick={this.props.onSecondColClick}
                        // onAddAllClick={this.props.onAddAllClick}
                        key={pt.id}
                        {...this.props}
                      />
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

class FirstColMenuSubItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const pt = this.props.productType;
    let classes = "ProductType__col1-button";
    classes += this.props.selected ? " is-selected" : "";
    classes += pt.children.length > 0 ? " has-children" : "";
    classes +=
      pt.children.filter(val => -1 !== this.props.selectedIds.indexOf(val.id))
        .length > 0
        ? " has-selected-children"
        : "";

    let secondCol = null;
    // let secondCol =
    //   pt.children.length > 0 && this.props.expandedType.id === pt.id ? (

    //     <SecondColMenu
    //       parentProductType={pt}
    //       items={pt.children}
    //       selectedIds={this.props.selectedIds}
    //       onSecondColClick={this.props.onSecondColClick}
    //       onAddAllClick={this.props.onAddAllClick}
    //       onAddAllClick={this.props.onAddAllClick}
    //       expandedType={this.props.expandedType}
    //     />
    //   ) : null;

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

export default ProductTypesMobile;
