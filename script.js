const horarioBar = {
  lunes: [{ apertura: "09:00", cierre: "23:00" }],
  martes: [{ apertura: "09:00", cierre: "23:00" }],
  miercoles: [],
  jueves: [{ apertura: "09:00", cierre: "23:00" }],
  viernes: [{ apertura: "09:00", cierre: "23:00" }],
  sabado: [{ apertura: "09:00", cierre: "23:00" }],
  domingo: [{ apertura: "09:00", cierre: "23:00" }],
};

const dias = [
  { clave: "domingo", nombre: "Domingo" },
  { clave: "lunes", nombre: "Lunes" },
  { clave: "martes", nombre: "Martes" },
  { clave: "miercoles", nombre: "Miércoles" },
  { clave: "jueves", nombre: "Jueves" },
  { clave: "viernes", nombre: "Viernes" },
  { clave: "sabado", nombre: "Sábado" },
];

function horaAMinutos(hora) {
  const [horas, minutos] = hora.split(":").map(Number);
  return horas * 60 + minutos;
}

function formatearTramos(tramos) {
  if (!tramos || tramos.length === 0) {
    return "Cerrado";
  }

  return tramos
    .map((tramo) => `${tramo.apertura} - ${tramo.cierre}`)
    .join(" / ");
}

function estaDentroDelTramo(minutosActuales, tramo, vieneDeAyer = false) {
  const apertura = horaAMinutos(tramo.apertura);
  const cierre = horaAMinutos(tramo.cierre);

  if (apertura < cierre) {
    return !vieneDeAyer && minutosActuales >= apertura && minutosActuales < cierre;
  }

  return vieneDeAyer
    ? minutosActuales < cierre
    : minutosActuales >= apertura;
}

function obtenerEstadoHorario(fecha = new Date()) {
  const indiceHoy = fecha.getDay();
  const indiceAyer = (indiceHoy + 6) % 7;
  const diaHoy = dias[indiceHoy];
  const diaAyer = dias[indiceAyer];
  const minutosActuales = fecha.getHours() * 60 + fecha.getMinutes();
  const tramosHoy = horarioBar[diaHoy.clave] || [];
  const tramosAyer = horarioBar[diaAyer.clave] || [];

  const tramoNocturnoAyer = tramosAyer.find((tramo) =>
    estaDentroDelTramo(minutosActuales, tramo, true)
  );

  if (tramoNocturnoAyer) {
    return {
      abierto: true,
      dia: diaHoy.nombre,
      horarioHoy: formatearTramos(tramosHoy),
      textoEstado: `Abierto ahora · hasta ${tramoNocturnoAyer.cierre}`,
    };
  }

  const tramoActual = tramosHoy.find((tramo) =>
    estaDentroDelTramo(minutosActuales, tramo)
  );

  if (tramoActual) {
    return {
      abierto: true,
      dia: diaHoy.nombre,
      horarioHoy: formatearTramos(tramosHoy),
      textoEstado: `Abierto ahora · hasta ${tramoActual.cierre}`,
    };
  }

  const proximoTramo = tramosHoy.find(
    (tramo) => minutosActuales < horaAMinutos(tramo.apertura)
  );

  return {
    abierto: false,
    dia: diaHoy.nombre,
    horarioHoy: formatearTramos(tramosHoy),
    textoEstado: proximoTramo
      ? `Cerrado ahora · abre a las ${proximoTramo.apertura}`
      : "Cerrado hoy",
  };
}

function actualizarHorario() {
  const estado = obtenerEstadoHorario();
  const estadoElementos = document.querySelectorAll("[data-horario-estado]");
  const diaElementos = document.querySelectorAll("[data-horario-dia]");
  const horasElementos = document.querySelectorAll("[data-horario-horas]");

  estadoElementos.forEach((elemento) => {
    elemento.textContent = estado.textoEstado;
    elemento.classList.toggle("status-open", estado.abierto);
    elemento.classList.toggle("status-closed", !estado.abierto);
  });

  diaElementos.forEach((elemento) => {
    elemento.textContent = estado.dia;
  });

  horasElementos.forEach((elemento) => {
    elemento.textContent = estado.horarioHoy;
  });
}

actualizarHorario();
