import React from "react";

import * as authClient from "../utils/auth-client";
import * as selectionsClient from "../utils/selections-client";
const SelectionsContext = React.createContext();

class SelectionsProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
      console.log("Selection context list them all !!");
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

  render() {
    return (
      <SelectionsContext.Provider
        value={{
          initedMine: this.state.initedMine,
          loading: this.state.loading,
          mySelections: this.state.mySelections,
          userSelections: this.state.userSelections,
          mobNatSelections: this.state.mobNatSelections,
          selections: this.state.selections,
          fetchAll: this.fetchAll,
          fetchMine: this.fetchMine,
          add: this.add,
          createAndAdd: this.createAndAdd
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
