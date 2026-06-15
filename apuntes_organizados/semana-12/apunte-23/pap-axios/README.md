# 🧪 Proyecto React con Vite + Fetch + Bootstrap

Este documento registra paso a paso la evolución del proyecto educativo que implementa una aplicación React para trabajar con la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/), realizando operaciones CRUD sobre los posts del usuario con ID 1.

Este documento registra paso a paso la evolución del proyecto educativo que implementa una aplicación React para trabajar con la API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/), realizando operaciones CRUD sobre los posts del usuario con ID 1.

## ⚙️ Preparación del entorno

### ✅ Crear proyecto con Vite

Desde la terminal:

```bash
npm create vite@latest mi-ejemplo-axios
```

Respuestas esperadas:

- **Project name**: `mi-ejemplo-axios`
- **Framework**: `React`
- **Variant**: `JavaScript`

Luego ingresar al proyecto:

```bash
cd mi-ejemplo-axios
```

Instalar dependencias:

```bash
npm install
```

---

### 🎨 Agregar Bootstrap, Icons y JS

Editar `index.html`:

### En el `<head>`

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-9ndCyUa0R0N1B2Qp+4Jt6Dk2xW+1p6B0+tcE/q74laO5Yy9HrcQQ2FFM0yB2kDWr"
  crossorigin="anonymous"
/>

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
/>
```

### Justo antes del cierre del `</body>`

```html
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-w76A2z02tPqdj+80f7B3K0vD0zmK6Q2zjE6f3Xujz3GzFZ1kVj2Fj6tbtXj+1iSK"
  crossorigin="anonymous"
></script>
```

---

## 🚀 Paso 1 - Obtener y mostrar posts con `fetch`

Creamos un componente que utiliza `fetch` para obtener los posts del usuario 1 y los muestra con Bootstrap:

```jsx
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
```

Este ejemplo es el punto de partida para los siguientes pasos, donde se incorporarán operaciones de alta, modificación y eliminación.

---

## 🧩 Paso 2 - ABM de posts usando `fetch` y Bootstrap

Ahora vamos a extender el ejemplo anterior para permitir la creación, edición y eliminación de posts usando `fetch`. El formulario y la lista de posts están maquetados con Bootstrap.

```jsx
import React, { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const USER_ID = 1;

export default function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}?userId=${USER_ID}`)
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
    const url = editId ? `${API_URL}/${editId}` : API_URL;
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
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
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
```

Este paso marca la transición de una simple lectura a una interacción completa con una API REST.

---

## 🚀 Paso 3 - Obtener posts con `axios` y `baseURL`

En este paso reemplazamos el uso de `fetch` por `axios`, una librería que facilita el manejo de peticiones HTTP. Configuramos una instancia local de `axios` con una `baseURL`, y mantenemos la presentación con Bootstrap.

Primero instalamos axios:

```bash
npm install axios
```

Luego, implementamos el componente:

```jsx
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
```

Este enfoque es ideal como introducción a axios sin aún separar responsabilidades en servicios externos.

---

## 🧩 Paso 4 - ABM de posts usando `axios` y Bootstrap

Ahora vamos a implementar el mismo comportamiento de alta, modificación y eliminación de posts, pero utilizando `axios` en lugar de `fetch`. La estructura del componente y el diseño visual con Bootstrap se mantienen.

```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

const USER_ID = 1;

export default function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    api.get("/posts", { params: { userId: USER_ID } })
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error al obtener posts:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, userId: USER_ID };

    const request = editId
      ? api.put(`/posts/${editId}`, payload)
      : api.post("/posts", payload);

    request
      .then((res) => {
        if (editId) {
          setPosts(posts.map((p) => (p.id === editId ? res.data : p)));
        } else {
          setPosts([...posts, { ...res.data, id: posts.length + 101 }]);
        }
        setForm({ title: "", body: "" });
        setEditId(null);
      })
      .catch((err) => console.error("Error al guardar:", err));
  };

  const handleDelete = (id) => {
    api.delete(`/posts/${id}`)
      .then(() => setPosts(posts.filter((p) => p.id !== id)))
      .catch((err) => console.error("Error al eliminar:", err));
  };

  const handleEdit = (post) => {
    setForm({ title: post.title, body: post.body });
    setEditId(post.id);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Mis Posts (axios + Bootstrap)</h1>

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
```

Con esta refactorización logramos el mismo comportamiento que en el paso anterior, pero con una sintaxis más limpia, mejor manejo de errores y preparación para futuros interceptores o servicios reutilizables.

---

## 🧩 Paso 5 - ABM de posts con `axios` usando patrón de servicio

En este paso extraemos la lógica de acceso a datos hacia un **servicio reutilizable**, lo que permite separar responsabilidades, reutilizar funciones y facilitar futuras mejoras como interceptores o autenticación.

### 📁 `/src/services/api.js`

```js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});
```

### 📁 `/src/services/postService.js`

```js
import { api } from "./api";

const getAllByUser = (userId) => api.get("/posts", { params: { userId } });
const create = (post) => api.post("/posts", post);
const update = (id, post) => api.put(`/posts/${id}`, post);
const remove = (id) => api.delete(`/posts/${id}`);

export const postService = {
  getAllByUser,
  create,
  update,
  remove
};
```

### 📁 `App.jsx`

```jsx
import React, { useEffect, useState } from "react";
import { postService } from "./services/postService";

const USER_ID = 1;

export default function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    postService.getAllByUser(USER_ID)
      .then(res => setPosts(res.data))
      .catch(err => console.error("Error al obtener posts:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form, userId: USER_ID };

    const action = editId
      ? postService.update(editId, payload)
      : postService.create(payload);

    action
      .then((res) => {
        if (editId) {
          setPosts(posts.map(p => p.id === editId ? res.data : p));
        } else {
          setPosts([...posts, { ...res.data, id: posts.length + 101 }]);
        }
        setForm({ title: "", body: "" });
        setEditId(null);
      })
      .catch(err => console.error("Error al guardar:", err));
  };

  const handleDelete = (id) => {
    postService.remove(id)
      .then(() => setPosts(posts.filter(p => p.id !== id)))
      .catch(err => console.error("Error al eliminar:", err));
  };

  const handleEdit = (post) => {
    setForm({ title: post.title, body: post.body });
    setEditId(post.id);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Mis Posts (axios + servicios + Bootstrap)</h1>

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
```

Esta refactorización favorece la escalabilidad y el mantenimiento del código, manteniendo la estética clara con Bootstrap.

---

## 🔐 Paso 6 - Manejo global de errores con interceptores de Axios

En este paso vamos a configurar un interceptor global en la instancia de Axios utilizada en el servicio api.js. Esto permite capturar y tratar errores de forma centralizada sin repetir lógica en cada llamada.

### 📁 Archivo `/src/services/api.js`

```jsx
import axios from "axios";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

// Interceptor de respuesta global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error("Error de red o sin respuesta del servidor:", error);
    } else {
      console.warn(`Error ${error.response.status}: ${error.response.statusText}`);
    }
    return Promise.reject(error);
  }
);
```

Este interceptor permite:

- Mostrar mensajes genéricos de error de red.
- Centralizar logs de errores HTTP como 404, 500, etc.
- Evitar repetir .catch() innecesarios si se maneja el error en un solo lugar.

Se puede personalizar para:

- Redirigir a páginas de error.
- Lanzar alertas globales.
- Agregar trazas de logs a herramientas externas.

Este patrón se vuelve especialmente útil en proyectos que crecen, donde muchas llamadas comparten la misma lógica de manejo de errores.

---
