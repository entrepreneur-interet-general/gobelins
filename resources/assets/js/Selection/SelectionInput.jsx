import React from "react";

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
      <form onSubmit={this.handleSubmit}>
        <fieldset disabled={this.state.loading}>
          <legend>
            {this.props.isFirst
              ? "Nommez votre première sélection :"
              : "Créer une nouvelle sélection"}
          </legend>
          <div>
            {this.props.errorMessage && (
              <div style={{ color: "red" }}>{this.props.errorMessage}</div>
            )}

            <input
              type="text"
              value={this.state.newSelectionName}
              onChange={this.handleChange}
              placeholder="Intitulé"
              required
              maxLength="255"
            />
            <button type="submit">+</button>
          </div>
        </fieldset>
      </form>
    );
  }
}
