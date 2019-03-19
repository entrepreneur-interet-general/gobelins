import React, { Component } from "react";
import { Media } from "react-breakpoints";
import FiltersMobile from "./FiltersMobile.jsx";
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
            <FiltersMobile
              onFilterAdd={this.props.onFilterAdd}
              onFilterRemove={this.props.onFilterRemove}
              onFilterRemoveAll={this.props.onFilterRemoveAll}
              onFilterChange={this.props.onFilterChange}
              isLoading={this.props.isLoading}
              totalHits={this.props.totalHits}
              filterObj={this.props.filterObj}
            />
          ) : (
            <FilterPanelDesktop
              onFilterAdd={this.props.onFilterAdd}
              onFilterRemove={this.props.onFilterRemove}
              onFilterRemoveAll={this.props.onFilterRemoveAll}
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
