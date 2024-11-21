/**
 * Función para realizar una solicitud HTTP utilizando Fetch API.
 * 
 * @param {string} url - La URL a la que se enviará la solicitud.
 * @param {string} [method="GET"] - El método HTTP (GET, POST, PUT, etc.).
 * @param {Object|FormData} [data] - Los datos a enviar con la solicitud. Pueden ser datos en formato JSON o un objeto FormData para solicitudes tipo POST/PUT.
 * @returns {Promise<Object>} Una promesa que se resuelve con la respuesta en formato JSON o se rechaza con un error.
 */
const FetchData = (url, method = "GET", data) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: method,
      headers: {},
    };

    // Si el método es GET y hay datos, los convierte en parámetros de consulta
    if (method === "GET" && data) {
      options.headers["Content-Type"] = "application/json";
      const params = new URLSearchParams(data).toString();
      url += `?${params}`; // Agrega los parámetros de consulta a la URL
    } 
    // Si el método es POST o PUT, maneja los datos dependiendo de su tipo
    else if ((method === "POST" || method === "PUT") && data) {
      if (data instanceof FormData) {
        options.headers = {}; // FormData no necesita un Content-Type específico
        options.body = data;  // Asigna el cuerpo de la solicitud con los datos de FormData
      } else {
        options.headers["Content-Type"] = "application/json"; // Define el Content-Type para JSON
        options.body = JSON.stringify(data); // Convierte los datos en un JSON
      }
    }

    // Realiza la solicitud utilizando Fetch API
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          // Si la respuesta no es exitosa, rechaza con un mensaje de error
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json(); // Convierte la respuesta a JSON
      })
      .then((data) => resolve(data)) // Resuelve la promesa con los datos obtenidos
      .catch((error) => reject(error)); // Rechaza la promesa si ocurre un error
  });
};
