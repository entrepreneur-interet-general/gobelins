import React from "react";

export function Handle({ handle: { id, value, percent }, getHandleProps }) {
  return (
    <div
      className="Periods__slider-handle"
      style={{
        top: `${percent}%`
      }}
      {...getHandleProps(id)}
    >
      <div className="Periods__slider-handle-dot" />
      <div className="Periods__slider-handle-label">{value}</div>
    </div>
  );
}

export function Track({ source, target, getTrackProps }) {
  return (
    <div
      className="Periods__slider-track"
      style={{
        top: `${source.percent}%`,
        height: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()}
    />
  );
}

// export function Tick({ tick, format }) {
//   return (
//     <div>
//       <div
//         style={{
//           position: "absolute",
//           marginTop: -0.5,
//           marginLeft: 10,
//           height: 1,
//           width: 6,
//           backgroundColor: "rgb(200,200,200)",
//           top: `${tick.percent}%`
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           marginTop: -5,
//           marginLeft: 20,
//           fontSize: 10,
//           top: `${tick.percent}%`
//         }}
//       >
//         {format(tick.value)}
//       </div>
//     </div>
//   );
// }
