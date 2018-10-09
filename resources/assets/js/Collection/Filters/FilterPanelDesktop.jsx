import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
// import MagnifyingGlassIcon from "react-svg-loader!./magnifying_glass.svg";
// import MagnifyingGlassIcon from "@svgr/webpack!./magnifying_glass.svg";
import MagnifyingGlass from "./MagnifyingGlass.jsx";
import CriteriaPhrase from "./CriteriaPhrase.jsx";
import MnLogo from "./MnLogo.jsx";
import ProductTypes from "./ProductTypes.jsx";
import Styles from "./Styles.jsx";
import ProductionOrigins from "./ProductionOrigins.jsx";
import Authors from "./Authors.jsx";
import Loader from "../Loader.jsx";

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
      filterPanelOpen: false,
      searchFieldValue:
        props.filterObj && props.filterObj.q ? props.filterObj.q : ""
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
    this.props.onFilterAdd({ q: this.state.searchFieldValue });
    this.setState({ searchFieldValue: "" });
    ev.preventDefault();
  }

  render() {
    return (
      <div
        className={
          "FilterPanelDesktop " + (this.state.filterPanelOpen ? "is-open" : "")
        }
        onClick={this.closeFilterPanels}
      >
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
              <CriteriaPhrase
                filterObj={this.props.filterObj}
                onFilterRemove={this.props.onFilterRemove}
              />
            </div>
          </div>
          <div className="FilterPanelDesktop__filters-block">
            <div className="FilterPanelDesktop__filters-label">
              Filtrer par :
            </div>
            <ul>
              <li>
                <button
                  className="is-product_type"
                  onClick={ev => this.openPanel("ProductTypes", ev)}
                >
                  Types d’objet
                </button>
              </li>
              <li>
                <button
                  className="is-author"
                  onClick={ev => this.openPanel("Authors", ev)}
                >
                  Auteur
                </button>
              </li>
              <li>
                <button
                  className="is-period"
                  onClick={ev => this.openPanel("Periods", ev)}
                >
                  Année de création
                </button>
              </li>
              <li>
                <button
                  className="is-style"
                  onClick={ev => this.openPanel("Styles", ev)}
                >
                  Style
                </button>
              </li>
              <li>
                <button
                  className="is-material"
                  onClick={ev => this.openPanel("Materials", ev)}
                >
                  Matière
                </button>
              </li>
              <li>
                <button
                  className="is-production_origin"
                  onClick={ev => this.openPanel("ProductionOrigins", ev)}
                >
                  Lieu de production
                </button>
              </li>
              <li>
                <button
                  className="is-dimension"
                  onClick={ev => this.openPanel("Dimensions", ev)}
                >
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
        {this.state.filterPanelOpen && !this.props.isLoading ? (
          <div className="FilterPanelDesktop__total-hits">
            {this.props.totalHits}{" "}
            {this.props.totalHits > 1 ? "résultats" : "résultat"}
          </div>
        ) : null}
        {this.props.isLoading ? (
          <Loader className="FilterPanelDesktop__spinner" />
        ) : null}
        <CSSTransitionGroup
          transitionName="desktopFilterPanel"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.state.filterPanelOpen &&
          this.state.openPanel === "ProductTypes" ? (
            <ProductTypes
              productTypes={this.state.productTypes}
              onFilterAdd={this.props.onFilterAdd}
              selectedIds={this.props.filterObj.product_type_ids || []}
              totalHitsComponent={
                this.state.filterPanelOpen && !this.props.isLoading ? (
                  <div className="FilterPanelDesktop__total-hits">
                    {this.props.totalHits}{" "}
                    {this.props.totalHits > 1 ? "résultats" : "résultat"}
                  </div>
                ) : null
              }
            />
          ) : null}

          {this.state.filterPanelOpen && this.state.openPanel === "Styles" ? (
            <Styles
              styles={this.state.styles}
              onFilterAdd={this.props.onFilterAdd}
              selectedIds={this.props.filterObj.style_ids || []}
            />
          ) : null}

          {this.state.filterPanelOpen &&
          this.state.openPanel === "ProductionOrigins" ? (
            <ProductionOrigins
              productionOrigins={this.state.productionOrigins}
              onFilterAdd={this.props.onFilterAdd}
              selectedIds={this.props.filterObj.production_origin_ids || []}
            />
          ) : null}

          {this.state.filterPanelOpen && this.state.openPanel === "Authors" ? (
            <Authors
              authors={this.state.authors}
              onFilterAdd={this.props.onFilterAdd}
              selectedIds={this.props.filterObj.author_ids || []}
            />
          ) : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default FilterPanelDesktop;
