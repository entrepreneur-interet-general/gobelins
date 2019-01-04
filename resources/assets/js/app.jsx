import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import ReactBreakpoints from "react-breakpoints";
import qs from "qs";
import merge from "deepmerge";

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
      hasMore: false,
      totalHits: 0,
      filterObj: stateFromURL.filterObj || {},
      productDetail: false, // When in detail mode, hold the product data.
      scrollPosition: 0
    };

    this.cache = {};
    this.searches = {};
    this.isLoadingNextPage = false;

    //

    this.extractSearchParams = this.extractSearchParams.bind(this);
    this.buildEndpointUrl = this.buildEndpointUrl.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
    this.historyPushState = this.historyPushState.bind(this);
    // this.handlePopState = this.handlePopState.bind(this);
    this.loadFromRemote = this.loadFromRemote.bind(this);
    this.handleNextPageCallback = this.handleNextPageCallback.bind(this);
    this.handleAddFilter = this.handleAddFilter.bind(this);
    this.handleRemoveFilter = this.handleRemoveFilter.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.mergeAddedFilters = this.mergeAddedFilters.bind(this);
    this.mergeRemovedFilters = this.mergeRemovedFilters.bind(this);
    this.buildSearchParamsFromParams = this.buildSearchParamsFromParams.bind(
      this
    );
    this.buildSearchParamsFromState = this.buildSearchParamsFromState.bind(
      this
    );
    // this.handleDisplayProduct = this.handleDisplayProduct.bind(this);
    this.handleBackToCollection = this.handleBackToCollection.bind(this);
    this.handleObjectClick = this.handleObjectClick.bind(this);
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
    return fetch(process.env.MIX_COLLECTION_DSN + searchURL, {
      credentials: "include",
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

  handleLoading() {
    this.setState({ isLoading: true });
  }

  componentDidMount() {
    // window.addEventListener("popstate", this.handlePopState);
    this.firstLoad();
  }
  componentWillUnmount() {
    // window.removeEventListener("popstate", this.handlePopState);
  }

  //   handlePopState(ev) {
  //     // TODO: we'll probably have to integrating a proper router here
  //     // once we have the detail-page view.
  //     let searchUrl = this.buildSearchParamsFromParams(ev.state);
  //     if (this.searches[searchUrl].isLoading === false) {
  //       this.setState(state => ({
  //         hits: this.searches[searchUrl].data.hits,
  //         hasMore: this.searches[searchUrl].data.hasMore,
  //         totalHits: this.searches[searchUrl].data.totalHits,
  //         currentPage: ev.state.page,
  //         isLoading: false
  //       }));
  //     }
  //   }

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

  mergeAddedFilters(filterObj, currentStateFilterObj = null) {
    return merge(currentStateFilterObj || this.state.filterObj, filterObj);
  }

  mergeRemovedFilters(filterToRemove, currentStateFilterObj = null) {
    currentStateFilterObj = currentStateFilterObj || this.state.filterObj;
    let filterValueToAmend = currentStateFilterObj[filterToRemove.paramName];
    let filterObjAmended = currentStateFilterObj;
    // let filterValueToAmend = this.state.filterObj[filterToRemove.paramName];
    // let filterObjAmended = this.state.filterObj;
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
            isLoading: false,
            filterObj: filterObj,
            totalHits: this.searches[searchUrl].data.totalHits
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
    const filterObj = this.mergeRemovedFilters(filterToRemove);
    console.log("handleRemoveFilter/filterObj:", filterObj);
    this.commitFilterChange(filterObj);
  }

  //   handleDisplayProduct(prod, event) {
  //     event.preventDefault();
  //     this.setState({ productDetail: prod, scrollPosition: window.scrollY });
  //     console.log("Product is", prod);
  //     setTimeout(() => {
  //       window.scrollTo(0, 0);
  //     }, 0);
  //   }

  handleBackToCollection(event) {
    event.preventDefault();
    this.props.history.push(`/recherche${this.buildSearchParamsFromState()}`);
    // this.setState({ productDetail: null });
    window.scrollTo(0, this.state.scrollPosition);
    // setTimeout(() => {
    //   window.scrollTo(0, this.state.scrollPosition);
    // }, 0);
  }

  handleObjectClick(product, event) {
    event.preventDefault();
    console.log("this.props.history", this.props.history);
    this.setState(
      { productDetail: product, scrollPosition: window.scrollY },
      () => {
        this.props.history.push(`/objet/${product.inventory_id}`);
        window.scrollTo(0, 0);
        // setTimeout(() => {}, 0);
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
        <div>
          <ul
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              zIndex: 999999,
              backgroundColor: "pink",
              padding: "15px"
            }}
          >
            <li>
              <Link to="/recherche">Recherche</Link>
            </li>
            <li>
              <Link to="/objet/GMT-14189-000">Un Objet</Link>
            </li>
            <li>
              <Link to="/savoir-faire">Les savoir-faire</Link>
            </li>
            <li>
              <Link to="/other">Other component</Link>
            </li>
          </ul>
          <Switch>
            <Route
              path="/recherche"
              render={props => (
                <Collection
                  {...props}
                  onFilterAdd={this.handleAddFilter}
                  onFilterRemove={this.handleRemoveFilter}
                  onFilterChange={this.handleFilterChange}
                  isLoadingURL={this.isLoadingSearch.bind(
                    this,
                    this.buildSearchParamsFromState()
                  )}
                  isLoading={this.state.isLoading}
                  totalHits={this.state.totalHits}
                  filterObj={this.state.filterObj}
                  hits={this.state.hits}
                  loadMore={this.handleNextPageCallback}
                  hasMore={!this.state.isLoading && this.state.hasMore}
                  currentPage={this.state.currentPage}
                  //   onDisplayProduct={this.handleDisplayProduct}
                  onObjectClick={this.handleObjectClick}
                />
              )}
            />
            <Route
              exact
              path="/objet/:inventory_id"
              render={props => (
                <Detail
                  {...props}
                  product={this.state.productDetail}
                  onBackToCollection={this.handleBackToCollection}
                />
              )}
            />
            <Route path="/savoir-faire" component={SavoirFaire} />
          </Switch>
        </div>
      </ReactBreakpoints>
    );
  }
}

function SavoirFaire() {
  return <div>Savoir faires</div>;
}

export default withRouter(App);
