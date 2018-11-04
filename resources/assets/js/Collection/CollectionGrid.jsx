import React, { Component } from "react";
import WindowSizeListener from "react-window-size-listener";
import TirelessMason from "./TirelessMason.jsx";

class CollectionGrid extends Component {
  constructor(props) {
    super(props);
    this.infiniteScroll = React.createRef();
    this.forceLayout = this.forceLayout.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.hits.length > 0 &&
      this.props.hits.length > 0 &&
      prevProps.hits[0]["_id"] !== this.props.hits[0]["_id"]
    ) {
      this.infiniteScroll.current.forcePack();
    }
  }

  renderGridElements() {
    return this.props.hits.map((datum, index) => {
      let hasImages = datum.images && datum.images.length > 0;
      let imgRoot = hasImages
        ? "/image/" +
          encodeURIComponent(datum.images[0].path) +
          "?q=40&fm=pjpg&cache=1&w="
        : "";
      let display_name =
        datum.title_or_designation ||
        (datum.product_types && datum.product_types.length > 0
          ? datum.product_types.find(t => t.is_leaf).name
          : "");
      return (
        <a
          href={"/collection/objet/" + datum.inventory_id}
          onClick={this.props.onDisplayProduct.bind(
            this.props.onDisplayProduct,
            datum
          )}
          key={datum["_id"]}
          className="Collection__cell"
        >
          {hasImages ? (
            <div
              className="Collection__image-container"
              style={{
                "--aspect-ratio":
                  datum.images[0].width + "/" + datum.images[0].height
              }}
            >
              <img
                sizes="(min-width: 1800px) calc((100vw - 288px - (40px * 6)) / 6),
                       (min-width: 1600px) and (max-width: 1799px) calc((100vw - 288px - (40px * 5)) / 5),
                       (min-width: 1440px) and (max-width: 1599px) calc((100vw - 288px - (40px * 4)) / 4),
                       (min-width: 1024px) and (max-width: 1439px) calc((100vw - 288px - (40px * 3)) / 3),
                       (min-width: 800px) and (max-width: 1023px) calc((100vw - (40px * 4)) / 3),
                       calc(100vw - (3 * 15px) / 2)"
                srcSet={imgRoot + "330 330w,\n" + imgRoot + "600 600w"}
              />
              {/* <img
                sizes="(min-width: 1800px) calc((100vw - 288px - (40px * 6)) / 6),
                       (min-width: 1600px) and (max-width: 1799px) calc((100vw - 288px - (40px * 5)) / 5),
                       (min-width: 1440px) and (max-width: 1599px) calc((100vw - 288px - (40px * 4)) / 4),
                       (min-width: 1024px) and (max-width: 1439px) calc((100vw - 288px - (40px * 3)) / 3),
                       (min-width: 800px) and (max-width: 1023px) calc((100vw - (40px * 4)) / 3),
                       calc(100vw - (3 * 15px) / 2)"
                srcSet={
                  imgRoot +
                  "300 300w,\n" +
                  imgRoot +
                  "380 380w,\n" +
                  imgRoot +
                  "600 600w,\n" +
                  imgRoot +
                  "760 760w"
                }
              /> */}
            </div>
          ) : (
            <div className="Collection__image-container--empty" />
          )}
          <div className="Collection__cell-label">
            <h2 className="Collection__cell-title">
              {display_name}
              {datum.authors && datum.authors.length > 0 ? ", " : ""}
            </h2>
            <small className="Collection__cell-authors">
              {datum.authors
                .map(a => a.last_name + " " + a.first_name)
                .join(", ")}
            </small>
          </div>
        </a>
      );
    });
  }

  forceLayout() {
    this.infiniteScroll.current.forcePack();
  }

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
      </div>
    );
  }
}

export default CollectionGrid;
