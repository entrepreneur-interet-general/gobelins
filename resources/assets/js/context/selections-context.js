import React from "react";

import * as authClient from "../utils/auth-client";
import * as selectionsClient from "../utils/selections-client";
const SelectionsContext = React.createContext();

class SelectionsProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      detailSelection: window.SELECTION_DETAIL || null,
      initedMine:
        window.SELECTIONS && window.SELECTIONS.mySelections ? true : false,
      mySelections: (window.SELECTIONS && window.SELECTIONS.mySelections) || [],
      mobNatSelections:
        (window.SELECTIONS && window.SELECTIONS.mobNatSelections) || [],
      userSelections:
        (window.SELECTIONS && window.SELECTIONS.userSelections) || [],
      selections: []
    };
  }

  componentDidUpdate = () => {
    // Eagerly load selections info.
    if (
      this.state.initedMine === false &&
      this.state.loading === false &&
      authClient.getToken()
    ) {
      this.setState({ loading: true }, () => {
        selectionsClient.fetchAll().then(data => {
          this.setState({
            mySelections: data.mySelections,
            mobNatSelections: data.mobNatSelections,
            userSelections: data.userSelections,
            loading: false,
            initedMine: true
          });
        });
      });
    }

    // Upon logout, purge mySelections.
    if (!authClient.getToken() && this.state.initedMine === true) {
      this.setState({ initedMine: false, mySelections: [] });
    }
  };

  fetchAll = () => {
    this.setState({
      loading: true
    });
    return selectionsClient.fetchAll().then(data => {
      this.setState({
        initedMine: true,
        loading: false,
        mySelections: data.mySelections,
        mobNatSelections: data.mobNatSelections,
        userSelections: data.userSelections
      });
    });
  };

  fetchMine = () => {
    this.setState({
      loading: true
    });
    return selectionsClient.fetchMine().then(data => {
      this.setState({
        initedMine: true,
        loading: false,
        mySelections: data.mySelections
      });
    });
  };

  add = (product_id, selection_id) => {
    this.setState({ loading: true });
    return selectionsClient.add(product_id, selection_id).then(data => {
      console.log("Products added to selection", data);
      this.setState({
        initedMine: true,
        loading: false,
        mySelections: data.mySelections
      });
      return data;
    });
  };

  remove = (inventory_id, selection_id) => {
    this.setState({ loading: true });
    return selectionsClient.remove(inventory_id, selection_id).then(data => {
      const updatedDetailData = data.mySelections.find(
        s => s.id === selection_id
      );
      this.setState({
        initedMine: true,
        loading: false,
        mySelections: data.mySelections,
        detailSelection: updatedDetailData
      });
      return data;
    });
  };

  createAndAdd = (product_ids, selection) => {
    this.setState({ loading: true });
    return selectionsClient.create(product_ids, selection).then(data => {
      this.setState({
        initedMine: true,
        loading: false,
        mySelections: data.mySelections
      });
      return data;
    });
  };

  update = selection => {
    this.setState({ loading: true });
    return selectionsClient.update(selection).then(data => {
      const updatedDetailData = data.mySelections.find(
        s => s.id === selection.id
      );
      this.setState({
        initedMine: true,
        loading: false,
        mySelections: data.mySelections,
        detailSelection: updatedDetailData
      });
      return data;
    });
  };

  destroy = (selection, cb) => {
    this.setState({ loading: true });
    return selectionsClient.destroy(selection).then(data => {
      cb();
      this.setState({
        loading: false,
        mySelections: data.mySelections,
        detailSelection: null
      });
      return data;
    });
  };

  setDetailSelection = selection_id => {
    const sel = [
      ...this.state.mySelections,
      ...this.state.mobNatSelections,
      ...this.state.userSelections
    ].find(sel => sel.id === selection_id);
    this.setState({
      detailSelection: sel
    });
  };

  create_invitation = (email, selection) => {
    this.setState({ loading: true });
    return selectionsClient.create_invitation(email, selection).then(data => {
      const selection_id = data.invitation.selection_id;
      const idxChanged = this.state.mySelections.findIndex(
        sel => sel.id === selection_id
      );
      let updatedMySelections = Array.from(this.state.mySelections);
      let invits = this.state.mySelections[idxChanged].invitations.concat(
        data.invitation
      );
      updatedMySelections[idxChanged].invitations = invits;

      this.setState({
        loading: false,
        mySelections: updatedMySelections
      });

      this.setDetailSelection(selection.id);
      return data;
    });
  };

  render() {
    return (
      <SelectionsContext.Provider
        value={{
          initedMine: this.state.initedMine,
          loading: this.state.loading,
          mySelections: this.state.mySelections,
          userSelections: this.state.userSelections,
          mobNatSelections: this.state.mobNatSelections,
          detailSelection: this.state.detailSelection,
          selections: this.state.selections,
          fetchAll: this.fetchAll,
          fetchMine: this.fetchMine,
          add: this.add,
          remove: this.remove,
          createAndAdd: this.createAndAdd,
          update: this.update,
          setDetailSelection: this.setDetailSelection,
          destroy: this.destroy,
          create_invitation: this.create_invitation
        }}
        {...this.props}
      />
    );
  }
}

function useSelections() {
  const context = React.useContext(SelectionsContext);
  if (context === undefined) {
    throw new Error(`useSelections must be used within a SelectionsProvider`);
  }
  return context;
}

export { SelectionsProvider, SelectionsContext, useSelections };
