import React, { Component } from "react";
import ReactBreakpoints from "react-breakpoints";
import CollectionList from "./CollectionList.jsx";
import CollectionGrid from "./CollectionGrid.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import Filters from "./Filters/Filters.jsx";
import Settings from "./Settings/Settings.jsx";

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
      currentPage: 0,
      isLoading: false,
      hasMore: false
    };

    this.load = this.load.bind(this);
  }

  load(page) {
    if (this.state.isLoading) {
      return false;
    } else {
      this.setState.isLoading = true;
      let endpointUrl =
        this.state.nextPageUrl ||
        "http://gobelins.test/rechercher?style_ids[]=1"; //process.env.MIX_COLLECTION_DSN;
      //"http://gobelins.test/rechercher?author_ids[]=327"; //process.env.MIX_COLLECTION_DSN;
      fetch(endpointUrl, {
        headers: {
          Accept: "application/json"
        }
      })
        .then(response => response.json())
        .then(data => {
          this.setState({
            hits: this.state.hits.concat(data.hits),
            currentPage: page,
            hasMore: data.hasMore,
            nextPageUrl: data.nextPageUrl,
            isLoading: false
          });
        });
    }
  }

  componentDidMount() {
    this.load();
  }

  render() {
    return (
      <ReactBreakpoints
        breakpoints={breakpoints}
        debounceResize={true}
        debounceDelay={100}
      >
        <div className="Collection">
          <Filters />
          <div className="Collection__result">
            {true ? (
              <CollectionGrid
                hits={this.state.hits}
                loadMore={this.load}
                hasMore={this.state.hasMore}
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
