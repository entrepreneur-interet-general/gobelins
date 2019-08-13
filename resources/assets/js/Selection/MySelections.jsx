import React, { useState } from "react";
import { Gateway } from "react-gateway";
import ReactModal2 from "react-modal2";

import Button from "../ui/Button";
import { useSelections } from "../context/selections-context";
import { useAuth } from "../context/auth-context";
import AuthModal from "../Auth/AuthModal";
import SelectionsList from "./SelectionsList";

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
function handleLogout() {
  console.log("handleLogout");
}

function MySelectionsHeader(props) {
  const authContext = useAuth();
  return (
    <hgroup className="MySelections__header">
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
      <ul className="SelectionsList">
        <SelectionsList
          selections={selectionsContext.mySelections}
          rightHeader={<MySelectionsHeader />}
        />
      </ul>
    </div>
  );
}

function NotAuthenticated(props) {
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
  return (
    <div className="MySelections">
      <div>
        Identifiez-vous pour consulter ou créer vos sélections d’objets
        <Button onClick={handleRegisterClick} icon="arrow">
          créer un compte
        </Button>
        <Button onClick={handleLoginClick} icon="arrow">
          se connecter
        </Button>
      </div>
      {authModalOpen && (
        <Gateway into="modal">
          <ReactModal2
            modalClassName="Modal__content SelectionModal__content"
            backdropClassName="Modal__overlay SelectionModal__overlay"
            onClose={() => setAuthModalOpen(false)}
          >
            <AuthModal action={authModalMode} />
          </ReactModal2>
        </Gateway>
      )}
    </div>
  );
}

function BlankSlateMySelections(props) {
  return <div>Blank slate user selections</div>;
}
