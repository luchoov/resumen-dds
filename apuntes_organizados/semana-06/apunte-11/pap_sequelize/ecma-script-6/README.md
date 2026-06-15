# Ejemplo CRUD con Sequelize y SQLite (versión ECMAScript 6)

Este proyecto contiene una implementación **paso a paso** de un CRUD de usuarios utilizando Sequelize como ORM y SQLite como base de datos. La versión está desarrollada con sintaxis **ECMAScript 6 (ES6)** utilizando `import/export` y `"type": "module"` en el `package.json`.

Está alineado con el contenido del **Apunte 11** y refleja las buenas prácticas modernas de backend que trabajamos en clase.

---

## 📁 Estructura por pasos

Cada carpeta representa un paso incremental en la construcción del backend:

| Carpeta        | Contenido principal                                              |
|----------------|------------------------------------------------------------------|
| paso01-ES6     | Conexión inicial con la base de datos usando Sequelize           |
| paso02-ES6     | Separación del archivo `db.js` con configuración de Sequelize    |
| paso03-ES6     | Definición del modelo `Usuario` con atributos básicos            |
| paso04-ES6     | Operaciones `create`, `findAll`, validaciones y restricciones    |
| paso05-ES6     | Agregado de datos iniciales (`bulkCreate`) y carga condicional   |
| paso06-ES6     | Métodos de actualización, eliminación, conteo (`count`)          |
| paso07-ES6     | Manejo de errores y validaciones al crear usuarios               |
| paso08-ES6     | Introducción a relaciones: creación del modelo `Perfil`          |
| paso09-ES6     | Inclusión de relaciones 1:N, precarga (`include`), repositorios  |

---

## ⚙️ ¿Cómo usarlo?

1. Ingresá a la carpeta de cualquier paso, por ejemplo:

```bash
cd paso06-ES6
```

2. Instalá las dependencias:

```bash
npm install
```

3. Ejecutá el proyecto:

```bash
npm start
```

> También podés usar scripts personalizados o ejecutar directamente con `node app.js`.

---

## 🧠 ¿Qué conceptos se trabajan?

- Uso de Sequelize con ES6
- Definición de modelos con clases
- Validaciones, restricciones y atributos por defecto
- Relaciones entre tablas (1:N)
- Inserción masiva (`bulkCreate`)
- Querying con `where`, `Op`, y `include`
- Carga de datos condicional
- Patrón Repositorio y separación de capas (desde paso 09)

---

## 📚 Apunte relacionado

Este material acompaña el desarrollo del **[Apunte 11](../apunte-11-sequelize-orm.md)** de la asignatura, donde se explican en profundidad los conceptos de ORM, Sequelize, relaciones, validaciones y diseño orientado a objetos.

---

## 🎯 Objetivo pedagógico

Este proyecto busca que los estudiantes:

- Comprendan cómo aplicar Sequelize con una estructura de proyecto moderna
- Refuercen los fundamentos del ORM y sus diferencias con SQL tradicional
- Adquieran herramientas para modelar y consultar datos relacionales desde Node.js
- Apliquen principios de diseño como separación de capas, reutilización y legibilidad

---

¡Este material es clave para consolidar la base del backend en la primera mitad del cuatrimestre!
