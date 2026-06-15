
# Ejercicio paso a paso: calculadora

En este proyecto nos proponemos construir una calculadora con interfaz de línea de comandos.
La idea es hacerla solamente con los elementos estudiados hasta esta clase y aunque el resultado final tiene más utilidad didáctica que práctica, es posible que te sirva como primer paso para hacer otros proyectos de línea de comando.  
La calculadora tiene un funcionamiento simple:

1. Primero solicitará al usuario el operador que se usará según se quiera hacer una suma, una resta, un producto o una división
2. Después permitirá el ingreso del primer operando
3. A continuación el ingreso del segundo operando
4. Realizará el cálculo
5. Mostrará el resultado

## Paso 1: Preparar el proyecto

### Inicializar proyecto Node.js

En la consola de tu sistema operativo:

```bash
mkdir calculadora
cd calculadora
npm init -y
```

### Agregar a git (opcional)

Y si querés agregarlo a git (recomendado) podes hacer esto remplazando por la url de tu repositorio:

```bash
git init
git remote add origin https://github.com/minombre/calculadora.git
```

### Instalar paquetes

La consola (`console`) no está, inicialmente pensada para la interactividad, sino más bien para exhibir información. Por eso no tenemos un método de `console` que nos permita leer información de la consola directamente con facilidad.
Afortunadamente hay paquetes que nos proveen de esta funcionalidad.
En este caso vamos a usar el paquete _readline-sync_ cuya documentación está disponible [aquí](https://www.npmjs.com/package/readline-sync). Tené en cuenta que podés buscar y consultar la documentación de los paquetes disponibles en npm en [npmjs.com](https://www.npmjs.com/)
Si se te ocurrió preguntarte el significado del sufijo _sync_ la respuesta es que significa _síncrono_. Eso probablemente te lleve a preguntarte si existe un _readline_ asíncrono y lo cierto es que sí. En general vamos a encontrarnos con este tipo de alternativas en Node.js: módulos o funciones que tienen su versión síncrona y asíncrona. En general vamos a preferir las alternativas asíncronas y, de hecho, en la mayoría de los casos ésta es la versión por defecto. De hecho la versión asíncrona de _readline_ se llama _readline_ a secas. Los conceptos de _síncrono_ y _asíncrono_ los vamos a estudiar más adelante, no es necesario que las entiendas ahora. Sí es útil que comiences a observarlo en este contexto.
Para agregar el paquete _readline-sinc_ vamos a hacer lo siguiente dentro de la carpeta del proyecto

```bash
npm install readline-sync
```

## Paso 2: Implementar la funcionalidad básica

inicialmente vamos a concentrarnos en implementar los requerimientos definidos, a saber:
a. Solicitar al usuario la operación que se quiere realizar: suma, resta, multiplicación o división.
b. Solicitar el primer valor.
c. Solicitar el segundo valor.
d. Realizar el cálculo
e. Mostrar el resultado de la operación.

Fijate que en este paso estamos usando:

-   Declaración e inicialización de constantes y variables
-   Conversión de tipos: necesitamos convertir las entradas de los valores explicitamente a `number` para que pueda realizarse la operación de suma.
-   Estructuras condicionales (`if`, `switch`)
-   El método `question` de _readlineSync_ que me permite mostrar un texto y asignar la entrada del usuario a una variable.

Creamos el archivo [`index.js`](js/index.02.js) con el siguiente contenido

```js
"use strict";

const readlineSync = require("readline-sync");

let operador = readlineSync.question("Ingresá el operador (+, -, *, /): ");
let valorA = Number(readlineSync.question("Ingresá el primer valor (A): "));
let valorB = Number(readlineSync.question("Ingresá el segundo valor (B): "));
let resultado;

switch (operador) {
    case "+":
        resultado = valorA + valorB;
        break;
    case "-":
        resultado = valorA - valorB;
        break;
    case "*":
        resultado = valorA * valorB;
        break;
    case "/":
        resultado = valorA / valorB;
        break;
}

if (resultado !== undefined) {
    console.log(`${valorA} ${operador} ${valorB} = ${resultado}`);
} else {
    console.warn("Se produjo un error");
}
```

Cuando lo ejecutamos con ...

```bash
node index.js
```

todo debería ir bien por ahora si no cometemos errores cuando ingresamos los datos

### Paso 3: Dividir el código en funciones y agregar interactividad.

En este paso vamos a mover el cálculo del resultado a una función `calcularResultado()`. Recordá que hasta ahora hemos visto dos alternativas para definir funciones y según cual de ellas uses, el lugar dentro del programa en el que pongas la función puede ser relevante. Si podés probá ambas alternativas y fijate que sucede.

Además vamos a agregar algo más de interactividad a nuestro programa, permitiendole al usuario realizar varios cálculos hasta que salga del programa. Usaremos un bucle infinito que se va a interrumpir cuando el usuario ingrese una 'x'.

Nuestro archivo [`index.js`](js/index.03.js) queda así:

```js
"use strict";

const readlineSync = require("readline-sync");

while (true) {
    let operador = readlineSync.question(
        "\nIngresá el operador (+, -, *, /) o 'x' para salir: "
    );

    if (operador === "x") {
        console.log("¡Hasta pronto!");
        break;
    }

    let valorA = Number(readlineSync.question("Ingresá el primer valor (A): "));
    let valorB = Number(
        readlineSync.question("Ingresá el segundo valor (B): ")
    );
    let resultado = calcularResultado(operador, valorA, valorB);

    if (resultado !== undefined) {
        console.log(`${valorA} ${operador} ${valorB} = ${resultado}\n`);
    } else {
        console.warn("Se produjo un error\n");
    }
}

function calcularResultado(operador, valorA, valorB) {
    let r;
    switch (operador) {
        case "+":
            r = valorA + valorB;
            break;
        case "-":
            r = valorA - valorB;
            break;
        case "*":
            r = valorA * valorB;
            break;
        case "/":
            r = valorA / valorB;
            break;
    }
    return r;
}
```

## Paso 4: Controlando la entrada del usuario

En esta etapa vamos a hacer que nuestro programa sea más tolerante a las fallas y errores del usuario.

Esencialmente haremos que el usuario reintente la entrada hasta que esta sea válida.

Para mantener el programa principal simple, vamos a extraer esta lógica en funciones. Además podemos reutilizar la función que lee los dos valores.

Algunas de estas validaciones pueden ser implementadas mediante métodos de el módulo _readline-sync_ Si te interesa, podés profundizar leyendo la documentación e intentando alternativas.

Nuestro archivo [`index.js`](js/index.04.js) queda así:

```js
"use strict";

const readlineSync = require("readline-sync");

while (true) {
    console.log("\n");
    let operador = leerOperador();

    if (operador === "x") {
        console.log("¡Hasta pronto!");
        break;
    }

    let valorA = leerValor("A");
    let valorB = leerValor("B");
    let resultado = calcularResultado(operador, valorA, valorB);

    if (resultado !== undefined) {
        console.log(`${valorA} ${operador} ${valorB} = ${resultado}\n`);
    } else {
        console.warn("Se produjo un error\n");
    }
}

function leerOperador() {
    let operadoresValidos = "+-*/x";
    let operador = "";
    do {
        operador = readlineSync.question(
            "Ingresá el operador (+, -, *, /) o 'x' para salir: "
        );
    } while (
        !(operador.length === 1 && operadoresValidos.indexOf(operador) > -1)
    );
    return operador;
}

function leerValor(nombreVariable) {
    let valor;
    do {
        valor = readlineSync.question(`Ingresá el valor (${nombreVariable}): `);
    } while (isNaN(valor));
    return Number(valor);
}

function calcularResultado(operador, valorA, valorB) {
    let r;
    switch (operador) {
        case "+":
            r = valorA + valorB;
            break;
        case "-":
            r = valorA - valorB;
            break;
        case "*":
            r = valorA * valorB;
            break;
        case "/":
            r = valorA / valorB;
            break;
    }
    return r;
}
```

## Paso 5: Algunos cambios cosméticos

Para finalizar vamos a hacer un par de cambios para mejorar la interfaz: agregando un par de colores y separando mejor los elementos. Vos podés continuar mejorándolo.

Para colorear la salida vamos a usar un paque llamado [_chalk_](https://www.npmjs.com/package/chalk)

Por una cuestión relacionada con las formas de cargar los módulos en Node.js que veremos más adelante, no vamos a instalar la última versión del paquete sino la versión 4.0.0 que nos servirá igualmente.

Para eso ejecutamos en la consola:

```bash
npm install chalk@4.0.0
```

Una vez hechos los cambios nuestro archivo [`index.js`](js/index.05.js) queda así:

```js
"use strict";

const readlineSync = require("readline-sync");
const chalk = require("chalk");

let nSesion = 0;
while (true) {
    console.log(
        chalk.blue(
            `\n${"_".repeat(20)}  Sesion: ${++nSesion}   ${"_".repeat(20)}`
        )
    );
    let operador = leerOperador();

    if (operador === "x") {
        console.log(
            chalk.blue(`\n${"_".repeat(19)}`),
            chalk.magenta(" ¡Hasta pronto! "),
            chalk.blue(`${"_".repeat(19)}`)
        );
        break;
    }

    let valorA = leerValor("A");
    let valorB = leerValor("B");
    let resultado = calcularResultado(operador, valorA, valorB);

    if (resultado !== undefined) {
        console.log(
            chalk.green(`${valorA} ${operador} ${valorB} = ${resultado}`)
        );
    } else {
        console.warn(chalk.red("Se produjo un error"));
    }
}

function leerOperador() {
    let operadoresValidos = "+-*/x";
    let operador = "";
    do {
        operador = readlineSync.question(
            "Ingresá el operador (+, -, *, /) o 'x' para salir: "
        );
    } while (
        !(operador.length === 1 && operadoresValidos.indexOf(operador) > -1)
    );
    return operador;
}

function leerValor(nombreVariable) {
    let valor;
    do {
        valor = readlineSync.question(`Ingresá el valor (${nombreVariable}): `);
    } while (isNaN(valor));
    return Number(valor);
}

function calcularResultado(operador, valorA, valorB) {
    let r;
    switch (operador) {
        case "+":
            r = valorA + valorB;
            break;
        case "-":
            r = valorA - valorB;
            break;
        case "*":
            r = valorA * valorB;
            break;
        case "/":
            r = valorA / valorB;
            break;
    }
    return r;
}
```
