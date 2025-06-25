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
  areas: z.array(z.string()).min(1, "Debe seleccionar al menos un área"),
  intervenciones: z
    .array(z.string())
    .min(1, "Debe seleccionar al menos una intervención"),
  otrasintervenciones: z.string().optional(),
  controlPlagas: z.enum(["PREVENTIVO", "CORRECTIVO"]),
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
  clasificadoragranos: z.boolean().nullable(),
  patiossecado: z.boolean().nullable(),
  barridoaspirado: z.boolean().nullable(),
  otrasintervenciones: z.string().nullable(),
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
