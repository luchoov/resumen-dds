# 📦 Paso 1: Hola Mundo Express

## Novedades en `package.json`

- Inicialización básica con `npm init -y`
- Instalación de **Express**:

  ```bash
  npm install express
  ```

![picture 0](../../../images/eea96978731150e3d0deb99cbc3ff8e7d500ab137a2bda4c04128de8177a2ae1.png)  

## Librerías agregadas

- **express**: Framework web minimalista para construir APIs de manera sencilla y organizada.

### Archivo `package.json`

![picture 1](../../../images/e16b15fca18d604cb277af77ddb59c2a6d21020be710f00d16fbcbd214bc84bd.png)  

## Creamos un nuevo archivo `app.js`

```javascript
// Importamos express
import express from 'express';

// Construimos la aplicación
const app = express();
const PORT = 3000;

// Le agregamos a la aplicación una nueva ruta para el verbo GET
// Definimos el proceso que de respuesta a una petición a la raíz del servidor
app.get('/', (req, res) => {
  // Usamos send para enviar la respuesta lo que automáticamente establece el contenido a HTML
  //  y el estado de la respuesta a 200 - OK
  res.send("<h1>¡Hola Mundo desde Express!</h1>"); // En el ejemplo hemos agregado algo más de HTML
});

// Y luego iniciamos el servidor
// `listen(...)` es una función que inicia el servidor y ejecuta el callback opcional que enviamos 
//  cuando el servidor ya se inició
app.listen(PORT, () => {
  // cuando se imprima el log en la consola es porque el servidor ya está iniciado y escuchando.
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
```

### Explicación

- `express()` crea una nueva aplicación Express.
- `app.get('/', ...)` define un endpoint raíz que responde con HTML.
- `app.listen(...)` inicia el servidor en el puerto 3000 e imprime un mensaje en consola.

## 📁 Estructura del proyecto

```sh
paso01-start/
├── app.js               # Servidor Express con endpoints iniciales
├── package.json         # Configuración del proyecto Node.js
├── .gitignore
└── .eslintrc.json       # Reglas de estilo y linting (opcional)
```

---

## 📦 Instalación y ejecución

```bash
npm install
npm start

```

![picture 0](../../../images/c01c435c2cb34f60080482cb1b925e1127da7b6b68f31b34e640634aa72fdc45.png)  

Luego abrí tu navegador en:  
👉 `http://localhost:3000/`

![picture 1](../../../images/831e39cdd77d913439f3ad0760c15cbf4970e1fb61d6dcec0bb4f1c53f0f6777.png)  
