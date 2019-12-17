import React from "react";
import classNames from "classnames";

export default class Switch extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     checked: props.checked
    // }
    this.uniqueId =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
  }
  render() {
    return (
      <div className={classNames("Switch", this.props.className)}>
        <input
          type="checkbox"
          name={this.props.name}
          checked={this.props.checked}
          id={this.uniqueId}
          className="Switch__input"
          onChange={this.props.onChange}
        />
        <label htmlFor={this.uniqueId} className="Switch__on">
          {this.props.labelOn}
        </label>
        <label htmlFor={this.uniqueId} className="Switch__off">
          {this.props.labelOff}
        </label>
      </div>
    );
  }
}
