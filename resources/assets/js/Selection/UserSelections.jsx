import React, { useState } from "react";
import { Gateway } from "react-gateway";
import ReactModal2 from "react-modal2";

import Button from "../ui/Button";
import { useSelections } from "../context/selections-context";
import { useAuth } from "../context/auth-context";
import AuthModal from "../Auth/AuthModal";
import SelectionsList from "./SelectionsList";

export default function UserSelections(props) {
  //   const selectionsContext = useSelections();
  const authContext = useAuth();

  return authContext.data.authenticated ? (
    <UserSelectionsList />
  ) : (
    <NotAuthenticated />
  );
}

function UserSelectionsList(props) {
  const selectionsContext = useSelections();
  const authContext = useAuth();
  return (
    <div className="UserSelections">
      Selections de {authContext.data.user.name}
      <ul className="SelectionsList">
        <SelectionsList selections={selectionsContext.mySelections} />
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
    <div>
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

function BlankSlateUserSelections(props) {
  return <div>Blank slate user selections</div>;
}
