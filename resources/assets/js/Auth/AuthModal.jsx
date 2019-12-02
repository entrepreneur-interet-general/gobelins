import React from "react";
import flatten from "lodash/flatten";
import notifier from "../utils/notifier";

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
      .then(data => {
        if (data.status === "ok") {
          notifier(`Bienvenue, ${data.user.name} !`);
        } else {
          notifier(`Une erreur est survenue. Veuillez réessayer plus tard. 🙁`);
        }
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
                {this.state.errors.map((e, i) => (
                  <div key={i}>{e}</div>
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
            <div className="AuthModal__switch-links">
              <button
                type="button"
                onClick={() => {
                  this.props.switchToAction(LoginAction);
                }}
              >
                Déjà inscrit ?
              </button>
            </div>
            <div className="AuthModal__register-info">
              Ces informations seront seulement utilisées pour accéder
              <br />
              aux fonctionnalités de ce site.
            </div>
            <Button type="submit" className="AuthModal__register-submit">
              Valider
            </Button>
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
        notifier(`Bienvenue, ${this.context.data.user.name} !`);
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
            <div className="AuthModal__switch-links">
              <button
                type="button"
                onClick={() => {
                  this.props.switchToAction(ForgotPasswordAction);
                }}
              >
                Mot de passe oublié ?
              </button>
              <button
                type="button"
                onClick={() => {
                  this.props.switchToAction(RegisterAction);
                }}
              >
                Pas encore inscrit ?
              </button>
            </div>
            <Button type="submit" className="AuthModal__login-submit">
              Valider
            </Button>
          </fieldset>
        </form>
        {this.state.loading && <LoaderOverlay />}
      </div>
    );
  }
}

class ForgotPasswordAction extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      errorMessage: false,
      sent: false,
      email: "",
      csrfToken: document
        .querySelector("meta[name=csrf-token]")
        .getAttribute("content")
    };
  }

  handleSubmit = ev => {
    ev.preventDefault();
    this.setState({ loading: true, errorMessage: false });

    // authClient
    this.context
      .resetPassword(this.state)
      .then(data => {
        if (data.status == "ok") {
          this.setState({
            sent: true,
            loading: false
          });
        }
      })
      .catch(error => {
        this.setState({
          loading: false,
          sent: false,
          errorMessage: error.message
        });
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
            <legend className="AuthModal__login-legend">
              Mot de passe oublié :
            </legend>
            {this.state.errorMessage && (
              <div className="AuthModal__error-msg">
                {this.state.errorMessage}
              </div>
            )}
            {this.state.sent && (
              <div className="AuthModal__error-msg">
                Un lien pour réinitialiser votre mot de passe vous a été envoyé
                par e-mail.
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
            <div className="AuthModal__switch-links">
              Nous vous enverons un lien par email qui vous permettra de
              réinitialiser votre mot de passe.
              <br />
              <br />
              <button
                type="button"
                onClick={() => {
                  this.props.switchToAction(LoginAction);
                }}
              >
                S’identifier
              </button>
              <button
                type="button"
                onClick={() => {
                  this.props.switchToAction(RegisterAction);
                }}
              >
                Pas encore inscrit ?
              </button>
            </div>
            <Button type="submit" className="AuthModal__login-submit">
              Valider
            </Button>
          </fieldset>
        </form>
        {this.state.loading && <LoaderOverlay />}
      </div>
    );
  }
}
