import React from "react";

import Plus from "../icons/Plus";

export default class SelectionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSelectionName: "",
      loading: false
    };
  }

  handleChange = ev => {
    this.setState({ newSelectionName: ev.target.value });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({ loading: true });
    this.props.onSubmit(this.state.newSelectionName);
  };

  render() {
    return (
      <form className="SelectionModal__input-form" onSubmit={this.handleSubmit}>
        <fieldset
          className="SelectionModal__input-fieldset"
          disabled={this.state.loading}
        >
          <legend className="SelectionModal__input-legend">
            {this.props.isFirst
              ? "Nommez votre première sélection\u00a0:"
              : "Créer une nouvelle sélection\u00a0:"}
          </legend>
          <div className="SelectionModal__input-wrapper">
            {this.props.errorMessage && (
              <div style={{ color: "red" }}>{this.props.errorMessage}</div>
            )}

            <input
              className="SelectionModal__input-input"
              type="text"
              value={this.state.newSelectionName}
              onChange={this.handleChange}
              placeholder="Intitulé"
              required
              maxLength="255"
            />
            <button className="SelectionModal__input-submit" type="submit">
              <Plus />
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}
