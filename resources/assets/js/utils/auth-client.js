import client from "./api-client";

const localStorageKey = "__auth_token__";

function setToken(token) {
  if (token) {
    window.localStorage.setItem(localStorageKey, token);
  } else {
    window.localStorage.removeItem(localStorageKey);
  }
}

function handleUserResponse(data) {
  setToken(data.token);
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

function updateMyself({ name, email, password, newPassword }) {
  return client("api/user/me", {
    method: "PATCH",
    body: { name, email, password, newPassword }
  });
}

function destroy() {
  return client(`api/user/me`, {
    method: "DELETE"
  });
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
  return client("api/user/me");
}

function resetPassword({ email, csrfToken }) {
  return client("password/email", {
    method: "POST",
    body: { _token: csrfToken, email }
  });
}

function getToken() {
  return window.localStorage && window.localStorage.getItem(localStorageKey);
}

export {
  login,
  register,
  logout,
  getToken,
  setToken,
  getProfile,
  updateMyself,
  destroy,
  resetPassword
};
