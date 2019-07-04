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
    this.state = { doneAddingProduct: false };
  }

  handleSubmitNewSelection = name => {
    console.log("Submit this selection !");
    this.context
      .createAndAdd([this.props.product["_id"]], { name })
      .then(() => {
        this.setState({ doneAddingProduct: true });
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
        {({ selections, loading, inited }) => {
          //   const { selections, loading, inited } = context;
          return inited === false || loading === true ? (
            <SelectionsLoader />
          ) : this.state.doneAddingProduct ? (
            <DoneAddingProduct />
          ) : (
            <div>
              {selections && selections.length > 0 ? (
                <>
                  <SelectionPick
                    onPick={this.handleSelectionPick}
                    selections={selections}
                    username={this.props.user.name}
                  />
                  <SelectionInput
                    onSubmit={this.handleSubmitNewSelection}
                    isFirst={false}
                  />
                </>
              ) : (
                <SelectionInput
                  onSubmit={this.handleSubmitNewSelection}
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

function SelectionsLoader(props) {
  const context = useSelections();
  if (context.inited === false) {
    context.list();
  }
  return <Loader />;
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
