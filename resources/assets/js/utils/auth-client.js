import client from "./api-client";

const localStorageKey = "__auth_token__";

function handleUserResponse(data) {
  window.localStorage.setItem(localStorageKey, data.token);
  return data.user;
}

function login({ email, password, csrfToken }) {
  return client("login", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: { email, password, _token: csrfToken }
  }).then(handleUserResponse);
}

function register({ name, email, password, csrfToken }) {
  return client("register", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: { name, email, password, _token: csrfToken }
  }).then(handleUserResponse);
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
  return Promise.resolve();
}

function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

export { login, register, logout, getToken };
