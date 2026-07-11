const STORAGE_KEY = 'destinosElegidos';

function obtenerDestinosStorage() {
  const destinosJson = localStorage.getItem(STORAGE_KEY);
  return destinosJson ? JSON.parse(destinosJson) : [];
}

function guardarDestinosStorage(destinos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(destinos));
}

function destinoGuardado(id) {
  const destinos = obtenerDestinosStorage();
  return destinos.some((destino) => destino.id === id);
}

function agregarDestino(destino) {
  const destinos = obtenerDestinosStorage();
  if (!destinos.some((item) => item.id === destino.id)) {
    destinos.push(destino);
    guardarDestinosStorage(destinos);
    console.log('Destino guardado:', destino);
  }
}

function eliminarDestino(id) {
  const destinos = obtenerDestinosStorage();
  const nuevosDestinos = destinos.filter((destino) => destino.id !== id);
  guardarDestinosStorage(nuevosDestinos);
  console.log('Destino eliminado:', id);
}

function generarDestinoId(itemGrid) {
  const titulo = itemGrid.querySelector('h2')?.textContent?.trim() || '';
  return itemGrid.id || titulo.toLowerCase().replace(/\s+/g, '-');
}

function actualizarEstadoBoton(boton, guardado) {
  if (guardado) {
    boton.textContent = 'Borrar selección';
    boton.classList.add('selected-destino');
  } else {
    boton.textContent = 'Elegir destino';
    boton.classList.remove('selected-destino');
  }
}

function manejarClickDestino(event) {
  const boton = event.currentTarget;
  const itemGrid = boton.closest('.item-grid');
  if (!itemGrid) {
    console.warn('No se encontró el contenedor del destino.');
    return;
  }

  const titulo = itemGrid.querySelector('h2')?.textContent?.trim() || '';
  const destino = itemGrid.dataset.destino || titulo;
  const id = generarDestinoId(itemGrid);

  if (!destino) {
    console.warn('No se pudo obtener el destino para este elemento.', itemGrid);
    return;
  }

  if (destinoGuardado(id)) {
    eliminarDestino(id);
    actualizarEstadoBoton(boton, false);
  } else {
    agregarDestino({
      id,
      nombre: destino,
      guardadoEn: new Date().toISOString(),
    });
    actualizarEstadoBoton(boton, true);
  }
}

function inicializarBotonesDestinos() {
  const items = document.querySelectorAll('.grid-container .item-grid');

  items.forEach((itemGrid) => {
    if (!itemGrid.dataset.destino) {
      const nombre = itemGrid.querySelector('h2')?.textContent?.trim();
      if (nombre) {
        itemGrid.dataset.destino = nombre;
      }
    }

    const boton = itemGrid.querySelector('.btn-destino');
    if (boton) {
      const id = generarDestinoId(itemGrid);
      actualizarEstadoBoton(boton, destinoGuardado(id));
      boton.addEventListener('click', manejarClickDestino);
    }
  });
}

function iniciarAplicacion() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarBotonesDestinos);
  } else {
    inicializarBotonesDestinos();
  }
}

iniciarAplicacion();