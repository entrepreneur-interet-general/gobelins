function client(endpoint, { body, ...customConfig } = {}) {
  const token = window.localStorage.getItem("__auth_token__");
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
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
        const data = new URLSearchParams();
        Object.entries(body).map(([k, v]) => data.append(k, v));
        config.body = data.toString();
        break;
    }
  }

  return window.fetch(`/${endpoint}`, config).then(response => {
    return response.json().then(json => {
      if (response.ok) {
        return Promise.resolve(json);
      }
      return Promise.reject(json);
    });
  });
}

export default client;
