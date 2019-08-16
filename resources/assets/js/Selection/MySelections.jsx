import React, { useState } from "react";
import { Gateway } from "react-gateway";
import ReactModal2 from "react-modal2";
import classNames from "classnames";

import Button from "../ui/Button";
import { useSelections } from "../context/selections-context";
import { useAuth } from "../context/auth-context";
import AuthModal from "../Auth/AuthModal";
import SelectionsList from "./SelectionsList";
import PlusLarge from "../icons/PlusLarge";
import Heart from "../icons/Heart";
import SelectionsBlank from "../icons/SelectionsBlank";
import Loader from "../Loader";

export default function MySelections(props) {
  //   const selectionsContext = useSelections();
  const authContext = useAuth();

  return authContext.data.authenticated ? (
    <MySelectionsList />
  ) : (
    <NotAuthenticated />
  );
}

function handleAddSelection(ev) {
  console.log("handleAddSelection");
}
function handleEditSelection(ev) {
  console.log("handleAddSelection");
}

function MySelectionsHeader(props) {
  const authContext = useAuth();

  function handleLogout() {
    const tok = document
      .querySelector("meta[name=csrf-token]")
      .getAttribute("content");
    authContext
      .logout({ csrfToken: tok })
      .then(() => {
        console.log("TODO: logout notification");
      })
      .catch(error => {
        console.log("LOGOUT ERROR: ", error.message);
        console.log("TODO: logout notification");
      });
  }

  return (
    <hgroup className={classNames("MySelections__header", props.className)}>
      <h1>Selections de {authContext.data.user.name}</h1>
      <div className="MySelections__header-buttons">
        <Button
          round
          small
          dark
          icon="plus"
          onClick={handleAddSelection}
          className="MySelections__button"
        />
        <Button
          round
          small
          dark
          icon="gear"
          onClick={handleEditSelection}
          className="MySelections__button"
        />
        <Button
          small
          dark
          onClick={handleLogout}
          className="MySelections__button"
        >
          se déconnecter
        </Button>
      </div>
    </hgroup>
  );
}

function MySelectionsList(props) {
  const selectionsContext = useSelections();

  return (
    <div className="MySelections">
      {selectionsContext.loading ? (
        <Loader />
      ) : selectionsContext.mySelections.length ? (
        <ul className="SelectionsList">
          <SelectionsList
            selections={selectionsContext.mySelections}
            rightHeader={<MySelectionsHeader />}
          />
        </ul>
      ) : (
        <UserHasNoSelections />
      )}
    </div>
  );
}

function UserHasNoSelections(props) {
  return (
    <div className="SelectionsListBlankSlate">
      <div className="SelectionsListBlankSlate__top-left">
        <button className="SelectionsListBlankSlate__new">
          Créer votre première sélection
        </button>
      </div>
      <MySelectionsHeader className="SelectionsListBlankSlate__header" />
      <div className="SelectionsListBlankSlate__bottom-left">
        <button className="SelectionsListBlankSlate__label-heart">
          ou sauvegardez des objets en cliquant sur les
          <Heart />
        </button>
      </div>
      <SelectionsBlank className="SelectionsListBlankSlate__illu" />
    </div>
  );
}

function NotAuthenticated(props) {
  const selectionsContext = useSelections();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");

  const handleRegisterClick = () => {
    setAuthModalMode("register");
    setAuthModalOpen(true);
  };
  const handleLoginClick = () => {
    setAuthModalMode("login");
    setAuthModalOpen(true);
  };
  const handleLoginCallback = () => {
    console.log("gonna list mine, could display loader now.");
    selectionsContext.listMine();
  };
  return (
    <div className="MySelections">
      <div className="MySelections__unauthenticated">
        <div className="MySelections__blank-slate">
          <div className="MySelections__blank-slate-wrapper">
            <div className="MySelections__blank-slate-inner">
              <span>
                <PlusLarge />
              </span>
              <span>
                <PlusLarge />
              </span>
              <span>
                <PlusLarge />
              </span>
              <span>
                <PlusLarge />
              </span>
            </div>
          </div>
        </div>

        <h1 className="MySelections__auth-panel-title">
          Identifiez-vous pour consulter ou créer vos sélections d’objets
        </h1>
        <div className="MySelections__auth-panel-buttons">
          <Button onClick={handleRegisterClick} icon="arrow">
            créer un compte
          </Button>
          <Button onClick={handleLoginClick} icon="arrow">
            se connecter
          </Button>
        </div>
      </div>
      {authModalOpen && (
        <Gateway into="modal">
          <ReactModal2
            modalClassName="Modal__content SelectionModal__content"
            backdropClassName="Modal__overlay SelectionModal__overlay"
            onClose={() => setAuthModalOpen(false)}
          >
            <AuthModal action={authModalMode} onLogin={handleLoginCallback} />
          </ReactModal2>
        </Gateway>
      )}
    </div>
  );
}
