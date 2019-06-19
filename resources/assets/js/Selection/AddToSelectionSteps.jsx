import React from "react";

import { AuthContext } from "../context/auth-context";

export default class AddToSelectionSteps extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <AuthContext.Consumer>
        {auth => (
          <div>
            <span>{auth.data.user.name}</span>
            Nommer votre première sélection …tralala…
          </div>
        )}
      </AuthContext.Consumer>
    );
  }
}
