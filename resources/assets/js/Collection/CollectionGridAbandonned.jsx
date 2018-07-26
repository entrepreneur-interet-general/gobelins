import React, { Component } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry
} from "react-virtualized";

class CollectionGrid extends Component {
  constructor(props) {
    super(props);
    this.columnWidth = 350; // px
    // Default sizes help Masonry decide how many images to batch-measure
    this.cache = new CellMeasurerCache({
      defaultHeight: 250,
      defaultWidth: this.columnWidth,
      fixedWidth: true
    });
    this.cellPositioner = createMasonryCellPositioner({
      cellMeasurerCache: this.cache,
      columnCount: 3,
      columnWidth: this.columnWidth,
      spacer: 10
    });
  }

  computeGridDimensions() {}

  cellRenderer({ index, key, parent, style }) {
    const datum = this.props.hits[index];

    return (
      <CellMeasurer cache={this.cache} index={index} key={key} parent={parent}>
        <div className="Collection__cell" style={style}>
          <img
            src={"/image/" + datum.images[0].path + "?w=" + this.columnWidth}
            style={{
              height: Math.floor(
                (datum.images[0].height / datum.images[0].width) *
                  this.columnWidth
              ),
              width: this.columnWidth
            }}
          />
          <h4>{datum.title_or_designation}</h4>
        </div>
      </CellMeasurer>
    );
  }

  render() {
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Masonry
            cellCount={this.props.hits.length}
            cellMeasurerCache={this.cache}
            cellPositioner={this.cellPositioner.bind(this)}
            cellRenderer={this.cellRenderer.bind(this)}
            height={height}
            width={width}
          />
        )}
      </AutoSizer>
    );
  }
}

export default CollectionGrid;
