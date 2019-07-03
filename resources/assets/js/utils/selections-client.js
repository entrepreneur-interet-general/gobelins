import client from "./api-client";

function list() {
  return client("api/selections");
}

function create(selection) {}

function add(product_id, selection_id) {
  return client(`api/selections/${selection_id}/add/${product_id}`);
}

export { list, add, create };
