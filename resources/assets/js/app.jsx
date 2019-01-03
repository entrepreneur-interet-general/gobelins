import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Collection from "./Collection/Collection";
import Detail from "./Detail/Detail";

function App() {
  return (
    <Router>
      <div>
        <ul
          style={{
            position: "fixed",
            right: 0,
            top: 0,
            zIndex: 999999,
            backgroundColor: "pink",
            padding: "15px"
          }}
        >
          <li>
            <Link to="/recherche">Recherche</Link>
          </li>
          <li>
            <Link to="/objet/GMT-14189-000">Un Objet</Link>
          </li>
          <li>
            <Link to="/savoir-faire">Les savoir-faire</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/recherche" component={Collection} />
          <Route exact path="/objet/:inventory_id" component={DetailWrapper} />
          <Route path="/savoir-faire" component={SavoirFaire} />
        </Switch>
      </div>
    </Router>
  );
}

function DetailWrapper() {
  return (
    <Detail
    //   product={this.state.productDetail}
    //   onBackToCollection={this.handleBackToCollection}
    />
  );
}
function SavoirFaire() {
  return <div>Savoir faires</div>;
}

export default App;
