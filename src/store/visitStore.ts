import { create } from "zustand";
import type { VisitFormData } from "@/types/schemas";
import { persist } from "zustand/middleware";

interface VisitState {
  formData: VisitFormData;
  setFormData: (data: VisitFormData) => void;
  updateDependencias: (dependencias: string[]) => void;
  resetFormData: () => void;
}

const initialValues: VisitFormData = {
  municipio: "",
  dia: "",
  mes: "",
  anio: "",
  nombres: "",
  empresa: "",
  area: "",
  email: "",
  telefono: "",
  fechaVisitaDia: "",
  fechaVisitaMes: "",
  fechaVisitaAnio: "",
  horaInicio: "",
  horaFin: "",
  dependencia: "",
  objeto: "",
  material: "",
  asistentes: [],
  evaluacion: "PENDIENTE",
};

export const useVisitStore = create<VisitState>()(
  persist(
    (set, get) => ({
      formData: initialValues,
      setFormData: (data) => set({ formData: data }),
      updateDependencias: (dependencias: string[]) =>
        set({
          formData: {
            ...get().formData,
            dependencia: dependencias.join(", "),
          },
        }),
      resetFormData: () => {
        set({ formData: initialValues });
        localStorage.removeItem("visit-form");
      },
    }),
    { name: "visit-form" }
  )
);
