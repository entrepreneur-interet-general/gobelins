import React, { Fragment, useState } from "react";
import { Gateway } from "react-gateway";
import ReactModal2 from "react-modal2";

import EditUserForm from "./EditUserForm";
import Loader from "../Loader";
import { useAuth } from "../context/auth-context";
import CrossSimple from "../icons/CrossSimple";

export default function EditUserModal(props) {
  const [loading, setLoading] = useState(false);
  const authContext = useAuth();

  return (
    <Gateway into="modal">
      <ReactModal2
        modalClassName="Modal__content SelectionModal__content"
        backdropClassName="Modal__overlay SelectionModal__overlay"
        onClose={props.onClose}
      >
        <Fragment>
          <button className="SelectionModal__close" onClick={props.onClose}>
            <CrossSimple />
          </button>
          <div className="SelectionModal__content-scrollable">
            <div className="SelectionModal__wrapper SelectionModal__wrapper--user">
              {loading ? (
                <Loader />
              ) : (
                <EditUserForm
                  setLoading={setLoading}
                  user={authContext.data.user}
                  onClose={props.onClose}
                />
              )}
            </div>
          </div>
        </Fragment>
      </ReactModal2>
    </Gateway>
  );
}
