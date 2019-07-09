import React from "react";
import InputField from "../ui/InputField";
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
          {this.props.errorMessage && (
            <div className="SelectionModal__error-msg">
              {this.props.errorMessage}
            </div>
          )}

          <InputField
            className="SelectionModal__input"
            type="text"
            name="name"
            label="intitulé"
            withSubmit={true}
            value={this.state.newSelectionName}
            onChange={this.handleChange}
            required
            maxLength="255"
          />
        </fieldset>
      </form>
    );
  }
}
