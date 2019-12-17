import React from "react";
import Button from "./Button";
import InputField from "./InputField";
import TextArea from "./Textarea";
import RemoveButton from "./RemoveButton";
import Switch from "./Switch";

export default function LibraryBoard(props) {
  return (
    <div className="LibraryBoard">
      <h1>Boutons</h1>
      <div className="LibraryBoard__zone">
        <div className="LibraryBoard__item is-format-m">
          <div className="LibraryBoard__legend">
            Attributs: <tt>icon="arrow"</tt>
          </div>
          <div className="LibraryBoard__display">
            <Button icon="arrow">créer un compte</Button>
          </div>
        </div>
        <div className="LibraryBoard__item is-format-m">
          <div className="LibraryBoard__legend">
            Attributs: <tt>popOver="première visite"</tt>
          </div>
          <div className="LibraryBoard__display">
            <Button popOver="première visite">créer un compte</Button>
          </div>
        </div>
        <div className="LibraryBoard__item is-format-m">
          <div className="LibraryBoard__legend">
            Attributs: <tt>popOver="déjà inscrit"</tt>{" "}
            <tt>popOverPlacement="bottom"</tt>
          </div>
          <div className="LibraryBoard__display">
            <Button popOver="première visite" popOverPlacement="bottom">
              se connecter
            </Button>
          </div>
        </div>

        <div className="LibraryBoard__item is-format-m">
          <div className="LibraryBoard__legend">
            Attributs: <tt>dark</tt> <tt>small</tt>
          </div>
          <div className="LibraryBoard__display">
            <Button dark small>
              modifier
            </Button>
          </div>
        </div>

        <div className="LibraryBoard__item is-format-m">
          <div className="LibraryBoard__legend">
            Attributs: <tt>dark</tt> <tt>small</tt> <tt>icon="trashcan"</tt>
          </div>
          <div className="LibraryBoard__display">
            <Button dark small icon="trashcan">
              supprimer
            </Button>
          </div>
        </div>

        <div className="LibraryBoard__item is-format-m">
          <div className="LibraryBoard__legend">
            Attributs: <tt>dark</tt> <tt>small</tt> <tt>round</tt>
            <tt>icon="trashcan|gear|plus|pencil|cross…"</tt>
          </div>
          <div className="LibraryBoard__display">
            <Button dark small round icon="trashcan" />
            <Button dark small round icon="gear" />
            <Button dark small round icon="plus" />
            <Button dark small round icon="pencil" />
            <Button dark small round icon="cross" />
          </div>
        </div>
      </div>

      <h1>Champs texte</h1>
      <div className="LibraryBoard__zone">
        <div className="LibraryBoard__item is-format-l">
          <div className="LibraryBoard__legend">
            Attributs: <tt>label="E-mail"</tt>
          </div>
          <div className="LibraryBoard__display">
            <InputField label="E-mail" name="foo" />
          </div>
        </div>

        <div className="LibraryBoard__item is-format-l">
          <div className="LibraryBoard__legend">
            Attributs: <tt>label="E-mail"</tt> <tt>type="password"</tt>
          </div>
          <div className="LibraryBoard__display">
            <InputField label="Mot de passe" type="password" name="foo" />
          </div>
        </div>

        <div className="LibraryBoard__item is-format-l">
          <div className="LibraryBoard__legend">
            Attributs: <tt>label="Intitulé"</tt> <tt>withSubmit</tt>
          </div>
          <div className="LibraryBoard__display">
            <InputField label="Intitulé" withSubmit />
          </div>
        </div>
      </div>
    </div>
  );
}
