import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import { hotkeys } from "react-keyboard-shortcuts";

import MagnifyingGlass from "../../icons/MagnifyingGlass";
import CriteriaPhrase from "./CriteriaPhrase";
import MnLogo from "../../icons/MnLogo";
import Loader from "../../Loader";
import ProductTypes from "./ProductTypes";
import Authors from "./Authors";
import Periods from "./Periods";
import Styles from "./Styles";
import Materials from "./Materials";
import ProductionOrigins from "./ProductionOrigins";
import Dimensions from "./Dimensions";
import ResultCount from "../ResultCount";
import DesktopOverlayZone from "./DesktopOverlayZone";
import SelectionsNav from "../../Selection/SelectionsNav.jsx";

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
      searchFieldPlaceholder: "Rechercher",
      isLoadingFullTextSearch: false,
    };
    this.openPanel = this.openPanel.bind(this);
    this.closeFilterPanels = this.closeFilterPanels.bind(this);
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    this.handleSearchFieldFocus = this.handleSearchFieldFocus.bind(this);
    this.handleSearchFieldBlur = this.handleSearchFieldBlur.bind(this);
    this.handleFullTextSearch = this.handleFullTextSearch.bind(this);
    this.renderOverlayContent = this.renderOverlayContent.bind(this);
    this.hot_keys = {
      esc: {
        priority: 1,
        handler: this.closeFilterPanels,
      },
    };
  }

  openPanel(panel, ev) {
    ev.stopPropagation();
    this.setState({ filterPanelOpen: true, openPanel: panel });
    document.documentElement.classList.add("prevent-scroll");
  }

  closeFilterPanels() {
    this.setState({ filterPanelOpen: false, isLoadingFullTextSearch: false });
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
    this.setState({ searchFieldValue: "", isLoadingFullTextSearch: true });
    document.documentElement.classList.add("prevent-scroll");
    ev.preventDefault();
  }

  renderOverlayContent() {
    if (this.props.isLoading) {
      return <Loader />;
    } else {
      if (this.state.filterPanelOpen || this.state.isLoadingFullTextSearch) {
        return (
          <ResultCount
            totalHits={this.props.totalHits}
            onFilterRemoveAll={this.props.onFilterRemoveAll}
          />
        );
      }
    }
  }

  handleOverlayClick = () => {
    // No results? Reset all filters!
    if (this.props.totalHits === 0) {
      this.props.onFilterRemoveAll();
    }
    this.closeFilterPanels();
  };

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
                <div className="FilterPanelDesktop__focus" />
              </div>
              <div className="FilterPanelDesktop__search">
                <button type="submit">
                  <MagnifyingGlass />
                </button>
              </div>
            </form>
            <div className="FilterPanelDesktop__criteria-phrase">
              <CriteriaPhrase
                asPhrase={true}
                filterObj={this.props.filterObj}
                onFilterRemove={this.props.onFilterRemove}
                onFilterRemoveAll={this.props.onFilterRemoveAll}
              />
            </div>
          </div>
          <div className="Filters__list-container">
            <div className="Filters__list-label">Filtrer par :</div>
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
                  onClick={(ev) => this.openPanel("ProductTypes", ev)}
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
                  onClick={(ev) => this.openPanel("Authors", ev)}
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
                  onClick={(ev) => this.openPanel("Periods", ev)}
                >
                  Époque
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
                  onClick={(ev) => this.openPanel("Styles", ev)}
                >
                  Style
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
                  onClick={(ev) => this.openPanel("ProductionOrigins", ev)}
                >
                  Manufacture et atelier
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
                  onClick={(ev) => this.openPanel("Materials", ev)}
                >
                  Matière
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
                  onClick={(ev) => this.openPanel("Dimensions", ev)}
                >
                  Dimension
                </button>
              </li>
            </ul>
          </div>
          <div className="FilterPanelDesktop__bottom-row">
            <SelectionsNav />
            {/* <a href="http://www.mobiliernational.culture.gouv.fr/" title="Mobilier national">
              <MnLogo className="FilterPanelDesktop__mn-logo" />
            </a>
            <a href="/info" className="FilterPanelDesktop__info-link" title="Information">
              <span>i</span>
            </a> */}
          </div>
        </div>

        <CSSTransitionGroup
          transitionName="DesktopOverlayZone"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.state.isLoadingFullTextSearch &&
            !this.state.filterPanelOpen && (
              <DesktopOverlayZone
                onClickOverlay={this.handleOverlayClick}
                offsetLeft={288}
                filterPanelsWidth={288}
              >
                {this.renderOverlayContent()}
              </DesktopOverlayZone>
            )}
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
              onFilterAdd={this.props.onFilterAdd}
              onFilterChange={this.props.onFilterChange}
              onFilterRemove={this.props.onFilterRemove}
              selectedIds={this.props.filterObj.product_type_ids || []}
              totalHitsComponent={this.renderOverlayContent()}
              filterPanelOpen={this.state.filterPanelOpen}
              isLoading={this.props.isLoading}
              onClickOverlay={this.handleOverlayClick}
            />
          ) : null}

          {this.state.filterPanelOpen && this.state.openPanel === "Authors" ? (
            <Authors
              authors={this.state.authors}
              onFilterAdd={this.props.onFilterAdd}
              onFilterRemove={this.props.onFilterRemove}
              selectedIds={this.props.filterObj.author_ids || []}
              totalHitsComponent={this.renderOverlayContent()}
              filterPanelOpen={this.state.filterPanelOpen}
              isLoading={this.props.isLoading}
              onClickOverlay={this.handleOverlayClick}
            />
          ) : null}

          {this.state.filterPanelOpen && this.state.openPanel === "Periods" ? (
            <Periods
              periods={this.state.periods}
              onFilterAdd={this.props.onFilterAdd}
              periodStartYear={this.props.filterObj.period_start_year}
              periodEndYear={this.props.filterObj.period_end_year}
              totalHitsComponent={this.renderOverlayContent()}
              filterPanelOpen={this.state.filterPanelOpen}
              isLoading={this.props.isLoading}
              onClickOverlay={this.handleOverlayClick}
            />
          ) : null}

          {this.state.filterPanelOpen && this.state.openPanel === "Styles" ? (
            <Styles
              styles={this.state.styles}
              onFilterAdd={this.props.onFilterAdd}
              onFilterRemove={this.props.onFilterRemove}
              selectedIds={this.props.filterObj.style_ids || []}
              totalHitsComponent={this.renderOverlayContent()}
              filterPanelOpen={this.state.filterPanelOpen}
              isLoading={this.props.isLoading}
              onClickOverlay={this.handleOverlayClick}
            />
          ) : null}

          {this.state.filterPanelOpen &&
          this.state.openPanel === "Materials" ? (
            <Materials
              materials={this.state.materials}
              onFilterAdd={this.props.onFilterAdd}
              onFilterChange={this.props.onFilterChange}
              onFilterRemove={this.props.onFilterRemove}
              selectedIds={this.props.filterObj.material_ids || []}
              totalHitsComponent={this.renderOverlayContent()}
              filterPanelOpen={this.state.filterPanelOpen}
              isLoading={this.props.isLoading}
              onClickOverlay={this.handleOverlayClick}
            />
          ) : null}

          {this.state.filterPanelOpen &&
          this.state.openPanel === "ProductionOrigins" ? (
            <ProductionOrigins
              productionOrigins={this.state.productionOrigins}
              onFilterAdd={this.props.onFilterAdd}
              onFilterRemove={this.props.onFilterRemove}
              selectedIds={this.props.filterObj.production_origin_ids || []}
              totalHitsComponent={this.renderOverlayContent()}
              filterPanelOpen={this.state.filterPanelOpen}
              isLoading={this.props.isLoading}
              onClickOverlay={this.handleOverlayClick}
            />
          ) : null}

          {this.state.filterPanelOpen &&
          this.state.openPanel === "Dimensions" ? (
            <Dimensions
              onFilterAdd={this.props.onFilterAdd}
              onFilterRemove={this.props.onFilterRemove}
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
              totalHitsComponent={this.renderOverlayContent()}
              filterPanelOpen={this.state.filterPanelOpen}
              isLoading={this.props.isLoading}
              onClickOverlay={this.handleOverlayClick}
            />
          ) : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default hotkeys(FilterPanelDesktop);
