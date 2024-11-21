const FetchData = (url, method = "GET", data) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      headers: {},
    };
    if (method === "GET" && data) {
      options.headers["Content-Type"] = "application/json";
      const params = new URLSearchParams(data).toString();
      url += `?${params}`;
    } else if ((method === "POST" || method === "PUT") && data) {
      if (data instanceof FormData) {
        options.headers = {};
        options.body = data;
      } else {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
      }
    } else {
    }
    fetch(url, options)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};