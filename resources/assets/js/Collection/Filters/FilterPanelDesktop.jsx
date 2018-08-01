import React, { Component } from "react";
// import MagnifyingGlassIcon from "react-svg-loader!./magnifying_glass.svg";
// import MagnifyingGlassIcon from "@svgr/webpack!./magnifying_glass.svg";
import MagnifyingGlass from "./MagnifyingGlass.jsx";
import MnLogo from "./MnLogo.jsx";
import ProductTypes from "./ProductTypes.jsx";

class FilterPanelDesktop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.openPanel = this.openPanel.bind(this);
  }

  openPanel(panel) {
    console.log("bal bla bla", panel);
  }

  render() {
    return (
      <div className="FilterPanelDesktop">
        <div className="FilterPanelDesktop__scrollable">
          <div className="FilterPanelDesktop__top-area">
            <div className="FilterPanelDesktop__autocomplete">
              <div className="FilterPanelDesktop__input">
                <input placeholder="Rechercher" type="text" />
              </div>
              <div className="FilterPanelDesktop__search">
                <button type="submit">
                  <MagnifyingGlass />
                </button>
              </div>
            </div>
            <div className="FilterPanelDesktop__criteria-phrase">
              dans les collections du <strong>Mobilier national</strong>
            </div>
          </div>
          <div className="FilterPanelDesktop__filters-block">
            <div className="FilterPanelDesktop__filters-label">
              Filtrer par :
            </div>
            <ul>
              <li>
                <button onClick={ev => this.openPanel("ProductTypes")}>
                  Types d’objet
                </button>
              </li>
              <li>
                <button onClick={ev => this.openPanel("Authors")}>
                  Auteur
                </button>
              </li>
              <li>
                <button onClick={ev => this.openPanel("Periods")}>
                  Année de création
                </button>
              </li>
              <li>
                <button onClick={ev => this.openPanel("Styles")}>Style</button>
              </li>
              <li>
                <button onClick={ev => this.openPanel("Materials")}>
                  Matière
                </button>
              </li>
              <li>
                <button onClick={ev => this.openPanel("ProductionOrigins")}>
                  Lieu de production
                </button>
              </li>
              <li>
                <button onClick={ev => this.openPanel("Dimensions")}>
                  Dimensions
                </button>
              </li>
            </ul>
          </div>
          <div className="FilterPanelDesktop__bottom-row">
            <MnLogo className="FilterPanelDesktop__mn-logo" />
            <a
              href="#"
              className="FilterPanelDesktop__info-link"
              title="Information"
            >
              <span>i</span>
            </a>
          </div>
        </div>
        {<ProductTypes />}
      </div>
    );
  }
}

export default FilterPanelDesktop;
