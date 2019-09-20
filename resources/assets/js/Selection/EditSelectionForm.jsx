import React from "react";

import notifier from "../utils/notifier";
import { SelectionsContext } from "../context/selections-context";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import Textarea from "../ui/Textarea";
import Switch from "../ui/Switch";
import ConfirmedDelete from "../ui/ConfirmedDelete";
import CollaborationsHandler from "./CollaborationsHandler";

export default class SelectionEditForm extends React.Component {
  static contextType = SelectionsContext;
  constructor(props) {
    super(props);
    this.state = {
      name: props.selection.name || "",
      description: props.selection.description || "",
      public: props.selection.public,
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
    this.context
      .update({
        id: this.props.selection.id,
        name: this.state.name,
        description: this.state.description,
        public: this.state.public
      })
      .then(() => {
        this.setState({ loading: false });
        notifier("La sélection a bien été mise à jour");
        this.props.onClose();
      });
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

          <Switch
            name="public"
            checked={this.state.public}
            labelOn="Publique"
            labelOff="Privé"
            onChange={this.handleChange}
          />

          <CollaborationsHandler selection={this.props.selection} />

          <div className="SelectionModal__edit-form-buttons-row">
            <div className="SelectionModal__edit-deletion">
              <ConfirmedDelete
                onDelete={this.props.onDelete}
                deleteLabel="Supprimer la sélection"
              />
            </div>
            <Button type="submit" className="SelectionModal__edit-submit">
              Enregistrer
            </Button>
          </div>
        </fieldset>
      </form>
    );
  }
}
