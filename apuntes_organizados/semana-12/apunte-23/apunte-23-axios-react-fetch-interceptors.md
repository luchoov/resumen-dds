![picture 1](../images/08faba4316449ef02eb1bc7466a76ca026c35929ba6cfc39d8e410f2eada0027.png)  

# Apunte 23 - Librería Axios y React

## 🧪 ¿Qué es Axios y para qué tipo de proyectos se utiliza?

Axios es una biblioteca basada en promesas para hacer peticiones HTTP desde entornos **frontend (como React)** y **backend (como Node.js)**. Es ampliamente utilizada por su sencillez y flexibilidad.

Axios es una librería de JavaScript muy popular para realizar solicitudes HTTP, y aunque no es específica para React, es utilizada a menudo en proyectos de React por varias razones:

1. Facilidad de uso: Axios ofrece una API sencilla y fácil de usar para realizar solicitudes HTTP, lo que facilita su integración con proyectos de React.

2. Soporte para navegadores y Node.js: Axios es compatible tanto con navegadores como con entornos Node.js, lo que lo hace versátil para el desarrollo de aplicaciones web y del lado del servidor.

3. Manejo de errores: Axios permite un manejo de errores más estructurado y fácil de entender, ya que utiliza promesas y captura errores de forma más explícita.

4. Interceptores: Axios permite interceptar solicitudes y respuestas antes de que sean manejadas por el código que las consume. Esto es útil para agregar funcionalidades adicionales, como la autenticación, el registro de errores, la modificación de encabezados, etc.

5. Cancelación de solicitudes: Axios proporciona una forma sencilla de cancelar solicitudes en curso, lo que puede ser útil en ciertos casos, como cuando el usuario navega fuera de una página antes de que se complete una solicitud.

6. Transformación de datos: Axios permite transformar los datos enviados y recibidos en una solicitud, lo que puede ser útil para la serialización y deserialización de datos, así como para la manipulación de datos antes de su procesamiento.

7. Configuración global: Axios permite establecer configuraciones globales para todas las solicitudes realizadas, lo que facilita la configuración de elementos comunes, como encabezados, tiempos de espera, etc.

Aunque React no necesita específicamente de Axios y puede utilizar otras bibliotecas o la API Fetch nativa de JavaScript, muchas personas optan por usar Axios debido a estas ventajas y a la amplia adopción en la comunidad de desarrolladores.

El sitio web de axios está en <https://axios-http.com/>

### 📂 Ámbitos donde se usa Axios

| Entorno                                        | Uso habitual                                              |
| ---------------------------------------------- | --------------------------------------------------------- |
| Frontend (React, Vue, Angular)                 | Peticiones a APIs REST, validaciones, login, formularios. |
| Backend (Node.js, Express)                     | Consumo de APIs de terceros, servicios internos.          |
| Aplicaciones híbridas (Electron, React Native) | Acceso a recursos externos, integración con APIs.         |

### 📊 Axios vs Fetch

| Característica                 | `fetch` (nativo)                   | `axios` (librería externa)               |
| ------------------------------ | ---------------------------------- | ---------------------------------------- |
| Soporte JSON automático        | ❌ No                               | ✅ Sí (transforma automáticamente)        |
| Manejo de errores HTTP         | ❌ Manual                           | ✅ Automático (status != 2xx lanza error) |
| Cancelación de peticiones      | ❌ Experimental (AbortController)   | ✅ Integrado y sencillo                   |
| Interceptores                  | ❌ No                               | ✅ Sí                                     |
| Sintaxis                       | Verbosa                            | Concisa y declarativa                    |
| Compatibilidad con navegadores | Limitada (antiguos no lo soportan) | Mejor cobertura con polyfills            |

Axios es ideal cuando se requiere:

- Interactuar con APIs REST.
- Gestionar errores globalmente.
- Agregar tokens de autenticación.
- Simplificar la lectura y escritura de datos.

## Métodos más utilizados con axios

1. **axios.get(url[, config])**: Realiza una solicitud GET a la URL especificada. Puedes proporcionar una configuración opcional, como parámetros de consulta o encabezados personalizados.

2. **axios.post(url, data[, config])**: Realiza una solicitud POST a la URL especificada. Envía el objeto data en el cuerpo de la solicitud. También puedes proporcionar una configuración opcional, como encabezados personalizados.

3. **axios.put(url, data[, config])**: Realiza una solicitud PUT a la URL especificada. Envía el objeto data en el cuerpo de la solicitud. Puedes proporcionar una configuración opcional, como encabezados personalizados.

4. **axios.delete(url[, config])**: Realiza una solicitud DELETE a la URL especificada. Puedes proporcionar una configuración opcional, como parámetros de consulta o encabezados personalizados.

Axios proporciona características adicionales como interceptores, cancelación de solicitudes, transformación de datos y configuración global. Sin embargo, los métodos mencionados anteriormente son los más utilizados y fundamentales para realizar solicitudes HTTP con Axios.

## Primer ejemplo: primero con `Fetch` y luego con `Axios`

A continuación trabajaremos un primer ejemplo incremental donde partiremos desde nuestro proceso con HTTP Fetch nativo y evolucionaremos al uso de axios para ver las diferencias.

En los siguientes ejemplos vamos a utilizar la API público JSON Placeholder.

### 🛠️ API JSONPlaceholder

[JSONPlaceholder](https://jsonplaceholder.typicode.com/) es una API REST gratuita y pública que simula un backend real. Es ideal para practicar peticiones HTTP en desarrollo frontend.

#### 📦 Recursos utilizados

| Recurso      | Descripción                     |
|--------------|---------------------------------|
| `/posts`     | 100 publicaciones (posts)       |
| `/comments`  | 500 comentarios                 |
| `/users`     | 10 usuarios                     |

> ⚠️ Estos recursos están relacionados:  
>
> - Un **post** puede tener muchos **comentarios** (`/posts/1/comments`).
> - Un **post** tiene un **userId** que indica su autor.

#### 🔁 Rutas soportadas

Todos los métodos HTTP son compatibles (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`). Se puede usar tanto `http` como `https`.

| Método  | Ruta                        | Acción                                 |
|---------|-----------------------------|----------------------------------------|
| GET     | `/posts`                    | Obtener todos los posts                |
| GET     | `/posts/1`                  | Obtener un post por ID                 |
| GET     | `/posts/1/comments`         | Obtener comentarios de un post         |
| GET     | `/comments?postId=1`        | Obtener comentarios filtrando por post |
| GET     | `/users`                    | Obtener todos los usuarios             |
| GET     | `/users/1`                  | Obtener un usuario por ID              |
| POST    | `/posts`                    | Crear un nuevo post                    |
| PUT     | `/posts/1`                  | Reemplazar un post completo            |
| PATCH   | `/posts/1`                  | Modificar parcialmente un post         |
| DELETE  | `/posts/1`                  | Eliminar un post                       |

#### 🔗 Documentación oficial

👉 [https://jsonplaceholder.typicode.com/guide/](https://jsonplaceholder.typicode.com/guide/)

### Requisitos para el ejemplo

Para realizar el seguimiento de los siguientes ejemplos será necesario:  

1. Una aplicación react existente, se puede pensar en la aplicación básica que se crea con `vite` cómo hemos trabajado hasta aquí.
2. En la primera versión con eso alcanza, para la siguiente versión será necesario instalar axios
3. Y luego evolucionaremos a la utilización de los distintos métodos de axios.

### 🚀 Paso 1: Obtener y mostrar posts del usuario 1 usando `fetch`

Revisemos ahora los elementos fundamentales de un App que tenga por única función recuperar y mostrar los post de un usuario.

El objetivo es mostrar cómo consumir una API pública desde React, actualizar el estado del componente con los datos obtenidos, y renderizar el resultado en la interfaz.

Este es un paso fundamental para entender cómo se realiza la integración de datos externos en una aplicación frontend.

Este primer paso permite familiarizarse con `fetch` y el ciclo de vida de un componente React utilizando `useEffect`. Solo obtenemos datos (método GET) sin editar ni eliminar todavía.

#### 📄 Archivo `App.jsx`

```jsx
import React, { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com";

export default function ListaPostsUsuario() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/posts?userId=1`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la carga de datos");
        return res.json();
      })
      .then(setPosts)
      .catch((err) => console.error("Error al obtener posts:", err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Posts del usuario 1</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 🧪 Paso 2: ABM de Posts usando `fetch`

En este segundo ejemplo vamos a simular una aplicación completa de administración de publicaciones (**Alta, Baja y Modificación**) utilizando únicamente la API de JSONPlaceholder.

Nos enfocaremos en las siguientes operaciones:

- **GET**: Obtener todos los posts del usuario 1.
- **POST**: Crear una nueva publicación.
- **PUT**: Modificar una publicación existente.
- **DELETE**: Eliminar una publicación.

Cada operación se ejecutará a través de `fetch`, prestando atención a la configuración del método, los headers y el cuerpo (`body`) de la solicitud.

Aunque esta API no persiste los datos realmente, el comportamiento simulado es suficiente para comprender cómo integrar una API REST en una SPA con React.

#### 🧩 Lineamientos principales (resumen)

- `fetch` se usa con `GET`, `POST`, `PUT`, `DELETE` cambiando método y cuerpo.
- Para `PUT` y `POST`, se usa `Content-Type: application/json` y `body: JSON.stringify(...)`
- El backend de JSONPlaceholder **no guarda** cambios realmente, pero simula correctamente las respuestas.

#### 📄 Archivo `App.jsx` con el ABM

```jsx
import React, { useEffect, useState } from "react";

const API_URL = "https://jsonplaceholder.typicode.com";
const REOURCE = "/posts";
const USER_ID = 1; // Trabajamos sólo con el usuario 1

export default function App() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", body: "" });
  const [editId, setEditId] = useState(null);

  // Cargar posts al inicio
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
    <div style={{ padding: 20 }}>
      <h1>Mis Posts</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="body"
          placeholder="Contenido"
          value={form.body}
          onChange={handleChange}
        />
        <br />
        <button type="submit">{editId ? "Actualizar" : "Crear"}</button>
      </form>

      <hr />

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <b>{post.title}</b>
            <p>{post.body}</p>
            <button onClick={() => handleEdit(post)}>Editar</button>
            <button onClick={() => handleDelete(post.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 🚀 Paso 3: Refactor del Paso 1 usando Axios

Para este paso primero vamos a necesitar agregar la dependencia `axios` a nuestro proyecto.

#### 📦 Instalación de Axios

```bash
npm install axios
```

Luego reescribimos el ejemplo de obtención de posts, ahora utilizando **Axios** en lugar de `fetch`. Definimos la configuración de Axios (como la `baseURL`).

Esto nos permite aprovechar algunas ventajas de Axios desde el primer momento, como la transformación automática de JSON, el manejo de errores más claro, y una sintaxis más limpia.

#### 📄 Archivo `App.jsx` del GET con Axios

```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

// Configuramos axios directamente en el archivo
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

export default function ListaPostsAxios() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts", { params: { userId: 1 } })
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error al obtener posts:", error));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Posts del usuario 1 (con Axios)</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 🚀 Paso 4: Refactor del ABM usando Axios

Ahora vamos a reescribir el ejemplo de ABM del paso 2, pero utilizando **Axios** en lugar de `fetch`. Para mantener el ejemplo autocontenido, no vamos a extraer servicios a archivos separados, sino que configuramos una instancia local de Axios directamente dentro del mismo componente.

Este paso nos permite ver cómo se integran los métodos `GET`, `POST`, `PUT` y `DELETE` con Axios, manteniendo una estructura similar a la anterior, pero con sintaxis más clara y mejor manejo de errores.

#### 📄 Archivo `App.jsx` del ABM con Axios

```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

const USER_ID = 1;

export default function AppAxios() {
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
    <div style={{ padding: 20 }}>
      <h1>Mis Posts (con Axios)</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="body"
          placeholder="Contenido"
          value={form.body}
          onChange={handleChange}
        />
        <br />
        <button type="submit">{editId ? "Actualizar" : "Crear"}</button>
      </form>

      <hr />

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <b>{post.title}</b>
            <p>{post.body}</p>
            <button onClick={() => handleEdit(post)}>Editar</button>
            <button onClick={() => handleDelete(post.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 🚀 Paso 5: Refactor a Axios con patrón de servicio

Ahora que ya vimos cómo usar Axios localmente, vamos a dar un paso más y aplicar el **patrón de servicio** para separar las responsabilidades y mejorar la organización del código. Esto implica:

- Crear una instancia `api.js` reutilizable
- Encapsular las funciones de acceso a la api en `postService.js`
- Usar el servicio desde el componente principal

#### 🔧 Patrón de Servicios en React

**Objetivo**: Separar las llamadas HTTP en archivos de servicio permite:

- Reutilización y centralización de la lógica de acceso a apis.
- Separación de responsabilidades: el componente se concentra en mostrar.
- Mejor mantenimiento y pruebas unitarias.

#### 📁 `services/api.js`

```js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});
```

#### 📁 `services/postService.js`

```js
import { api } from './api';

const resource = '/posts';

const getAllByUser = (userId) => api.get(resource, { params: { userId } });
const create = (post) => api.post(resource, post);
const update = (id, post) => api.put(`${resource}/${id}`, post);
const remove = (id) => api.delete(`${resource}/${id}`);

export const postService = {
  getAllByUser,
  create,
  update,
  remove
};
```

#### 📁 `App.jsx`

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
    <div style={{ padding: 20 }}>
      <h1>Mis Posts (con Axios y servicio)</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
        />
        <br />
        <textarea
          name="body"
          placeholder="Contenido"
          value={form.body}
          onChange={handleChange}
        />
        <br />
        <button type="submit">{editId ? "Actualizar" : "Crear"}</button>
      </form>

      <hr />

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <b>{post.title}</b>
            <p>{post.body}</p>
            <button onClick={() => handleEdit(post)}>Editar</button>
            <button onClick={() => handleDelete(post.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

#### 🗂️ Estructura de archivos para este Paso 5

Suponiendo un proyecto básico creado con **Vite**, la estructura para el Paso 5 podría organizarse así(hemos tenido en cuenta solo los archivos estrictamente necesarios):

```bash
📦mi-proyecto-vite
├── 📁public
├── 📁src
│   ├── 📁services
│   │   ├── api.js
│   │   └── postService.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

- `api.js`: contiene la instancia de Axios con la configuración base.
- `postService.js`: centraliza las operaciones con el recurso `/posts`.
- `App.jsx`: componente principal de la aplicación.

Esta estructura permite escalar fácilmente el proyecto a medida que se agregan otros recursos o servicios como `usuariosService.js`, `comentariosService.js`, etc.

## En Resumen

Volviendo a los ejemplos propios de DDS y ya con todos los conceptos revisados tenemos el siguiente resumen.

Para consumir una URL con Axios en React, primero debes instalar la librería Axios en tu proyecto y luego importarla.

A continuación, puedes utilizarla para realizar solicitudes HTTP dentro de tu componente React pero se recomienda crear un servicio independiente para manejar la lógica de negocio y las llamadas API utilizando Axios y luego importar ese servicio en tus componentes React.

Esto te permite mantener una separación de responsabilidades y hacer que tu código sea más flexible y fácil de mantener.

1. Crea un archivo para el servicio, por ejemplo articulos.service.js:

    ``` javascript
    import axios from 'axios';

    const API_BASE_URL = 'https://dds.frc.utn.edu.ar/api'; //URL de ejemplo

    async function BuscarTodos() {
    try {
        const response = await axios.get(`${API_BASE_URL}/articulos`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
    };

    export const articulosService = {
        BuscarTodos
    };
    ```

    En este archivo, importamos Axios y exportamos una función buscarTodos que realiza una solicitud GET a la API utilizando directamente la función axios.get.

2. Importa el servicio en tu componente React y úsalo con el hook useEffect:

    ``` javascript
    import React, { useState, useEffect } from 'react';
    import { articulosService } from './services/articulos.service';

    const BuscarArticulos = () => {
    const [data, setArticulos] = useState(null);

    useEffect(() => {
        async function BuscarArticulos() {
            let data = await articulosService.BuscarTodos();
            setArticulos(data);
        }
        BuscarArticulos();
    }, []);

    return (
        <div>
        {data ? (
            <table>
                <thead>
                    <tr>
                        <th>Articulo</th>
                        <th>Precio</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((element) => (                    
                    <tr key={element.IdArticulo}><td>{element.Nombre}</td>
                    <td>{element.Precio}</td></tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>Cargando datos...</p>
        )}     
        </div>    
    );
    };

    export default BuscarArticulos;
    ```

## Uso de interceptores con Axios

Los interceptores de Axios son funciones que se ejecutan antes o después de que una solicitud o respuesta pase por la instancia de Axios. Permiten modificar, transformar o manejar solicitudes y respuestas de manera más flexible antes de que lleguen a la aplicación o antes de ser enviadas al servidor. Los interceptores son útiles en una variedad de casos, como manejo de errores globales, agregar encabezados y monitorear el progreso de las solicitudes.
Son una herramienta poderosa para modificar y manejar solicitudes y respuestas de forma centralizada y flexible, lo que facilita la implementación de lógica común en toda la aplicación.

**Manejo de errores globales**: Puedes usar interceptores para manejar errores de forma centralizada en todas las solicitudes y respuestas. Por ejemplo, si deseas mostrar una notificación cada vez que ocurra un error de red o un error de servidor, puedes hacerlo con un interceptor de respuesta:

``` javascript
axios.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, simplemente devuélvela
    return response;
  },
  (error) => {
    // Si hay un error, muéstralo en una notificación
    console.error("Se produjo un error:", error.message);
    // Rechazar la promesa con el error para que pueda ser manejado en la aplicación
    return Promise.reject(error);
  }
);
```

**Agregar headers**: Si deseas agregar encabezados a todas las solicitudes, como un token de autenticación, puedes hacerlo con un interceptor de solicitud:

```javascript
axios.interceptors.request.use((config) => {
  // Agregar el token de autenticación al encabezado 'Authorization'
  config.headers.Authorization = `Bearer ${localStorage.getItem("authToken")}`;
  return config;
});
```

**Monitorear el progreso de las solicitudes:** Si bien no es una característica de los interceptores en sí, Axios permite monitorear el progreso de las solicitudes y respuestas mediante la configuración de eventos. A continuación, se muestra un ejemplo de cómo monitorear el progreso de una solicitud de carga:

``` javascript
const config = {
  onUploadProgress: (progressEvent) => {
    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    console.log(`Progreso de carga: ${percentCompleted}%`);
  },
};

axios.post("/upload", data, config);
```
