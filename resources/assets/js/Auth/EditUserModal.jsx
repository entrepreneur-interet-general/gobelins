import React, { useState } from "react";
import { Gateway } from "react-gateway";
import ReactModal2 from "react-modal2";

import EditUserForm from "./EditUserForm";
import Loader from "../Loader";
import { useAuth } from "../context/auth-context";

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
        <>
          {props.closeButton}
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
        </>
      </ReactModal2>
    </Gateway>
  );
}
