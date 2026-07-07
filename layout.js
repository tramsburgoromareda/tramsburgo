const layoutConfig = {
  nombre: "Cervecería Tramsburgo",
  icono: "assets/favicon.png",
  telefono: "976-965-079",
  telefonoHref: "tel:976-965-079",
  subtitulos: {
    inicio: "Tapas · Copas · Buen ambiente",
    carta: "Carta del bar",
    contacto: "Contacto y ubicación",
  },
  titulos: {
    inicio: "Inicio",
    carta: "Carta",
    contacto: "Contacto",
  },
  navegacion: [
    { id: "inicio", href: "index.html", icono: "🏠", texto: "Inicio" },
    { id: "carta", href: "carta.html", icono: "🍽️", texto: "Carta" },
    { id: "contacto", href: "contacto.html", icono: "📍", texto: "Contacto" },
  ],
};

function obtenerPaginaActual() {
  return document.body.dataset.page || "inicio";
}

function crearHeader(paginaActual) {
  const subtitulo = layoutConfig.subtitulos[paginaActual] || layoutConfig.subtitulos.inicio;

  return `
    <header class="topbar">
      <a href="index.html" class="brand" aria-label="Ir al inicio">
        <div class="brand-mark">
          <img src="${layoutConfig.icono}" alt="" />
        </div>
        <div>
          <strong>${layoutConfig.nombre}</strong>
          <small>${subtitulo}</small>
        </div>
      </a>
      <a class="pill" href="${layoutConfig.telefonoHref}">Llamar</a>
    </header>
  `;
}

function crearNavegacion(paginaActual) {
  const enlaces = layoutConfig.navegacion
    .map((item) => {
      const claseActiva = item.id === paginaActual ? ' class="active"' : "";

      return `
        <a${claseActiva} href="${item.href}">
          <b>${item.icono}</b>
          ${item.texto}
        </a>
      `;
    })
    .join("");

  return `<nav class="bottom-nav" aria-label="Menú principal">${enlaces}</nav>`;
}

function cargarLayoutBase() {
  const paginaActual = obtenerPaginaActual();
  const header = document.querySelector("[data-layout-header]");
  const nav = document.querySelector("[data-layout-nav]");
  const titulo = layoutConfig.titulos[paginaActual] || layoutConfig.titulos.inicio;

  document.title = `${titulo} | ${layoutConfig.nombre}`;

  if (header) {
    header.outerHTML = crearHeader(paginaActual);
  }

  if (nav) {
    nav.outerHTML = crearNavegacion(paginaActual);
  }
}

cargarLayoutBase();
