import React, { Component } from "react";

class Authors extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // console.time("orderedByInitial");
    // this.orderedByInitial = this.props.authors.map(a => {
    //   const initial = a.last_name.charAt(0);
    //   console.log("this.alphabet.get(initial)", this.alphabet.get(initial));

    //   let arr = this.alphabet.get(initial);
    //   arr.push(a);
    //   this.alphabet.set(initial, arr);
    //   return false;
    // });
    // console.timeEnd("orderedByInitial");
    // debugger;
    Object.keys(this.props.authors).forEach(letter => {
      this["refLetter" + letter] = React.createRef();
    });
    this.handleClick = this.handleClick.bind(this);
    this.renderListItem = this.renderListItem.bind(this);
    this.renderLetterList = this.renderLetterList.bind(this);
    this.handleAlphabetClick = this.handleAlphabetClick.bind(this);
  }

  handleClick(author, ev) {
    ev.stopPropagation(); // To not close the filter panel.
    this.props.onFilterAdd({ author_ids: [author.id] });
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
        {this.props.authors[letter].map(this.renderListItem)}
      </div>
    );
  }

  handleAlphabetClick(letter, ev) {
    ev.stopPropagation();
    this["refLetter" + letter].current.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  render() {
    return (
      <div className="Authors">
        <div className="Authors__alphabet">
          {Object.keys(this.props.authors).map(letter => {
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
          {Object.keys(this.props.authors).map(this.renderLetterList)}
        </div>
      </div>
    );
  }
}

export default Authors;
