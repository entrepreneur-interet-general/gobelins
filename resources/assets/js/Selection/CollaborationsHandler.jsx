import React from "react";

import { SelectionsContext } from "../context/selections-context";
import InputField from "../ui/InputField";
import PaperPlane from "../icons/PaperPlane";

export default class CollaborationsHandler extends React.Component {
  static contextType = SelectionsContext;
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loading: false,
      errorMessage: false
    };
  }

  onSubmit = ev => {
    console.log("CollaborationsHandler => onSubmit", this.state.email);
    this.context
      .create_invitation(this.state.email, this.props.selection)
      .then(data => {
        console.log("OK, done creating invitation", data);
      });
  };

  handleInputChange = ev => {
    this.setState({
      email: ev.target.value
    });
  };

  render() {
    return (
      <fieldset className="CollaborationsHandler" disabled={this.state.loading}>
        <legend>Inviter vos collaborateurs</legend>

        <InputField
          label="E-mail"
          withButton={<PaperPlane />}
          name="invitation_email"
          onChange={this.handleInputChange}
          onClickButton={this.onSubmit}
        />

        <ul>
          {this.props.selection.invitations &&
            this.props.selection.invitations.map(inv => (
              <li key={`inv-${inv.id}`}>
                <span>{inv.email}</span>
                <span>invitation en attente</span>
              </li>
            ))}
          {this.props.selection.users &&
            this.props.selection.users.map(u => (
              <li key={`usr-${u.id}`}>
                <span>{u.email}</span>
              </li>
            ))}
        </ul>
      </fieldset>
    );
  }
}
