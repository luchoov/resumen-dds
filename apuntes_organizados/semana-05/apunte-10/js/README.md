# Semana 5 - Ejercicio paso a paso

## Práctico

Estructura de [ejercicio-integrador](js/ejercicio-integrador)

```bash
    modulos-con-json
    ├── acceso-a-datos
    │   └── farmacias.datos.js
    ├── entidades
    │   └── farmacia.js
    ├── logica-de-negocio
    │   └── farmacias.servicio.js
    ├── index.js
    └── package.json
```

1. Leer un conjunto de datos en formato .json de uno de los siguientes open data:
    - [data.world](https://data.world/datasets/json)
    - [Datos Argentina](https://datos.gob.ar/)
      Ejercicio realizado con el json de [salud-listado-establecimientos-farmacias](https://datos.gob.ar/dataset/salud-listado-establecimientos-farmacias)
2. Configurar el archivo [`package.json`](js/ejercicio-integrador/package.json) para utilizar ES6.
3. Identificar las propiedades de la entidad y otras posibles entidades, puede considerar herencias. Puede usar [jsonformatter](https://jsonformatter.curiousconcept.com/#) para formatear el json de un objeto e identificar sus propiedades.
   ![img.png](js/ejercicio-integrador/acceso-a-datos/json-formatter.png)
4. Cargar los datos del json en un array, crear las clases que hagan falta.
5. Crear un `.servicio.js` que tenga como propiedad el array y tenga un metodo para cargar dicho array. Además debe tener 4 funciones que apliquen filtros a los datos cargados en el correspondiente  y aplicarlos. Por ejemplo:
    - Obtener la cantidad de farmacias de la localidad Córdoba.
    - Obtener la farmacia cuyo nombre coincida con un string.
    - Listar todas las descripciones de tipologías que existen.
    - ¿Cual es la provincia con más farmacias?
6. Imprimir cada resultado desde el `index.js`
7. Ejemplo de salida:
   ![img.png](resultado-consola.png)

## Bibliografía

- [Página oficial Node](https://nodejs.org/dist/latest-v16.x/docs/api/esm.html)
- [Arrays javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Función experimental group](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/group)