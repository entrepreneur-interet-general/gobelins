import React, { Component } from "react";
import WindowSizeListener from "react-window-size-listener";
import MasonryInfiniteScroller from "hijup-react-masonry-infinite";

class CollectionGrid extends Component {
  constructor(props) {
    super(props);
    this.forceLayout = this.forceLayout.bind(this);
  }
  // componentDidMount() {
  //   //window.addEventListener("resize", this.forceLayout);
  // }
  // componentWillUnmount() {
  //   //window.removeEventListener("resize", this.forceLayout);
  // }

  renderGridElements() {
    return this.props.hits.map((datum, index) => {
      // let imgroot = "/image/" + datum.images[0].path + "?w=";
      //let srcset = imgroot +

      /*
      
      */
      return (
        <div key={index} className="Collection__cell">
          {datum.images && datum.images.length > 0 ? (
            <div
              className="Collection__image-container"
              style={{
                "--aspect-ratio":
                  datum.images[0].width + "/" + datum.images[0].height
              }}
            >
              <img src={"/image/" + datum.images[0].path + "?w=300"} />
            </div>
          ) : (
            <div className="Collection__image-container--empty" />
          )}
          <h2 className="Collection__cell-title">
            {datum.title_or_designation}
          </h2>
          <small>
            {datum.authors
              .map(a => {
                a.last_name + " " + a.first_name;
              })
              .join(", ")}
          </small>
        </div>
      );
    });
  }

  forceLayout() {
    console.log("Resizing yo");
    this._masonryInstance.forcePack();
  }

  render() {
    return (
      <div>
        <WindowSizeListener onResize={this.forceLayout} />
        <MasonryInfiniteScroller
          hasMore={this.props.hasMore}
          loadMore={this.props.loadMore}
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
          ref={masonryInstance => {
            this._masonryInstance = masonryInstance;
          }}
        >
          {this.renderGridElements()}
        </MasonryInfiniteScroller>
      </div>
    );
  }
}

export default CollectionGrid;
