// Paso 3 - Refactorizamos el Paso 1 pero ahora con la utilización de Axios

import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts", { params: { userId: 1 } })
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error al obtener posts:", error));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Posts del usuario 1 (con Axios)</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {posts.map((post) => (
          <div className="col" key={post.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
              </div>
              <div className="card-footer d-flex justify-content-end gap-2">
                <button className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-pencil"></i> Editar
                </button>
                <button className="btn btn-outline-danger btn-sm">
                  <i className="bi bi-trash3"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}