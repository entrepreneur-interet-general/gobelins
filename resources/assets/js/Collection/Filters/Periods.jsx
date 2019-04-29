import React, { Component } from "react";
import { Slider, Handles, Tracks, Rail, Ticks } from "react-compound-slider";
import { CSSTransitionGroup } from "react-transition-group";

import DesktopOverlayZone from "./DesktopOverlayZone";
import { Handle, Track } from "./SliderComponents.jsx";

class Periods extends Component {
  constructor(props) {
    super(props);

    let ticksValues = [];
    for (let i = 1500; i < new Date().getFullYear(); i++) {
      if (i % 25 === 0) {
        ticksValues.push(i);
      }
    }

    this.state = {
      min: 1500,
      max: new Date().getFullYear(),
      min_value: props.periodStartYear || 1500,
      max_value: props.periodEndYear || new Date().getFullYear(),
      ticksValues
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderPeriodButton = this.renderPeriodButton.bind(this);
  }

  handleClick(period, ev) {
    ev.stopPropagation(); // To not close the filter panel.
    this.setState({ min_value: period.start_year, max_value: period.end_year });

    this.props.onFilterAdd({
      period_start_year: period.start_year,
      period_end_year: period.end_year
    });
  }

  handleChange(values) {
    this.setState({ min_value: values[0], max_value: values[1] });
    this.props.onFilterAdd({
      period_start_year: values[0],
      period_end_year: values[1]
    });
  }

  renderPeriodButton(p) {
    let topP =
      ((p.start_year - this.state.min) / (this.state.max - this.state.min)) *
      100;
    let height =
      ((p.end_year - p.start_year) / (this.state.max - this.state.min)) * 100;
    const styles = {
      top: topP + "%",
      height: height + "%"
    };

    return (
      <div
        style={styles}
        key={p.start_year + "-" + p.end_year}
        className="Periods__named-button"
        onClick={ev => this.handleClick(p, ev)}
      >
        {p.name}
      </div>
    );
  }

  render() {
    const sliderStyle = {};

    const railStyle = {
      position: "absolute",
      height: "100%",
      width: 1,
      backgroundColor: "#FFF"
    };
    return (
      <div className="Periods">
        <div
          className="Periods__named-container"
          onClick={ev => ev.stopPropagation()}
        >
          <div className="Periods__named">
            {this.props.periods.map(this.renderPeriodButton)}
          </div>
        </div>
        <div
          className="Periods__range-container"
          onClick={ev => ev.stopPropagation()}
        >
          <Slider
            className="Periods__slider"
            rootStyle={sliderStyle}
            domain={[this.state.min, this.state.max]}
            values={[this.state.min_value, this.state.max_value]}
            mode={3}
            step={1}
            vertical={true}
            reversed={false}
            onChange={this.handleChange}
          >
            <Rail>
              {({ getRailProps }) => (
                <div style={railStyle} {...getRailProps()} />
              )}
            </Rail>
            <Handles>
              {({ handles, getHandleProps }) => {
                const diffRange = handles[1].value - handles[0].value;
                const isContracted = diffRange < 18 ? "is-contracted" : "";
                return (
                  <div className={"Periods__slider-handles " + isContracted}>
                    {handles.map(handle => (
                      <Handle
                        key={handle.id}
                        handle={handle}
                        getHandleProps={getHandleProps}
                      />
                    ))}
                  </div>
                );
              }}
            </Handles>
            <Tracks left={false} right={false}>
              {({ tracks, getTrackProps }) => (
                <div className="Periods__slider-tracks">
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
            <Ticks values={this.state.ticksValues}>
              {({ ticks }) => (
                <div className="Periods__slider-ticks">
                  {ticks.map(tick => (
                    <Tick key={tick.id} tick={tick} count={ticks.length} />
                  ))}
                </div>
              )}
            </Ticks>
          </Slider>
        </div>
        <CSSTransitionGroup
          transitionName="DesktopOverlayZone"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.props.filterPanelOpen ? (
            <DesktopOverlayZone
              onClickOverlay={this.props.onClickOverlay}
              offsetLeft={368}
              filterPanelsWidth={288 + 368}
            >
              {this.props.totalHitsComponent}
            </DesktopOverlayZone>
          ) : null}
        </CSSTransitionGroup>
      </div>
    );
  }
}

function Tick({ tick, count }) {
  const tickStyles = {
    marginTop: `${-(100 / count) / 2}%`,
    height: `${100 / count}%`,
    top: `${tick.percent}%`
  };
  return (
    <div>
      {tick.value % 50 === 0 ? (
        <div className="Periods__tick-value" style={tickStyles}>
          <span>{tick.value}</span>
        </div>
      ) : (
        <div className="Periods__tick-mark" style={tickStyles} />
      )}
    </div>
  );
}

export default Periods;
