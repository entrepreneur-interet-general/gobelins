import React from "react";
import { Link } from "react-router-dom";

import StackHeart from "../icons/StackHeart";

export default function SelectionsNav(props) {
  return (
    <Link to="/selections/" className="SelectionsNav">
      <StackHeart />
    </Link>
  );
}
