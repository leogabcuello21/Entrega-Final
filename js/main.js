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

function consultarCotizacionBRL() {
  const contenedor = document.getElementById('cotizacion-brasil');
  if (!contenedor) return;

  fetch('https://open.er-api.com/v6/latest/USD')
    .then(response => {
      if (!response.ok) throw new Error('Error al consultar la API');
      return response.json();
    })
    .then(data => {

      const tasaBRL = data.rates.BRL;
      
      if (tasaBRL) {
        contenedor.innerHTML = `
          <p style="color: #fff; margin: 0;">
            <i class="fa-solid fa-money-bill-trend-up"></i> 
            <strong>Cotización del día:</strong> 1 USD = ${tasaBRL.toFixed(2)} BRL (Reales)
          </p>
        `;
      }
    })
    .catch(error => {
      console.error('Error con la API:', error);
      contenedor.innerHTML = `<p style="color: #ff9800; margin: 0;">No se pudo cargar la cotización en este momento.</p>`;
    });
}

function cargarGaleriasAPI() {
  const galerias = document.querySelectorAll('.galeria-destinos');
  
  // Clave temporal de API gratuita de Pexels (puedes crear la tuya en su web en 1 minuto)
  const API_KEY = 'bhgmIp5KkkfGXHuu8XdlFQAjyguUqY4R5t5vx0upBQZsCAkgafzZjV4Z'; 

  galerias.forEach(galeria => {
    const ciudad = galeria.dataset.keyword;
    if (!ciudad) return;

    // Buscamos fotos de la ciudad en Brasil, pidiendo exactamente 4 resultados
    fetch(`https://api.pexels.com/v1/search?query=${ciudad} Brasil&per_page=4`, {
      headers: {
        Authorization: API_KEY
      }
    })
    .then(response => {
      if (!response.ok) throw new Error('Error en API de imágenes');
      return response.json();
    })
    .then(data => {
      if (data.photos && data.photos.length > 0) {
        // Limpiamos el texto de "Cargando..."
        galeria.innerHTML = ''; 
        
        // Recorremos las 4 imágenes devueltas por la API y las inyectamos en el DOM
        data.photos.forEach(foto => {
          const imgElement = document.createElement('img');
          imgElement.src = foto.src.medium; // Tamaño mediano optimizado para web
          imgElement.alt = foto.alt || `Foto de ${ciudad}`;
          galeria.appendChild(imgElement);
        });
      }
    })
    .catch(error => {
      console.error(`No se pudo cargar la galería de ${ciudad}:`, error);
      galeria.innerHTML = '<p style="color: red; font-size: 12px;">Error al cargar imágenes</p>';
    });
  });
}

function iniciarAplicacion() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      inicializarBotonesDestinos();
      consultarCotizacionBRL(); 
    });
  } else {
    inicializarBotonesDestinos();
    consultarCotizacionBRL();   
    setInterval(consultarCotizacionBRL, 20000);
  }
}

iniciarAplicacion();