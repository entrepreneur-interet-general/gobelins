import React, { Component } from "react";
import { flatMap, compact } from "lodash";
const treeFlatten = require("tree-flatten");

class Criterion extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <button
        type="button"
        className={"CriteriaPhrase__button is-" + this.props.type}
      >
        {this.props.label}
      </button>
    );
  }
}

class CriteriaPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productTypes: window.__INITIAL_STATE__.productTypes,
      flatProductTypes: flatMap(window.__INITIAL_STATE__.productTypes, pt => {
        return treeFlatten(pt, "children");
      }),
      styles: window.__INITIAL_STATE__.styles,
      authors: window.__INITIAL_STATE__.authors,
      periods: window.__INITIAL_STATE__.periods,
      materials: window.__INITIAL_STATE__.materials,
      productionOrigins: window.__INITIAL_STATE__.productionOrigins,
      q: props.filterObj && props.filterObj.q ? props.filterObj.q : ""
    };

    this.extractProductTypes = this.extractProductTypes.bind(this);
  }

  extractQueryString() {
    return this.props.filterObj.hasOwnProperty("q") ? (
      <Criterion
        type="query"
        label={"« " + this.props.filterObj.q + " »"}
        key={"query_string"}
      />
    ) : null;
  }

  extractProductTypes() {
    let out = [];

    if (this.props.filterObj.hasOwnProperty("product_type_ids")) {
      out = out.concat(
        this.state.flatProductTypes
          .filter(pt => this.props.filterObj.product_type_ids.includes(pt.id))
          .map(pt => (
            <Criterion
              type="product_type"
              label={pt.name}
              key={"product_type_" + pt.id}
            />
          ))
      );
    }

    return out;
  }

  sentencize(arr) {
    let last = null;
    if (arr.length >= 2) {
      last = arr.pop();
      arr = arr.reduce((r, a, idx) => r.concat(a, ", "), []);
      arr.push(" ou ");
      arr.push(last);
    }
    return arr;
  }

  allCriteria() {
    return compact([this.extractQueryString(), ...this.extractProductTypes()]);
  }

  render() {
    return (
      <div className="CriteriaPhrase">
        {this.sentencize(this.allCriteria())}
        <span>
          {" "}
          dans les collections du <strong>Mobilier National</strong>
        </span>
      </div>
    );
  }
}

export default CriteriaPhrase;
