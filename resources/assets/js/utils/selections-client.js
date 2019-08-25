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

function remove(inventory_id, selection_id) {
  return client(`api/selections/${selection_id}/products/${inventory_id}`, {
    method: "DELETE"
  });
}

function update(selection) {
  return client(`api/selections/${selection.id}`, {
    method: "PATCH",
    body: { ...selection }
  });
}

function destroy(selection) {
  return client(`api/selections/${selection.id}`, {
    method: "DELETE"
  });
}

export { fetchAll, fetchMine, add, create, remove, update, destroy };
