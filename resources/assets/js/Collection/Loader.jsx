import React from "react";

const Loader = props => (
  <div className={"Spinner__pgloading " + props.className}>
    <div className="Spinner__loadingwrap">
      <ul className="Spinner__bokeh">
        <li key="1" />
        <li key="2" />
        <li key="3" />
        <li key="4" />
      </ul>
    </div>
  </div>
);

export default Loader;
