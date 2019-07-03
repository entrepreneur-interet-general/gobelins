import React from "react";

import * as authClient from "../utils/auth-client";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: {
        id: "",
        name: "",
        email: ""
      }
    };
  }

  componentDidMount = () => {
    // Eagerly load user profile info.
    const token = authClient.getToken();
    if (token) {
      authClient.getProfile().then(data => {
        this.setState({
          user: { ...data },
          authenticated: true
        });
      });
    }
  };

  login = form => {
    return authClient.login(form).then(data => {
      this.setState({
        user: data.user,
        authenticated: true
      });
    });
  };

  register = form => {
    return authClient.register(form).then(data => {
      this.setState({
        user: data,
        authenticated: true
      });
    });
  };

  logout = () => authClient.logout();

  render() {
    return (
      <AuthContext.Provider
        value={{
          data: this.state,
          login: this.login,
          logout: this.logout,
          register: this.register
        }}
        {...this.props}
      />
    );
  }
}

export { AuthProvider, AuthContext };
