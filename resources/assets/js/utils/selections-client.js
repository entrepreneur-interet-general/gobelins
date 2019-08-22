import client from "./api-client";

function fetchAll() {
  return client("api/selections");
}

function fetchMine() {
  return client("api/selections/mine");
}

function create(product_ids, selection) {
  return client("api/selections", {
    method: "POST",
    body: { selection, product_ids }
  });
}

function add(product_id, selection_id) {
  return client(`api/selections/${selection_id}/add/${product_id}`);
}

export { fetchAll, fetchMine, add, create };
