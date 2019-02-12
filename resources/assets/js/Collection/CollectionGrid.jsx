import React, { Component } from "react";
import WindowSizeListener from "react-window-size-listener";
import isEqual from "lodash/isEqual";
import TirelessMason from "./TirelessMason.jsx";
import Loader from "../Loader.jsx";
import folkloreImage from "../vendor/folklore-image.js";

class CollectionGrid extends Component {
  constructor(props) {
    super(props);
    this.infiniteScroll = React.createRef();
    this.forceLayout = this.forceLayout.bind(this);
  }

  componentDidUpdate(prevProps) {
    const prevIds = prevProps.hits.map(p => p["_id"]);
    const currentIds = this.props.hits.map(p => p["_id"]);
    if (!isEqual(prevIds, currentIds)) {
      this.infiniteScroll.current.forcePack();
    }
  }

  renderGridElements() {
    return this.props.hits.map((datum, index) => {
      let hasImages = datum.images && datum.images.length > 0;

      let path = hasImages ? encodeURIComponent(datum.images[0].path) : "";
      let img600 = hasImages ? `/media/xl/${folkloreImage.url(path, 600)}` : "";
      let img330 = hasImages ? `/media/xl/${folkloreImage.url(path, 330)}` : "";
      let display_name =
        datum.title_or_designation ||
        datum.denomination ||
        (datum.product_types && datum.product_types.length > 0
          ? datum.product_types.find(t => t.is_leaf).name
          : "");
      return (
        <a
          href={`/objet/${datum.inventory_id}`}
          onClick={ev => this.props.onObjectClick(datum, ev)}
          key={datum["_id"] + "-" + index}
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
                srcSet={`${img330} 330w, ${img600} 600w`}
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
                .map(a => [a.last_name, a.first_name].join(" "))
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
        {this.props.isLoading ? (
          <Loader className="Collection__spinner" />
        ) : null}
      </div>
    );
  }
}

export default CollectionGrid;
