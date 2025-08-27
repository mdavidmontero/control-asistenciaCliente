export const LinksNav = [
  {
    to: "/register-attendance",
    label: "Asistencias",
    allowedRoles: [
      "ADMIN",
      "COORDINACIONTECNICA",
      "CALIDAD",
      "ADMINISTRATIVA",
      "BODEGA",
      "SISTEMAS",
      "LIMPIEZA",
      "CONTABILIDAD",
      "TRABAJADORES",
    ],
  },
  {
    to: "/history-asistencia",
    label: "Historial de Asistencias",
    allowedRoles: [
      "ADMIN",
      "COORDINACIONTECNICA",
      "CALIDAD",
      "ADMINISTRATIVA",
      "BODEGA",
      "SISTEMAS",
      "LIMPIEZA",
      "CONTABILIDAD",
      "TRABAJADORES",
    ],
  },
  {
    to: "/history-asistencias-todas",
    label: " Historico Todas las Asistencias",
    allowedRoles: ["ADMIN", "ADMINISTRATIVA"],
  },
  {
    to: "/cleaning-center",
    label: "Limpieza Centro Acopio",
    allowedRoles: ["ADMIN", "BODEGA", "LIMPIEZA"],
  },
  {
    to: "/traps-center",
    label: "Trampas Pegajosas",
    allowedRoles: ["ADMIN", "LIMPIEZA", "COORDINACIONTECNICA", "BODEGA"],
  },
  {
    to: "/cleaning-equipments",
    label: "Maquinas y Equipos",
    allowedRoles: ["ADMIN", "BODEGA", "SISTEMAS", "COORDINACIONTECNICA"],
  },
  {
    to: "/cleaning-silos",
    label: "Limpieza Silos",
    allowedRoles: ["ADMIN", "BODEGA", "CALIDAD", "COORDINACIONTECNICA"],
  },
  {
    to: "/visit-center",
    label: "Registro y listado de visitas",
    allowedRoles: ["USER", "ADMIN", "ADMINISTRATIVA"],
  },
  {
    to: "/visits-center-all",
    label: "Visitas",
    allowedRoles: ["ADMIN", "ADMINISTRATIVA"],
  },
];
