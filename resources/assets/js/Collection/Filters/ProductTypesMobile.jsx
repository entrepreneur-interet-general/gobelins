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

  render() {
    return (
      <div className="ProductTypesMobile">
        <button onClick={this.handleBack}>
          <ArrowBack />
        </button>
        COUCOU LES TYPES
      </div>
    );
  }
}

export default ProductTypesMobile;
