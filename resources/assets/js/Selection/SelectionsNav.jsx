import React from "react";
import { Link } from "react-router-dom";

import StackHeart from "../icons/StackHeart";

export default function SelectionsNav(props) {
  return (
    <Link to="/selections/" className="SelectionsNav">
      <span className="SelectionsNav__label">explorer les sélections</span>
      <span className="SelectionsNav__icon">
        <StackHeart />
      </span>
    </Link>
  );
}
