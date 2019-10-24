import React, { useState, useEffect } from "react";
import { useSelections } from "../context/selections-context";
import Loader from "../Loader";
import SelectionDetail from "./SelectionDetail";

export default function SelectionDetailPage(props) {
  let selectionsContext = useSelections();
  const selection_id = parseInt(props.match.params.selection_id, 10);
  const should_reload =
    !selectionsContext.detailSelection ||
    selectionsContext.detailSelection.id !== selection_id;

  useEffect(() => {
    if (!selectionsContext.loadingDetail && should_reload) {
      selectionsContext.fetchDetail(selection_id);
    }
  }, []);

  return selectionsContext.loadingDetail || should_reload ? (
    <Loader className="SelectionDetail__loader" />
  ) : (
    <SelectionDetail {...props} />
  );
}
