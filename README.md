# 🇧🇷 Destinos en Brasil - Entrega Final

¡Bienvenido al repositorio de la entrega final del proyecto **Destinos en Brasil**! Esta aplicación web interactiva está diseñada para ayudar a los usuarios a explorar, elegir y gestionar de manera persistente sus destinos turísticos preferidos en Brasil.

---

## 🚀 Características Principales

- **Diseño Adaptativo e Interactividad Visual:** Integración de un carrusel dinámico en la página principal utilizando componentes nativos de **Bootstrap 5**.
- **Arquitectura de Maquetación Moderna:** Estructuración de las tarjetas de destinos mediante **CSS Grid** (`repeat(auto-fit, minmax(250px, 1fr))`), garantizando una experiencia de usuario fluida y completamente *responsive* en dispositivos móviles, tablets y ordenadores.
- **Persistencia de Datos (Local Storage):** Motor en JavaScript encargado de recordar la selección del usuario. Si un usuario selecciona un destino, este se guarda en el navegador de forma indefinida hasta que decida removerlo.
- **Formulario Validado:** Sección dedicada a la captura de datos de contacto estructurada de forma accesible y estilizada.

---

## 🛠️ Tecnologías Utilizadas

La solución fue construida utilizando tecnologías estándares del ecosistema web moderno:

*   **HTML5:** Estructuración semántica del contenido (`<header>`, `<main>`, `<section>`, `<footer>`).
*   **CSS3 Vanilla:** Estilos personalizados, animaciones de transición (`transition: transform 0.3s ease`), comportamiento de scroll suave (`scroll-behavior: smooth`) y layouts con CSS Grid y Flexbox.
*   **Bootstrap 5:** Implementación rápida de componentes interactivos estables como el Carrusel de imágenes y tipografías responsivas.
*   **JavaScript (ES6+):** Lógica funcional estructurada de forma modular para la manipulación del DOM y gestión de eventos.
*   **FontAwesome:** Kit de iconos vectoriales para los enlaces de redes sociales y datos de contacto del pie de página.

---

## ⚙️ Lógica de Negocio y Persistencia (JavaScript)

El núcleo funcional reside en `js/main.js`, el cual ejecuta un ciclo de vida controlado sobre los destinos elegidos:

1. **Lectura Inicial:** Al cargar la página, se realiza un *parseo* del `localStorage` buscando la clave `destinosElegidos`. Si existen registros previa selección, los botones se renderizan automáticamente en estado `"Borrar selección"`.
2. **Generación de Identificadores Únicos:** Mediante la función `generarDestinoId()`, el script normaliza los títulos de las tarjetas (por ejemplo: transforma `"Rio de Janeiro"` en `"rio-de-janeiro"`) para asegurar la consistencia de los datos binarios.
3. **Alternancia de Estados (Toggle):** El evento *click* del botón evalúa la existencia del identificador para decidir si ejecuta la función `agregarDestino()` guardando la estampa temporal en formato ISO (`new Date().toISOString()`) o la remoción mediante `eliminarDestino()`.

---

## 📂 Estructura del Proyecto

```text
├── index.html               # Vista principal de la aplicación (Landing Page y Grid de Destinos)
├── css/
│   └── styles.css           # Estilos globales, variables visuales y Media Queries
├── js/
│   └── main.js              # Controlador principal e interacciones de LocalStorage
├── paginas/
│   └── contacto.html        # Formulario estructurado para registro de usuarios
└── Img/                     # Recursos visuales e iconografía del proyecto