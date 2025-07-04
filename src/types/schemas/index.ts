import { z } from "zod";

export const limpiezaSchema = z.object({
  responsable: z.string().min(1, "El nombre del responsable es requerido"),
  insumosutilizados: z.string().optional(),
  areas: z.array(z.string()).min(1, "Debe seleccionar al menos un área"),
  intervenciones: z
    .array(z.string())
    .min(1, "Debe seleccionar al menos una intervención"),
});
export type LimpiezaForm = z.infer<typeof limpiezaSchema>;

export const limpiezaCleaningSchema = z
  .object({
    id: z.number().nullable(),
    userId: z.string().nullable(),
    date: z.string(),
    baños: z.boolean().nullable(),
    zonaSecadoras: z.boolean().nullable(),
    patiosMarquesinas: z.boolean().nullable(),
    oficinas: z.boolean().nullable(),
    recepcion: z.boolean().nullable(),
    cafetería: z.boolean().nullable(),
    labcacao: z.boolean().nullable(),
    labcafe: z.boolean().nullable(),
    labrones: z.boolean().nullable(),
    casahospedaje: z.boolean().nullable(),
    aspirado: z.boolean().nullable(),
    limpiezapisos: z.boolean().nullable(),
    dispobasuras: z.boolean().nullable(),
    barridopisos: z.boolean().nullable(),
    limpiezasuperficies: z.boolean().nullable(),
    lavadosuperficies: z.boolean().nullable(),
    lavadoparedes: z.boolean().nullable(),
    lavadopisos: z.boolean().nullable(),
    controlplagas: z.boolean().nullable(),
    limpiezaparedes: z.boolean().nullable(),
    responsable: z.string(),
    insumosutilizados: z.string(),
    imagenes: z.array(z.string()).nullable().optional(),
  })
  .optional();
export type limpiezasCleaningTypes = z.infer<typeof limpiezaCleaningSchema>;
export const listHistoryAttendancesSchema = z.array(limpiezaCleaningSchema);

// Silos
export const siloSchema = z.object({
  areas: z.array(z.string()),
  otraarea: z.string().nullable().optional(),
  intervenciones: z.array(z.string()),
  otrasintervenciones: z.string().nullable().optional(),
  controlPlagas: z.enum(["PREVENTIVO", "CORRECTIVO"], {
    message: "Tipo de control inválido",
  }),
  insumosutilizados: z
    .string()
    .min(1, { message: "Los insumos son obligatorios" }),
  observaciones: z
    .string()
    .min(1, { message: "La observación es obligatoria" }),
  responsable: z.string().min(1, "El nombre del responsable es requerido"),
});

export type LimpiezaSilo = z.infer<typeof siloSchema>;

export const limpiezaSilosSchema = z.object({
  id: z.number().nullable(),
  userId: z.string().nullable(),
  date: z.string(),
  silouno: z.boolean().nullable(),
  silodos: z.boolean().nullable(),
  clasificadoragranos: z.boolean().optional(),
  otraarea: z.string().nullable().optional(),
  otrasintervenciones: z.string().nullable().optional(),
  patiossecado: z.boolean().nullable(),
  barridoaspirado: z.boolean().nullable(),
  controlplagas: z.enum(["PREVENTIVO", "CORRECTIVO"]),
  insumosutilizados: z.string(),
  observaciones: z.string(),
  responsable: z.string(),
});
export type limpiezasSilosTypes = z.infer<typeof limpiezaSilosSchema>;
export const listHistorySilosSchema = z.array(limpiezaSilosSchema);

// Trampas pegajosas
export const trapsSchema = z.object({
  lugarcolocacion: z.string().min(1, "El lugar de colocación es obligatorio"),
  tipotrampa: z.string().min(1, "El tipo de trampa es obligatoria"),
  cantidadtrampas: z.string().min(1, "La cantidad de trampas es obligatoria"),
  plagamonitor: z
    .string()
    .min(1, "El nombre de la plaga monitoreada es obligatoria"),
  imagenes: z.array(z.string()).nullable().optional(),
  responsable: z.string().min(1, "El nombre del responsable es requerido"),
});

export type LimpiezaTraps = z.infer<typeof trapsSchema>;
// Extender limpiezaTraps
export const TrapsFormSchema = trapsSchema.extend({
  fecha: z.string(),
  fecharecambio: z.string(),
});
export type trapsFormSchema = z.infer<typeof TrapsFormSchema>;

export const limpiezaCleaningTrapsSchema = z.object({
  id: z.number().nullable(),
  fecha: z.string(),
  lugarcolocacion: z.string(),
  tipotrampa: z.string(),
  cantidadtrampas: z.string(),
  plagamonitor: z.string(),
  fecharecambio: z.string(),
  imagenes: z.array(z.string()).nullable().optional(),
  responsable: z.string(),
});
export type limpiezasCleaningTrapsTypes = z.infer<
  typeof limpiezaCleaningTrapsSchema
>;

export const listHistoryTrapsSchema = z.array(limpiezaCleaningTrapsSchema);

// Equipos y maquinas
export const equipmentSchema = z.object({
  fecharealizado: z.string(),
  nombre: z.string(),
  marca: z.string(),
  modelo: z.string(),
  nroserie: z.string(),
  fechacompra: z.string(),
  nroplaca: z.string(),
  referencia: z.string(),
  potencia: z.string(),
  area: z.string(),
  estado: z.string(),
  descripcionsituacion: z.string(),
  mantenimiento: z.string(),
  descripcionmantemiento: z.string(),
  falla: z.string(),
  descripcionfalla: z.string(),
  proximomantenimiento: z.string(),
  motivomantenimiento: z.string(),
  tecnico: z.string(),
  responsable: z.string(),
});

export type EquipmentSchema = z.infer<typeof equipmentSchema>;
export const lisEquipmentSchema = equipmentSchema.extend({
  id: z.number(),
});

export type EquipmentSchemaType = z.infer<typeof lisEquipmentSchema>;
export const listEquipmentSchema = z.array(lisEquipmentSchema);

// Visitas
export const AsistenteVisitaSchema = z.object({
  nombres: z.string(),
  tipoDocumento: z.string(),
  numeroDocumento: z.string(),
  dependencia: z.string(),
});
export const visitSchema = z.object({
  id: z.number(),
  municipio: z.string(),
  dia: z.string(),
  mes: z.string(),
  anio: z.string(),
  nombres: z.string(),
  empresa: z.string(),
  area: z.string(),
  email: z.string(),
  telefono: z.string(),
  fechaVisitaDia: z.string(),
  fechaVisitaMes: z.string(),
  fechaVisitaAnio: z.string(),
  horaInicio: z.string(),
  horaFin: z.string(),
  dependencia: z.string(),
  objeto: z.string(),
  material: z.string(),
  evaluacion: z.enum(["PENDIENTE", "APROBADO", "RECHAZADO"]),
  documentVisit: z.string().nullable(),
  asistentes: z.array(AsistenteVisitaSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const editVistSchema = visitSchema.omit({
  asistentes: true,
  createdAt: true,
  updatedAt: true,
});
export type Visit = z.infer<typeof visitSchema>;

export type VisitFormData = Pick<
  Visit,
  | "municipio"
  | "dia"
  | "mes"
  | "anio"
  | "nombres"
  | "empresa"
  | "area"
  | "email"
  | "telefono"
  | "fechaVisitaDia"
  | "fechaVisitaMes"
  | "fechaVisitaAnio"
  | "horaInicio"
  | "horaFin"
  | "dependencia"
  | "objeto"
  | "material"
  | "evaluacion"
  | "asistentes"
>;
