import React from "react";

import {
  SelectionsContext,
  useSelections
} from "../context/selections-context";
import SelectionInput from "./SelectionInput";
import SelectionPick from "./SelectionPick";
import Loader from "../Loader";
import AddedToSelection from "../icons/AddedToSelection";
import ArrowBack from "../icons/ArrowBack";
import ArrowDown from "../icons/ArrowDown";

export default class AddToSelectionSteps extends React.Component {
  static contextType = SelectionsContext;
  constructor(props) {
    super(props);
    this.state = {
      doneAddingProduct: false,
      errorMessage: false,
      loading: true
    };
  }

  componentDidMount = () => {
    if (this.context.loading === false && this.context.inited === false) {
      console.log("OK, we are not inited, calling list() on selection context");
      this.context.list().then(() => {
        console.log("list() done, switch off loading anim.");

        this.setState({ loading: false });
      });
    } else if (this.context.loading === false && this.state.loading === true) {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate = () => {
    if (this.state.loading && this.context.loading === false) {
      this.setState({ loading: false });
    }
  };

  handleSubmitNewSelection = name => {
    this.setState({ loading: true });
    this.context
      .createAndAdd([this.props.product["_id"]], { name })
      .then(() => {
        this.setState({ loading: false, doneAddingProduct: true });
      })
      .catch(error => {
        this.setState({ loading: false, errorMessage: error.message });
      });
  };

  handleSelectionPick = selection => {
    this.setState({ loading: true });
    this.context.add(this.props.product["_id"], selection.id).then(() => {
      this.setState({ loading: false, doneAddingProduct: true });
    });
  };

  render() {
    return this.state.loading === true ? (
      <Loader className="SelectionModal__loader" />
    ) : this.state.doneAddingProduct ? (
      <DoneAddingProduct />
    ) : (
      <div className="SelectionModal__wrapper">
        {this.context.mySelections && this.context.mySelections.length > 0 ? (
          <>
            <SelectionPick
              onPick={this.handleSelectionPick}
              selections={this.context.mySelections}
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
  }
}

function DoneAddingProduct(props) {
  return (
    <div className="SelectionModal__added-confirm">
      <div className="SelectionModal__added-illu">
        <AddedToSelection />
      </div>
      <p>
        <ArrowBack className="SelectionModal__added-arrow-back" />
        L’objet a été sauvegardé !
        <br />
        Retrouvez-le ici.
        <ArrowDown className="SelectionModal__added-arrow-down" />
      </p>
    </div>
  );
}
