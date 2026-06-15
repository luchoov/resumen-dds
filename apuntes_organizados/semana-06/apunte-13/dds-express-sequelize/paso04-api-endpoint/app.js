import express from "express";

const app = express();
const PORT = 3000; // Definido directamente, sin usar process.env

// Array con perfiles constantes que vamos a usar como source de nuestro endpoint
const perfiles = [
  { id: 1, nombre: "Analista Funcional", responsabilidades: "Relevar requisitos, documentar funcionalidades, interactuar con el cliente." },
  { id: 2, nombre: "Desarrollador", responsabilidades: "Implementar funcionalidades, corregir errores, participar en revisiones de código." },
  { id: 3, nombre: "Scrum Master", responsabilidades: "Facilitar el proceso ágil, remover impedimentos, liderar las ceremonias Scrum." },
  { id: 4, nombre: "Product Owner", responsabilidades: "Definir backlog del producto, priorizar funcionalidades, representar al cliente." },
  { id: 5, nombre: "Tester", responsabilidades: "Diseñar casos de prueba, ejecutar pruebas manuales y automáticas, reportar bugs." },
  { id: 6, nombre: "Stakeholder", responsabilidades: "Interesado en el producto o proyecto, puede aportar requisitos o feedback." }
];
// En las versiones siguientes estos perfiles vendrán de una base de datos

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
app.get("/api/perfiles", (req, res) => {
  // Sin embargo tengamos en cuenta que estos perfiles están ordenados por Id de base de datos y
  //  lo lógico sería devolverlos ordenados alfabéticamente, por ello los ordenamos primero.
  const perfilesOrdenados = perfiles.toSorted((a, b) => a.nombre.localeCompare(b.nombre));

  res
    .status(200)
    .json(perfilesOrdenados);
});

// Agregamos otra ruta para devolver un perfil especifico en base a su Id
app.get("/api/perfiles/:id", (req, res) => {
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
  // Con el parámetro intentamos la búsqueda del perfil en el array
  const perfil = perfiles.find((e) => e.id === perfilId);
  // Si no encontramos un perfil respondemos que no existe el perfil con ese id
  if (perfil === undefined) {
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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
