import React, { Component } from "react";
import Headroom from "react-headroom";

import CriteriaPhrase from "./CriteriaPhrase";
import MnLogo from "../../icons/MnLogo";
import MagnifyingGlass from "../../icons/MagnifyingGlass";
import ScrollToTop from "../ScrollToTop";
import MobileSearch from "./MobileSearch";
import Loader from "../../Loader";
import ResultCount from "../ResultCount";
import FilterPanelMobile from "./FilterPanelMobile";
import SelectionsNav from "../../Selection/SelectionsNav";

class FiltersMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMode: "default",
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
      currentMode: "search",
    });
  }

  activateFilterMode() {
    this.setState({
      currentMode: "filter",
    });
  }

  handleCloseSearch() {
    this.setState({
      currentMode: "default",
    });
    if (this.props.totalHits === 0) {
      this.props.onFilterRemoveAll();
    }
  }
  handleCloseFilterPanel() {
    this.setState({
      currentMode: "default",
    });
  }

  handleFullTextSearch(searchStr) {
    this.props.onFilterAdd({ q: searchStr });
  }

  renderOverlayContent() {
    if (this.props.isLoading) {
      return <Loader className="FilterPanelMobile__loader" />;
    } else {
      return (
        <ResultCount
          totalHits={this.props.totalHits}
          onFilterRemoveAll={this.props.onFilterRemoveAll}
          className="FilterPanelMobile__resultcount"
        />
      );
    }
  }

  render() {
    const css = `
      :root {
        --Nav-position-top: 15px;
        --Nav-position-right: 15px;
      }
      @media (min-width: 800px) {
        :root {
          --Nav-position-top: 17px;
          --Nav-position-right: 40px;
        }
      }
      @media (min-width: 1024px) {
        :root {
          --Nav-position-top: 35px;
          --Nav-position-right: 40px;
        }
      }
    `;

    return (
      <div className="FiltersMobile">
        <Headroom disableInlineStyles>
          <div className="FiltersMobile__header">
            <h1 className="FiltersMobile__maintitle">
              <a
                href="{{ route('search') }}"
                className="FiltersMobile__maintitle-link"
                title="Mobilier national"
              >
                Collection
                <br className="FiltersMobile__maintitle-br" /> du Mobilier
                national
              </a>
            </h1>
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
        <style>{css}</style>

        {this.state.currentMode === "search" ? (
          <MobileSearch
            onCloseSearch={this.handleCloseSearch}
            onSearch={this.handleFullTextSearch}
            overlayContent={this.renderOverlayContent()}
            onFilterRemoveAll={this.props.onFilterRemoveAll}
            totalHits={this.props.totalHits}
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
            totalHits={this.props.totalHits}
            overlayContent={this.renderOverlayContent()}
            onFilterRemoveAll={this.props.onFilterRemoveAll}
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
          <div className="FiltersMobile__toggleholder FiltersMobile__toggleholder--center">
            <SelectionsNav />
          </div>
          {/* <div className="FiltersMobile__toggleholder FiltersMobile__toggleholder--right">
            <ScrollToTop />
          </div> */}
        </div>
      </div>
    );
  }
}

export default FiltersMobile;
