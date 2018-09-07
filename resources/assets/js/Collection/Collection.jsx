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

  load(filterObj, page) {
    if (this.state.isLoading) {
      return false;
    } else {
      this.setState({ isLoading: true }, () => {
        fetch(this.buildEndpointUrl(filterObj, page), {
          headers: {
            Accept: "application/json"
          }
        })
          .then(response => response.json())
          .then(data => {
            this.setState({
              hits: page === 1 ? data.hits : this.state.hits.concat(data.hits),
              hasMore: data.hasMore,
              isLoading: false
            });
          });
      });
    }
  }

  buildEndpointUrl(filterObj, page) {
    return (
      process.env.MIX_COLLECTION_DSN +
      "?" +
      qs.stringify({ ...filterObj, page: page }, { arrayFormat: "brackets" })
    );
  }

  loadNextPage(page) {
    this.load(this.state.filterObj, page);
  }

  handleFilterChange(filterObj) {
    this.setState({ filterObj: filterObj, currentPage: 1 });
    this.load(filterObj, 1);
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
