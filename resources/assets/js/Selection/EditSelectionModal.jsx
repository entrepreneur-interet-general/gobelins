import React, { Fragment, useEffect } from "react";
import { Gateway } from "react-gateway";
import ReactModal2 from "react-modal2";

import CrossSimple from "../icons/CrossSimple";
import EditSelectionForm from "./EditSelectionForm";

export default function EditSelectionModal(props) {
  useEffect(() => {
    document.documentElement.classList.add("prevent-scroll");
    return () => {
      document.documentElement.classList.remove("prevent-scroll");
    };
  }, []);

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
          <EditSelectionForm
            selection={props.selection}
            onClose={props.onClose}
          />
        </Fragment>
      </ReactModal2>
    </Gateway>
  );
}
