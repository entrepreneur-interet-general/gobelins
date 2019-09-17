import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";
import AutoSizer from "react-virtualized-auto-sizer";

import DesktopOverlayZone from "./DesktopOverlayZone";
import AuthorsList from "./AuthorsList";

class Authors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnimating: false,
      scrollToItem: null
    };
  }

  alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
  ];

  handleClick = (ev, author) => {
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
  };

  animationComplete = () => {
    console.log("Ahh, animation complete in <Authors /> !");
    this.setState({
      isAnimating: false
    });
  };

  scrollToLetter = (ev, letter) => {
    const scrollToItem = window.__INITIAL_STATE__.authors_offsets[letter];
    ev.stopPropagation();
    if (
      this.state.isAnimating === true ||
      scrollToItem === this.state.scrollToItem
    ) {
      return;
    }

    this.setState({
      isAnimating: true,
      scrollToItem
    });
  };

  render() {
    return (
      <div className="Authors">
        <fieldset
          className="Authors__alphabet"
          disabled={this.state.isAnimating}
        >
          {this.alphabet.map(letter => {
            return (
              <button
                className="Authors__alphabet-button"
                type="button"
                onClick={ev => this.scrollToLetter(ev, letter)}
                key={"alpha-" + letter}
              >
                {letter}
              </button>
            );
          })}
        </fieldset>
        <div className="Authors__double-col">
          <AutoSizer>
            {({ height, width }) => (
              <AuthorsList
                height={height}
                width={width}
                duration={800}
                onAnimationComplete={this.animationComplete}
                itemCount={window.__INITIAL_STATE__.authors.length}
                itemSize={43}
                scrollToItem={this.state.scrollToItem}
                itemData={{ onItemClick: this.handleClick }}
              >
                {Author}
              </AuthorsList>
            )}
          </AutoSizer>
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

const Author = ({ index, style, data }) => {
  const author = window.__INITIAL_STATE__.authors[index];
  return (
    <div className="Authors__col-item" style={style}>
      {author.is_separator ? (
        <div className="Authors__separator" />
      ) : (
        <button
          type="button"
          className="Authors__nobr"
          onClick={ev => data.onItemClick(ev, author)}
        >
          <strong>{author.last_name} </strong>
          <span>{author.first_name}</span>
          {/* <span className="Authors__objcount">15340</span> */}
        </button>
      )}
    </div>
  );
};
export default Authors;
