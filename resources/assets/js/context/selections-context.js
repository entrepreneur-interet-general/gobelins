import React from "react";

import * as authClient from "../utils/auth-client";
import * as selectionsClient from "../utils/selections-client";
const SelectionsContext = React.createContext();

class SelectionsProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      loadingMine: false,
      loadingMineShort: false,
      loadingMobNat: false,
      loadingUser: false,
      loadingDetail: false,
      detailSelection: window.SELECTION_DETAIL || null,
      initedMine:
        window.SELECTIONS && window.SELECTIONS.mySelections ? true : false,
      mySelections: (window.SELECTIONS && window.SELECTIONS.mySelections) || [],
      mySelectionsShort:
        (window.SELECTIONS &&
          window.SELECTIONS.mySelections &&
          window.SELECTIONS.mySelections.map(s => {
            {
              s.id, s.name, s.public;
            }
          })) ||
        [],
      mobNatSelections:
        (window.SELECTIONS && window.SELECTIONS.mobNatSelections) || [],
      userSelections:
        (window.SELECTIONS && window.SELECTIONS.userSelections) || [],
      selections: []
    };
  }

  componentDidUpdate = () => {
    // Eagerly load selections info.
    // if (
    //   this.state.initedMine === false &&
    //   this.state.loading === false &&
    //   authClient.getToken()
    // ) {
    //   this.setState({ loading: true }, () => {
    //     selectionsClient.fetchAll().then(data => {
    //       this.setState({
    //         mySelections: data.mySelections,
    //         mobNatSelections: data.mobNatSelections,
    //         userSelections: data.userSelections,
    //         loading: false,
    //         initedMine: true
    //       });
    //     });
    //   });
    // }

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
      loadingMine: true
    });
    return selectionsClient.fetchMine().then(data => {
      this.setState({
        initedMine: true,
        loadingMine: false,
        mySelections: data.data
      });
    });
  };

  fetchMobNat = () => {
    this.setState({
      loadingMobNat: true
    });
    return selectionsClient.fetchMobNat().then(data => {
      this.setState({
        loadingMobNat: false,
        mobNatSelections: data.data
      });
    });
  };

  fetchUser = () => {
    this.setState({
      loadingUser: true
    });
    return selectionsClient.fetchUser().then(data => {
      this.setState({
        loadingUser: false,
        userSelections: data.data
      });
    });
  };

  fetchMineShort = () => {
    this.setState({
      loadingMineShort: true
    });
    return selectionsClient.fetchMineShort().then(data => {
      this.setState({
        loadingMineShort: false,
        mySelectionsShort: data.mySelectionsShort
      });
    });
  };

  fetchDetail = id => {
    this.setState({
      loadingDetail: true
    });
    return selectionsClient.fetchDetail(id).then(data => {
      this.setState({
        loadingDetail: false,
        detailSelection: data.data
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
      this.setState(state => {
        const products = state.detailSelection.products.filter(
          p => inventory_id !== p.inventory_id
        );
        return {
          loading: false,
          detailSelection: {
            ...state.detailSelection,
            products
          }
        };
      });
      this.fetchMine();
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
      this.setState({
        loading: false,
        detailSelection: data.data
      });
      this.fetchMine();
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
    throw "This should not happen anymore.";
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
      const idxChanged = this.state.mySelections.findIndex(
        sel => sel.id === selection.id
      );
      let updatedMySelections = Array.from(this.state.mySelections);

      if (data.hasOwnProperty("invitation")) {
        let invits = this.state.mySelections[idxChanged].invitations.concat(
          data.invitation
        );
        updatedMySelections[idxChanged].invitations = invits;
      } else if (data.hasOwnProperty("user")) {
        let users = this.state.mySelections[idxChanged].users.concat(data.user);
        updatedMySelections[idxChanged].users = users;
      }

      this.setState({
        loading: false,
        mySelections: updatedMySelections
      });

      this.setDetailSelection(selection.id);
      return data;
    });
  };

  destroy_invitation = (invitation, selection) => {
    return selectionsClient
      .destroy_invitation(invitation, selection)
      .then(data => {
        this.setState(state => {
          const updatedInvitations = state.detailSelection.invitations.filter(
            item => item.id !== invitation.id
          );
          return {
            detailSelection: {
              ...state.detailSelection,
              invitations: updatedInvitations
            }
          };
        });
        return data;
      });
  };

  destroy_collaboration = (user, selection) => {
    return selectionsClient
      .destroy_collaboration(user, selection)
      .then(data => {
        this.setState(state => {
          const updatedUsers = state.detailSelection.users.filter(
            item => item.id !== user.id
          );
          return {
            detailSelection: {
              ...state.detailSelection,
              users: updatedUsers
            }
          };
        });
        return data;
      });
  };

  render() {
    return (
      <SelectionsContext.Provider
        value={{
          initedMine: this.state.initedMine,
          loading: this.state.loading,
          loadingMine: this.state.loadingMine,
          loadingMineShort: this.state.loadingMineShort,
          loadingMobNat: this.state.loadingMobNat,
          loadingUser: this.state.loadingUser,
          mySelections: this.state.mySelections,
          mySelectionsShort: this.state.mySelectionsShort,
          userSelections: this.state.userSelections,
          mobNatSelections: this.state.mobNatSelections,
          detailSelection: this.state.detailSelection,
          selections: this.state.selections,
          fetchAll: this.fetchAll,
          fetchMine: this.fetchMine,
          fetchMobNat: this.fetchMobNat,
          fetchUser: this.fetchUser,
          fetchMineShort: this.fetchMineShort,
          fetchDetail: this.fetchDetail,
          add: this.add,
          remove: this.remove,
          createAndAdd: this.createAndAdd,
          update: this.update,
          setDetailSelection: this.setDetailSelection,
          destroy: this.destroy,
          create_invitation: this.create_invitation,
          destroy_invitation: this.destroy_invitation,
          destroy_collaboration: this.destroy_collaboration
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
