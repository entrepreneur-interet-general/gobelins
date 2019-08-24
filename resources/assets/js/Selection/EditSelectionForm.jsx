import React from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import Plus from "../icons/Plus";

export default class SelectionEditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.selection.name || "",
      description: props.selection.description || "",
      public: props.selection.public || true,
      loading: false,
      errorMessage: false
    };
  }

  handleChange = ev => {
    const target = ev.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({ loading: true });
    console.log("OK honky dory, do the fetch call now.");
  };

  render() {
    return (
      <form className="SelectionModal__edit-form" onSubmit={this.handleSubmit}>
        <fieldset
          className="SelectionModal__input-fieldset"
          disabled={this.state.loading}
        >
          <legend className="SelectionModal__input-legend">Modifier</legend>
          {this.state.errorMessage && (
            <div className="SelectionModal__error-msg">
              {this.state.errorMessage}
            </div>
          )}

          <InputField
            className="SelectionModal__input"
            type="text"
            name="name"
            label="Nom"
            value={this.state.name}
            onChange={this.handleChange}
            required
            maxLength="255"
          />

          <Textarea
            className="SelectionModal__textarea"
            name="description"
            label="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />

          <div className="SelectionModal__edit-form-buttons-row">
            <div className="SelectionModal__edit-deletion">
              <Button
                small
                dark
                round
                className="SelectionModal__edit-delete-button"
                icon="trashcan"
              />
            </div>
            <Button className="SelectionModal__edit-submit">Enregistrer</Button>
          </div>
        </fieldset>
      </form>
    );
  }
}
