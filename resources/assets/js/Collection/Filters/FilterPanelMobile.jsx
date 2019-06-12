import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";

import CrossLarge from "../../icons/CrossLarge";
import ProductTypesMobile from "./ProductTypesMobile";
import MaterialsMobile from "./MaterialsMobile";
import ProductionOriginsMobile from "./ProductionOriginsMobile";
import AuthorsMobile from "./AuthorsMobile";
import StylesMobile from "./StylesMobile";
import DimensionsMobile from "./DimensionsMobile";
import PeriodsMobile from "./PeriodsMobile";

class FilterPanelMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiblePanel: null
    };
    this.openPanel = this.openPanel.bind(this);
    this.handleBackToFiltersList = this.handleBackToFiltersList.bind(this);
  }
  componentDidMount() {
    document.documentElement.classList.add("prevent-scroll");
  }
  componentWillUnmount() {
    document.documentElement.classList.remove("prevent-scroll");
  }

  openPanel(panel, ev) {
    this.setState({ visiblePanel: panel });
  }

  handleBackToFiltersList() {
    this.setState({ visiblePanel: null });
  }

  handleOverlayClick = () => {
    // No results? Reset all filters!
    if (this.props.totalHits === 0) {
      this.props.onFilterRemoveAll();
    }
    this.props.onCloseFilterPanel();
  };

  countActiveParams = paramName => {
    if (
      this.props.filterObj.hasOwnProperty(paramName) &&
      Array.isArray(this.props.filterObj[paramName])
    ) {
      return (
        <React.Fragment>
          {String.fromCharCode(160) + "(" + String.fromCharCode(8239)}
          {this.props.filterObj[paramName].length}
          {String.fromCharCode(8239) + ")"}
        </React.Fragment>
      );
    }
  };

  currentPeriod = () => {
    return (
      this.props.filterObj.hasOwnProperty("period_start_year") &&
      this.props.filterObj.hasOwnProperty("period_end_year") && (
        <React.Fragment>
          {String.fromCharCode(160) + "(" + String.fromCharCode(8239)}
          {this.props.filterObj.period_start_year +
            "—" +
            this.props.filterObj.period_end_year}
          {String.fromCharCode(8239) + ")"}
        </React.Fragment>
      )
    );
  };

  currentDimensions = () => {
    let count = 0;
    if (this.props.filterObj.hasOwnProperty("depth_or_width_lte")) count++;
    if (this.props.filterObj.hasOwnProperty("height_or_thickness_lte")) count++;
    if (this.props.filterObj.hasOwnProperty("length_or_diameter_lte")) count++;
    return (
      count > 0 && (
        <React.Fragment>
          {String.fromCharCode(160) + "(" + String.fromCharCode(8239)}
          {count}
          {String.fromCharCode(8239) + ")"}
        </React.Fragment>
      )
    );
  };

  render() {
    return (
      <div className="FilterPanelMobile">
        <div
          className="FilterPanelMobile__overlay"
          onClick={this.handleOverlayClick}
        >
          {this.props.overlayContent}
        </div>
        <div className="FilterPanelMobile__rootcolumn">
          <CSSTransitionGroup
            transitionName="FilterPanelMobile__list"
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
          >
            {this.state.visiblePanel === null ? (
              <div className="Filters__list-container">
                {<CloseButton onClose={this.props.onCloseFilterPanel} />}
                <div className="Filters__list-label">Filtrer par :</div>
                <ul>
                  <li>
                    <button
                      className="is-product_type is-open"
                      onClick={ev => this.openPanel("ProductTypes", ev)}
                    >
                      Type d’objet
                      {this.countActiveParams("product_type_ids")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="is-author is-open"
                      onClick={ev => this.openPanel("Authors", ev)}
                    >
                      Auteur
                      {this.countActiveParams("author_ids")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="is-period is-open"
                      onClick={ev => this.openPanel("Periods", ev)}
                    >
                      Époque
                      {this.currentPeriod()}
                    </button>
                  </li>
                  <li>
                    <button
                      className="is-style is-open"
                      onClick={ev => this.openPanel("Styles", ev)}
                    >
                      Style
                      {this.countActiveParams("style_ids")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="is-production_origin is-open"
                      onClick={ev => this.openPanel("ProductionOrigins", ev)}
                    >
                      Manufacture et atelier
                      {this.countActiveParams("production_origin_ids")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="is-material is-open"
                      onClick={ev => this.openPanel("Materials", ev)}
                    >
                      Matière
                      {this.countActiveParams("material_ids")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="is-dimension is-open"
                      onClick={ev => this.openPanel("Dimensions", ev)}
                    >
                      Dimension
                      {this.currentDimensions()}
                    </button>
                  </li>
                </ul>
              </div>
            ) : null}
          </CSSTransitionGroup>

          <CSSTransitionGroup
            transitionName="FilterPanelMobile__sliding"
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
          >
            {this.state.visiblePanel === "ProductTypes" ? (
              <ProductTypesMobile
                onBackToFiltersList={this.handleBackToFiltersList}
                onFilterAdd={this.props.onFilterAdd}
                onFilterChange={this.props.onFilterChange}
                onFilterRemove={this.props.onFilterRemove}
                selectedIds={this.props.filterObj.product_type_ids || []}
                closeButton={
                  <CloseButton onClose={this.props.onCloseFilterPanel} />
                }
              />
            ) : null}
            {this.state.visiblePanel === "Materials" ? (
              <MaterialsMobile
                onBackToFiltersList={this.handleBackToFiltersList}
                onFilterAdd={this.props.onFilterAdd}
                onFilterChange={this.props.onFilterChange}
                onFilterRemove={this.props.onFilterRemove}
                selectedIds={this.props.filterObj.material_ids || []}
                closeButton={
                  <CloseButton onClose={this.props.onCloseFilterPanel} />
                }
              />
            ) : null}
            {this.state.visiblePanel === "ProductionOrigins" ? (
              <ProductionOriginsMobile
                onBackToFiltersList={this.handleBackToFiltersList}
                onFilterAdd={this.props.onFilterAdd}
                onFilterChange={this.props.onFilterChange}
                onFilterRemove={this.props.onFilterRemove}
                selectedIds={this.props.filterObj.production_origin_ids || []}
                closeButton={
                  <CloseButton onClose={this.props.onCloseFilterPanel} />
                }
              />
            ) : null}
            {this.state.visiblePanel === "Authors" ? (
              <AuthorsMobile
                onBackToFiltersList={this.handleBackToFiltersList}
                onFilterAdd={this.props.onFilterAdd}
                onFilterChange={this.props.onFilterChange}
                onFilterRemove={this.props.onFilterRemove}
                selectedIds={this.props.filterObj.author_ids || []}
                closeButton={
                  <CloseButton onClose={this.props.onCloseFilterPanel} />
                }
              />
            ) : null}
            {this.state.visiblePanel === "Styles" ? (
              <StylesMobile
                onBackToFiltersList={this.handleBackToFiltersList}
                onFilterAdd={this.props.onFilterAdd}
                onFilterChange={this.props.onFilterChange}
                onFilterRemove={this.props.onFilterRemove}
                selectedIds={this.props.filterObj.styles_ids || []}
                closeButton={
                  <CloseButton onClose={this.props.onCloseFilterPanel} />
                }
              />
            ) : null}
            {this.state.visiblePanel === "Dimensions" ? (
              <DimensionsMobile
                onBackToFiltersList={this.handleBackToFiltersList}
                onFilterAdd={this.props.onFilterAdd}
                onFilterChange={this.props.onFilterChange}
                onFilterRemove={this.props.onFilterRemove}
                selectedIds={this.props.filterObj.styles_ids || []}
                closeButton={
                  <CloseButton onClose={this.props.onCloseFilterPanel} />
                }
                {...this.props.filterObj}
              />
            ) : null}
            {this.state.visiblePanel === "Periods" ? (
              <PeriodsMobile
                onBackToFiltersList={this.handleBackToFiltersList}
                onFilterAdd={this.props.onFilterAdd}
                onFilterChange={this.props.onFilterChange}
                onFilterRemove={this.props.onFilterRemove}
                selectedIds={this.props.filterObj.styles_ids || []}
                closeButton={
                  <CloseButton onClose={this.props.onCloseFilterPanel} />
                }
                {...this.props.filterObj}
              />
            ) : null}
          </CSSTransitionGroup>
        </div>
      </div>
    );
  }
}

const CloseButton = props => (
  <button
    type="button"
    className="FilterPanelMobile__close"
    onClick={props.onClose}
  >
    <CrossLarge />
  </button>
);

export default FilterPanelMobile;
