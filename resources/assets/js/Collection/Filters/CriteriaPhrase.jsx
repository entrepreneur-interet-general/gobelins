import React, { Component } from "react";
import flatMap from "lodash/flatMap";
import compact from "lodash/compact";
const treeFlatten = require("tree-flatten");
import Cross from "../../icons/CrossCriterion";

class Criterion extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Using a <span>, because <button> is a replaced element,
    // and can't be properly displayed as inline when wrapping
    // multiple lines.
    return (
      <span
        tabIndex="0"
        role="button"
        className={`CriteriaPhrase__button is-${this.props.type} ${
          this.props.displayAsHovered ? "is-hovered" : ""
        }`}
        onClick={this.props.onFilterRemove.bind(this.props.onFilterRemove, {
          type: this.props.type,
          ids: [this.props.id],
          paramName: this.props.paramName
        })}
      >
        <span className="CriteriaPhrase__button-text">{this.props.label}</span>
        <span className="CriteriaPhrase__button-cross">
          {String.fromCharCode(65279)}
          <Cross />
        </span>
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
      flatMaterials: flatMap(window.__INITIAL_STATE__.materials, m => {
        return treeFlatten(m, "children");
      }),
      productionOrigins: window.__INITIAL_STATE__.productionOrigins,
      q: props.filterObj && props.filterObj.q ? props.filterObj.q : "",
      hoverRemoveAll: false
    };

    this.criteriaPhraseRef = React.createRef();

    this.extractProductTypes = this.extractProductTypes.bind(this);
    this.extractStyles = this.extractStyles.bind(this);
    this.extractMaterials = this.extractMaterials.bind(this);
    this.extractProductionOrigins = this.extractProductionOrigins.bind(this);
    this.renderResetButton = this.renderResetButton.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
  }

  componentDidUpdate() {
    let txt = this.criteriaPhraseRef.current.textContent;
    window.document.title =
      txt === " dans la collection du Mobilier national MN/Lab"
        ? "Objets aléatoires de la collection du Mobilier national MN/Lab"
        : txt;
  }

  extractQueryString() {
    return this.props.filterObj.hasOwnProperty("q") &&
      this.props.filterObj.q ? (
      <Criterion
        type="query"
        paramName="q"
        label={
          "«" +
          String.fromCharCode(160) +
          this.props.filterObj.q +
          String.fromCharCode(160) +
          "»"
        }
        id={this.props.filterObj.q}
        key={"query_string"}
        onFilterRemove={this.props.onFilterRemove}
        displayAsHovered={this.state.hoverRemoveAll}
      />
    ) : null;
  }

  extractProductTypes() {
    let out;

    if (
      this.props.filterObj.hasOwnProperty("product_type_ids") &&
      this.props.filterObj.product_type_ids.length > 0
    ) {
      out = [].concat(
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
              displayAsHovered={this.state.hoverRemoveAll}
            />
          ))
      );
      if (this.props.asPhrase) {
        out = this.sentencize(out, "ou");
      }
      // out.unshift(" de type ");
    }

    return out;
  }

  extractStyles() {
    let out;

    if (
      this.props.filterObj.hasOwnProperty("style_ids") &&
      this.props.filterObj.style_ids.length > 0
    ) {
      out = [].concat(
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
              displayAsHovered={this.state.hoverRemoveAll}
            />
          ))
      );
      if (this.props.asPhrase) {
        out = this.sentencize(out, "ou");
        out.unshift(" de style ");
      }
    }

    return out;
  }

  extractProductionOrigins() {
    let out;

    if (
      this.props.filterObj.hasOwnProperty("production_origin_ids") &&
      this.props.filterObj.production_origin_ids.length > 0
    ) {
      out = [].concat(
        this.state.productionOrigins
          .filter(s =>
            this.props.filterObj.production_origin_ids.includes(s.id)
          )
          .map(s => (
            <Criterion
              type="production_origin"
              paramName="production_origin_ids"
              label={s.name.charAt(0) === "A" ? "l’" + s.name : "la " + s.name}
              id={s.id}
              key={"production_origin_" + s.id}
              onFilterRemove={this.props.onFilterRemove}
              displayAsHovered={this.state.hoverRemoveAll}
            />
          ))
      );
      if (this.props.asPhrase) {
        out = this.sentencize(out, "ou de");
        out.unshift(" de ");
      }
    }

    return out;
  }

  extractMaterials() {
    let out;

    if (
      this.props.filterObj.hasOwnProperty("material_ids") &&
      this.props.filterObj.material_ids.length > 0
    ) {
      out = [].concat(
        this.state.flatMaterials
          .filter(s => this.props.filterObj.material_ids.includes(s.id))
          .map(s => (
            <Criterion
              type="material"
              paramName="material_ids"
              label={s.name.toLowerCase()}
              id={s.id}
              key={"material_" + s.id}
              onFilterRemove={this.props.onFilterRemove}
              displayAsHovered={this.state.hoverRemoveAll}
            />
          ))
      );
      if (this.props.asPhrase) {
        out = this.sentencize(out, "ou en");
        out.unshift(" en ");
      }
    }

    return out;
  }

  extractAuthors() {
    let out;

    if (
      this.props.filterObj.hasOwnProperty("author_ids") &&
      this.props.filterObj.author_ids.length > 0
    ) {
      out = this.state.authors
        .filter(a => this.props.filterObj.author_ids.includes(a.id))
        .map(a => (
          <Criterion
            type="author"
            paramName="author_ids"
            label={[a.first_name, a.last_name].filter(Boolean).join(" ")}
            id={a.id}
            key={"author_" + a.id}
            onFilterRemove={this.props.onFilterRemove}
            displayAsHovered={this.state.hoverRemoveAll}
          />
        ));

      if (this.props.asPhrase) {
        out = this.sentencize(out, "ou");
        out.unshift(" par ");
      }
    }

    return out;
  }

  extractPeriod() {
    let out;
    if (
      this.props.filterObj.hasOwnProperty("period_start_year") &&
      this.props.filterObj.hasOwnProperty("period_end_year")
    ) {
      out = [];
      if (this.props.asPhrase) {
        out.push("entre ");
      }
      out.push(
        <Criterion
          type="period"
          paramName="period_start_year"
          label={
            (this.props.asPhrase ? "" : "entre ") +
            this.props.filterObj.period_start_year +
            " et " +
            this.props.filterObj.period_end_year
          }
          id={this.props.filterObj.period_start_year}
          key={"period"}
          onFilterRemove={this.props.onFilterRemove}
          displayAsHovered={this.state.hoverRemoveAll}
        />
      );
    }
    return out;
  }

  extractDimension(dim) {
    let out;
    let first = "";
    const dims = {
      height_or_thickness: "hauteur",
      depth_or_width: "largeur",
      length_or_diameter: "longeur"
    };
    if (
      this.props.filterObj.hasOwnProperty(dim + "_lte") ||
      this.props.filterObj.hasOwnProperty(dim + "_gte")
    ) {
      out = out || [];
      if (this.props.asPhrase) {
        out.push("entre ");
      }
      const min = (this.props.filterObj[dim + "_gte"] || 0).toLocaleString();
      const max = (this.props.filterObj[dim + "_lte"] || 0).toLocaleString();
      const prepend = this.props.asPhrase ? "" : "entre ";
      const append = this.props.asPhrase ? "" : " de " + dims[dim];
      const unit = String.fromCharCode(160) + "m";
      out.push(
        <Criterion
          type="dimension"
          paramName={dim + "_gte"}
          label={prepend + min + " et " + max + unit + append}
          id={this.props.filterObj[dim + "_gte"]}
          key={dim}
          onFilterRemove={this.props.onFilterRemove}
          displayAsHovered={this.state.hoverRemoveAll}
        />
      );
      if (this.props.asPhrase) {
        out.push(" de " + dims[dim]);
      }
    }
    return out;
  }

  sentencize(arr, op) {
    let last = null;
    if (arr.length === 2) {
      arr.splice(1, 0, " " + op + " ");
    } else if (arr.length > 2) {
      last = arr.pop();
      arr = arr.reduce((r, a, idx) => r.concat(a, ", "), []);
      arr.push(" " + op + " ");
      arr.push(last);
    }
    return arr;
  }

  sentencizeGroups(arr, op) {
    let last = null;
    if (arr.length === 2) {
      if (
        arr[1] &&
        arr[1][0] &&
        typeof arr[1][0] === "string" &&
        arr[1][0].match(/.*(entre|de|par|en).*/)
      ) {
        arr.splice(1, 0, " ");
      } else {
        arr.splice(1, 0, " et ");
      }
    } else if (arr.length > 2) {
      last = arr.pop();
      arr = arr.reduce((r, a, idx) => r.concat(a, ", "), []);
      arr.push(" " + op + " ");
      arr.push(last);
    }
    return arr;
  }

  allCriteria() {
    let paramsArr = compact([
      this.extractQueryString(),
      this.extractProductTypes(),
      this.extractStyles(),
      this.extractMaterials(),
      this.extractProductionOrigins(),
      this.extractAuthors(),
      this.extractPeriod(),
      this.extractDimension("height_or_thickness"),
      this.extractDimension("depth_or_width"),
      this.extractDimension("length_or_diameter")
    ]);
    let out = this.props.asPhrase
      ? this.sentencizeGroups(paramsArr, "et")
      : paramsArr.reduce((r, a, idx) => r.concat(a, " "), []);
    if (
      out.length > 0 &&
      !this.props.filterObj.hasOwnProperty("product_type_ids") &&
      !this.props.filterObj.hasOwnProperty("q") &&
      this.props.asPhrase
    ) {
      out.unshift("Objets ");
    }
    return out;
  }

  handleRemoveAll() {
    this.props.onFilterRemoveAll();
    this.setState({ hoverRemoveAll: false });
  }

  renderResetButton() {
    return (
      <button
        className="CriteriaPhrase__reset-button"
        onClick={this.handleRemoveAll}
        onMouseEnter={() => this.setState({ hoverRemoveAll: true })}
        onMouseLeave={() => this.setState({ hoverRemoveAll: false })}
      >
        <Cross />
      </button>
    );
  }

  render() {
    const numberOfActiveCriteria =
      (this.props.filterObj &&
        Object.keys(this.props.filterObj).reduce(
          (r, k) => r.concat(this.props.filterObj[k]),
          []
        ).length) ||
      0;
    return (
      <div className="CriteriaPhrase" ref={this.criteriaPhraseRef}>
        {this.allCriteria()}
        {this.props.asPhrase && (
          <span>
            {" "}
            dans la collection du <strong>Mobilier national</strong>
            <span className="CriteriaPhrase__whitespace">
              {String.fromCharCode(8194)}
            </span>
            {numberOfActiveCriteria > 1 ? this.renderResetButton() : null}
          </span>
        )}
      </div>
    );
  }
}

export default CriteriaPhrase;
