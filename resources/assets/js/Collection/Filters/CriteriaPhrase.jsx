import React, { Component } from "react";
import { flatMap, compact } from "lodash";
const treeFlatten = require("tree-flatten");

class Criterion extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      // Using a <span>, because <button> is a replaced element,
      // and can't be properly displayed as inline when wrapping
      // multiple lines.
      <span
        tabIndex="0"
        role="button"
        className={"CriteriaPhrase__button is-" + this.props.type}
        onClick={this.props.onFilterRemove.bind(this.props.onFilterRemove, {
          type: this.props.type,
          id: this.props.id,
          paramName: this.props.paramName
        })}
      >
        {this.props.label}
      </span>
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
    this.extractStyles = this.extractStyles.bind(this);
    this.extractProductionOrigins = this.extractProductionOrigins.bind(this);
  }

  extractQueryString() {
    return this.props.filterObj.hasOwnProperty("q") ? (
      <Criterion
        type="query"
        paramName="q"
        label={"« " + this.props.filterObj.q + " »"}
        id={this.props.filterObj.q}
        key={"query_string"}
        onFilterRemove={this.props.onFilterRemove}
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
              paramName="product_type_ids"
              label={pt.name}
              id={pt.id}
              key={"product_type_" + pt.id}
              onFilterRemove={this.props.onFilterRemove}
            />
          ))
      );
    }

    return out;
  }

  extractStyles() {
    let out = [];

    if (this.props.filterObj.hasOwnProperty("style_ids")) {
      out = out.concat(
        this.state.styles
          .filter(s => this.props.filterObj.style_ids.includes(s.id))
          .map(s => (
            <Criterion
              type="style"
              paramName="style_ids"
              label={s.name}
              id={s.id}
              key={"style_" + s.id}
              onFilterRemove={this.props.onFilterRemove}
            />
          ))
      );
    }

    return out;
  }

  extractProductionOrigins() {
    let out = [];

    if (this.props.filterObj.hasOwnProperty("production_origin_ids")) {
      out = out.concat(
        this.state.productionOrigins
          .filter(s =>
            this.props.filterObj.production_origin_ids.includes(s.id)
          )
          .map(s => (
            <Criterion
              type="production_origin"
              paramName="production_origin_ids"
              label={s.name}
              id={s.id}
              key={"production_origin_" + s.id}
              onFilterRemove={this.props.onFilterRemove}
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
    return compact([
      this.extractQueryString(),
      ...this.extractProductTypes(),
      ...this.extractStyles(),
      ...this.extractProductionOrigins()
    ]);
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
