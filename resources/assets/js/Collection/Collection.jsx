import React, { Component } from "react";
import CollectionList from "./CollectionList.jsx";
import CollectionGrid from "./CollectionGrid.jsx";
//import "./App.css";

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
        this.state.nextPageUrl || process.env.MIX_COLLECTION_DSN;
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
      <div className="Collection">
        <div className="Collection__filters">Here go the filters</div>
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
      </div>
    );
  }
}

export default Collection;
