import client from "./api-client";

function fetchMine() {
  return client("api/selections/mine");
}

function fetchMobNat() {
  return client("api/selections/mobnat");
}

function fetchUser() {
  return client("api/selections/user");
}

function fetchMineShort() {
  return client("api/selections/mine-short");
}

function fetchDetail(id) {
  return client(`api/selections/${id}`);
}

function fetchMore(url) {
  return client(url);
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

function create_invitation(email, selection) {
  return client(`api/selections/${selection.id}/invitations`, {
    method: "POST",
    body: { email }
  });
}

function destroy_invitation(invitation, selection) {
  return client(`api/selections/${selection.id}/invitations/${invitation.id}`, {
    method: "DELETE"
  });
}

function destroy_collaboration(user, selection) {
  return client(`api/selections/${selection.id}/users/${user.id}`, {
    method: "DELETE"
  });
}

export {
  fetchMine,
  fetchMobNat,
  fetchUser,
  fetchMineShort,
  fetchDetail,
  fetchMore,
  add,
  create,
  remove,
  update,
  destroy,
  create_invitation,
  destroy_invitation,
  destroy_collaboration
};
