# 📦 Paso 2: Primer Endpoint - `/health-check`

## Novedades en `package.json`

- No hay cambios respecto al paso anterior.

## Librerías agregadas

- No hay nuevas librerías.

## Sentencias nuevas en `app.js`

```javascript

// Le agregamos a la aplicación una nueva ruta
// Y programamos la forma en la que la aplicación va a responder a esta ruta / endpoint
app.get('/health-check', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

```

> - Método: `GET`
> - Devuelve un JSON con estado del servidor.
>
> ```json
> {
>   "status": "ok",
>   "timestamp": "2024-04-17T12:00:00.000Z"
> }
> ```

### Explicación

- Se define un endpoint `/health-check`.
- Responde con un objeto JSON que incluye el estado y el timestamp actual.

## 📁 Estructura del proyecto

```sh
paso02-endpoint/
├── .gitignore
├── .eslintrc.json       # Reglas de estilo y linting (opcional)
├── app.js               # Servidor Express con endpoints iniciales
├── package.json         # Configuración del proyecto Node.js
└── pruebas.rest         # Archivo para probar la API desde VS Code
```

---

## 📦 Instalación y ejecución

```bash
npm install
npm run dev
```

> **Nota:** si bien podríamos ejecutar normalmente con `npm start`, proponemos el uso de una herramienta que además de iniciar el servidor queda pendiente de cualquier edición en los archivos de código y al detectar un cambio provoca un reinicio del servidor de forma que podemos realizar cambios en el código y probarlos sin tener que reiniciar el servidor de forma manual.  
> Para ello vamos a utilizar el script `dev` que hemos agregado en `package.json`
>
> ```json
>   "scripts": {
>    "start": "node app.js",
>    "dev": "node --watch app.js",
>    "lint": "eslint .",
>    "lint:fix": "eslint --fix .",
>    "test": "echo \"Error: no test specified\" && exit 1"
>  },
> ```
>
> En el presente script estamos usando `node --watch app.js` donde la opción `--watch` es la que indica que node se quedará observando si se realizan cambios en los archivos. Adoptamos esta versión que no requiere extensión alguna frente al tradicional nodemon como conversamos con Mauricio en clase. Sin embargo cabe aclarar que para proyectos grandes y complejos aún se recomienda utilizar una herramienta específica como nodemon o alguna otra.  
> Al jecutar en este modo vamos a ver la siguiente consola que nos informa la ejecucución:
>
> ![picture 1](../../../images/881b0cd7355f82713798124f6fb8f76208cde08fce1cf0e54e5638527369ae8b.png)  
>
> Y en el caso de editar uno de los archivos de la aplicación, veremos:
>
> ![picture 2](../../../images/eb85530d4132365e3956a20605c45ad3f2d589003655f575e65bc83d1d648604.png)  

---

## 🧪 Pruebas con REST Client (`prueba.rest`)

Ahora tenemos que probar nuestro primer endpoint, para realizar la prueba de la librería podríamos hacerlo con el browser, o con una herramienta del estilo de Bruno o Postman.  
Sin embargo aquí vamos a proponer el uso de una extensión de VS Code que nos permite realizar la prueba desde un archivo de texto. Esta extensión es Rest Client:

![picture 0](../../../images/1df3bcc9594dd5b725be12be0496a504309048d34d18e07543ad9dba68125a89.png)  

Para interactuar con la extensión solo debemos agregar al proyecto un archivo con la extensión `.rest` o `.http` y en el contenido anteponer un encabezado con `###` 3 numerales o almoadillas seguidas, a continuación se puede ver un ejemplo de la prueba del endpoint `health-check`

```http
### Prueba Health Check
GET http://localhost:3000/health-check
Accept: application/json

```

### Resultado esperado

- Código 200 OK
- JSON:

```json
{
  "status": "ok",
  "timestamp": "2024-04-17T12:00:00.000Z"
}
```

### Archivo `prueba.rest`

![picture 3](../../../images/1f05d665a6c5175ba71787b724edf2ab6e4db87b5dadea13741fe476ca1c1826.png)  

#### Resultado

Al hacer click en send request, se abrirá una pestaña nueva con el resultado:

![picture 4](../../../images/8de06be9465e65095407b3d4e0cabdbcdaa1d60122e0e273fdb84a47cf626c4a.png)  
> Donde se puede observar la cabecera HTTP con el código de estado, y el cuerpo de la respuesta con el objeto JSON.
