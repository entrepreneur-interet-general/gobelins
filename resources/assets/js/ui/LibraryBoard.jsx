import React from "react";
import Button from "./Button";
import InputField from "./InputField";
import TextArea from "./Textarea";
import RemoveButton from "./RemoveButton";
import Switch from "./Switch";

export default function LibraryBoard(props) {
  return (
    <div className="LibraryBoard">
      <h1>Buttons</h1>
      <div className="LibraryBoard__zone">
        <div className="LibraryBoard__item">
          <div className="LibraryBoard__legend">
            Attributes: <tt>popOver="première visite"</tt>
          </div>
          <div className="LibraryBoard__display is-format-s is-dark">
            <Button popOver="première visite">créer un compte</Button>
          </div>
        </div>
        <div className="LibraryBoard__item">
          <div className="LibraryBoard__legend">
            Attributes: <tt>popOver="déjà inscrit"</tt>{" "}
            <tt>popOverPlacement="bottom"</tt>
          </div>
          <div className="LibraryBoard__display is-format-s is-dark">
            <Button popOver="première visite" popOverPlacement="bottom">
              se connecter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
