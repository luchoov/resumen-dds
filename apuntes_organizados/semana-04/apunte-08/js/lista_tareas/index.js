/**
 * Este código se utiliza para esperar a que se cargue completamente el contenido HTML y 
 * los recursos asociados en el documento antes de ejecutar el código JavaScript. Cuando el 
 * navegador termina de analizar el documento HTML, construye el DOM (Modelo de Objetos del Documento) 
 * que representa la estructura de la página. 
 * DOMContentLoaded es un evento que se dispara cuando el navegador ha terminado de cargar el DOM.
 * 
 * IMPORTANTE: otra forma es utilizar window.onload, que es un evento que se dispara cuando todo el contenido 
 * de la página, incluidos los recursos externos como imágenes y hojas de estilo, se ha cargado completamente. 
 * Sin embargo, a diferencia de DOMContentLoaded, onload espera a que todos los recursos externos se hayan cargado 
 * también, lo que puede retrasar la ejecución del código JavaScript. 
 * En código window.onload:
        window.onload = function() {
            // Código a ejecutar cuando la página y todos los recursos estén completamente cargados
        };
 * Sin embargo, es importante tener en cuenta que window.onload puede ser menos eficiente que DOMContentLoaded 
 * si se tienen muchos recursos externos en tu página, ya que esperará a que todos estos se carguen. 
 * En general, se prefiere DOMContentLoaded cuando solo se necesita esperar a que el DOM esté listo.
 */

document.addEventListener('DOMContentLoaded', function () {
    const formulario = document.getElementById('formulario');
    const listaTareas = document.getElementById('lista-tareas');

    /**
     * Este código se utiliza para escuchar el evento de envío (submit) de un formulario específico y 
     * ejecutar una función cuando este evento ocurra. addEventListener es un método que se puede utilizar 
     * en cualquier elemento del DOM para registrar un escucha de eventos. 
     * En este caso, estamos registrando un escucha de eventos en el formulario HTML específico (formulario) 
     * para el evento de envío (submit). Cuando el usuario envía el formulario (por ejemplo, haciendo clic en 
     * un botón de enviar), se dispara el evento submit. 
     * La función que se pasa como segundo argumento (function (event) { }) se ejecutará en respuesta a este evento. 
     * El parámetro event contiene información sobre el evento que se ha disparado, como el elemento objetivo del evento 
     * (en este caso, el formulario) y los datos del formulario enviado.
     */
    formulario.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

        const tareaInput = document.getElementById('tarea');
        const tarea = tareaInput.value.trim(); // Obtener el valor de la tarea y eliminar espacios en blanco al inicio y al final

        if (tarea !== '') { // Verificar que la tarea no esté vacía
            const listItem = document.createElement('li');
            listItem.textContent = tarea;
            listItem.classList.add('list-group-item');

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'float-right');
            botonEliminar.addEventListener('click', function () {
                listaTareas.removeChild(listItem);
            });

            listItem.appendChild(botonEliminar);
            listaTareas.appendChild(listItem);

            tareaInput.value = ''; // Limpiar el campo de entrada después de agregar la tarea
        } else {
            alert('Por favor ingresa una tarea válida.');
        }
    });
});
