import express from "express";
// Importamos el objeto que contiene la conexión a la base de datos y la configuración de sequelize
import sequelize from "./db.js";
// Además importamos el modelo que contiene el mapeo a la tabla PERFILES de la base de datos.
import Perfil from "./models/perfil.js";

const app = express();
const PORT = 3000; // Definido directamente, sin usar process.env

// Ruta principal con una vista "bonita" de servidor funcionando
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Servidor Express</title>
        <style>
          body {
            background-color: #f2f2f2;
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            background: #fff;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 0 12px rgba(0,0,0,0.1);
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Servidor Express Activo</h1>
          <p>API corriendo en <strong>http://localhost:${PORT}</strong></p>
        </div>
      </body>
    </html>
`);
});

// #region Paso 03
// Ruta de health-check
app.get("/health-check", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Ruta de echo: repite el mensaje recibido como query param
app.get("/echo", (req, res) => {
  let mensaje = req.query.mensaje || "No se recibió ningún mensaje";
  if (mensaje !== "No se recibió ningún mensaje") mensaje += ` ${mensaje}`;
  res.status(200).json({ recibido: mensaje });
});
// #endregion

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

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

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
