// Inicialización del entorno Axios
// Este archivo es al frontend lo que db.js es al backend

import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

// Interceptor de respuesta global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("[InterceptorLog]Error de red o sin respuesta del servidor:", error);
    } else {
      console.warn(`[InterceptorLog]Error ${error.response.status}: ${error.response.statusText}`);
    }
    return Promise.reject(error);
  }
);