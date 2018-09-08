import React, { Component } from "react";
import Bricks from "bricks.js";
import InfiniteScroll from "react-infinite-scroller";

/*
    This is ripped and slightly modified version of hijup-react-masonry-infinite.
    Had to add initialLoad prop to avoid infinite endless load bug.
    https://github.com/CassetteRocks/react-infinite-scroller/issues/163
*/

export default class TirelessMason extends Component {
  constructor(props) {
    super(props);
    this.setContainerRef = this.setContainerRef.bind(this);
    this.forcePack = this.forcePack.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    const { packed, sizes, children, position } = this.props;

    const instance = Bricks({
      container: this.masonryContainer,
      packed: "packed",
      sizes: sizes,
      position: position
    });

    instance.resize(true);

    if (children.length > 0) {
      instance.pack();
    }

    // eslint-disable-next-line
    this.setState(() => ({ instance }));
  }

  componentDidUpdate(prevProps) {
    const { children } = this.props;

    if (prevProps.children.length === 0 && children.length === 0) {
      return;
    }

    if (prevProps.children.length === 0 && children.length > 0) {
      return this.state.instance.pack();
    }

    if (prevProps.children.length !== children.length) {
      // this.state.instance.pageLoaded = 0;
      if (this.props.alwaysRepack) {
        return this.state.instance.pack();
      } else {
        return this.state.instance.update();
      }
    }
  }

  componentWillUnmount() {
    this.state && this.state.instance.resize(false);
  }

  setContainerRef(component) {
    this.masonryContainer = component;
  }

  forcePack() {
    if (this.masonryContainer) {
      this.state.instance.pack();
    }
  }

  forceUpdate() {
    if (this.masonryContainer) {
      this.state.instance.update();
    }
  }

  render() {
    const {
      children,
      className,
      element,
      hasMore,
      loadMore,
      loader,
      pageStart,
      style,
      threshold,
      useWindow
    } = this.props;

    return (
      <InfiniteScroll
        element={element}
        hasMore={hasMore}
        loadMore={loadMore}
        initialLoad={false}
        loader={loader}
        pageStart={pageStart}
        threshold={threshold}
        useWindow={useWindow}
      >
        <div ref={this.setContainerRef} className={className} style={style}>
          {children}
        </div>
      </InfiniteScroll>
    );
  }
}
