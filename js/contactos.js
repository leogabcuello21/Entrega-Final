document.addEventListener('DOMContentLoaded', () => {
    const destino = localStorage.getItem('destino_interesado');

    if (destino) {
        const campoMensaje = document.getElementById('mensaje');
        if (campoMensaje) {
            campoMensaje.value = `Hola, estoy interesado en el destino ${destino} por favor me brindarían mas informacion. Muchas gracias`;
        }
        localStorage.removeItem('destino_interesado');
    }

    const formulario = document.getElementById('formulario');

    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault();
            alert("El mensaje fue enviado, gracias por contactarnos.");
            formulario.reset();
        });
    }
});