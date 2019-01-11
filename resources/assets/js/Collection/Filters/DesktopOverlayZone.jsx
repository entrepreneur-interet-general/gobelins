import React from "react";

const DesktopOverlayZone = props => (
  <div
    className="DesktopOverlayZone"
    style={{
      left: props.offsetLeft,
      width: `calc(100vw - ${props.filterPanelsWidth}px)`
    }}
  >
    <div className="DesktopOverlayZone__inner">{props.children}</div>
  </div>
);

export default DesktopOverlayZone;
