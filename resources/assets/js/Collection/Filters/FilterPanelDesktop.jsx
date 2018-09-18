import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
// import MagnifyingGlassIcon from "react-svg-loader!./magnifying_glass.svg";
// import MagnifyingGlassIcon from "@svgr/webpack!./magnifying_glass.svg";
import MagnifyingGlass from "./MagnifyingGlass.jsx";
import MnLogo from "./MnLogo.jsx";
import ProductTypes from "./ProductTypes.jsx";

class FilterPanelDesktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productTypes: window.__INITIAL_STATE__.productTypes,
      styles: window.__INITIAL_STATE__.styles,
      authors: window.__INITIAL_STATE__.authors,
      periods: window.__INITIAL_STATE__.periods,
      materials: window.__INITIAL_STATE__.materials,
      productionOrigins: window.__INITIAL_STATE__.productionOrigins,
      filterPanelOpen: false
    };
    this.openPanel = this.openPanel.bind(this);
    this.closeFilterPanels = this.closeFilterPanels.bind(this);
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    this.handleFullTextSearch = this.handleFullTextSearch.bind(this);
  }

  openPanel(panel, ev) {
    ev.stopPropagation();
    this.setState({ filterPanelOpen: true, openPanel: panel });
    document.documentElement.classList.add("prevent-scroll");
  }

  closeFilterPanels() {
    this.setState({ filterPanelOpen: false });
    document.documentElement.classList.remove("prevent-scroll");
  }

  handleSearchFieldChange(ev) {
    this.setState({ searchFieldValue: ev.target.value });
  }

  handleFullTextSearch(ev) {
    this.props.onFilterChange({ q: this.state.searchFieldValue });
    this.setState({ searchFieldValue: "" });
    ev.preventDefault();
  }

  render() {
    return (
      <div className="FilterPanelDesktop" onClick={this.closeFilterPanels}>
        <div className="FilterPanelDesktop__scrollable">
          <div className="FilterPanelDesktop__top-area">
            <form
              className="FilterPanelDesktop__autocomplete"
              onSubmit={this.handleFullTextSearch}
            >
              <div className="FilterPanelDesktop__input">
                <input
                  placeholder="Rechercher"
                  type="text"
                  value={this.state.searchFieldValue}
                  onChange={this.handleSearchFieldChange}
                />
              </div>
              <div className="FilterPanelDesktop__search">
                <button type="submit">
                  <MagnifyingGlass />
                </button>
              </div>
            </form>
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
                <button onClick={ev => this.openPanel("ProductTypes", ev)}>
                  Types d’objet
                </button>
              </li>
              <li>
                <button onClick={ev => this.openPanel("Authors", ev)}>
                  Auteur
                </button>
              </li>
              <li>
                <button onClick={ev => this.openPanel("Periods", ev)}>
                  Année de création
                </button>
              </li>
              <li>
                <button onClick={ev => this.openPanel("Styles", ev)}>
                  Style
                </button>
              </li>
              <li>
                <button onClick={ev => this.openPanel("Materials", ev)}>
                  Matière
                </button>
              </li>
              <li>
                <button onClick={ev => this.openPanel("ProductionOrigins", ev)}>
                  Lieu de production
                </button>
              </li>
              <li>
                <button onClick={ev => this.openPanel("Dimensions", ev)}>
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
        <CSSTransitionGroup
          transitionName="desktopFiltersOverlay"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.state.filterPanelOpen ? (
            <div className="FilterPanelDesktop__overlay" />
          ) : null}
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="desktopSpinnerLoader"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.props.isLoading ? (
            <div className="FilterPanelDesktop__spinner Spinner__pgloading">
              <div className="Spinner__loadingwrap">
                <ul className="Spinner__bokeh">
                  <li />
                  <li />
                  <li />
                  <li />
                </ul>
              </div>
            </div>
          ) : null}
        </CSSTransitionGroup>
        <CSSTransitionGroup
          transitionName="desktopFilterPanel"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.state.filterPanelOpen &&
          this.state.openPanel === "ProductTypes" ? (
            <ProductTypes
              productTypes={this.state.productTypes}
              onFilterChange={this.props.onFilterChange}
            />
          ) : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default FilterPanelDesktop;
