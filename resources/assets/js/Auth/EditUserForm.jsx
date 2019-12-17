import React from "react";
import flatten from "lodash/flatten";
import { withRouter } from "react-router";

import notifier from "../utils/notifier";
import { AuthContext } from "../context/auth-context";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import ConfirmedDelete from "../ui/ConfirmedDelete";

class UserEditForm extends React.Component {
  // See export for this.
  //   static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name || "",
      email: props.user.email || "",
      password: "",
      newPassword: "",
      loading: false,
      errorMessage: false,
      errors: {}
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
      .updateMyself({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        newPassword: this.state.newPassword
      })
      .then(() => {
        this.setState({ loading: false });
        notifier("Les modifications ont été enregistrées");
        this.props.onClose();
      })
      .catch(error => {
        this.setState({
          loading: false,
          errorMessage: error.message,
          errors: error.errors
        });
      });
  };

  handleDeleteUser = () => {
    this.context.destroy(data => {
      this.props.history.replace("/recherche");
      notifier(data.message);
    });
  };

  render() {
    return (
      <form
        className="SelectionModal__edit-form SelectionModal__edit-form--user"
        onSubmit={this.handleSubmit}
      >
        <fieldset
          className="SelectionModal__input-fieldset"
          disabled={this.state.loading}
        >
          <legend className="SelectionModal__input-legend">
            Profil de {this.props.user.name}
          </legend>
          {this.state.errorMessage && (
            <div className="SelectionModal__error-msg">
              Impossible d’enregistrer les modifications :
              {flatten(Object.values(this.state.errors)).map((e, i) => (
                <div key={i}>{e}</div>
              ))}
            </div>
          )}

          <InputField
            className="SelectionModal__input"
            type="text"
            name="name"
            label="Nom"
            isInvalid={this.state.errors.hasOwnProperty("name")}
            value={this.state.name}
            onChange={this.handleChange}
            required
            maxLength="255"
          />

          <InputField
            className="SelectionModal__input"
            type="email"
            name="email"
            label="E-mail"
            isInvalid={this.state.errors.hasOwnProperty("email")}
            value={this.state.email}
            onChange={this.handleChange}
            required
            maxLength="255"
          />

          <div className="SelectionModal__form-label-sep">
            Pour changer le mot de passe :
          </div>

          <InputField
            className="SelectionModal__input"
            type="password"
            name="password"
            label="Ancien mot de passe"
            isInvalid={this.state.errors.hasOwnProperty("password")}
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete="new-password" // Because "current-password" is autofilled :(
          />

          <InputField
            className="SelectionModal__input"
            type="password"
            name="newPassword"
            label="Nouveau mot de passe"
            isInvalid={this.state.errors.hasOwnProperty("newPassword")}
            value={this.state.newPassword}
            onChange={this.handleChange}
            autoComplete="new-password"
          />

          <div className="SelectionModal__edit-form-buttons-row">
            <div className="SelectionModal__edit-deletion">
              <ConfirmedDelete
                onDelete={this.handleDeleteUser}
                deleteLabel="Supprimer le profil"
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

export default withRouter(UserEditForm);
UserEditForm.contextType = AuthContext;
