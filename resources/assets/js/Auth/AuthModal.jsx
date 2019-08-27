import React from "react";
import flatten from "lodash/flatten";

import Loader from "../Loader";
import { AuthContext } from "../context/auth-context";
import Button from "../ui/Button";
import InputField from "../ui/InputField";

export default class AuthModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action:
        props.action && props.action === "login"
          ? LoginAction
          : props.action && props.action === "register"
          ? RegisterAction
          : DefaultAction,
      loading: true
    };
  }
  switchToAction = actionComponent => {
    this.setState({ action: actionComponent });
  };
  render() {
    const ComponentFunc = this.state.action;
    return (
      <div className="AuthModal">
        <ComponentFunc switchToAction={this.switchToAction} {...this.props} />
      </div>
    );
  }
}

const ActionComponents = {
  default: DefaultAction,
  login: LoginAction,
  register: RegisterAction
};

const DefaultAction = props => {
  return (
    <div className="AuthModal__action-default">
      <div className="AuthModal__default-label">
        Pour sauvegarder
        <br /> cet objet,
        <br /> identifiez-vous&nbsp;:
      </div>
      <div className="AuthModal__default-buttons">
        <Button
          onClick={() => props.switchToAction(RegisterAction)}
          className="AuthModal__default-top-button"
          icon="arrow"
          popOver="première visite"
        >
          créer un compte
        </Button>
        <Button
          onClick={() => props.switchToAction(LoginAction)}
          icon="arrow"
          popOver="déjà inscrit"
          popOverPlacement="bottom"
        >
          se connecter
        </Button>
      </div>
    </div>
  );
};

const LoaderOverlay = props => {
  return (
    <div className="AuthModal__loading-overlay">
      <Loader />
    </div>
  );
};

class RegisterAction extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: false,
      errors: [],
      name: "",
      email: "",
      password: "",
      csrfToken: document
        .querySelector("meta[name=csrf-token]")
        .getAttribute("content")
    };
  }
  handleInputChange = ev => {
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
    // authClient
    this.context
      .register(this.state)
      .then(arg => {
        console.log("Finished registering.", this.context.data);
      })
      .catch(error => {
        this.setState({
          loading: false,
          errorMessage: error.message,
          errors: flatten(Object.values(error.errors))
        });
      });
  };

  render() {
    return (
      <div className="AuthModal__action-register">
        <form onSubmit={this.handleSubmit} className="AuthModal__register-form">
          <fieldset
            disabled={this.state.loading}
            className="AuthModal__register-fieldset"
          >
            <legend className="AuthModal__register-legend">
              Créer votre compte :
            </legend>
            {this.state.errorMessage && (
              <div className="AuthModal__error-msg">
                Impossible de créer le compte :
                {this.state.errors.map(e => (
                  <div>{e}</div>
                ))}
              </div>
            )}
            <InputField
              className="AuthModal__register-input"
              type="text"
              name="name"
              label="nom"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
              maxLength="255"
            />
            <InputField
              className="AuthModal__register-input"
              type="email"
              name="email"
              label="e-mail"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            <InputField
              className="AuthModal__register-input"
              type="password"
              name="password"
              label="mot de passe"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
            <div className="AuthModal__register-info">
              Ces informations seront seulement utilisées pour accéder
              <br />
              aux fonctionnalités de ce site.
            </div>
            <Button className="AuthModal__register-submit">Valider</Button>
          </fieldset>
        </form>
        {this.state.loading && <LoaderOverlay />}
      </div>
    );
  }
}

class LoginAction extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: false,
      email: "",
      password: "",
      csrfToken: document
        .querySelector("meta[name=csrf-token]")
        .getAttribute("content")
    };
  }

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({ loading: true });

    // authClient
    this.context
      .login(this.state)
      .then(() => {
        if (this.props.onLogin) {
          this.props.onLogin();
        }
      })
      .catch(error => {
        this.setState({ loading: false, errorMessage: error.message });
      });
  };

  handleInputChange = ev => {
    const target = ev.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className="AuthModal__action-login">
        <form onSubmit={this.handleSubmit} className="AuthModal__login-form">
          <fieldset
            disabled={this.state.loading}
            className="AuthModal__login-fieldset"
          >
            <legend className="AuthModal__login-legend">Se connecter :</legend>
            {this.state.errorMessage && (
              <div className="AuthModal__error-msg">
                {this.state.errorMessage}
              </div>
            )}

            <InputField
              className="AuthModal__login-input"
              type="email"
              name="email"
              label="e-mail"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            <InputField
              className="AuthModal__login-input"
              type="password"
              name="password"
              label="mot de passe"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
            <Button className="AuthModal__login-submit">Valider</Button>
          </fieldset>
        </form>
        {this.state.loading && <LoaderOverlay />}
      </div>
    );
  }
}
