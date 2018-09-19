import React, { Component } from "react";
import { Media } from "react-breakpoints";
import FilterPanelMobile from "./FilterPanelMobile.jsx";
import FilterPanelDesktop from "./FilterPanelDesktop.jsx";

class FilterPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Media>
        {({ breakpoints, currentBreakpoint }) =>
          breakpoints[currentBreakpoint] < breakpoints.small ? (
            <FilterPanelMobile onFilterChange={this.props.onFilterChange} />
          ) : (
            <FilterPanelDesktop
              onFilterChange={this.props.onFilterChange}
              isLoading={this.props.isLoading}
              totalHits={this.props.totalHits}
              filterObj={this.props.filterObj}
            />
          )
        }
      </Media>
    );
  }
}

export default FilterPanel;
