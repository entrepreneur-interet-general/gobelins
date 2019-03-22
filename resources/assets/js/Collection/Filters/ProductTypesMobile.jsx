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

    this.handleBackToFirstCol = this.handleBackToFirstCol.bind(this);
    this.handleFirstColClick = this.handleFirstColClick.bind(this);
  }

  handleBackToFirstCol() {
    this.setState({ expandedType: ProductTypeNullObject });
  }

  handleFirstColClick(pt) {
    this.setState({ expandedType: pt });
  }

  render() {
    return (
      <div className="ProductTypesMobile">
        <FirstColumn
          onBack={this.props.onBackToFiltersList}
          onFirstColClick={this.handleFirstColClick}
          secondColVisible={Boolean(this.state.expandedType.id)}
          {...this.props}
        />
        <CSSTransitionGroup
          transitionName="ProductTypesMobile__secondcoltransition"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.state.expandedType.id ? (
            <SecondColumn
              onBack={this.handleBackToFirstCol}
              parentProductType={this.state.expandedType}
              items={this.state.expandedType.children}
              selectedIds={this.props.selectedIds}
              secondColVisible={Boolean(this.state.expandedType.id)}
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
        "ProductTypesMobile__col-container ProductTypesMobile__col-container--first " +
        (props.secondColVisible ? "has-second-col-visible" : "")
      }
    >
      <div className="ProductTypesMobile__header">
        <button
          onClick={props.onBack}
          className="ProductTypesMobile__back-button"
        >
          <ArrowBack />
        </button>
        <div className="ProductTypesMobile__col-title">Type d’objet</div>
        {props.closeButton}
      </div>
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
                    selected={props.selectedIds.indexOf(pt.id) >= 0}
                    onFirstColClick={props.onFirstColClick}
                    key={pt.id}
                    {...props}
                  />
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

class FirstColMenuSubItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const pt = this.props.productType;
    let classes = "ProductTypes__col1-button";
    classes += this.props.selected ? " is-selected" : "";
    classes += pt.children.length > 0 ? " has-children" : "";
    classes +=
      pt.children.filter(val => -1 !== this.props.selectedIds.indexOf(val.id))
        .length > 0
        ? " has-selected-children"
        : "";

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
      </li>
    );
  }
}

const SecondColumn = props => {
  const parentIsSelected =
    props.selectedIds.indexOf(props.parentProductType.id) >= 0;

  return (
    <div
      className={
        "ProductTypesMobile__col-container ProductTypesMobile__col-container--second " +
        (props.secondColVisible ? "has-second-col-visible" : "")
      }
    >
      <div className="ProductTypesMobile__header">
        <button
          onClick={props.onBack}
          className="ProductTypesMobile__back-button"
        >
          <ArrowBack />
        </button>
        <div className="ProductTypesMobile__col-title">
          {props.parentProductType.name}
        </div>
        {props.closeButton}
      </div>
      <ul className="ProductTypes__col2">
        <li className="ProductTypes__col2-item" key="All">
          <button
            type="button"
            onClick={ev => props.onAddAllClick(props.parentProductType, ev)}
            className={
              "ProductTypes__col2-button" +
              (parentIsSelected ? " is-selected" : "")
            }
          >
            Tous
          </button>
        </li>
        {props.items.map((pt, i) => (
          <li className="ProductTypes__col2-item" key={i}>
            <button
              type="button"
              onClick={ev => props.onSecondColClick(pt, ev)}
              className={
                "ProductTypes__col2-button" +
                (props.selectedIds.indexOf(pt.id) >= 0 ? " is-selected" : "")
              }
            >
              {pt.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductTypesMobile;
