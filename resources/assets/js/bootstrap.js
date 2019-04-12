import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import "focus-visible";

if (document.getElementById("root")) {
  ReactDOM.render(<AppRouter />, document.getElementById("root"));
}
