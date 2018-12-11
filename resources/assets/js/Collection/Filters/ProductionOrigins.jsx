import React, { Component } from "react";

class ProductionOrigins extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClick = this.handleClick.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
  }

  handleClick(production_origin, ev) {
    ev.stopPropagation(); // To not close the filter panel.
    if (this.props.selectedIds.indexOf(production_origin.id) >= 0) {
      this.props.onFilterRemove({
        type: "production_origin",
        ids: [production_origin.id],
        paramName: "production_origin_ids"
      });
    } else {
      this.props.onFilterAdd({
        production_origin_ids: [production_origin.id]
      });
    }
  }

  renderListItem(production_origin) {
    return (
      <li className="ProductionOrigins__col-item" key={production_origin.id}>
        <button
          type="button"
          onClick={ev => this.handleClick(production_origin, ev)}
          className={
            this.props.selectedIds.includes(production_origin.id)
              ? "is-selected"
              : null
          }
        >
          <strong className="ProductionOrigins__name">
            {production_origin.name}
          </strong>
          <span className="ProductionOrigins__label">
            {production_origin.label}
          </span>
          {/* <span className="ProductionOrigins__objcount">15340</span> */}
        </button>
      </li>
    );
  }

  render() {
    return (
      <div className="ProductionOrigins">
        <ul className="ProductionOrigins__double-col">
          {this.props.productionOrigins.map(this.renderListItem)}
        </ul>
      </div>
    );
  }
}

export default ProductionOrigins;
