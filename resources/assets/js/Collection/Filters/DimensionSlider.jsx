import React, { Component } from "react";
import { Slider, Handles, Tracks, Rail } from "react-compound-slider";

function Handle({ handle: { id, value, percent }, getHandleProps }) {
  return (
    <div
      className="Dimensions__slider-handle"
      style={{
        left: `${percent}%`
      }}
      {...getHandleProps(id)}
    >
      <div className="Dimensions__slider-handle-dot" />
    </div>
  );
}

function Track({ source, target, getTrackProps }) {
  return (
    <div
      className="Dimensions__slider-track"
      style={{
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()}
    />
  );
}

class DimensionSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min: props.min || props.domainMin,
      max: props.max || props.domainMax,
      displayMin: props.min || props.domainMin,
      displayMax: props.max || props.domainMax
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleUpdate(values) {
    this.setState({
      displayMin: values[0],
      displayMax: values[1]
    });
  }

  handleChange(values) {
    this.setState({ min: values[0], max: values[1] });
    if (
      values[0] === this.props.domainMin &&
      values[1] === this.props.domainMax
    ) {
      this.props.onFilterRemove({
        // See App.jsx::mergeRemovedFilters(),
        // _gte and _lte are both removed together,
        // no need to specify both.
        paramName: this.props.dimension + "_gte"
      });
    } else {
      this.props.onFilterAdd({
        [this.props.dimension + "_gte"]: values[0],
        [this.props.dimension + "_lte"]: values[1]
      });
    }
  }

  render() {
    return (
      <div className="Dimensions__range-container">
        <Slider
          className="Dimensions__slider"
          domain={[this.props.domainMin, this.props.domainMax]}
          values={[this.state.min, this.state.max]}
          mode={3}
          step={0.01}
          onChange={this.handleChange}
          onUpdate={this.handleUpdate}
        >
          <Rail>
            {({ getRailProps }) => (
              <div className="Dimensions__slider-rail" {...getRailProps()} />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="Dimensions__slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="Dimensions__slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <div className="Dimensions__slider-label at-left">
            {this.state.displayMin}
            {String.fromCharCode(160)}m
          </div>
          <div className="Dimensions__slider-label at-right">
            {this.state.displayMax}
            {String.fromCharCode(160)}m
          </div>
        </Slider>
      </div>
    );
  }
}

export default DimensionSlider;
