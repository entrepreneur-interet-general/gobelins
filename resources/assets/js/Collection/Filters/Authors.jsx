import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import DesktopOverlayZone from "./DesktopOverlayZone";

class Authors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Object.keys(window.__INITIAL_STATE__.authors).forEach(letter => {
      this["refLetter" + letter] = React.createRef();
    });

    this.handleClick = this.handleClick.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
    this.renderLetterList = this.renderLetterList.bind(this);
    this.handleAlphabetClick = this.handleAlphabetClick.bind(this);
  }

  handleClick(author, ev) {
    ev.stopPropagation(); // To not close the filter panel.
    if (this.props.selectedIds.indexOf(author.id) >= 0) {
      this.props.onFilterRemove({
        type: "author",
        ids: [author.id],
        paramName: "author_ids"
      });
    } else {
      this.props.onFilterAdd({ author_ids: [author.id] });
    }
  }

  renderListItem(author) {
    return (
      <div className="Authors__col-item" key={author.id}>
        <button
          type="button"
          onClick={ev => this.handleClick(author, ev)}
          className={
            this.props.selectedIds.includes(author.id) ? "is-selected" : null
          }
        >
          <strong>{author.last_name}</strong>
          <span> {author.first_name}</span>
          {/* <span className="Authors__objcount">15340</span> */}
        </button>
      </div>
    );
  }

  renderLetterList(letter) {
    return (
      <div
        className="Authors__letter-container"
        key={letter}
        ref={this["refLetter" + letter]}
      >
        {window.__INITIAL_STATE__.authors[letter].map(this.renderListItem)}
      </div>
    );
  }

  handleAlphabetClick(letter, ev) {
    ev.stopPropagation();
    this["refLetter" + letter].current.scrollIntoView({
      behavior: "auto", // could be "smooth".
      block: "start"
    });
  }

  render() {
    return (
      <div className="Authors">
        <div className="Authors__alphabet">
          {Object.keys(window.__INITIAL_STATE__.authors).map(letter => {
            return (
              <button
                className="Authors__alphabet-button"
                type="button"
                onClick={this.handleAlphabetClick.bind(
                  this.handleAlphabetClick,
                  letter
                )}
                key={"alpha-" + letter}
              >
                {letter}
              </button>
            );
          })}
        </div>
        <div className="Authors__double-col">
          {Object.keys(window.__INITIAL_STATE__.authors).map(
            this.renderLetterList
          )}
        </div>
        <CSSTransitionGroup
          transitionName="DesktopOverlayZone"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={150}
        >
          {this.props.filterPanelOpen ? (
            <DesktopOverlayZone
              onClick={this.props.onClickOverlay}
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

export default Authors;
