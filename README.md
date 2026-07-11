# ✈️ Proyecto Final - Destinos a Brasil

Una aplicación web moderna y dinámica diseñada para explorar diferentes opciones turísticas en Brasil, consultar datos financieros en tiempo real y gestionar la preventa de viajes a través de un canal de contacto personalizado.

---

## 🚀 Características Principales

*   **Catálogo de Destinos Dinámico:** Presentación interactiva de las principales ciudades brasileñas (Río de Janeiro, Salvador, Brasilia, Fortaleza y Recife).
*   **Integración con APIs Externas:**
    *   **Pexels API:** Renderiza galerías de imágenes en miniatura específicas para cada ciudad de forma automatizada.
    *   **ExchangeRate API:** Muestra y actualiza la cotización del Real Brasileño (BRL) respecto al Dólar (USD) en tiempo real en la barra informativa inferior.
*   **Persistencia con LocalStorage:** El sistema recuerda las elecciones del usuario mediante la clave de almacenamiento nativa y actualiza el estado visual de los botones de interacción.
*   **Formulario Inteligente:** Al seleccionar un destino específico, el sistema redirige automáticamente a la página de contacto rellenando el cuadro de mensaje con una plantilla de interés personalizada.

---

## 🛠️ Tecnologías Utilizadas

*   **HTML5** - Estructuración semántica de las vistas principales.
*   **CSS3** - Estilos personalizados estructurados mediante Flexbox y Grid Layouts responsivos.
*   **Bootstrap 5** - Implementación del Carrusel de imágenes principal e indicadores.
*   **JavaScript (ES6+)** - Manipulación del DOM, consumo de servicios asíncronos (`fetch`) y manejo de almacenamiento local.
*   **FontAwesome** - Iconografía corporativa y de redes sociales.

---

## 📂 Estructura del Proyecto

```text
├── index.html               # Página de inicio y catálogo de destinos
├── paginas/
│   └── contacto.html        # Formulario de contacto y consultas
├── css/
│   └── styles.css           # Hoja de estilos general y responsive
├── js/
│   ├── main.js              # Lógica del index, LocalStorage y consumo de APIs
│   └── contactos.js         # Lógica del formulario y alertas de envío
└── Img/
    └── [Imágenes locales]   # Logos y banners estáticos