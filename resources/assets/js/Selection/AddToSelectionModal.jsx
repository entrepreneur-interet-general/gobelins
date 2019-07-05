import React from "react";
import { Gateway } from "react-gateway";
import ReactModal2 from "react-modal2";

import { AuthContext } from "../context/auth-context";
import AuthModal from "../Auth/AuthModal";
import AddToSelectionSteps from "./AddToSelectionSteps";

export default class AddToSelectionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Gateway into="modal">
        <ReactModal2
          modalClassName="Modal__content SelectionModal__content"
          backdropClassName="Modal__overlay SelectionModal__overlay"
          onClose={this.props.onClose}
        >
          <AuthContext.Consumer>
            {auth => (
              <React.Fragment>
                {this.props.closeButton}
                {auth.data.authenticated ? (
                  <AddToSelectionSteps
                    user={auth.data.user}
                    product={this.props.product}
                  />
                ) : (
                  <AuthModal />
                )}
              </React.Fragment>
            )}
          </AuthContext.Consumer>
        </ReactModal2>
      </Gateway>
    );
  }
}
