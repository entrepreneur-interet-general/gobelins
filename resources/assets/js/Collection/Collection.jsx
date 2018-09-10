import React, { Component } from "react";
import ReactBreakpoints from "react-breakpoints";
import CollectionList from "./CollectionList.jsx";
import CollectionGrid from "./CollectionGrid.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import Filters from "./Filters/Filters.jsx";
import Settings from "./Settings/Settings.jsx";
import qs from "qs";
import { isEqual } from "lodash";

const breakpoints = {
  xsmall: 800,
  small: 1024,
  medium: 1440,
  large: 1600,
  xlarge: 1800,
  xxlarge: 9999
};

class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hits: [],
      currentPage: 1,
      isLoading: false,
      hasMore: false,
      filterObj: {}
    };

    this.load = this.load.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.buildEndpointUrl = this.buildEndpointUrl.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  }

  load() {
    if (this.state.isLoading) {
      return false;
    } else {
      this.setState({ isLoading: true }, () => {
        fetch(this.buildEndpointUrl(), {
          headers: {
            Accept: "application/json"
          }
        })
          .then(response => response.json())
          .then(data => {
            this.isLoading = false;
            this.setState(state => ({
              hits:
                state.currentPage === 1
                  ? data.hits
                  : state.hits.concat(data.hits),
              hasMore: data.hasMore,
              isLoading: false
            }));
          });
      });
    }
  }

  buildEndpointUrl() {
    return (
      process.env.MIX_COLLECTION_DSN +
      "?" +
      qs.stringify(
        { ...this.state.filterObj, page: this.state.currentPage },
        { arrayFormat: "brackets" }
      )
    );
  }

  loadNextPage() {
    // We need a synchronous isLoading property, because
    // this method is being called outside of the React lifecycle.
    // Keeping the state.isLoading to handle normal cases.
    if (this.isLoading === true) {
      return;
    }
    this.isLoading = true;
    this.setState(state => {
      return { currentPage: state.currentPage + 1 };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !isEqual(prevState.filterObj, this.state.filterObj) ||
      prevState.currentPage != this.state.currentPage
    ) {
      console.log("filters or current page has changed, calling load()");
      // TODO: handle history.pushState()
      this.load();
    }
  }

  handleFilterChange(filterObj) {
    this.setState({ filterObj: filterObj, currentPage: 1 });
  }

  handleLoading() {
    this.setState({ isLoading: true });
  }

  componentDidMount() {
    this.load({}, 1);
  }

  render() {
    return (
      <ReactBreakpoints
        breakpoints={breakpoints}
        debounceResize={true}
        debounceDelay={100}
      >
        <div className="Collection">
          <Filters onFilterChange={this.handleFilterChange} />
          <div className="Collection__result">
            {true ? (
              <CollectionGrid
                hits={this.state.hits}
                loadMore={this.loadNextPage}
                hasMore={!this.state.isLoading && this.state.hasMore}
              />
            ) : (
              <CollectionList hits={this.state.hits} />
            )}
          </div>
          <ScrollToTop />
          <Settings />
        </div>
      </ReactBreakpoints>
    );
  }
}

export default Collection;
