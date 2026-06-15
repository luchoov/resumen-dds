# 📚 Guía de Pasos - API Backend con Express y Sequelize

Esta guía detalla la evolución de un proyecto backend, paso a paso, para construir una API RESTful utilizando Node.js, Express y Sequelize.

Cada paso agrega progresivamente nuevas funcionalidades y conceptos, permitiendo entender el crecimiento de un proyecto real de backend.

---

## 🛤️ Índice de Pasos

### 🚀 Paso 01 - Configuración inicial y Hola Mundo

- Se configura un proyecto básico de Node.js usando Express.
- Se crea un servidor que responde en la raíz `/` con un mensaje en HTML.
- Se valida que el servidor esté escuchando correctamente en consola.

👉 [Ver detalle de Paso 01](./paso01-start/README.md)

---

### 🚀 Paso 02 - Primer Endpoint: Health-Check

- Se crea el endpoint `/health-check`.
- El servidor responde con un JSON que informa que está funcionando y devuelve la fecha y hora actual.
- Se realiza la primera prueba usando REST Client.

👉 [Ver detalle de Paso 02](./paso02-endpoint/README.md)

---

### 🚀 Paso 03 - Endpoint con QueryString: Echo

- Se crea el endpoint `/echo` que recibe un parámetro `mensaje` por querystring.
- El servidor responde repitiendo el mensaje recibido.
- Se incorporan prácticas para leer parámetros de la URL.

👉 [Ver detalle de Paso 03](./paso03-querystring/README.md)

---

### 🚀 Paso 04 - Primer API de Perfiles (mock en memoria)

- Se crea un array de perfiles en memoria.
- Se expone el endpoint `/api/perfiles` que devuelve todos los perfiles.
- Se expone el endpoint `/api/perfiles/:id` que devuelve un perfil específico por ID.
- Se realizan pruebas REST para validar los endpoints.

👉 [Ver detalle de Paso 04](./paso04-api-endpoint/README.md)

---

### 🚀 Paso 05 - API conectada a Base de Datos (SQLite + Sequelize)

- Se agregan las librerías `sqlite3` y `sequelize` al proyecto
- Se configura Sequelize para conectarse a una base de datos SQLite en memoria.
- Se crea el modelo Sequelize `Perfil`.
- Se crea un seeder para inicializar perfiles en la base de datos.
- Se ajustan los endpoints `/api/perfiles` y `/api/perfiles/:id` para leer desde la base real, no desde memoria.
- Se prueba el acceso y consulta de perfiles en la base de datos real.

👉 [Ver detalle de Paso 05](./paso05-api-db/README.md)

---

✅ Hasta este punto, se completa un ciclo básico de backend:

- Configuración de servidor Express
- Exposición de rutas simples y con parámetros
- Primeros accesos a base de datos reales usando ORM
- Preparación para extender la API en pasos futuros (Usuarios, Relaciones, Filtros, Repositorios, etc.)

---
