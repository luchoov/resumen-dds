// Inicialización del entorno Axios
// Este archivo es al frontend lo que db.js es al backend

import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});