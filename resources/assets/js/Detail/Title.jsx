import React, { Component } from "react";

class Title extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <h1 className="DetailTitle">
        <span className="DetailTitle__denomination">
          {this.props.denomination}
        </span>
        <span className="DetailTitle__title_or_designation">
          {this.props.designation}
        </span>
      </h1>
    );
  }
}

export default Title;
