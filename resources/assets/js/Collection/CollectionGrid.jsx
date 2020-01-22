import React, { Component } from "react";
import WindowSizeListener from "react-window-size-listener";
import isEqual from "lodash/isEqual";

import CollectionGridItem from "./CollectionGridItem";
import TirelessMason from "./TirelessMason";
import Loader from "../Loader";
import AddToSelectionModal from "../Selection/AddToSelectionModal";
import CrossSimple from "../icons/CrossSimple";

class CollectionGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addingToSelection: null
    };
    this.infiniteScroll = React.createRef();
    this.forceLayout = this.forceLayout.bind(this);
  }

  componentDidUpdate(prevProps) {
    const prevIds = prevProps.hits.map(p => p["id"]);
    const currentIds = this.props.hits.map(p => p["id"]);
    if (!isEqual(prevIds, currentIds)) {
      this.infiniteScroll.current.forcePack();
    }
  }

  handleSelectionClick = (product, ev) => {
    ev.stopPropagation();
    ev.preventDefault();
    this.setState({ addingToSelection: product });
    document.documentElement.classList.add("prevent-scroll");
  };

  renderGridElements = () => {
    return this.props.hits.map((datum, index) => {
      return (
        <CollectionGridItem
          datum={datum}
          key={datum["id"] + "-" + index}
          onObjectClick={this.props.onObjectClick}
          onSelectionClick={this.handleSelectionClick}
        />
      );
    });
  };

  forceLayout() {
    this.infiniteScroll.current.forcePack();
  }

  handleCloseAddToSelection = () => {
    this.setState({ addingToSelection: null });
    document.documentElement.classList.remove("prevent-scroll");
  };

  render() {
    return (
      <div>
        <WindowSizeListener onResize={this.forceLayout} />
        <TirelessMason
          hasMore={this.props.hasMore}
          loadMore={this.props.loadMore}
          pageStart={1}
          alwaysRepack={false}
          useWindow={true}
          threshold={500}
          sizes={[
            { columns: 2, gutter: 15 },
            { mq: "800px", columns: 3, gutter: 40 },
            { mq: "1024px", columns: 3, gutter: 40 },
            { mq: "1440px", columns: 4, gutter: 40 },
            { mq: "1600px", columns: 5, gutter: 40 },
            { mq: "1800px", columns: 6, gutter: 40 }
          ]}
          ref={this.infiniteScroll}
        >
          {this.renderGridElements()}
        </TirelessMason>
        {this.props.isLoadingMore ? (
          <Loader className="Collection__spinner" />
        ) : null}
        {this.state.addingToSelection && (
          <AddToSelectionModal
            product={this.state.addingToSelection}
            onClose={this.handleCloseAddToSelection}
            closeButton={
              <button
                className="SelectionModal__close"
                onClick={this.handleCloseAddToSelection}
              >
                <CrossSimple />
              </button>
            }
          />
        )}
      </div>
    );
  }
}

export default CollectionGrid;
