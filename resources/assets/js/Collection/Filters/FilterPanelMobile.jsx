import React, { Component } from "react";

import CrossLarge from "./CrossLarge";

class FilterPanelMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMode: "default"
    };
    this.openPanel = this.openPanel.bind(this);
  }
  componentDidMount() {
    document.documentElement.classList.add("prevent-scroll");
  }
  componentWillUnmount() {
    document.documentElement.classList.remove("prevent-scroll");
  }

  openPanel(panel, ev) {
    console.log("woo hoo open panel ", panel);
  }

  render() {
    return (
      <div className="FilterPanelMobile">
        <div
          className="FilterPanelMobile__overlay"
          onClick={this.props.onCloseFilterPanel}
        >
          {this.props.overlayContent}
        </div>
        <button
          type="button"
          className="FilterPanelMobile__close"
          onClick={this.props.onCloseFilterPanel}
        >
          <CrossLarge />
        </button>
        <div className="FilterPanelMobile__rootcolumn">
          <div className="Filters__list-container">
            <div className="Filters__list-label">Filtrer par :</div>
            <ul>
              <li>
                <button
                  className="is-product_type is-open"
                  onClick={ev => this.openPanel("ProductTypes", ev)}
                >
                  Type d’objet
                </button>
              </li>
              <li>
                <button
                  className="is-author is-open"
                  onClick={ev => this.openPanel("Authors", ev)}
                >
                  Auteur
                </button>
              </li>
              <li>
                <button
                  className="is-period is-open"
                  onClick={ev => this.openPanel("Periods", ev)}
                >
                  Période de création
                </button>
              </li>
              <li>
                <button
                  className="is-style is-open"
                  onClick={ev => this.openPanel("Styles", ev)}
                >
                  Style
                </button>
              </li>
              <li>
                <button
                  className="is-material is-open"
                  onClick={ev => this.openPanel("Materials", ev)}
                >
                  Matière
                </button>
              </li>
              <li>
                <button
                  className="is-production_origin is-open"
                  onClick={ev => this.openPanel("ProductionOrigins", ev)}
                >
                  Lieu de production
                </button>
              </li>
              <li>
                <button
                  className="is-dimension is-open"
                  onClick={ev => this.openPanel("Dimensions", ev)}
                >
                  Dimension
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterPanelMobile;
