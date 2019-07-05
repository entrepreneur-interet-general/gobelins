import React from "react";

import {
  SelectionsContext,
  useSelections
} from "../context/selections-context";
import SelectionInput from "./SelectionInput";
import SelectionPick from "./SelectionPick";
import Loader from "../Loader";

export default class AddToSelectionSteps extends React.Component {
  static contextType = SelectionsContext;
  constructor(props) {
    super(props);
    this.state = {
      doneAddingProduct: false,
      errorMessage: false,
      loading: false
    };
  }

  componentDidMount = () => {
    if (this.context.loading === false && this.context.inited === false) {
      this.setState({ loading: true });
      this.context.list().then(() => this.setState({ loading: false }));
    } else if (this.context.loading === true) {
      this.setState({ loading: true });
    }
  };

  componentDidUpdate = () => {
    if (this.state.loading && this.context.loading === false) {
      this.setState({ loading: false });
    }
  };

  handleSubmitNewSelection = name => {
    console.log("Submit this selection !");
    this.context
      .createAndAdd([this.props.product["_id"]], { name })
      .then(() => {
        this.setState({ doneAddingProduct: true });
      })
      .catch(error => {
        console.log("catch ettor !");

        this.setState({ loading: false, errorMessage: error.message });
      });
  };

  handleSelectionPick = selection => {
    this.context.add(this.props.product["_id"], selection.id).then(() => {
      this.setState({ doneAddingProduct: true });
    });
  };

  render() {
    return (
      <SelectionsContext.Consumer>
        {({ selections, inited }) => {
          //   const { selections, loading, inited } = context;
          return this.state.loading === true ? (
            <Loader />
          ) : this.state.doneAddingProduct ? (
            <DoneAddingProduct />
          ) : (
            <div className="SelectionModal__wrapper">
              {selections && selections.length > 0 ? (
                <>
                  <SelectionPick
                    onPick={this.handleSelectionPick}
                    selections={selections}
                    username={this.props.user.name}
                  />
                  <SelectionInput
                    onSubmit={this.handleSubmitNewSelection}
                    errorMessage={this.state.errorMessage}
                    isFirst={false}
                  />
                </>
              ) : (
                <SelectionInput
                  onSubmit={this.handleSubmitNewSelection}
                  errorMessage={this.state.errorMessage}
                  isFirst={true}
                />
              )}
            </div>
          );
        }}
      </SelectionsContext.Consumer>
    );
  }
}

function DoneAddingProduct(props) {
  return (
    <div>
      L’Objet a été sauvegardé !
      <br />
      Retrouvez-le ici.
    </div>
  );
}
