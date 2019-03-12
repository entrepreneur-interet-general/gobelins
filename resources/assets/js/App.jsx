import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";
import ReactBreakpoints from "react-breakpoints";
import qs from "qs";
import merge from "deepmerge";
import image from "./vendor/folklore-image.js";

import Collection from "./Collection/Collection";
import Detail from "./Detail/Detail";

const breakpoints = {
  xsmall: 800,
  small: 1024,
  medium: 1440,
  large: 1600,
  xlarge: 1800,
  xxlarge: 9999
};

class App extends Component {
  constructor(props) {
    super(props);

    const stateFromURL = this.extractSearchParams();

    this.state = {
      hits: [],
      currentPage: stateFromURL.currentPage || 1,
      isLoading: false,
      isLoadingMore: false,
      hasMore: false,
      totalHits: 0,
      filterObj: stateFromURL.filterObj || {},
      productDetail: window.PRODUCT || false, // When in detail mode, hold the product data.
      scrollPosition: 0
    };

    this.cache = {};
    this.isLoadingNextPage = false;

    props.history.listen(this.historyEventListener.bind(this));

    this.extractSearchParams = this.extractSearchParams.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.historyPushState = this.historyPushState.bind(this);
    this.loadFromRemote = this.loadFromRemote.bind(this);
    this.handleNextPageCallback = this.handleNextPageCallback.bind(this);
    this.handleAddFilter = this.handleAddFilter.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
    this.handleRemoveAllFilters = this.handleRemoveAllFilters.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.mergeAddedFilters = this.mergeAddedFilters.bind(this);
    this.mergeRemovedFilters = this.mergeRemovedFilters.bind(this);
    this.buildSearchParamsFromParams = this.buildSearchParamsFromParams.bind(
      this
    );
    this.buildSearchParamsFromState = this.buildSearchParamsFromState.bind(
      this
    );
    this.handleBackToCollection = this.handleBackToCollection.bind(this);
    this.handleObjectClick = this.handleObjectClick.bind(this);
    this.dispatchAnalyticsEvent = this.dispatchAnalyticsEvent.bind(this);
  }

  historyEventListener(location, action) {
    console.log("historyEventListener action", action);

    // When using the 'back' button of the browser, we must
    // manually restore the state of the filters.
    if (location.pathname === "/recherche" && action === "POP") {
      const s = "/api/search" + (location.search || "?");
      if (this.cache[s] && this.cache[s].isLoading === false) {
        this.setState(state => {
          this.dispatchAnalyticsEvent();
          return {
            hits: this.cache[s].data.hits,
            hasMore: this.cache[s].data.hasMore,
            totalHits: this.cache[s].data.totalHits,
            currentPage: this.cache[s].currentPage,
            filterObj: location.state.filterObj,
            isLoading: false
          };
        });
      }
    } else {
      // History replace state is used to store state data,
      // no need to track it with analytics.
      if (action !== "REPLACE") {
        this.dispatchAnalyticsEvent();
      }
    }
  }

  extractSearchParams() {
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

        return window.decodeURIComponent(value);
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
    return fetch(searchURL, {
      credentials: "include",
      headers: {
        Accept: "application/json"
      }
    }).then(response => response.json());
  }

  buildSearchParamsFromState() {
    return (
      "?" +
      qs.stringify(
        // { ...this.state.filterObj, page: this.state.currentPage },
        { ...this.state.filterObj },
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

  historyPushState(type = "search") {
    this.props.history.push(`/recherche${this.buildSearchParamsFromState()}`, {
      filterObj: this.state.filterObj,
      type: type
      // currentPage: this.state.currentPage
    });
    // window.scrollTo(0, 0);
  }

  /**
   * Track pushState/popState navigation with analytics service.
   * An event listener is set up inline in the default.blade.php view
   * to track (or not) the page view.
   */
  dispatchAnalyticsEvent() {
    window.document.documentElement.dispatchEvent(
      new Event("gobelins_analytics_pagechange")
    );
  }

  handleLoading() {
    this.setState({ isLoading: true });
  }

  componentDidMount() {
    this.firstLoad();
  }

  firstLoad() {
    let segment1, segment2;
    [, segment1, segment2] = this.props.location.pathname.split("/");
    if (segment1 === "objet") {
      let apiUrl = `/api/product/${segment2}`;
      let visibleUrl = `/objet/${segment2}`;
      this.cache[apiUrl] = {
        product: window.PRODUCT,
        isLoading: false,
        type: "detail"
      };
      this.props.history.replace(this.props.location.pathname, {
        type: "detail"
      });
    }

    let visibleUrl = `/recherche${this.buildSearchParamsFromState()}`;
    let apiUrl = `/api/search${this.buildSearchParamsFromState()}`;
    this.cache[apiUrl] = { isLoading: true, data: {} };
    this.loadFromRemote(apiUrl).then(data => {
      this.cache[apiUrl].data = data;
      this.cache[apiUrl].isLoading = false;
      this.cache[apiUrl].currentPage = 1;
      this.setState(
        {
          hits: data.hits,
          hasMore: data.hasMore,
          totalHits: data.totalHits
        },
        () => {
          if (segment1 === "recherche") {
            this.props.history.replace(visibleUrl, {
              filterObj: this.state.filterObj,
              currentPage: this.state.currentPage,
              type: "search"
            });
            window.scrollTo(0, 0);
          }
        }
      );
    });
  }

  handleNextPageCallback() {
    // FIXME: this flag isn't stopping the page 2+3 problem…
    if (this.isLoadingNextPage || !this.state.hasMore) {
      return;
    }

    let pageToLoad = this.state.currentPage + 1;
    let apiUrl =
      "/api/search" +
      this.buildSearchParamsFromParams({
        ...this.state.filterObj
      });
    let nextPageUrl =
      "/api/search" +
      this.buildSearchParamsFromParams({
        ...this.state.filterObj,
        page: pageToLoad
      });
    if (
      !this.cache.hasOwnProperty(apiUrl) ||
      this.cache[apiUrl].currentPage < pageToLoad
    ) {
      if (!this.cache.hasOwnProperty(apiUrl)) {
        this.cache[apiUrl] = { isLoading: true, data: { hits: [] } };
      }
      this.isLoadingNextPage = true;
      this.setState({ isLoadingMore: true });

      this.loadFromRemote(nextPageUrl).then(data => {
        this.cache[apiUrl].data.hits = this.cache[apiUrl].data.hits.concat(
          data.hits
        );
        this.cache[apiUrl].data.hasMore = data.hasMore;
        this.cache[apiUrl].data.totalHits = data.totalHits;
        this.cache[apiUrl].currentPage = pageToLoad;
        this.cache[apiUrl].isLoading = false;
        this.setState(
          state => ({
            hits: state.hits.concat(data.hits),
            hasMore: data.hasMore,
            totalHits: data.totalHits,
            currentPage: pageToLoad,
            isLoadingMore: false
          }),
          () => {
            //this.historyPushState();
            this.isLoadingNextPage = false;
          }
        );
      });
    } else {
      if (this.cache[apiUrl].isLoading === true) {
        console.log("URL is loading, noop", apiUrl);
        return;
      }
    }
  }

  mergeAddedFilters(filterObj, currentStateFilterObj = null) {
    return merge(currentStateFilterObj || this.state.filterObj, filterObj);
  }

  mergeRemovedFilters(filterToRemove, currentStateFilterObj = null) {
    currentStateFilterObj = currentStateFilterObj || this.state.filterObj;
    let filterValueToAmend = currentStateFilterObj[filterToRemove.paramName];
    let filterObjAmended = currentStateFilterObj;
    if (filterValueToAmend instanceof Array) {
      filterToRemove.ids.map(id => {
        if (filterValueToAmend.indexOf(id) >= 0) {
          filterValueToAmend.splice(filterValueToAmend.indexOf(id), 1);
        }
      });

      if (filterValueToAmend.length > 0) {
        filterObjAmended[filterToRemove.paramName] = filterValueToAmend;
      } else {
        delete filterObjAmended[filterToRemove.paramName];
      }
    } else {
      let match;
      if (filterToRemove.paramName == "period_start_year") {
        // Periods
        delete filterObjAmended.period_start_year;
        delete filterObjAmended.period_end_year;
      } else if (
        // Dimensions
        (match = filterToRemove.paramName.match(/^([_a-z]+_)(l|g)te$/))
      ) {
        delete filterObjAmended[match[1] + "lte"];
        delete filterObjAmended[match[1] + "gte"];
      } else {
        // Other: query string, etc.
        delete filterObjAmended[filterToRemove.paramName];
      }
    }
    return filterObjAmended;
  }

  handleAddFilter(filterObj) {
    const mergedObj = this.mergeAddedFilters(filterObj);
    this.commitFilterChange(mergedObj);
  }

  handleFilterChange(addedFiltersObj, removedFiltersObj) {
    let filterObj;
    filterObj = this.mergeRemovedFilters(removedFiltersObj);
    filterObj = this.mergeAddedFilters(addedFiltersObj, filterObj);
    this.commitFilterChange(filterObj);
  }

  commitFilterChange(filterObj) {
    let apiUrl =
      "/api/search" +
      this.buildSearchParamsFromParams({
        ...filterObj
      });
    if (!this.cache.hasOwnProperty(apiUrl)) {
      this.cache[apiUrl] = {
        isLoading: true,
        data: {},
        currentPage: 1
      };
      this.setState({ isLoading: true }, () => {
        this.loadFromRemote(apiUrl).then(data => {
          this.cache[apiUrl].data = data;
          this.cache[apiUrl].isLoading = false;
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
      if (this.cache[apiUrl].isLoading === false) {
        this.setState(
          state => ({
            hits: this.cache[apiUrl].data.hits,
            hasMore: this.cache[apiUrl].data.hasMore,
            currentPage: 1,
            isLoading: false,
            filterObj: filterObj,
            totalHits: this.cache[apiUrl].data.totalHits
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
      this.cache[searchParams] && this.cache[searchParams].isLoading === true
    );
  }

  handleRemoveFilter(filterToRemove) {
    const filterObj = this.mergeRemovedFilters(filterToRemove);
    this.commitFilterChange(filterObj);
  }

  handleRemoveAllFilters() {
    this.commitFilterChange({});
  }

  handleBackToCollection(event) {
    event.preventDefault();
    // this.props.history.push(`/recherche${this.buildSearchParamsFromState()}`);
    this.historyPushState();
    setTimeout(() => {
      window.scrollTo(0, this.state.scrollPosition);
    }, 0);
  }

  handleObjectClick(product, event) {
    event.preventDefault();
    this.cache[this.props.location.pathname] = {
      type: "detail",
      product: product,
      isLoading: false
    };
    this.setState(
      { productDetail: product, scrollPosition: window.scrollY },
      () => {
        this.props.history.push(`/objet/${product.inventory_id}`, {
          type: "detail"
        });
        window.scrollTo(0, 0);
      }
    );
  }

  render() {
    return (
      <ReactBreakpoints
        breakpoints={breakpoints}
        debounceResize={true}
        debounceDelay={100}
      >
        <Switch>
          <Route
            path="/recherche"
            render={props => (
              <Collection
                {...props}
                onFilterAdd={this.handleAddFilter}
                onFilterRemove={this.handleRemoveFilter}
                onFilterRemoveAll={this.handleRemoveAllFilters}
                onFilterChange={this.handleFilterChange}
                isLoadingURL={this.isLoadingSearch.bind(
                  this,
                  this.buildSearchParamsFromState()
                )}
                isLoading={this.state.isLoading}
                isLoadingMore={this.state.isLoadingMore}
                totalHits={this.state.totalHits}
                filterObj={this.state.filterObj}
                hits={this.state.hits}
                loadMore={this.handleNextPageCallback}
                hasMore={!this.state.isLoading && this.state.hasMore}
                currentPage={this.state.currentPage}
                onObjectClick={this.handleObjectClick}
              />
            )}
          />
          <Route
            path="/objet/:inventory_id"
            render={props => (
              <Detail
                {...props}
                product={this.state.productDetail}
                onBackToCollection={this.handleBackToCollection}
              />
            )}
          />
        </Switch>
      </ReactBreakpoints>
    );
  }
}

export default withRouter(App);
