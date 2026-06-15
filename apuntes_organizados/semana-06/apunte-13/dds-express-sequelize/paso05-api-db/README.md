# 📦 Paso 5: API conectada a Base de Datos

## Novedades en `package.json`

La primera tarea es configurar el proyecto para que utilice sqlite (como motor de base de datos embebido) y sequelize (como framework de ORM), para ello vamos a instalar ambas dependencias:

```bash
npm install
npm install sqlite3 sequelize
```

### Resultado

![picture 0](../../../images/1b4e9e47a54fc487e48f2b9259fe6a03bec820debb63c8cb3220f0869b52aab5.png)  
> Y luego podemos ver cómo se impactaron estos cambios en el archivo `package.json`  
> ![picture 1](../../../images/0cfac358d67489998b5c0f0beba28fff2f155671baff60ab992ca4a1aad952ce.png)  

## Librerías agregadas

Con esto hemos agregado las siguiente librerías al proyecto

- _**SQLite3**_ librería asincrónica de SQLite para Nodejs  
  ![picture 2](../../../images/0cf249527aa8f8ffe2d2c6b57e5aaa2e91a7944623ae717ceee3dd94588edea7.png)  
- _**Sequelize**_ librería de ORM basada en promesas para Nodejs con capacidad de conexión a Postgres, MySql, MariaDB, SQLite y otros.
  ![picture 3](../../../images/1faab3ac75b7887f35a275e6cd21cf76ed7a5c6cf9506cc7dfac18116e37d2f0.png)  

## 📁 Estructura del proyecto

Como veremos a continuación la estructura de proyecto sufre varios cambios en este punto pues además de agregar varios archivos nuevos comenzamos a distribuir los archivos en diferentes directorios.

![picture 5](../../../images/27c56ebf1112d7f6c26cbf6a6aafc8d2554407fb95a07983a82d0a3344da61e5.png)  

```sh
paso05-api-db/
├── data/           # Directorio que contiene archivos de datos y en este caso la BD
│   └── db.sqlite   # Archivo de base de datos de SQLite
├── models/         # Directorio que contiene los archivos con los modelos mapeados
│   └── perfil.js   # Modelo mapeado a la tabla PERFILES de la base de datos
├── app.js          # Archivo de la aplicación
├── db.js           # Archivo con la configuración de sequelize con la conexión a la BD
├── package.json    # Archivo package.json
├── pruebas.rest    # Archivo de pruebas
└── README.md

```

## Archivos nuevos y modificados desde el paso anterior

## Archivo `db.js`

Este archivo contiene la configuración de Sequelize y la conexión a la base de datos.

```javascript
// db.js
// importamos sequelize desde la librería que instalamos
import { Sequelize } from "sequelize";

// luego creamos la conexión de sequelize con la base de datos
const sequelize = new Sequelize({
  dialect: "sqlite", // informamos el dialecto (base de datos a utilizar)
  storage: "./datos/db.sqlite", // y luego informamos el path del archivo de almacenamiento
});

// Notar que también podríamos configurar la base de datos para funcionar en memoria
// Herramienta muy útil para realizar pruebas
// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: ":memory:",
// });

// finalmente exportamos el objeto configurado por defecto del módulo
export default sequelize;

```

> Notar que este archivo luego habilita a que en el archivo `app.js` usemos el objeto sequelize para por ejemplo chequear la conexión a la base de datos mediante el método `.authenticate()`

### Archivo `models/perfiles.js`

En el archivo `perfiles.js` vamos a definir el modelo (objeto que representa a las filas de una tabla de la base de datos) de la tabla `PERFILES` de la base de datos.

```javascript
// modelos/perfil.js
// importamos tipos de datos y la clase base Model desde la librería Sequelize
import { DataTypes, Model } from "sequelize";
// importamos la conexión a la base de datos que exporta el objeto raiz del ORM conectado.
import sequelize from "../db.js";

// Definimos el modelo por extensión (herencia) de la clase Model
class Perfil extends Model {}

// Deinimos el mapeo para el modelo
Perfil.init({
  // mapeamos cada columna de la base de datos.
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  responsabilidades: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: "Perfil",
  tableName: "perfiles",
  timestamps: false
});

// Finalmente exportamos la clase por defecto.
export default Perfil;

```

> [!IMPORTANT]
> Debería profundizar en el conocimiento de las diferentes particularidades en el mapeo de modelos, puede usar el ejemplo [Paso a Paso con Sequelize](../../../apunte-11/pap_sequelize/ecma-script-6/README.md) como punto de partida.

## Novedades en `app.js`

Como veremos a continuación en el archivo `app.js` ahora tenemos un montón de código nuevo, y esto tiene que ver con que de repente estamos amontonando todo el código de la aplicación en un solo archivo y eso es algo que vamos a tener que cambiar más adelante, pero por lo pronto vamos a encontrar en primer lugar novadeades en el arranque de la aplicación, ya no será solo `app.listen` sino que moveremos el inicio dentro de una función `start` que ejecutaremos para arrancar.

Además vamos a encontrar nuevos imports para poder utilizar los elementos de sequelize y el modelo.

Finalmente vamos a ver cambios en los endpoints que trabajamos en la versión anterior.

```javascript
// ...

// Importamos el objeto que contiene la conexión a la base de datos y la configuración de sequelize
import sequelize from "./db.js";
// Además importamos el modelo que contiene el mapeo a la tabla PERFILES de la base de datos.
import Perfil from "./models/perfil.js";

// ...

// Agregamos a la app una ruta para devolver todos los perfiles que temporalmente tenemos
//  almacenados en en un vector.
// Como novedad cabe notar que hemos cambiado la función callback a asincrónica ya que necesitaremos
//  esperar al resultado de la base de datos dentro.
app.get("/api/perfiles", async (req, res) => {
  // Aquí seguimos necesitando los perfiles ordenados por nombre pero ahora los vamos a recuperar
  //  desde la base de datos
  // Por otro lado el ordenamiento va a pasar a ser una responsabilidad de la base de datos.
  // Para ello vamos a utilizar el método `findAll` de los modelos sequelize.
  const filasPerfiles = await Perfil.findAll({
    order: [["nombre", "ASC"]]
  });
  // Luego nos vemos a quedar solo con la vista de perfiles que necesitamos
  //  si revisamos lo que devuelve findAll vamos a encontrar objetos con la estructura
  //  que requiere Sequelize para administrar la sincronización de estas entidades con la bd.
  // Por ello vamos a mapear a objetos Perfil simples.

  const perfilesResult = filasPerfiles.map((perfil) => ({
    id: perfil.id,
    nombre: perfil.nombre,
    responsabilidades: perfil.responsabilidades
  }));

  res
    .status(200)
    .json(perfilesResult);
});

// Agregamos otra ruta para devolver un perfil especifico en base a su Id
// Notar nuevamente que la función callback vuelve a ser asincrónica
//  ya que deberá esperar la respuesta de la base de datos
app.get("/api/perfiles/:id", async (req, res) => {
  // En primer lugar debemos recuperar el valor del Id, pero ahora no es parte del queryString
  //  sino que es parte de la URI. Vamos a usar `req.params`
  const paramId = req.params.id || "Error";

  // Convertimos el parámetro a Entero
  const perfilId = parseInt(paramId, 10);
  if (Number.isNaN(perfilId)) {
    // Si no logramos obtener el parámetro hay un error en el request
    // Bad Request
    res.status(400).json({ error: "Parámetros incorrecto..." });
    return;
  }
  // Con el parámetro vamos a solicitar a sequelize que materialice el modelo que corresponde
  //  con la fila que tiene Clave Primaria igual al parámetro recibido
  const perfil = await Perfil.findByPk(perfilId);
  // Si no encontramos un perfil respondemos que no existe el perfil con ese id
  if (perfil === null) {
    res.status(204).json({ error: "Perfil no encontrado" }); // No Content
    return;
  }

  // Si llegamos aquí todos felices y devolvemos el perfil encontrado.
  res
    .status(200)
    .json(perfil);
});

// ...

(async function start() {
  try {
    // Lo primero que vamos a intentar es la conexión a la base de datos que intentamos con
    //  el método authenticate.
    // Notar que es un comportamiento de E/S por lo que con await vamos a esperar su resultado.
    await sequelize.authenticate();
    // En el caso de que resulte exitosos simplemente escribimos un log.
    console.log("✔ Conexión establecida con la base de datos");
  }
  catch (error) {
    // Y en el caso de error vamos a mostrar un error y vamos a finalizar el proceso.
    console.error("❌ Error al conectar con la base de datos:", error);
    process.exit(-1);
  }

  // Iniciar servidor
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}());

```

### Explicación

En este caso la explicación de las novedades del app.js ameritan un trabajo más detallado.

- _**`import`s**_ en primer lugar vamos a encontrar nuevos imports ya que necesitamos enlazar con los nuevos objetos correspondientes con el contexto de ORM y con el Modelo mapeado a la tabla.
- _**Get de `/api/perfiles`**_ en segundo lugar vamos a revisar la programación de la respuesta al endpoint `/api/perfiles` que devuelve todos los perfiles de la base de datos.  
  En este caso lo primero a revisar es que la función callback es `async` lo que avisa a Nodejs que esta función contiene un proceso de E/S y por lo tanto tiene que ser tratada de forma asincrónica.  
  La otra novedad es la utlización del la función `Perfil.findAll` notar que esta función la heredamos de `Model` de sequelize cuando hicimos `class Perfil extends Model` y es la encargada fundamental de provocar una consulta a la base de datos de acuerdo con el mapeo del modelo.
  La respuesta que recibimos de dicha función es un array de objetos que sequelize prepara para lograr administrar la sincronización de los mismos con la base de datos. Por esto para devolver solo los valores que nos interesan vamos a utilizar getters por defecto para las propiedades mapeadas.
  ➡️ Sequelize tiene implementado getters automáticos en la instancia, que brindan acceso automático a los atributos que existen dentro de la propiedad `dataValues` del objeto resultante de `findAll`.  
  Es decir:  
  Cuando accedemos a perfil.id internamente Sequelize redirige la lectura a perfil.dataValues.id  
  Lo mismo pasa con perfil.nombre, perfil.responsabilidades, etc.  
  Este comportamiento es deliberado y está hecho para que puedas tratar una fila como un objeto plano en lugar de tener que escribir todo el tiempo perfil.dataValues.nombre (lo cual sería muy incómodo).
- _**Get de `/api/perfiles/:id`**_ ahora toca revisar la programación de la respuesta al endpoint `/api/perfiles/:id` que devuelve el perfil con la clave primaria suministrada en el parámetro id.  
  En este caso no hay muchas novedades ya que mantuvimos la programación defensiva del ejemplo anterior y al obtener finalmente el id correcto lo utilizamos para enviar la búsqueda a la base de datos.  
  Para la búsqueda utilizamos `findByPk` que recibe la clave primaria para realizar la búsqueda, esta función devuelve un solo objeto por lo que simplemente debemos devolverlo.
  Solo un detalle, hemos cambiado el control de encontrado por `=== null` en lugar del control anterior y esto se debe a que `findByPk` devuelve null en caso de no encontrar una clave primaria que coincida con el parámetro enviado.
- _**Función `start()`**_ finalmente toca el turno de la función start, aquí lo primero que podemos notar es que movimos el inicio del servidor a una función en lugar de solo dejar el `app.listen` como en versiones anteriores. Esto se debe a que en la función vamos a llevar a cabo al menos dos tareas fundamentales, a saber:
  - En primer lugar tratar de realizar la conexión a la base de datos para determinar su existencia y disponibilidad mediante la función `sequelize.authenticate`, notar que hemos ubicado este segmento dentro de un bloque try - catch y en el caso de error simplemente finalizamos el servidor.
  - En segundo lugar y finalmente sí, realizar el inicio del servidor como lo hacíamos regularmente.

---

## 📦 Instalación y ejecución

No hay novedades en cuanto a inicializar las dependencias y poner el servidor en marcha.

```bash
npm run dev
```

## 🧪 Pruebas con REST Client (`prueba.rest`)

### Prueba del endpoint `/api/perfiles`

```http
### Obtener la respuesta del endpoint `/api/perfiles` que devuelve los perfiles ordenados alfabéticamente
GET http://localhost:3000/api/perfiles
Accept: application/json

```

#### Resultado esperado

- Código 200 OK
- JSON:

Si bien el resultado final es el mismo que en la versión anterior:  
![picture 0](../../../images/31f238d87c5a413e6931861146f4713818ef2a1e35d510d27b8757660cab1138.png)  
podemos observar en la consola del servidor la consulta que se envía a la base de datos:  
![picture 6](../../../images/c1b4deecb862999c309d3f8a67502c9f3c529fc7e21903090d206f480b03eed7.png)  

### Prueba del endpoint `/api/perfiles/:id`

```http
### Obtener la respuesta del endpoint `/api/perfiles/:id` que devuelve el perfil con el id especificado
GET http://localhost:3000/api/perfiles/2
Accept: application/json

```

#### Resultado esperado con id = 2

- Código 200 OK
- JSON:

Similar al caso anterior, si bien el resultado es el mismo:  
![picture 1](../../../images/fb16ae0bfcfe8cc7c8fd5cd91bf634075992367ded9bd28bbbb76154275763a9.png)  
podemos observar la consulta:  
![picture 7](../../../images/a1724a37b9e83c065498d775b451aad2e53a31483de60a25206ec71d5d0064f0.png)  

Nuevamente hay pruebas que se puede hacer en base a esta última versión, por ejemplo se pueden probar alternativas del endpoint `/api/perfiles/:id`:

- Se puede probar enviar un id inexistente
- Se puede probar enviar algo que no se pueda convertir a una cadena
- Finalmente se puede probar no enviar nada, aunque en este caso deberíamos poder anticipar el resultado.
