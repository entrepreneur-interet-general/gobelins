import React from "react";
import flatten from "lodash/flatten";

import Loader from "../Loader";
import { AuthContext } from "../context/auth-context";

export default class AuthModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: DefaultAction,
      loading: true
    };
  }
  switchToAction = actionComponent => {
    this.setState({ action: actionComponent });
  };
  render() {
    const ComponentFunc = this.state.action;
    return <ComponentFunc switchToAction={this.switchToAction} />;
  }
}

const DefaultAction = props => {
  return (
    <div>
      Pour sauvegarder cet objet, identifiez-vous :
      <br />
      <br />
      <button onClick={() => props.switchToAction(LoginAction)}>
        se connecter
      </button>
      <button onClick={() => props.switchToAction(RegisterAction)}>
        créer un compte
      </button>
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={this.state.loading}>
            <legend>Créer votre compte :</legend>
            {this.state.errorMessage && (
              <div style={{ color: "red" }}>
                Impossible de créer le compte :
                {this.state.errors.map(e => (
                  <div>{e}</div>
                ))}
              </div>
            )}
            <br />
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <button type="submit">Valider</button>
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
      .then(arg => {
        console.log("Finished login.", this.context.data);
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <fieldset disabled={this.state.loading}>
            <legend>Vous connecter :</legend>
            {this.state.errorMessage && (
              <div style={{ color: "red" }}>{this.state.errorMessage}</div>
            )}
            <br />
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
            <button type="submit">Valider</button>
          </fieldset>
        </form>
        {this.state.loading && <LoaderOverlay />}
      </div>
    );
  }
}
