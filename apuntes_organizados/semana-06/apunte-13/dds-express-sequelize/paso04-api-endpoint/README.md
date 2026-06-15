# 📦 Paso 4: Endpoint `/api/perfiles`

## Novedades en `package.json`

- No hay cambios.

## Librerías agregadas

- No hay nuevas librerías.

## Sentencias nuevas en `app.js`

```javascript

// ...

// Le agregamos al `app.js` un array constante a modo de Mock con los perfiles que luego tendremos que obtener de la bd
// Array con perfiles constantes que vamos a usar como source de nuestro endpoint
const perfiles = [
  { id: 1, nombre: "Analista Funcional", responsabilidades: "Relevar requisitos, documentar funcionalidades, interactuar con el cliente." },
  { id: 2, nombre: "Desarrollador", responsabilidades: "Implementar funcionalidades, corregir errores, participar en revisiones de código." },
  { id: 3, nombre: "Scrum Master", responsabilidades: "Facilitar el proceso ágil, remover impedimentos, liderar las ceremonias Scrum." },
  { id: 4, nombre: "Product Owner", responsabilidades: "Definir backlog del producto, priorizar funcionalidades, representar al cliente." },
  { id: 5, nombre: "Tester", responsabilidades: "Diseñar casos de prueba, ejecutar pruebas manuales y automáticas, reportar bugs." },
  { id: 6, nombre: "Stakeholder", responsabilidades: "Interesado en el producto o proyecto, puede aportar requisitos o feedback." }
];

// ...

// Le agregamos a la aplicación una nueva ruta
// Ruta `/api/perfiles`para devolver todos los perfiles que temporalmente tenemos en el array
// Y programamos la forma en la que la aplicación va a responder a esta ruta / endpoint ordenando los valores alfabéticamente por nombre.
app.get("/api/perfiles", (req, res) => {
  // Ordenados alfabéticamente por nombre, por ello los ordenamos primero.
  const perfilesOrdenados = perfiles.toSorted((a, b) => a.nombre.localeCompare(b.nombre));
  // Luego respondemos con el resultado
  res
    .status(200)
    .json(perfilesOrdenados);
});

// Le agregamos a la aplicación otra nueva ruta
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

  // Con el parámetro convertido a entero intentamos la búsqueda del perfil en el array
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

// ...
```

## Explicación

- Se define un array con perfiles Mock para hacer pruebas.
- Luego se define un endpoint `/api/perfiles` que devuelve todos los perfiles del array ordenados alfabéticamente
- Luego se define otro endpoint `/api/perfiles/:id` que devuelve el perfil con id igual a :id, donde también implementamos un poco de programación defensiva y código seguro.

## 📁 Estructura del proyecto

Se mantiene la estructura del proyecto similar al paso anterior.

```sh
paso04-api-endpoint/
├── .gitignore
├── .eslintrc.json       # Reglas de estilo y linting (opcional)
├── app.js               # Servidor Express con endpoints iniciales
├── package.json         # Configuración del proyecto Node.js
└── prueba.rest          # Archivo para probar la API desde VS Code
```

---

## 📦 Instalación y ejecución

No hay novedades en cuanto a inicializar las dependencias y poner el servidor en marcha.

```bash
npm install
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

![picture 0](../../../images/31f238d87c5a413e6931861146f4713818ef2a1e35d510d27b8757660cab1138.png)  

### Prueba del endpoint `/api/perfiles/:id`

```http
### Obtener la respuesta del endpoint `/api/perfiles/:id` que devuelve el perfil con el id especificado
GET http://localhost:3000/api/perfiles/2
Accept: application/json

```

#### Resultado esperado con id = 2

- Código 200 OK
- JSON:

![picture 1](../../../images/fb16ae0bfcfe8cc7c8fd5cd91bf634075992367ded9bd28bbbb76154275763a9.png)  

Nuevamente hay pruebas que se puede hacer en base a esta última versión, por ejemplo se pueden probar alternativas del endpoint `/api/perfiles/:id`:

- Se puede probar enviar un id inexistente
- Se puede probar enviar algo que no se pueda convertir a una cadena
- Finalmente se puede probar no enviar nada, aunque en este caso deberíamos poder anticipar el resultado.
