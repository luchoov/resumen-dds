![Cabecera](../../images/22795b6c552ff69919ee656e69d111faf19ed5ff1df20f76b3990496795076a2.png)

# Introducción

Este proyecto contiene un ejercicio **paso a paso** para construir un CRUD de usuarios utilizando **SQLite3 como motor de base de datos** y **Sequelize como ORM** en un entorno Node.js.

El propósito es acompañar los contenidos teóricos y prácticos del **Apunte 11**, abordando desde la instalación hasta la implementación de una **capa de repositorios reutilizable**, con validaciones, relaciones, inicialización de datos y buenas prácticas.

---

## 🛠️ Tecnologías utilizadas

- Node.js
- SQLite3
- Sequelize
- Estructura modular (`commonjs` y `ES6 modules`)

---

## 🧪 ¿Qué vas a encontrar?

- Modelos Sequelize definidos con clases (`Usuario`, `Perfil`)
- Validaciones y restricciones a nivel de modelo
- Relaciones entre entidades (1:N entre perfiles y usuarios)
- Operaciones CRUD con ORM
- Script de inicialización de base de datos
- Capa de repositorios con herencia y métodos personalizados
- Uso de logs y formateo de SQL para seguimiento didáctico

---

## 📁 Estructura de versiones

Este repositorio contiene dos variantes del mismo ejemplo:

### 🔹 Versión `commonjs`

Esta es la **versión original**, estructurada con `require` y `module.exports`. Aunque hemos migrado progresivamente a la versión basada en módulos ES6, esta implementación se conserva por compatibilidad con otras comisiones y materiales anteriores.

**Ruta de acceso:**  
[pap_sequelize/common-js](./common-js/)

---

### 🔸 Versión `EcmaScript 6`

Es la versión recomendada y actual, que utiliza:

- `"type": "module"` en `package.json`
- Sintaxis moderna de `import` y `export`
- Estructura clara y reutilizable con clases y repositorios

Incluye todos los pasos explicados en el **Apunte 11**, y refleja la arquitectura que usamos en clases para enseñar **separación de capas y buenas prácticas backend**.

**Ruta de acceso:**
[pap_sequelize/ecma-script-6](./ecma-script-6/)

---

## 🚀 ¿Cómo comenzar?

1. Ingresá a la carpeta de la versión que quieras probar (`common-js/` o `ecma-script-6/`)
2. Y luego al ir ingresando en cada uno de los pasos
3. Ejecutá `npm install` para instalar las dependencias
4. Corré el script de inicialización si vas a usar la base de datos en archivo, (en general los ejemplos están configurados para utilizar la base de datos en memoria):

    ```bash
    npm run init-db

    ```

5. Luego podés ejecutar:

```bash
npm start`  # o ejecutá con node el script que prefieras probar.

```

## 📚 ¿Dónde están los conceptos explicados?

Todos los temas prácticos que se aplican en este ejemplo están desarrollados en el archivo:

[📄 apunte-11-sequelize-orm.md](../apunte-11-sequelize-orm.md)

Además, los materiales de semanas siguientes complementan con diseño de APIs, Express, OpenAPI y más.

---

✅ Objetivo pedagógico

- Este ejemplo busca que los estudiantes:
- Comprendan cómo utilizar Sequelize para interactuar con bases relacionales
- Aprendan a construir un backend modular, extensible y mantenible
- Vean aplicado el Patrón Repositorio con herencia y encapsulamiento
- Integren conceptos de validación, relaciones y estructura del backend
