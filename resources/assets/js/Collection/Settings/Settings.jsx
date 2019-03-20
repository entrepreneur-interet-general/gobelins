import React, { Component } from "react";
import Eye from "../../icons/Eye";
import EyeHover from "../../icons/EyeHover";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.openPanel = this.openPanel.bind(this);
  }

  componentDidMount() {}

  componentDidUnMount() {}

  openPanel() {
    this.setState({ open: !this.state.open });
  }
  hoverToggle(over) {
    this.setState({ hoveringToggle: over });
  }

  render() {
    let classNames = `Settings ${this.state.open ? "is-visible" : ""}`;
    return (
      <div className={classNames}>
        <button
          className="Settings__toggle"
          onClick={this.openPanel}
          onMouseEnter={ev => this.hoverToggle(true, ev)}
          onMouseOut={ev => this.hoverToggle(false, ev)}
          type="button"
        >
          {this.state.hoveringToggle ? <EyeHover /> : <Eye />}
        </button>
        <div className="Settings__panel">The panel is here yo</div>
      </div>
    );
  }
}

export default Settings;
