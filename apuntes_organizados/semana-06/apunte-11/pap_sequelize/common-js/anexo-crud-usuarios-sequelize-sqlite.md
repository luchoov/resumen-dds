![Cabecera](../../images/22795b6c552ff69919ee656e69d111faf19ed5ff1df20f76b3990496795076a2.png)

# Introducción

En este documento, vamos a explorar cómo implementar operaciones CRUD (Crear, Leer, Actualizar, Borrar) en una base de datos SQLite utilizando el ORM Sequelize en Node.js.

SQLite es una biblioteca en lenguaje C que proporciona una base de datos ligera en disco que no requiere un proceso de servidor separado y permite acceder a la base de datos utilizando una variante no estándar del lenguaje de consulta SQL. Además, es Sequelize es un ORM (Object-Relational Mapping) que permite interactuar con bases de datos SQL como SQLite, PostgreSQL, MySQL, y más, usando JavaScript.

El ORM mapea las tablas de la base de datos a objetos JavaScript, lo que permite realizar operaciones CRUD de una manera más intuitiva y segura, ya que Sequelize se encarga de las consultas SQL por nosotros.

A lo largo de este tutorial, crearemos un proyecto desde cero, configuraremos la conexión a la base de datos y finalmente implementaremos las operaciones CRUD para los usuarios.

Este tutorial está diseñado para alumnos con un conocimiento básico de JavaScript y SQL. Si no estás familiarizado con estos conceptos, te recomendamos que revises los videos construidos por la Cátedra disponibles en la UV antes de continuar.

# Ejercicio Paso a Paso: CRUD de usuarios con Sqlite3 y ORM Sequelize.

## Parte 1

### Paso 1: Preparación del proyecto

En este paso inicializamos el proyecto e instalamos la librería `sqlite3` que usaremos para conectarnos a la base de datos

```sh
mkdir crud_usuarios
cd crud_usuarios
npm init -y
npm i sqlite3 sequelize
touch app.js db.js
```

### Paso 2: Importar el paquete `sequelize` y conectarnos a la base de datos

Vamos a realizar la conexión con la base de datos en un módulo aparte: `db.js`
Observa que si utilizamos `"sqlite::memory:"` usamos una base de datos `en memoria`, es decir, no persistirá entre una ejecución del programa y otra.

```javascript
const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("sqlite::memory:");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite",
});

module.exports = sequelize;
```

Vamos a importar el módulo `db` en nuestro programa principal

```javascript
const sequelize = require("./db");

async function main(){
  try{

    // Sincronizar la base de datos con el modelo
    await sequelize.sync(); 
    
    // Probar la conexión
    // await sequelize.authenticate();
    
    console.log("Base de Datos: lista");
  } 
  catch (error){
    console.error("Ha ocurrido un error: ", error);
  }
};

main();
```

Si lo ejecutamos por primera vez:

```sh
node app.js
```

vamos a observar que el archivo `db.sqlite` ha sido creado.

### Paso 3: Crear el modelo

Ahora vamos a crear el modelo y para eso agregamos otro archivo: `usuario.js`

Si leemos la documentación ([Model basics](https://sequelize.org/docs/v6/core-concepts/model-basics/)) veremos que tenemos dos alternativas sintácticas para crear nuestro modelo:

Usando `sequelize.define()`

```javascript
const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

const Usuario = sequelize.define(
    "Usuario",
    {
        nombre: { type: DataTypes.STRING },
        apellido: { type: DataTypes.STRING },
        usuario: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
    },
    {
        sequelize,
        modelName: "usuario",
        timestamps: false,
    }
);

module.exports = Usuario;
```

Extendiendo `model`

```javascript
const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

const Usuario = sequelize.define(
    "Usuario",
    {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        nombre: { type: DataTypes.STRING },
        apellido: { type: DataTypes.STRING },
        usuario: { 
          type: DataTypes.STRING, 
          unique: true 
        },
        password: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        fecha_alta: { type: DataTypes.DATE, defaultValue: DataTypes.NOW  } 
    },
    {
        sequelize,
        modelName: "usuario",
        timestamps: false,
    }
);

module.exports = Usuario;
```

En `app.js` vamos a importar `usuario`

```javascript
const sequelize = require("./db");
const Usuario = require("./usuario");

async function main(){
  try{

    // Sincronizar la base de datos con el modelo
    await sequelize.sync(); 
    
    // Probar la conexión
    // await sequelize.authenticate();
    
    console.log("Base de Datos: lista");
  } 
  catch (error){
    console.error("Ha ocurrido un error: ", error);
  }

};

main();
```

Al ejecutar el programa deberías ver algo así como respuesta en la consola:

```sh
Executing (default): SELECT name FROM sqlite_master WHERE type='table' AND name='Usuarios';
Executing (default): CREATE TABLE IF NOT EXISTS `Usuarios` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `nombre` VARCHAR(255), `apellido` VARCHAR(255), `usuario` VARCHAR(255), `password` VARCHAR(255), `email` VARCHAR(255));
Executing (default): PRAGMA INDEX_LIST(`Usuarios`)
Base de Datos: Lista
```

Y si examinás la base de datos con alguna herramienta apropiada, verás la tabla `usuarios` creada.

### Paso 4: Crear un usuario

Teniendo la tabla vacía, lo primero que haremos será crear uno o dos instancias de nuestro modelo, esto es: usuarios.

En `app.js` agregamos la función agregarUsuarios() y la invocamos.

```javascript
async function crearUsuarios(){

  //Crear usuario Juan Perez
  const datosJuanPerez = {
      nombre: "Juan",
      apellido: "Perez",
      usuario: "jperez",
      password: "MiPwd%%$$W",
      email: "jperez@gmail.com",
  };
  const juanPerez = await Usuario.create(datosJuanPerez);
  console.log("Usuario creado ID:", juanPerez.id);

  //Crear usuario María García 
  const datosMariaGarcia = {
      nombre: "Maria",
      apellido: "García",
      usuario: "mgarcia",
      password: "Pwd%%$$Wss",
      email: "mgarcia@gmail.com",
  };
  const mariaGarcia = await Usuario.create(datosMariaGarcia);
  console.log("Usuario creado ID:", mariaGarcia.id);
}
```

### Paso 5: Recuperar todos los usuarios

Ahora que hemos creado un par de usuarios, vamos a recuperar todos los usuarios que hemos almacenado en la función `recuperarUsuarios()`:

`app.js`

```javascript
async function recuperarUsuarios(){
  // Recuperar todos los usuarios
  const usuarios = await Usuario.findAll();
  usuarios.forEach((u) => {
      console.log(`|${u.nombre}|${u.apellido}|${u.usuario}|${u.email}|`);
  });
}
```

### Paso 6: Recuperar un usuario específico.

También podemos recuperar un usuario específico, por ejemplo: el que tiene id = 3.

`app.js`

```javascript
async function recuperarUsuario(id){
    const u = await Usuario.findOne({ where: { id: id } });
    console.log(`|${u.nombre}|${u.apellido}|${u.usuario}|${u.email}|`);
}
```

### Paso 7: Modificar un usuario.

Para modificar una instancia debemos primero recuperarla (por ejemplo por id), luego modificar las propiedades que deseamos actualizar y finalmente salvarla usando el método asíncrono: `save()`

`app.js`

```javascript
async function actualizarUsuario(id, nombre){
  const u = await Usuario.findOne({ where: { id: id } });
  if (u){
    u.nombre = nombre;
    await u.save();
  }
}
```

### Paso 8: Eliminar un usuario.

Por último implementaremos la operación de eliminar un usuario invocando al método `destroy()`

`app.js`

```javascript
async function eliminarUsuario(id){
  const u = await Usuario.findOne({ where: { id: id } });
  if (u){
    await u.destroy();
  }
}
```

### Paso 9: Asociaciones. Definir una relación 1:N entre Usuarios y Tareas

Ahora vamos a crear una modelo `Tarea` que tendrá una relación con `Usuario`. Esta relación será de uno a muchos: un usuario puede tener muchas tareas asociadas.

Este es el tipo de relación más frecuente y la que vamos a utilizar en nuestro ejercicio. También se pueden definir relaciones _uno a uno (1:1)_ y _muchos a muchos (N:M)_. Podés ver más detalles sobre cómo definir estas relaciones en la [documentación: Associations](https://sequelize.org/docs/v6/core-concepts/assocs/)

La relación se define a partir de los métodos `.hasMany()` y `.belongsTo()`. En nuestro caso será:

```javascript
Usuario.hasMany(Tarea);
Tarea.belongsTo(Usuario);
```

Y si partimos de una base de datos existente. Especificamos la _clave foranea_ de la relación.

```javascript
Usuario.hasMany(Tarea, { foreignKey: "TareaId" });
Tarea.belongsTo(Usuario, { foreignKey: "TareaId" });
```

Entonces nuestro nuevo modelo `Tarea` queda definido así:

`tarea.js`

```javascript
const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db");

const Tarea = sequelize.define(
    "Tarea",
    {
        descripcion: { type: DataTypes.STRING },
    },
    {
        sequelize,
        modelName: "tarea",
        timestamps: false,
    }
);

module.exports = Tarea;
```

y definimos la relación en

`app.js`

```javascript
const sequelize = require("./db");
const Usuario = require("./usuario");
const Tarea = require("./tarea");

Usuario.hasMany(Tarea);
Tarea.belongsTo(Usuario);

```

## Paso 10: Agregar tareas a un usuario

Al crear las asociaciones disponemos de un método que se crea de forma automática `createTarea()` que nos permite agregar una tarea a un `usuario`. En este caso vamos a agregar dos tareas al usuario cuyo `id` es `2`

`app.js`

```javascript
async function agregarTareaAUsuario(usuarioId, descripcionTarea){
  const u = await Usuario.findOne({ where: { id: usuarioId } });
  if (u){
    await u.createTarea({
      descripcion: descripcionTarea
    });
  }
}
```

## Paso 11: Listar las tareas de un usuario

El método `getTareas()` nos devuelve todas las tareas de un usuario. Aquí usamos el método `forEach()` para mostrarlas por consola.

`app.js`

```javascript
async function listarTareasUsuario(usuarioId){
  const u = await Usuario.findOne({ where: { id: usuarioId } });
  if (u){
    const tareas = await u.getTareas();
    tareas.forEach((t) => {
        console.log(`|${t.descripcion}|`);
    });
  }
}
```

También podemos hacer algo similar usando **precarga** (_eager loading_) directamente cuando recuperamos el usuario podemos traer sus tareas si lo indicamos explícitamente con `include: Tarea`

`app.js`

```javascript
async function listarTareasUsuarioPrecarga(usuarioId){
  const u = await Usuario.findOne({ 
    where: { id: usuarioId },
    include: Tarea,
  });
  if (u){
    u.Tareas.forEach((t) => {
        console.log(`|${t.descripcion}|`);
    });
  }
}
```

## Paso 12 Remover las tareas de un usuario

Usando los métodos `removeTarea()` y `removeTareas()` podemos remover una o todas las tareas de un usuario específico. Rntonces, vamos a ejemplificar cómo remover la tarea:

**Ejecutar** en este caso.
También demostramos el uso del método `countTareas()` para contar las tareas de un usuario específico.

`app.js`

```javascript
async function eliminarTareaUsuario(usuarioId, descripcionTarea){
  const u = await Usuario.findOne({ where: { id: usuarioId } });
  if (u){
    // Recuperamos la tarea específica
    const t = await u.getTareas({
        where: { descripcion: descripcionTarea },
    });

    // Si la encontramos, la removemos
    if (t) {
        await u.removeTarea(t);
    }
  }
}

```
