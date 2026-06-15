// Paso 1 - App con get de posts usando fetch
import React, { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts?userId=1";

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la carga de datos");
        return res.json();
      })
      .then(setPosts)
      .catch((err) => console.error("Error al obtener posts:", err));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Posts del usuario 1</h2>
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
