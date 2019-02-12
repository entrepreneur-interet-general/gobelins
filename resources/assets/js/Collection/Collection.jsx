import React, { Component } from "react";
import CollectionList from "./CollectionList.jsx";
import CollectionGrid from "./CollectionGrid.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import Filters from "./Filters/Filters.jsx";
// import Settings from "./Settings/Settings.jsx";

class Collection extends Component {
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
            />
          ) : (
            <CollectionList hits={this.props.hits} />
          )}
        </div>
        <ScrollToTop isLoading={this.props.isLoading} />
        {/* <Settings /> */}
      </div>
    );
  }
}

export default Collection;
