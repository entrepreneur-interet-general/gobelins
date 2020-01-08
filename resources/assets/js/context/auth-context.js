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
      if (authClient.getToken()) {
        authClient.getProfile().then(data => {
          this.setState({
            user: { ...data },
            authenticated: true
          });
        });
      } else {
        /**
         * TODO : hit /login_from_token, to login and
         * 'remember' user in sesssion.
         */
      }
    } else {
      // If first loading after server-side authentication,
      // load up the API token here.
      if (!authClient.getToken() && this.state.user.api_token) {
        authClient.setToken(this.state.user.api_token);
      }
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
      return data;
    });
  };

  resetPassword = form => {
    return authClient.resetPassword(form);
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
          destroy: this.destroy,
          resetPassword: this.resetPassword
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
