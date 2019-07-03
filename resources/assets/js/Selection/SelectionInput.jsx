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

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
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
