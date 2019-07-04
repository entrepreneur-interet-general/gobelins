import React from "react";

export default class SelectionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newSelectionName: ""
    };
  }

  handleChange = ev => {
    this.setState({ newSelectionName: ev.target.value });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    this.props.onSubmit(this.state.newSelectionName);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset>
          <legend>
            {this.props.isFirst
              ? "Nommez votre première sélection :"
              : "Créer une nouvelle sélection"}
          </legend>
          <div>
            <input
              type="text"
              value={this.state.newSelectionName}
              onChange={this.handleChange}
              placeholder="Intitulé"
            />
            <button type="submit">+</button>
          </div>
        </fieldset>
      </form>
    );
  }
}
