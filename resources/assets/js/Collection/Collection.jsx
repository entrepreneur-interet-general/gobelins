import React, { Component, Fragment } from "react";
import { Media } from "react-breakpoints";

import CollectionList from "./CollectionList.jsx";
import CollectionGrid from "./CollectionGrid.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import Filters from "./Filters/Filters.jsx";
// import SelectionsNav from "../Selection/SelectionsNav.jsx";
// import Settings from "./Settings/Settings.jsx";

class Collection extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.document.title = "Collection du Mobilier national MN/Lab";
  }

  render() {
    return (
      <div className="Collection">
        <Filters
          onFilterAdd={this.props.onFilterAdd}
          onFilterRemove={this.props.onFilterRemove}
          onFilterRemoveAll={this.props.onFilterRemoveAll}
          onFilterChange={this.props.onFilterChange}
          isLoadingURL={this.props.isLoadingURL}
          isLoading={this.props.isLoading}
          totalHits={this.props.totalHits}
          filterObj={this.props.filterObj}
        />
        <div className="Collection__result">
          {true ? (
            <CollectionGrid
              hits={this.props.hits}
              loadMore={this.props.loadMore}
              hasMore={this.props.hasMore}
              currentPage={this.props.currentPage}
              onDisplayProduct={this.props.onDisplayProduct}
              onObjectClick={this.props.onObjectClick}
              isLoading={this.props.isLoading}
              isLoadingMore={this.props.isLoadingMore}
            />
          ) : (
            <CollectionList hits={this.props.hits} />
          )}
        </div>

        <Media>
          {({ breakpoints, currentBreakpoint }) =>
            breakpoints[currentBreakpoint] >= breakpoints.small ? (
              <Fragment>
                <div className="Collection__scrollToTop">
                  <ScrollToTop />
                </div>
                {/* <SelectionsNav /> */}
              </Fragment>
            ) : null
          }
        </Media>
        {/* <Settings /> */}
      </div>
    );
  }
}

export default Collection;
