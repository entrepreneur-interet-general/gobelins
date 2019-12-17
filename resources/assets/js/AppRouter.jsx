import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ScrollMemory from "react-router-scroll-memory";

import App from "./App";

export default function AppRouter() {
  return (
    <Router>
      <>
        <ScrollMemory />
        <App />
      </>
    </Router>
  );
}
