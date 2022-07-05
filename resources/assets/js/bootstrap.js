import "react-hot-loader";
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import "focus-visible";
import * as Sentry from "@sentry/browser";
import Bricks from "bricks.js";
import { setupDialogs } from "./dialogs.js";

setupDialogs();

/**
 * Expose a global instance of Bricks,
 * so we can use it outside of React.
 */
window.Bricks = Bricks;

if (process.env.MIX_SENTRY_ENV != "local") {
  Sentry.init({
    dsn: "https://7995837ee4464e6589efb4ebdb9ea6b8@sentry.io/1725163",
    environment: process.env.MIX_SENTRY_ENV
  });
}

if (document.getElementById("root")) {
  ReactDOM.render(<AppRouter />, document.getElementById("root"));
}
