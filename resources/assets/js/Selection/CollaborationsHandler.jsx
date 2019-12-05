import React from "react";
import classNames from "classnames";

import { SelectionsContext } from "../context/selections-context";
import InputField from "../ui/InputField";
import PaperPlane from "../icons/PaperPlane";
import CrossSimple from "../icons/CrossSimple";
import Loader from "../ui/Loader";
import { useAuth } from "../context/auth-context";

export default class CollaborationsHandler extends React.Component {
  static contextType = SelectionsContext;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false,
      destroyingInvitationIds: [],
      destroyingCollaborationIds: [],
      errorMessage: false,
      isAdding: false
    };
  }

  onSubmit = () => {
    this.setState({ isAdding: true });
    this.context
      .create_invitation(this.state.email, this.props.selection)
      .then(data => {
        this.setState({
          email: "",
          isAdding: false
        });
      });
  };

  handleKeyPress = ev => {
    if (ev.key === "Enter") {
      ev.preventDefault();
      this.onSubmit();
    }
  };

  handleInputChange = ev => {
    this.setState({
      email: ev.target.value
    });
  };

  handleDeleteInvitation = inv => {
    this.setState(state => {
      return {
        destroyingInvitationIds: state.destroyingInvitationIds.concat(inv.id)
      };
    });
    this.context.destroy_invitation(inv, this.props.selection).then(data => {
      this.setState(state => {
        return {
          destroyingInvitationIds: state.destroyingInvitationIds.filter(
            (item, i) => item.id !== inv.id
          )
        };
      });
    });
  };

  handleDeleteCollaboration = user => {
    console.log("Going to delete collaboration with", user);
    this.setState(state => {
      return {
        destroyingCollaborationIds: state.destroyingCollaborationIds.concat(
          user.id
        )
      };
    });
    this.context
      .destroy_collaboration(user, this.props.selection)
      .then(data => {
        this.setState(state => {
          return {
            destroyingCollaborationIds: state.destroyingCollaborationIds.filter(
              item => item.id !== user.id
            )
          };
        });
      });
  };

  render() {
    return (
      <fieldset
        className="CollaborationsHandler"
        disabled={this.state.loading || this.state.isAdding}
      >
        <legend className="CollaborationsHandler__legend">
          Inviter vos collaborateurs
        </legend>

        <div
          className={classNames("CollaborationsHandler__overlay", {
            "is-visible": Boolean(this.state.email)
          })}
        />

        <InputField
          label="E-mail"
          type="email"
          value={this.state.email}
          withButton={<PaperPlane />}
          name="invitation_email"
          onChange={this.handleInputChange}
          onClickButton={this.onSubmit}
          onKeyPress={this.handleKeyPress}
          isLoading={this.state.isAdding}
          className={classNames("CollaborationsHandler__email-input", {
            "has-button-inverted": Boolean(this.state.email)
          })}
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
                {this.state.destroyingInvitationIds.includes(inv.id) ? (
                  <div className="CollaborationsHandler__loader-container">
                    <Loader className="CollaborationsHandler__delete-loader" />
                  </div>
                ) : (
                  <button
                    type="button"
                    className="CollaborationsHandler__delete"
                    onClick={this.handleDeleteInvitation.bind(this, inv)}
                  >
                    <CrossSimple width="9" height="9" />
                  </button>
                )}
              </li>
            ))}
          {this.props.selection.users && (
            <IdentifiedUsersList
              users={this.props.selection.users}
              onClick={this.handleDeleteCollaboration}
              destroyingCollaborationIds={this.state.destroyingCollaborationIds}
            />
          )}
        </ul>
      </fieldset>
    );
  }
}

function IdentifiedUsersList(props) {
  const authContext = useAuth();

  return (
    <>
      {props.users
        .filter(u => u.id !== authContext.data.user.id)
        .map(u => (
          <li key={`usr-${u.id}`} className="CollaborationsHandler__item">
            <span className="CollaborationsHandler__item-email">{u.email}</span>
            {props.destroyingCollaborationIds.includes(u.id) ? (
              <div className="CollaborationsHandler__loader-container">
                <Loader className="CollaborationsHandler__delete-loader" />
              </div>
            ) : (
              <button
                type="button"
                className="CollaborationsHandler__delete"
                onClick={props.onClick.bind(this, u)}
              >
                <CrossSimple width="9" height="9" />
              </button>
            )}
          </li>
        ))}
    </>
  );
}
