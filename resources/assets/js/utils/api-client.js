import qs from "qs";

function client(endpoint, { body, ...customConfig } = {}) {
  const token = window.localStorage.getItem("__auth_token__");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-CSRF-TOKEN": document.head.querySelector('meta[name="csrf-token"]')
      .content
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const config = {
    method: body ? "POST" : "GET",
    credentials: "include",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };
  if (body) {
    switch (config.headers["Content-Type"]) {
      case "application/json":
        config.body = JSON.stringify(body);
        break;
      case "application/x-www-form-urlencoded":
        config.body = qs.stringify(body);
        break;
    }
  }

  const url = endpoint.startsWith("http") ? endpoint : `/${endpoint}`;

  return window.fetch(url, config).then(response => {
    return response.json().then(json => {
      if (response.ok) {
        return Promise.resolve(json);
      }
      return Promise.reject(json);
    });
  });
}

export default client;
