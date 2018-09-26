import React, { Component } from "react";
import ReactBreakpoints from "react-breakpoints";
import CollectionList from "./CollectionList.jsx";
import CollectionGrid from "./CollectionGrid.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import Filters from "./Filters/Filters.jsx";
import Settings from "./Settings/Settings.jsx";
import qs from "qs";
import { uniq } from "lodash";
import merge from "deepmerge";

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

    const stateFromURL = this.extractStateFromURL();
    console.log("state from URL", stateFromURL);

    this.state = {
      hits: [],
      currentPage: stateFromURL.currentPage || 1,
      isLoading: false,
      hasMore: false,
      totalHits: 0,
      filterObj: stateFromURL.filterObj || {}
    };

    this.cache = {};
    this.searches = {};
    this.isLoadingNextPage = false;

    //

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.buildEndpointUrl = this.buildEndpointUrl.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.historyPushState = this.historyPushState.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
    this.loadFromRemote = this.loadFromRemote.bind(this);
    this.handleNextPageCallback = this.handleNextPageCallback.bind(this);
    this.handleAddFilter = this.handleAddFilter.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.buildSearchParamsFromParams = this.buildSearchParamsFromParams.bind(
      this
    );
    this.buildSearchParamsFromState = this.buildSearchParamsFromState.bind(
      this
    );
  }

  extractStateFromURL() {
    let urlParams = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
      decoder(value) {
        if (/^(\d+|\d*\.\d+)$/.test(value)) {
          return parseFloat(value);
        }

        let keywords = {
          true: true,
          false: false,
          null: null,
          undefined: undefined
        };
        if (value in keywords) {
          return keywords[value];
        }

        return value;
      }
    });
    let out = {};
    if (urlParams.page) {
      out.currentPage = urlParams.page;
      delete urlParams.page;
    }
    out.filterObj = { ...urlParams };
    return out;
  }

  loadFromRemote(searchURL) {
    return fetch(process.env.MIX_COLLECTION_DSN + searchURL, {
      headers: {
        Accept: "application/json"
      }
    }).then(response => response.json());
  }

  buildEndpointUrl() {
    return process.env.MIX_COLLECTION_DSN + this.buildSearchParamsFromState();
  }

  buildSearchParamsFromState() {
    return (
      "?" +
      qs.stringify(
        { ...this.state.filterObj, page: this.state.currentPage },
        { arrayFormat: "brackets", encodeValuesOnly: true }
      )
    );
  }

  buildSearchParamsFromParams(params) {
    return (
      "?" +
      qs.stringify(params, { arrayFormat: "brackets", encodeValuesOnly: true })
    );
  }

  historyPushState() {
    let urlBase = window.location.origin + window.location.pathname;
    window.history.pushState(
      { ...this.state.filterObj, page: this.state.currentPage },
      "Recherche",
      urlBase + this.buildSearchParamsFromState()
    );
  }

  handleFilterChange(filterObj) {
    this.setState({ filterObj: filterObj, currentPage: 1 });
  }

  handleLoading() {
    this.setState({ isLoading: true });
  }

  componentDidMount() {
    window.addEventListener("popstate", this.handlePopState);
    this.firstLoad();
  }
  componentWillUnmount() {
    window.removeEventListener("popstate", this.handlePopState);
  }

  handlePopState(ev) {
    // TODO: we'll probably have to integrating a proper router here
    // once we have the detail-page view.
    let searchUrl = this.buildSearchParamsFromParams(ev.state);
    if (this.searches[searchUrl].isLoading === false) {
      this.setState(state => ({
        hits: this.searches[searchUrl].data.hits,
        hasMore: this.searches[searchUrl].data.hasMore,
        totalHits: this.searches[searchUrl].data.totalHits,
        currentPage: ev.state.page,
        isLoading: false
      }));
    }
  }

  firstLoad() {
    let searchUrl = this.buildSearchParamsFromState();
    this.searches[searchUrl] = {
      isLoading: true,
      data: {}
    };
    this.loadFromRemote(searchUrl).then(data => {
      this.searches[searchUrl].data = data;
      this.searches[searchUrl].isLoading = false;
      this.setState({
        hits: data.hits,
        hasMore: data.hasMore,
        totalHits: data.totalHits
      });
    });
  }

  handleNextPageCallback() {
    console.log("handleNextPageCallback", this.state.isLoading);

    // FIXME: this flag isn't stopping the page 2+3 problem…
    if (this.isLoadingNextPage || !this.state.hasMore) {
      return;
    }
    let pageToLoad = this.state.currentPage + 1;
    let nextPageUrl = this.buildSearchParamsFromParams({
      ...this.state.filterObj,
      page: pageToLoad
    });
    if (!this.searches.hasOwnProperty(nextPageUrl)) {
      this.searches[nextPageUrl] = {
        isLoading: true,
        data: {}
      };
      this.isLoadingNextPage = true;
      this.setState({ isLoading: true });

      this.loadFromRemote(nextPageUrl).then(data => {
        this.searches[nextPageUrl].data = data;
        this.searches[nextPageUrl].isLoading = false;
        this.setState(
          state => ({
            hits: state.hits.concat(data.hits),
            hasMore: data.hasMore,
            totalHits: data.totalHits,
            currentPage: pageToLoad,
            isLoading: false
          }),
          () => {
            this.historyPushState();
            this.isLoadingNextPage = false;
          }
        );
      });
    } else {
      if (this.searches[nextPageUrl].isLoading === true) {
        console.log("URL is loading, noop", nextPageUrl);
        return;
      } else {
        console.log("URL is already loaded, noop", nextPageUrl);
      }
    }
  }

  handleAddFilter(filterObj) {
    const filters = merge(this.state.filterObj, filterObj);
    this.handleFilterChange(filters);
  }

  handleFilterChange(filterObj) {
    let searchUrl = this.buildSearchParamsFromParams({
      ...filterObj,
      page: 1
    });
    if (!this.searches.hasOwnProperty(searchUrl)) {
      this.searches[searchUrl] = {
        isLoading: true,
        data: {}
      };
      this.setState({ isLoading: true }, () => {
        this.loadFromRemote(searchUrl).then(data => {
          this.searches[searchUrl].data = data;
          this.searches[searchUrl].isLoading = false;
          this.setState(
            state => ({
              hits: data.hits,
              hasMore: data.hasMore,
              currentPage: 1,
              isLoading: false,
              totalHits: data.totalHits,
              filterObj: filterObj
            }),
            () => {
              this.historyPushState();
            }
          );
        });
      });
    } else {
      if (this.searches[searchUrl].isLoading === false) {
        this.setState(
          state => ({
            hits: this.searches[searchUrl].data.hits,
            hasMore: this.searches[searchUrl].data.hasMore,
            currentPage: 1,
            isLoading: false
          }),
          () => {
            this.historyPushState();
          }
        );
      }
    }
  }

  isLoadingSearch(searchParams) {
    return (
      this.searches[searchParams] &&
      this.searches[searchParams].isLoading === true
    );
  }

  handleRemoveFilter(filterToRemove) {
    let filterValueToAmend = this.state.filterObj[filterToRemove.paramName];
    if (filterValueToAmend instanceof Array) {
      filterValueToAmend.splice(
        filterValueToAmend.indexOf(filterToRemove.id),
        1
      );
    }
    let filterObjAmended = this.state.filterObj;
    filterObjAmended[filterToRemove.paramName] = filterValueToAmend;
    this.handleFilterChange(filterObjAmended);
  }

  render() {
    return (
      <ReactBreakpoints
        breakpoints={breakpoints}
        debounceResize={true}
        debounceDelay={100}
      >
        <div className="Collection">
          <Filters
            onFilterAdd={this.handleAddFilter}
            onFilterRemove={this.handleRemoveFilter}
            isLoadingURL={this.isLoadingSearch.bind(
              this,
              this.buildSearchParamsFromState()
            )}
            isLoading={this.state.isLoading}
            totalHits={this.state.totalHits}
            filterObj={this.state.filterObj}
          />
          <div className="Collection__result">
            {true ? (
              <CollectionGrid
                hits={this.state.hits}
                loadMore={this.handleNextPageCallback}
                hasMore={!this.state.isLoading && this.state.hasMore}
                currentPage={this.state.currentPage}
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
