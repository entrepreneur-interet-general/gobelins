import React from "react";

import * as authClient from "../utils/auth-client";

const AuthContext = React.createContext();

const NullUser = {
  id: "",
  name: "",
  email: ""
};

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: window.CURRENT_USER ? true : false,
      user: window.CURRENT_USER || NullUser
    };
  }

  componentDidMount = () => {
    // Eagerly load user profile info.
    if (!this.state.authenticated) {
      const token = authClient.getToken();
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
        user: data.user,
        authenticated: true
      });
    });
  };

  logout = payload =>
    authClient.logout(payload).then(() => {
      this.setState({
        authenticated: false,
        user: {
          id: "",
          name: "",
          email: ""
        }
      });
    });

  updateMyself = user => {
    this.setState({ loading: true });
    return authClient.updateMyself(user).then(data => {
      this.setState({
        authenticated: true,
        loading: false,
        user: data.user
      });
      return data;
    });
  };

  destroy = cb => {
    this.setState({ loading: true });
    return authClient.destroy().then(data => {
      cb(data);
      this.setState({
        loading: false,
        authenticated: false,
        user: NullUser
      });
      return data;
    });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          data: this.state,
          login: this.login,
          logout: this.logout,
          register: this.register,
          updateMyself: this.updateMyself,
          destroy: this.destroy
        }}
        {...this.props}
      />
    );
  }
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }
  return context;
}

export { AuthProvider, AuthContext, useAuth };
