import React, { useState, useEffect, Component } from "react";
import { Gateway } from "react-gateway";
import ReactModal2 from "react-modal2";
import classNames from "classnames";
import notifier from "../utils/notifier";

import Button from "../ui/Button";
import {
  useSelections,
  SelectionsContext
} from "../context/selections-context";
import { useAuth } from "../context/auth-context";
import AuthModal from "../Auth/AuthModal";
import SelectionsList from "./SelectionsList";
import SelectionInput from "./SelectionInput";
import Loader from "../Loader";
import Heart from "../icons/Heart";
import SelectionsBlank from "../icons/SelectionsBlank";
import ImagesPlaceholder from "./ImagesPlaceholder";
import EditUserModal from "../Auth/EditUserModal";
import CrossSimple from "../icons/CrossSimple";

export default function MySelections(props) {
  //   const selectionsContext = useSelections();
  const authContext = useAuth();

  return authContext.data.authenticated ? (
    <MySelectionsList />
  ) : (
    <NotAuthenticated />
  );
}

function MySelectionsHeader(props) {
  const authContext = useAuth();
  const [selectionInputOpen, setSelectionInputOpen] = useState(false);
  const [editUserOpen, setEditUserOpen] = useState(false);

  function handleLogout() {
    const tok = document
      .querySelector("meta[name=csrf-token]")
      .getAttribute("content");
    authContext
      .logout({ csrfToken: tok })
      .then(() => {
        notifier("Vous avez bien été déconnecté.");
      })
      .catch(error => {
        notifier(
          "Une erreur est survenue, vous n’avez pas pu être déconnecté."
        );
      });
  }
  function openAddSelectionModal(ev) {
    document.documentElement.classList.add("prevent-scroll");
    setSelectionInputOpen(true);
  }
  function onCloseAddSelectionModal() {
    document.documentElement.classList.remove("prevent-scroll");
    setSelectionInputOpen(false);
  }
  function openEditUserModal(ev) {
    document.documentElement.classList.add("prevent-scroll");
    setEditUserOpen(true);
  }
  function onCloseEditUserModal() {
    document.documentElement.classList.remove("prevent-scroll");
    setEditUserOpen(false);
  }

  return (
    <hgroup className={classNames("MySelections__header", props.className)}>
      <h1>Sélections de {authContext.data.user.name}</h1>
      <div className="MySelections__header-buttons">
        <Button
          round
          small
          dark
          icon="plus"
          onClick={openAddSelectionModal}
          className="MySelections__button"
        />
        <Button
          round
          small
          dark
          icon="gear"
          onClick={openEditUserModal}
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

      {selectionInputOpen && (
        <SelectionInputModal onClose={onCloseAddSelectionModal} />
      )}
      {editUserOpen && <EditUserModal onClose={onCloseEditUserModal} />}
    </hgroup>
  );
}

function SelectionInputModal(props) {
  const selectionsContext = useSelections();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmitNewSelection = name => {
    setLoading(true);
    selectionsContext
      .createAndAdd([], { name })
      .then(() => {
        props.onClose();
        document.documentElement.classList.remove("prevent-scroll");
      })
      .catch(error => {
        setLoading(false);
        setErrorMessage(error.message);
      });
  };
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
            <div className="SelectionModal__wrapper">
              {loading ? (
                <Loader />
              ) : (
                <SelectionInput
                  onSubmit={handleSubmitNewSelection}
                  errorMessage={errorMessage}
                  isFirst={false}
                />
              )}
            </div>
          </div>
        </>
      </ReactModal2>
    </Gateway>
  );
}

class MySelectionsList extends React.Component {
  static contextType = SelectionsContext;

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount = () => {
    if (!this.context.loadingMine) {
      this.context.fetchMine();
    }
  };

  render = () => {
    return (
      <div className="MySelections">
        {this.context.loadingMine ? (
          <Loader />
        ) : this.context.mySelections &&
          this.context.mySelections.length > 0 ? (
          <ul className="SelectionsList">
            <SelectionsList
              selections={this.context.mySelections}
              className="MySelections__list-item"
              rightHeader={null}
            />
            <MySelectionsHeader />
          </ul>
        ) : (
          <UserHasNoSelections />
        )}
      </div>
    );
  };
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
    selectionsContext.fetchMine();
  };
  return (
    <div className="MySelections">
      <div className="MySelections__unauthenticated">
        <ImagesPlaceholder className="MySelections__blank-slate" />

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
            <button
              className="SelectionModal__close"
              onClick={() => setAuthModalOpen(false)}
            >
              <CrossSimple />
            </button>
            <AuthModal action={authModalMode} onLogin={handleLoginCallback} />
          </ReactModal2>
        </Gateway>
      )}
    </div>
  );
}
