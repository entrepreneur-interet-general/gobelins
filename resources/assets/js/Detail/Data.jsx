import React from "react";
import nl2br from "react-nl2br";
import { Media } from "react-breakpoints";

function DataUnitTemplate(props) {
  return (
    <div className="DetailData__unit">
      <span className="DetailData__label">{props.label}</span>
      <span className="DetailData__datum">{props.value}</span>
    </div>
  );
}

function InventoryId(props) {
  return props.inventoryId ? (
    <DataUnitTemplate label="Numéro d’inventaire" value={props.inventoryId} />
  ) : null;
}

function Authors(props) {
  const label_singular = "Auteur";
  const label_plural = "Auteurs";
  if (
    props.authors &&
    props.authors instanceof Array &&
    props.authors.length > 0
  ) {
    const label = props.authors.length > 1 ? label_plural : label_singular;
    return (
      <DataUnitTemplate
        label={label}
        value={props.authors
          .map(a => [a.first_name, a.last_name].join(" "))
          .join(", ")}
      />
    );
  } else {
    return null;
  }
}

function ConceptionYear(props) {
  return props.conceptionYear ? (
    <DataUnitTemplate
      label="Année de conception"
      value={props.conceptionYear}
    />
  ) : null;
}

function Style(props) {
  return props.style && props.style.name ? (
    <DataUnitTemplate label="Style" value={props.style.name} />
  ) : null;
}

function Types(props) {
  const label_singular = "Type";
  const label_plural = "Types";
  if (props.types && props.types instanceof Array && props.types.length > 0) {
    const label = props.types.length > 1 ? label_plural : label_singular;
    const val = props.types
      .filter(t => t.is_leaf)[0]
      .mapping_key.replace(/ > /g, ", ");
    return <DataUnitTemplate label={label} value={val} />;
  } else {
    return null;
  }
}

function Period(props) {
  return props.period && props.period.name ? (
    <DataUnitTemplate label="Époque de conception" value={props.period.name} />
  ) : null;
}

function Materials(props) {
  const label_singular = "Matière";
  const label_plural = "Matières";
  if (
    props.materials &&
    props.materials instanceof Array &&
    props.materials.length > 0
  ) {
    const label = props.materials.length > 1 ? label_plural : label_singular;
    return (
      <DataUnitTemplate
        label={label}
        value={props.materials.map(m => m.name).join(", ")}
      />
    );
  } else {
    return null;
  }
}

function ProductionOrigin(props) {
  return props.productionOrigin && props.productionOrigin.name ? (
    <DataUnitTemplate
      label="Lieu de production"
      value={props.productionOrigin.name}
    />
  ) : null;
}

/* By default, values are in meters. */
function Dimensions(props) {
  const has_dims = props.l || props.w || props.h; // values can be null!
  let dims = [
    parseFloat(props.l || 0),
    parseFloat(props.w || 0),
    parseFloat(props.h || 0)
  ];
  const is_small = has_dims && dims.filter(d => d > 0 && d < 1).length > 0;
  dims = is_small
    ? dims
        .map(d => parseFloat((d * 100).toFixed(2)))
        .map(d => (Number.isInteger(d) ? parseInt(d) : d))
    : dims;
  const unit = is_small ? "cm" : "m";
  return has_dims ? (
    <DataUnitTemplate
      label="Dimensions (L × l × h)"
      value={
        dims.map(d => d.toString().replace(".", ",")).join(" × ") + " " + unit
      }
    />
  ) : null;
}

function Acquisition(props) {
  const acquisitionDate = props.acquisitionDate
    ? new Date(props.acquisitionDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    : null;
  return props.acquisitionOrigin ||
    props.acquisitionDate ||
    props.acquisitionMode ? (
    <DataUnitTemplate
      label="Acquisition"
      value={[acquisitionDate, props.acquisitionMode, props.acquisitionOrigin]
        .filter(Boolean)
        .join(" – ")}
    />
  ) : null;
}

function LegacyInventoryNumber(props) {
  return props.legacyInventoryNumber ? (
    <DataUnitTemplate
      label="Ancien numéro d’inventaire"
      value={nl2br(props.legacyInventoryNumber)}
    />
  ) : null;
}

function Photographer(props) {
  const label =
    props.mainImage && props.mainImage.photographer
      ? "Photographie © " + props.mainImage.photographer
      : "Photographie © Mobilier national, droits réservés";
  return <DataUnitTemplate label={label} value="" />;
}

function Data(props) {
  return (
    <section className="DetailData">
      <Media>
        {({ breakpoints, currentBreakpoint }) =>
          breakpoints[currentBreakpoint] >= 768 &&
          breakpoints[currentBreakpoint] < 1024 &&
          props.title
        }
      </Media>
      <div className="DetailData__columns">
        <InventoryId inventoryId={props.product.inventory_id} />
        <Authors authors={props.product.authors} />
        <ConceptionYear conceptionYear={props.product.conception_year} />
        <Style style={props.product.style} />
        <Types types={props.product.product_types} />
        <Period
          period={{
            name: props.product.period_name,
            startYear: props.product.period_start_year,
            endYear: props.product.period_end_year
          }}
        />
        <Materials materials={props.product.materials} />
        <ProductionOrigin productionOrigin={props.product.production_origin} />
        <Dimensions
          l={props.product.length_or_diameter}
          w={props.product.depth_or_width}
          h={props.product.height_or_thickness}
        />
        <Acquisition
          acquisitionDate={props.product.acquisition_date}
          acquisitionOrigin={props.product.acquisition_origin}
          acquisitionMode={props.product.acquisition_mode}
        />
        <LegacyInventoryNumber
          legacyInventoryNumber={props.product.legacy_inventory_number}
        />
        <Photographer mainImage={props.mainImage} />
      </div>
    </section>
  );
}

export default Data;
