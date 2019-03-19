import React, { Component } from "react";
import Headroom from "react-headroom";

import CriteriaPhrase from "./CriteriaPhrase";
import MnLogo from "./MnLogo";
import MagnifyingGlass from "./MagnifyingGlass";
import ScrollToTop from "../ScrollToTop";
import MobileSearch from "./MobileSearch";
import Loader from "../../Loader";
import ResultCount from "../ResultCount";
import FilterPanelMobile from "./FilterPanelMobile";

class FiltersMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMode: "default"
    };

    this.activateSearchMode = this.activateSearchMode.bind(this);
    this.activateFilterMode = this.activateFilterMode.bind(this);
    this.handleCloseSearch = this.handleCloseSearch.bind(this);
    this.handleCloseFilterPanel = this.handleCloseFilterPanel.bind(this);
    this.handleFullTextSearch = this.handleFullTextSearch.bind(this);
    this.renderOverlayContent = this.renderOverlayContent.bind(this);
  }

  activateSearchMode() {
    this.setState({
      currentMode: "search"
    });
  }

  activateFilterMode() {
    this.setState({
      currentMode: "filter"
    });
  }

  handleCloseSearch() {
    this.setState({
      currentMode: "default"
    });
  }
  handleCloseFilterPanel() {
    this.setState({
      currentMode: "default"
    });
  }

  handleFullTextSearch(searchStr) {
    this.props.onFilterAdd({ q: searchStr });
  }

  renderOverlayContent() {
    if (this.props.isLoading) {
      return <Loader />;
    } else {
      return (
        <ResultCount
          totalHits={this.props.totalHits}
          onFilterRemoveAll={this.props.onFilterRemoveAll}
        />
      );
    }
  }

  render() {
    return (
      <div className="FiltersMobile">
        <Headroom>
          <div className="FiltersMobile__header">
            <div className="FiltersMobile__firstline">
              <MnLogo width={43} height={13} className="FiltersMobile__logo" />
              <h1 className="FiltersMobile__maintitle">
                Collection du Mobilier national
              </h1>
              <a
                href="/info"
                title="information"
                className="FiltersMobile__info-link"
              >
                <span>i</span>
              </a>
            </div>
            <div className="FiltersMobile__active-filters-container">
              <CriteriaPhrase
                asPhrase={false}
                filterObj={this.props.filterObj}
                onFilterRemove={this.props.onFilterRemove}
                onFilterRemoveAll={this.props.onFilterRemoveAll}
              />
            </div>
          </div>
        </Headroom>

        {this.state.currentMode === "search" ? (
          <MobileSearch
            onCloseSearch={this.handleCloseSearch}
            onSearch={this.handleFullTextSearch}
            overlayContent={this.renderOverlayContent()}
          />
        ) : null}

        {this.state.currentMode === "filter" ? (
          <FilterPanelMobile
            onCloseFilterPanel={this.handleCloseFilterPanel}
            onFilterAdd={this.props.onFilterAdd}
            onFilterRemove={this.props.onFilterRemove}
            onFilterRemoveAll={this.props.onFilterRemoveAll}
            onFilterChange={this.props.onFilterChange}
            filterObj={this.props.filterObj}
            overlayContent={this.renderOverlayContent()}
          />
        ) : null}

        <div className="FiltersMobile__toggles">
          <div className="FiltersMobile__toggleholder FiltersMobile__toggleholder--left">
            <button
              type="button"
              className="FiltersMobile__filterbutton"
              onClick={this.activateFilterMode}
            >
              Filtrer
            </button>
          </div>
          <div className="FiltersMobile__toggleholder FiltersMobile__toggleholder--center">
            <button
              type="button"
              className="FiltersMobile__searchicon"
              onClick={this.activateSearchMode}
            >
              <MagnifyingGlass width={20} height={20} />
            </button>
          </div>
          <div className="FiltersMobile__toggleholder FiltersMobile__toggleholder--right">
            <ScrollToTop />
          </div>
        </div>
      </div>
    );
  }
}

export default FiltersMobile;
