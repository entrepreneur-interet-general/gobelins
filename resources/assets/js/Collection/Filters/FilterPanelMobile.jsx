import React, { Component } from "react";
import Headroom from "react-headroom";

import CriteriaPhrase from "./CriteriaPhrase";

class FilterPanelMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="FilterPanelMobile">
        <Headroom>
          <div className="FilterPanelMobile__header">
            <h1 className="FilterPanelMobile__maintitle">
              Collection du Mobilier national
            </h1>
            <div className="FilterPanelMobile__active-filters-container">
              <CriteriaPhrase
                asPhrase={false}
                filterObj={this.props.filterObj}
                onFilterRemove={this.props.onFilterRemove}
                onFilterRemoveAll={this.props.onFilterRemoveAll}
              />
            </div>
          </div>
        </Headroom>
      </div>
    );
  }
}

export default FilterPanelMobile;
