import client from "./api-client";

const localStorageKey = "__auth_token__";

function handleUserResponse(data) {
  window.localStorage.setItem(localStorageKey, data.token);
  return data;
}

function refreshCSRFToken(data) {
  document.head.querySelector('meta[name="csrf-token"]').content =
    data.csrfToken;
  return data;
}

function login({ email, password, csrfToken }) {
  return client("login", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: { email, password, _token: csrfToken }
  })
    .then(refreshCSRFToken)
    .then(handleUserResponse);
}

function register({ name, email, password, csrfToken }) {
  return client("register", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: { name, email, password, _token: csrfToken }
  }).then(handleUserResponse);
}

function logout({ csrfToken }) {
  window.localStorage.removeItem(localStorageKey);
  return client("logout", {
    method: "POST",
    credentials: "include",
    mode: "same-origin",
    body: { _token: csrfToken }
  }).then(refreshCSRFToken);
  // return Promise.resolve();
}

function getProfile() {
  return client("api/user/profile");
}

function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

export { login, register, logout, getToken, getProfile };
