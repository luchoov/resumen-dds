// Paso 2 - App con ABM de posts usando fetch
import React, { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com";
const RESOURCE = "/posts";
const USER_ID = 1;

export default function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}${RESOURCE}?userId=${USER_ID}`)
      .then((res) => res.json())
      .then(setPosts)
      .catch((err) => console.error("Error al obtener posts:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}${RESOURCE}/${editId}` : API_URL;
    const payload = { ...form, userId: USER_ID };

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        if (editId) {
          setPosts(posts.map((p) => (p.id === editId ? data : p)));
        } else {
          setPosts([...posts, { ...data, id: posts.length + 101 }]);
        }
        setForm({ title: "", body: "" });
        setEditId(null);
      })
      .catch((err) => console.error("Error al guardar post:", err));
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}${RESOURCE}/${id}`, { method: "DELETE" })
      .then(() => setPosts(posts.filter((p) => p.id !== id)))
      .catch((err) => console.error("Error al eliminar:", err));
  };

  const handleEdit = (post) => {
    setForm({ title: post.title, body: post.body });
    setEditId(post.id);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Mis Posts (fetch + Bootstrap)</h1>

      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            name="title"
            placeholder="Título"
            className="form-control"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <textarea
            name="body"
            placeholder="Contenido"
            className="form-control"
            value={form.body}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-success" type="submit">
          {editId ? "Actualizar" : "Crear"}
        </button>
      </form>

      <div className="row row-cols-1 row-cols-md-2 g-4">
        {posts.map((post) => (
          <div className="col" key={post.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.body}</p>
              </div>
              <div className="card-footer d-flex justify-content-end gap-2">
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => handleEdit(post)}
                >
                  <i className="bi bi-pencil"></i> Editar
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleDelete(post.id)}
                >
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
