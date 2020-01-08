import { hot } from "react-hot-loader/root";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollMemory from "react-router-scroll-memory";

import App from "./App";

function AppRouter() {
  return (
    <Router>
      <>
        <ScrollMemory />
        <App />
      </>
    </Router>
  );
}

export default hot(AppRouter);
