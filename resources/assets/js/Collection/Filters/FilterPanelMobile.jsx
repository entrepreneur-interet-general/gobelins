import React, { Component } from "react";
import Headroom from "react-headroom";

import CriteriaPhrase from "./CriteriaPhrase";
import MnLogo from "./MnLogo";
import MagnifyingGlass from "./MagnifyingGlass";
import ScrollToTop from "../ScrollToTop";
import MobileSearch from "./MobileSearch";
import Loader from "../../Loader";
import ResultCount from "../ResultCount";

class FilterPanelMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMode: "default"
    };

    this.activateSearchMode = this.activateSearchMode.bind(this);
    this.handleCloseSearch = this.handleCloseSearch.bind(this);
    this.handleFullTextSearch = this.handleFullTextSearch.bind(this);
    this.renderOverlayContent = this.renderOverlayContent.bind(this);
  }

  activateSearchMode() {
    this.setState({
      currentMode: "search"
    });
  }

  handleCloseSearch() {
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
      <div className="FilterPanelMobile">
        <Headroom>
          <div className="FilterPanelMobile__header">
            <div className="FilterPanelMobile__firstline">
              <MnLogo
                width={43}
                height={13}
                className="FilterPanelMobile__logo"
              />
              <h1 className="FilterPanelMobile__maintitle">
                Collection du Mobilier national
              </h1>
              <a
                href="/info"
                title="information"
                className="FilterPanelMobile__info-link"
              >
                <span>i</span>
              </a>
            </div>
            <div className="FilterPanelMobile__active-filters-container">
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

        <div className="FilterPanelMobile__toggles">
          <div className="FilterPanelMobile__toggleholder FilterPanelMobile__toggleholder--left">
            <button type="button" className="FilterPanelMobile__filterbutton">
              Filtrer
            </button>
          </div>
          <div className="FilterPanelMobile__toggleholder FilterPanelMobile__toggleholder--center">
            <button
              type="button"
              className="FilterPanelMobile__searchicon"
              onClick={this.activateSearchMode}
            >
              <MagnifyingGlass width={20} height={20} />
            </button>
          </div>
          <div className="FilterPanelMobile__toggleholder FilterPanelMobile__toggleholder--right">
            <ScrollToTop />
          </div>
        </div>
      </div>
    );
  }
}

export default FilterPanelMobile;
