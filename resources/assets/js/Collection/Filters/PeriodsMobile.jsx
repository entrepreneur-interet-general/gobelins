import React, { Component } from "react";

// import DesktopOverlayZone from "./DesktopOverlayZone";
import ArrowBack from "../../icons/ArrowBack";

class PeriodsMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      min_value:
        props.period_start_year ||
        window.__INITIAL_STATE__.periods[0].start_year,
      max_value: props.period_end_year || new Date().getFullYear()
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderPeriodButton = this.renderPeriodButton.bind(this);
  }

  handleClick(period, ev) {
    this.setState({ min_value: period.start_year, max_value: period.end_year });
    this.props.onFilterAdd({
      period_start_year: period.start_year,
      period_end_year: period.end_year
    });
  }

  handleSubmit(ev) {
    ev.preventDefault();
    this.props.onFilterAdd({
      period_start_year: this.state.min_value,
      period_end_year: this.state.max_value
    });
  }

  handleInputChange(type, ev) {
    this.setState({ [type]: ev.target.value });
  }

  renderPeriodButton(p) {
    return (
      <li
        key={p.start_year + "-" + p.end_year}
        className="PeriodsMobile__named-period-item"
      >
        <button
          type="button"
          className="PeriodsMobile__named-period-button"
          onClick={ev => this.handleClick(p, ev)}
        >
          {p.name}
        </button>
      </li>
    );
  }

  render() {
    return (
      <div className="FilterPanelMobile__filter-container PeriodsMobile">
        <div className="FilterPanelMobile__header PeriodsMobile__header">
          <button
            onClick={this.props.onBackToFiltersList}
            className="FilterPanelMobile__back-button PeriodsMobile__back-button"
          >
            <ArrowBack />
          </button>
          <div className="FilterPanelMobile__col-title PeriodsMobile__col-title">
            Époque de création
          </div>
          {this.props.closeButton}
        </div>

        <form
          action="#"
          className="PeriodsMobile__search-area"
          onSubmit={this.handleSubmit}
        >
          <div className="PeriodsMobile__input-from">
            <input
              type="text"
              name="period_start_year"
              value={this.state.min_value}
              onChange={this.handleInputChange.bind(this, "min_value")}
            />
            <svg
              width="6"
              height="10"
              fill="none"
              className="PeriodsMobile__input-chevron"
            >
              <path d="M1 1L5 5L1 9" stroke="currentColor" />
            </svg>
          </div>
          <div className="PeriodsMobile__input-to">
            <input
              type="text"
              name="period_end_year"
              value={this.state.max_value}
              onChange={this.handleInputChange.bind(this, "max_value")}
            />
          </div>
          <button type="submit" className="PeriodsMobile__hidden-submit">
            ok
          </button>
        </form>

        <div className="PeriodsMobile__list-area">
          <ul>
            {window.__INITIAL_STATE__.periods.map(this.renderPeriodButton)}
          </ul>
        </div>
      </div>
    );
  }
}
export default PeriodsMobile;
