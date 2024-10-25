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

const CustomManager = (fn) => {
  // Enviamos por fn la referencia de la función
  let events = [];
  let executing = false;
  // Retornamos un asycn, no importa el valor que retorne
  return async (...args) => {
    // guardamos las referencias y los argumentos pasados como referencia
    events.push(() => fn(...args));

    if (!executing) {
      executing = true;
      // Se detendrá hasta ejecutar todo el array con las funciones
      while (events.length) {
        // remueve el primero elemento del array y lo retorna, lo ejecutamos ya qué es una funcion anonima
        await events.shift()();
      }
      executing = false;
    }
  };
};
