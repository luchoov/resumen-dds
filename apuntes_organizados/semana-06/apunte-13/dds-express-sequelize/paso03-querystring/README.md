# 📦 Paso 3: Endpoint con QueryString - `/echo`

## Novedades en `package.json`

- No hay cambios.

## Librerías agregadas

- No hay nuevas librerías.

## Sentencias nuevas en `app.js`

```javascript
// Le agregamos a la aplicación una nueva ruta
// Ruta de echo: repite el mensaje recibido como parte del querystring
// Y programamos la forma en la que la aplicación va a responder a esta ruta / endpoint
// Agregamos también un elemento a notar que no habíamos mencionado específicamente:
//  el callback que enviamos a `app.get` luego de la ruta recibe dos parametros 
//  el request y el response
app.get("/echo", (req, res) => {
    // En primer lugar extraemos de la propiedad query del request la clave 'mensaje'
    //  si ese primer bloque resultara en falsy, se asignará el bloque que está después de ||
    let mensaje = req.query.mensaje || "No se recibió ningún mensaje...";
    // Controlamos si efectivamente recibimos un mensaje y en ese caso duplicamos la cadena
    if (mensaje !== "No se recibió ningún mensaje") mensaje += ` ${mensaje}`;
    // Respondemos utilizando el response para indicar que el estado es 200 - OK y 
    //  el resultado un obj JSON
    res.status(200).json({ recibido: mensaje });
});

// Además hemos agregado al servidor la capacidad de responder a una ruta inexistente con el código de estado correcto
// Middleware para manejar rutas no encontradas
//  el concepto de Middleware lo vamos a revisar la próxima semana pero completa esta primera versión.
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

```

## Explicación

- Se define un endpoint `/echo`.
- Lee el parámetro `mensaje` del querystring.
- Responde repitiendo el mensaje dos veces separado por un espacio.

## 📁 Estructura del proyecto

Se mantiene la estructura del proyecto similar al paso anterior.

```sh
paso01-start/
├── .gitignore
├── .eslintrc.json       # Reglas de estilo y linting (opcional)
├── app.js               # Servidor Express con endpoints iniciales
├── package.json         # Configuración del proyecto Node.js
└── prueba.rest            # Archivo para probar la API desde VS Code
```

---

## 📦 Instalación y ejecución

No hay novedades en cuanto a inicializar las dependencias y poner el servidor en marcha.

```bash
npm install
npm run dev
```

## 🧪 Pruebas con REST Client (`prueba.rest`)

```http
### Prueba Echo
GET http://localhost:3000/echo?mensaje=hola
Accept: application/json
```

## Resultado esperado

- Código 200 OK
- JSON:

```json
{
  "recibido": "hola hola"
}
```

### Archivo `prueba.rest` completo

![picture 0](../../../images/a70b6ce9fe99a37796954991367f7c0924213310f276ffc71934b13a1d8c7564.png)  
> aquí podemos ver varias pruebas y trataremos de analizar cada una

#### Prueba `/echo`

En el caso de ejecutar el endpoint `/echo` sin el parámetro mensaque que espera:

![picture 1](../../../images/ae0655377c32c2d7536488a06f5fc92decadca4f88148fa6d63fd6ada51e4150.png)  
> Cabe aclarar que si se ejecuta la prueba sin estar el servidor iniciado no se obtendrá respuesta y veremos:  
> ![picture 2](../../../images/a4d18b9e2e7c7390e62add07d10ad81299dd8012ef345aed83132b59e668dbd8.png)  
> en la esquina inferior derecha.
> Ahora si, si probamos con el servidor iniciado, el resultado será el esperado con el texto que informa que no se recibió ningún mensaje:  
> ![picture 3](../../../images/e0b4b8663a54d6a59b8aee92cb1c1f1d4195af28d5fc555422c7df0663afd8a5.png)  

#### Prueba `/echo?mensaje=Hola`

En el caso de ejecutar el endpoint `/echo` con el parámetro mensaque que espera:

![picture 4](../../../images/ee29a2ec02353d386b6defe44eba228147f1d9e66816d743c0d6d9b4b463019b.png)  
> Obtendremos la salida esperada para el proceso completo  
> ![picture 5](../../../images/eabfbd4f3fc518f1581800e4ab0c9e81d7b0ec3189f75dc39df9716b97cf8db5.png)  

Una prueba que se puede hacer en base a esta última versión es investigar el funcionamiento del parámetro `query` del request enviando más parámetros.
