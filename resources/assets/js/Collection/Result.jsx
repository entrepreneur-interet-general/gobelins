import React, { Component } from "react";
import CollectionList from "./CollectionList.jsx";
import CollectionGrid from "./CollectionGrid.jsx";

class Result extends Component {
  render() {
    return (
      <div className="Collection__result">
        {true ? (
          <CollectionGrid
            hits={this.props.hits}
            loadMore={this.props.loadMore}
          />
        ) : (
          <CollectionList hits={this.props.hits} />
        )}
      </div>
    );
  }
}

export default Result;
