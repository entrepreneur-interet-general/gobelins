import React, { Component } from "react";

import MagnifyingGlass from "../../icons/MagnifyingGlass";
import CrossLarge from "../../icons/CrossLarge";

class MobileSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFieldValue: "",
      searchFieldPlaceholder: "Rechercher",
    };
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    this.handleSearchFieldFocus = this.handleSearchFieldFocus.bind(this);
    this.handleSearchFieldBlur = this.handleSearchFieldBlur.bind(this);
    this.handleFullTextSearch = this.handleFullTextSearch.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }
  handleSearchFieldChange(ev) {
    this.setState({ searchFieldValue: ev.target.value });
  }
  handleSearchFieldFocus(ev) {
    this.setState({ searchFieldPlaceholder: "mot-clé, date, artiste…" });
  }
  handleSearchFieldBlur(ev) {
    this.setState({ searchFieldPlaceholder: "Rechercher" });
  }
  handleFullTextSearch(ev) {
    ev.preventDefault();
    this.props.onSearch(this.state.searchFieldValue);
  }
  handleReset(ev) {
    ev.preventDefault();
    this.setState({ searchFieldValue: "" });
  }
  componentDidMount() {
    document.documentElement.classList.add("prevent-scroll");
    this.searchFieldRef.focus();
  }
  componentWillUnmount() {
    document.documentElement.classList.remove("prevent-scroll");
  }
  render() {
    return (
      <div className="MobileSearch">
        <div
          className="MobileSearch__overlay"
          onClick={this.props.onCloseSearch}
        >
          {this.props.overlayContent}
        </div>
        <div className="MobileSearch__controls">
          <form
            className="MobileSearch__form"
            onSubmit={this.handleFullTextSearch}
            action="#"
          >
            <div className="MobileSearch__search">
              <button type="submit">
                <MagnifyingGlass />
              </button>
            </div>
            <div className="MobileSearch__input">
              <input
                placeholder={this.state.searchFieldPlaceholder}
                type="search"
                value={this.state.searchFieldValue}
                onChange={this.handleSearchFieldChange}
                onFocus={this.handleSearchFieldFocus}
                onBlur={this.handleSearchFieldBlur}
                ref={(elRef) => {
                  this.searchFieldRef = elRef;
                }}
              />
            </div>
            <div className="MobileSearch__cancel">
              <button type="button" onClick={this.props.onCloseSearch}>
                <CrossLarge />
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default MobileSearch;
