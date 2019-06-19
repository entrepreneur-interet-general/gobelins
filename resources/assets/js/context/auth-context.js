import React from "react";

import * as authClient from "../utils/auth-client";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: {
        name: "",
        email: ""
      }
    };
  }

  login = form => {
    return authClient.login(form).then(data => {
      this.setState({
        user: { ...data },
        authenticated: true
      });
    });
  };

  register = form => {
    return authClient.register(form).then(data => {
      this.setState({
        user: { ...data },
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
