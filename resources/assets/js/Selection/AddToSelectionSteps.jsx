import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { SelectionsContext } from "../context/selections-context";
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
      doneAddingToSelection: false,
      errorMessage: false,
      loading: true
    };
  }

  componentDidMount = () => {
    if (
      this.context.loadingMineShort === false &&
      this.context.mySelectionsShort.length === 0
    ) {
      this.context.fetchMineShort().then(() => {
        this.setState({ loading: false });
      });
    } else if (
      this.context.loadingMineShort === false &&
      this.state.loading === true
    ) {
      this.setState({ loading: false });
    }
  };

  componentDidUpdate = () => {
    if (this.state.loading && this.context.loadingMineShort === false) {
      this.setState({ loading: false });
    }
  };

  handleSubmitNewSelection = name => {
    this.setState({ loading: true });
    this.context
      .createAndAdd([this.props.product["id"]], { name })
      .then(data => {
        this.setState({
          loading: false,
          doneAddingToSelection: data.selection
        });
      })
      .catch(error => {
        this.setState({ loading: false, errorMessage: error.message });
      });
  };

  handleSelectionPick = selection => {
    this.setState({ loading: true });
    this.context.add(this.props.product["id"], selection.id).then(() => {
      this.setState({ loading: false, doneAddingToSelection: selection });
    });
  };

  render() {
    return this.state.loading === true ? (
      <Loader className="SelectionModal__loader" />
    ) : this.state.doneAddingToSelection ? (
      <DoneAddingProduct selection={this.state.doneAddingToSelection} />
    ) : (
      <div className="SelectionModal__outer-wrapper">
        <div className="SelectionModal__wrapper">
          {this.context.mySelectionsShort &&
          this.context.mySelectionsShort.length > 0 ? (
            <>
              <SelectionPick
                onPick={this.handleSelectionPick}
                selections={this.context.mySelectionsShort}
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
      </div>
    );
  }
}

function DoneAddingProduct(props) {
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("prevent-scroll");
    };
  }, []);

  return (
    <div className="SelectionModal__outer-wrapper">
      <div className="SelectionModal__wrapper">
        <div className="SelectionModal__added-confirm">
          <div className="SelectionModal__added-illu">
            <Link to={`/selections/${props.selection.id}`}>
              <AddedToSelection />
            </Link>
          </div>
          <p>
            <ArrowBack className="SelectionModal__added-arrow-back" />
            L’objet a été sauvegardé !
            <br />
            Retrouvez-le ici.
            <ArrowDown className="SelectionModal__added-arrow-down" />
          </p>
        </div>
      </div>
    </div>
  );
}
