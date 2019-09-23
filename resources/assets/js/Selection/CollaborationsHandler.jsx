import React from "react";

import { SelectionsContext } from "../context/selections-context";
import InputField from "../ui/InputField";
import PaperPlane from "../icons/PaperPlane";
import CrossSimple from "../icons/CrossSimple";

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

  handleDeleteInvitation = (inv, ev) => {
    console.log("Going to delete", inv.email);
  };
  handleDeleteCollaboration = (user, ev) => {
    console.log("Going to delete", user);
  };

  render() {
    return (
      <fieldset className="CollaborationsHandler" disabled={this.state.loading}>
        <legend className="CollaborationsHandler__legend">
          Inviter vos collaborateurs
        </legend>

        <InputField
          label="E-mail"
          withButton={<PaperPlane />}
          name="invitation_email"
          onChange={this.handleInputChange}
          onClickButton={this.onSubmit}
        />

        <ul className="CollaborationsHandler__items">
          {this.props.selection.invitations &&
            this.props.selection.invitations.map(inv => (
              <li key={`inv-${inv.id}`} className="CollaborationsHandler__item">
                <span className="CollaborationsHandler__item-email">
                  {inv.email}
                </span>
                <span className="CollaborationsHandler__item-status">
                  invitation en attente
                </span>
                <button
                  type="button"
                  className="CollaborationsHandler__delete"
                  onClick={this.handleDeleteInvitation.bind(this, inv)}
                >
                  <CrossSimple width="9" height="9" />
                </button>
              </li>
            ))}
          {this.props.selection.users &&
            this.props.selection.users.map(u => (
              <li key={`usr-${u.id}`} className="CollaborationsHandler__item">
                <span className="CollaborationsHandler__item-email">
                  {u.email}
                </span>
                <button
                  type="button"
                  className="CollaborationsHandler__delete"
                  onClick={this.handleDeleteCollaboration.bind(this, u)}
                >
                  <CrossSimple width="9" height="9" />
                </button>
              </li>
            ))}
        </ul>
      </fieldset>
    );
  }
}
