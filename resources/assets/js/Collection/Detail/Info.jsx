import React from "react";
import nl2br from "react-nl2br";

function InfoUnitTemplate(props) {
  return (
    <div className="DetailInfo__unit">
      <span className="DetailInfo__label">{props.label}</span>
      <span className="DetailInfo__datum">{props.value}</span>
    </div>
  );
}

function Description(props) {
  return props.description ? (
    <InfoUnitTemplate label="Description" value={nl2br(props.description)} />
  ) : null;
}

function Bibliography(props) {
  return props.bibliography ? (
    <InfoUnitTemplate label="Bibliographie" value={nl2br(props.bibliography)} />
  ) : null;
}

function Info(props) {
  return (
    <section className="DetailInfo">
      <Description description={props.product.description} />
      <Bibliography bibliography={props.product.bibliography} />
    </section>
  );
}

export default Info;
