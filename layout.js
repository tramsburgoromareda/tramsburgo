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
    {
      id: "inicio",
      href: "index.html",
      icono: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V21h14V9.5" />
          <path d="M9 21v-6h6v6" />
        </svg>
      `,
      texto: "Inicio",
    },
    {
      id: "carta",
      href: "carta.html",
      icono: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4h14v16H5z" />
          <path d="M8 8h8" />
          <path d="M8 12h8" />
          <path d="M8 16h5" />
        </svg>
      `,
      texto: "Carta",
    },
    {
      id: "contacto",
      href: "contacto.html",
      icono: `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11z" />
          <path d="M12 12.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4z" />
        </svg>
      `,
      texto: "Contacto",
    },
  ],
};

function obtenerPaginaActual() {
  return document.body.dataset.page || "inicio";
}

function crearHeader(paginaActual) {
  const subtitulo = layoutConfig.subtitulos[paginaActual] || layoutConfig.subtitulos.inicio;

  return `
    <header class="barra-superior">
      <a href="index.html" class="marca" aria-label="Ir al inicio">
        <div class="marca-logo">
          <img src="${layoutConfig.icono}" alt="" />
        </div>
        <div>
          <strong>${layoutConfig.nombre}</strong>
          <small>${subtitulo}</small>
        </div>
      </a>
      <a class="enlace-telefono" href="${layoutConfig.telefonoHref}">Llamar</a>
    </header>
  `;
}

function crearNavegacion(paginaActual) {
  const enlaces = layoutConfig.navegacion
    .map((item) => {
      const claseActiva = item.id === paginaActual ? ' class="activo"' : "";

      return `
        <a${claseActiva} href="${item.href}">
          <b>${item.icono}</b>
          ${item.texto}
        </a>
      `;
    })
    .join("");

  return `<nav class="navegacion-inferior" aria-label="Menú principal">${enlaces}</nav>`;
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
