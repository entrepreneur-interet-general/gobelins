import React from "react";
import { Link } from "react-router-dom";

import CrossSimple from "../icons/CrossSimple";
import UserSelections from "./UserSelections";

class SelectionsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Selections">
        <Link className="Selections__close" to="/recherche">
          <CrossSimple />
        </Link>

        <UserSelections />
      </div>
    );
  }
}

export default SelectionsIndex;
