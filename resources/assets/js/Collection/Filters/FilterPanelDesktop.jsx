import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
// import MagnifyingGlassIcon from "react-svg-loader!./magnifying_glass.svg";
// import MagnifyingGlassIcon from "@svgr/webpack!./magnifying_glass.svg";
import MagnifyingGlass from "./MagnifyingGlass.jsx";
import CriteriaPhrase from "./CriteriaPhrase.jsx";
import MnLogo from "./MnLogo.jsx";
import Loader from "../Loader.jsx";
import ProductTypes from "./ProductTypesNeue.jsx";
import Authors from "./Authors.jsx";
import Periods from "./Periods.jsx";
import Styles from "./Styles.jsx";
import Materials from "./Materials.jsx";
import ProductionOrigins from "./ProductionOrigins.jsx";
import Dimensions from "./Dimensions.jsx";

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
      dimensions: window.__INITIAL_STATE__.dimensions,
      filterPanelOpen: false,
      searchFieldValue: "",
      searchFieldPlaceholder: "Rechercher"
    };
    this.openPanel = this.openPanel.bind(this);
    this.closeFilterPanels = this.closeFilterPanels.bind(this);
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    this.handleSearchFieldFocus = this.handleSearchFieldFocus.bind(this);
    this.handleSearchFieldBlur = this.handleSearchFieldBlur.bind(this);
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
  handleSearchFieldFocus(ev) {
    this.setState({ searchFieldPlaceholder: "mot-clé, date, artiste…" });
  }
  handleSearchFieldBlur(ev) {
    this.setState({ searchFieldPlaceholder: "Rechercher" });
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
                  placeholder={this.state.searchFieldPlaceholder}
                  type="text"
                  value={this.state.searchFieldValue}
                  onChange={this.handleSearchFieldChange}
                  onFocus={this.handleSearchFieldFocus}
                  onBlur={this.handleSearchFieldBlur}
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
                  className={
                    "is-product_type" +
                    (this.state.filterPanelOpen &&
                    this.state.openPanel === "ProductTypes"
                      ? " is-open"
                      : "")
                  }
                  onClick={ev => this.openPanel("ProductTypes", ev)}
                >
                  Type d’objet
                </button>
              </li>
              <li>
                <button
                  className={
                    "is-author" +
                    (this.state.filterPanelOpen &&
                    this.state.openPanel === "Authors"
                      ? " is-open"
                      : "")
                  }
                  onClick={ev => this.openPanel("Authors", ev)}
                >
                  Auteur
                </button>
              </li>
              <li>
                <button
                  className={
                    "is-period" +
                    (this.state.filterPanelOpen &&
                    this.state.openPanel === "Periods"
                      ? " is-open"
                      : "")
                  }
                  onClick={ev => this.openPanel("Periods", ev)}
                >
                  Période de création
                </button>
              </li>
              <li>
                <button
                  className={
                    "is-style" +
                    (this.state.filterPanelOpen &&
                    this.state.openPanel === "Styles"
                      ? " is-open"
                      : "")
                  }
                  onClick={ev => this.openPanel("Styles", ev)}
                >
                  Style
                </button>
              </li>
              <li>
                <button
                  className={
                    "is-material" +
                    (this.state.filterPanelOpen &&
                    this.state.openPanel === "Materials"
                      ? " is-open"
                      : "")
                  }
                  onClick={ev => this.openPanel("Materials", ev)}
                >
                  Matière
                </button>
              </li>
              <li>
                <button
                  className={
                    "is-production_origin" +
                    (this.state.filterPanelOpen &&
                    this.state.openPanel === "ProductionOrigins"
                      ? " is-open"
                      : "")
                  }
                  onClick={ev => this.openPanel("ProductionOrigins", ev)}
                >
                  Lieu de production
                </button>
              </li>
              <li>
                <button
                  className={
                    "is-dimension" +
                    (this.state.filterPanelOpen &&
                    this.state.openPanel === "Dimensions"
                      ? " is-open"
                      : "")
                  }
                  onClick={ev => this.openPanel("Dimensions", ev)}
                >
                  Dimension
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
              onFilterChange={this.props.onFilterChange}
              onFilterRemove={this.props.onFilterRemove}
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

          {this.state.filterPanelOpen && this.state.openPanel === "Authors" ? (
            <Authors
              authors={this.state.authors}
              onFilterAdd={this.props.onFilterAdd}
              selectedIds={this.props.filterObj.author_ids || []}
            />
          ) : null}

          {this.state.filterPanelOpen && this.state.openPanel === "Periods" ? (
            <Periods
              periods={this.state.periods}
              onFilterAdd={this.props.onFilterAdd}
              periodStartYear={this.props.filterObj.period_start_year}
              periodEndYear={this.props.filterObj.period_end_year}
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
          this.state.openPanel === "Materials" ? (
            <Materials
              materials={this.state.materials}
              onFilterAdd={this.props.onFilterAdd}
              onFilterChange={this.props.onFilterChange}
              selectedIds={this.props.filterObj.material_ids || []}
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

          {this.state.filterPanelOpen &&
          this.state.openPanel === "Dimensions" ? (
            <Dimensions
              onFilterAdd={this.props.onFilterAdd}
              dimensions={this.state.dimensions}
              length_or_diameter_lte={
                this.props.filterObj.length_or_diameter_lte
              }
              length_or_diameter_gte={
                this.props.filterObj.length_or_diameter_gte
              }
              depth_or_width_lte={this.props.filterObj.depth_or_width_lte}
              depth_or_width_gte={this.props.filterObj.depth_or_width_gte}
              height_or_thickness_lte={
                this.props.filterObj.height_or_thickness_lte
              }
              height_or_thickness_gte={
                this.props.filterObj.height_or_thickness_gte
              }
            />
          ) : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default FilterPanelDesktop;
