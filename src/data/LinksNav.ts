export const LinksNav = [
  { to: "/", label: "Asistencias", allowedRoles: ["USER", "ADMIN"] },
  {
    to: "/history-asistencia",
    label: "Historial de Asistencias",
    allowedRoles: ["USER", "ADMIN"],
  },
  {
    to: "/history-asistencias-todas",
    label: " Historico Todas las Asistencias",
    allowedRoles: ["ADMIN"],
  },
  {
    to: "/cleaning-center",
    label: "Limpieza Centro Acopio",
    allowedRoles: ["USER", "ADMIN"],
  },
  {
    to: "/traps-center",
    label: "Trampas Pegajosas",
    allowedRoles: ["USER", "ADMIN"],
  },
  {
    to: "/cleaning-equipments",
    label: "Maquinas y Equipos",
    allowedRoles: ["USER", "ADMIN"],
  },
  {
    to: "/cleaning-silos",
    label: "Limpieza Silos",
    allowedRoles: ["USER", "ADMIN"],
  },
  {
    to: "/visit-center",
    label: "Registro de Visitas",
    allowedRoles: ["USER", "ADMIN"],
  },
];
