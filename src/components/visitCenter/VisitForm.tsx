import type { VisitFormData } from "@/types/schemas";
import type {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { opciones } from "@/data";
import AddVisitanteForm from "./AddVisitanteForm";
import { Trash2 } from "lucide-react";
import { useVisitStore } from "@/store/visitStore";
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
interface VisitFormProps {
  register: UseFormRegister<VisitFormData>;
  errors: FieldErrors<VisitFormData>;
  onChange: React.Dispatch<React.SetStateAction<Value>>;
  value: Value;
  setValue: UseFormSetValue<VisitFormData>;
  fechaVisita: Value;
  setFechaVisita: React.Dispatch<React.SetStateAction<Value>>;
  fields: FieldArrayWithId<VisitFormData, "asistentes", "id">[];
  append: UseFieldArrayAppend<VisitFormData, "asistentes">;
  remove: UseFieldArrayRemove;
}

export default function VisitForm({
  register,
  errors,
  onChange,
  value,
  setValue,
  fechaVisita,
  setFechaVisita,
  fields,
  append,
  remove,
}: VisitFormProps) {
  const dependenciaStore = useVisitStore((state) => state.formData.dependencia);
  const updateDependencias = useVisitStore((state) => state.updateDependencias);
  const [seleccionadas, setSeleccionadas] = useState<string[]>(
    dependenciaStore ? dependenciaStore.split(", ").filter(Boolean) : []
  );
  useEffect(() => {
    setValue("dependencia", seleccionadas.join(", "));
    updateDependencias(seleccionadas);
  }, [seleccionadas, setValue, updateDependencias]);

  const toggleSeleccion = (dependencia: string) => {
    setSeleccionadas((prev) =>
      prev.includes(dependencia)
        ? prev.filter((item) => item !== dependencia)
        : [...prev, dependencia]
    );
  };
  return (
    <>
      <h2 className="text-2xl text-[#052a47] font-bold text-center">
        Formato Solicitud de Visita
      </h2>
      <div className="flex flex-col gap-2">
        <label className="font-bold uppercase" htmlFor="municipio">
          Departamento y Municipio
        </label>
        <input
          id="nombre"
          type="text"
          placeholder="Ej: Colombia - Bogota - Cundinamarca"
          className="w-full border border-gray-400 p-3 rounded-lg"
          {...register("municipio", {
            required: "Municipio y Departamento son obligatorios",
          })}
        />
        {errors.municipio && (
          <ErrorMessage>{errors.municipio.message}</ErrorMessage>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold uppercase" htmlFor="municipio">
          Fecha de Solicitud
        </label>
        <Calendar
          className="rounded-lg border border-gray-300 shadow-sm calendar-custom"
          onChange={(date) => {
            const selectedDate = Array.isArray(date) ? date[0] : date;
            if (selectedDate) {
              onChange(selectedDate);
              setValue("dia", selectedDate.getDate().toString());
              setValue(
                "mes",
                selectedDate.toLocaleString("es-ES", { month: "long" })
              );
              setValue("anio", selectedDate.getFullYear().toString());
            }
          }}
          value={value}
        />
      </div>
      <div className="hidden">
        <input
          type="number"
          {...register("dia", { required: "Debes seleccionar una fecha" })}
        />
        <input
          type="text"
          {...register("mes", { required: "Debes seleccionar una fecha" })}
        />
        <input
          type="number"
          {...register("anio", { required: "Debes seleccionar una fecha" })}
        />
      </div>

      <div className="mt-2 text-red-600 text-sm space-y-1">
        {errors.dia && <ErrorMessage>{errors.dia.message}</ErrorMessage>}
      </div>

      <h2 className="text-xl text-center font-bold text-[#052a47]">
        Información sobre el solicitante
      </h2>
      <div className="flex flex-col gap-2">
        <label className="font-bold uppercase" htmlFor="municipio">
          Nombres y Apellidos
        </label>
        <input
          id="nombre"
          type="text"
          placeholder="Ej: Juan Perez de la Cruz"
          className="w-full border border-gray-400 p-3 rounded-lg"
          {...register("nombres", {
            required: "Nombres y apellidos son obligatorios",
          })}
        />
        {errors.nombres && (
          <ErrorMessage>{errors.nombres.message}</ErrorMessage>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold uppercase" htmlFor="empresa">
          Empresa a la que pertenece
        </label>
        <input
          id="empresa"
          type="text"
          placeholder="Ej: Asoseynekun"
          className="w-full border border-gray-400 p-3 rounded-lg"
          {...register("empresa", {
            required: "Empresa es obligatoria",
          })}
        />
        {errors.empresa && (
          <ErrorMessage>{errors.empresa.message}</ErrorMessage>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold uppercase" htmlFor="area">
          Area / Dependencia
        </label>
        <input
          id="area"
          type="text"
          placeholder="Ej: área de calidad, área tecnica, etc"
          className="w-full border border-gray-400 p-3 rounded-lg"
          {...register("area", {
            required: "Área es obligatoria",
          })}
        />
        {errors.area && <ErrorMessage>{errors.area.message}</ErrorMessage>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold uppercase" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Ej: juanperez@gmail.com"
          className="w-full border border-gray-400 p-3 rounded-lg"
          {...register("email", {
            required: "Email es obligatorio",
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold uppercase" htmlFor="telefono">
          Teléfono
        </label>
        <input
          id="telefono"
          type="text"
          placeholder="Ej: +56 987654321"
          className="w-full border border-gray-400 p-3 rounded-lg"
          {...register("telefono", {
            required: "Teléfono es obligatorio",
          })}
        />
        {errors.telefono && (
          <ErrorMessage>{errors.telefono.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold uppercase" htmlFor="fechaVisitaDia">
          Fecha de visita Programada
        </label>
        <Calendar
          className="rounded-lg border border-gray-300 shadow-sm calendar-custom"
          onChange={(date) => {
            const selectedDate = Array.isArray(date) ? date[0] : date;
            if (selectedDate) {
              setFechaVisita(selectedDate);
              setValue("fechaVisitaDia", selectedDate.getDate().toString());
              setValue(
                "fechaVisitaMes",
                selectedDate.toLocaleString("es-ES", { month: "long" })
              );
              setValue(
                "fechaVisitaAnio",
                selectedDate.getFullYear().toString()
              );
            }
          }}
          value={fechaVisita}
        />
        {errors.fechaVisitaDia && (
          <ErrorMessage>{errors.fechaVisitaDia.message}</ErrorMessage>
        )}
      </div>
      <div className="hidden">
        <input
          type="number"
          {...register("fechaVisitaDia", {
            required: "Debes seleccionar una fecha",
          })}
        />
        <input
          type="text"
          {...register("fechaVisitaMes", {
            required: "Debes seleccionar una fecha",
          })}
        />
        <input
          type="number"
          {...register("fechaVisitaAnio", {
            required: "Debes seleccionar una fecha",
          })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold uppercase" htmlFor="horaInicio">
          Hora Inicio
        </label>
        <input
          id="horaInicio"
          type="time"
          placeholder="Hora Inicio"
          className="w-full border border-gray-400 p-3 rounded-lg"
          {...register("horaInicio", {
            required: "La hora inicio es obligatoria",
          })}
        />
        {errors.horaInicio && (
          <ErrorMessage>{errors.horaInicio.message}</ErrorMessage>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold uppercase" htmlFor="horaFin">
          Hora Fin
        </label>
        <input
          id="horaFin"
          type="time"
          placeholder="Hora Fin"
          className="w-full border border-gray-400 p-3 rounded-lg"
          {...register("horaFin", {
            required: "La hora fin es obligatoria",
          })}
        />
        {errors.horaFin && (
          <ErrorMessage>{errors.horaFin.message}</ErrorMessage>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-bold uppercase">Dependencia a visitar</label>
        <div className="flex flex-wrap gap-2">
          {opciones.map((dependencia) => (
            <button
              type="button"
              key={dependencia}
              className={`px-4 py-2 rounded-full border transition ${
                seleccionadas.includes(dependencia)
                  ? "bg-green-600 text-white border-green-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => toggleSeleccion(dependencia)}
            >
              {dependencia}
            </button>
          ))}
        </div>

        <input
          type="text"
          {...register("dependencia", {
            required: "Debes seleccionar al menos una dependencia",
          })}
          className="hidden"
        />

        {errors.dependencia && (
          <ErrorMessage>{errors.dependencia.message}</ErrorMessage>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="objetivo" className="font-bold uppercase">
          Objetivo de la visita
        </label>

        <textarea
          placeholder="Objetivo de la visita"
          id="objetivo"
          rows={4}
          className="w-full border border-gray-400 p-3 rounded-lg"
          {...register("objeto", {
            required: "El objetivo de la visita es obligatorio",
          })}
        ></textarea>
        {errors.objeto && <ErrorMessage>{errors.objeto.message}</ErrorMessage>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="material" className="font-bold uppercase">
          Material de la visita
        </label>

        <textarea
          id="material"
          rows={3}
          placeholder="Material necesario para la visita"
          className="w-full border border-gray-400 p-3 rounded-lg"
          {...register("material", {
            required: "El material necesario para la visita es obligatorio",
          })}
        ></textarea>
        {errors.material && (
          <ErrorMessage>{errors.material.message}</ErrorMessage>
        )}
      </div>
      <div className="space-y-4">
        <h3 className="font-bold text-lg uppercase">Asistentes</h3>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-3 border p-4 rounded-lg"
          >
            <div className="flex flex-col">
              <label>Nombre</label>
              <input
                className="border p-2 rounded"
                {...register(`asistentes.${index}.nombres`, {
                  required: "Nombre es obligatorio",
                })}
                placeholder="Ej: Juan Pérez"
              />
              {errors.asistentes?.[index]?.nombres && (
                <ErrorMessage>
                  {errors.asistentes[index]?.nombres?.message}
                </ErrorMessage>
              )}
            </div>

            <div className="flex flex-col">
              <label>Tipo Documento</label>
              <input
                className="border p-2 rounded"
                {...register(`asistentes.${index}.tipoDocumento`, {
                  required: "Tipo de documento es obligatorio",
                })}
                placeholder="Ej: CC, TI, CE"
              />
              {errors.asistentes?.[index]?.tipoDocumento && (
                <ErrorMessage>
                  {errors.asistentes[index]?.tipoDocumento?.message}
                </ErrorMessage>
              )}
            </div>

            <div className="flex flex-col">
              <label>Número Documento</label>
              <input
                className="border p-2 rounded"
                {...register(`asistentes.${index}.numeroDocumento`, {
                  required: "Número de documento es obligatorio",
                })}
                placeholder="Ej: 12345678"
              />
              {errors.asistentes?.[index]?.numeroDocumento && (
                <ErrorMessage>
                  {errors.asistentes[index]?.numeroDocumento?.message}
                </ErrorMessage>
              )}
            </div>

            <div className="flex flex-col">
              <label>Dependencia</label>
              <input
                className="border p-2 rounded"
                {...register(`asistentes.${index}.dependencia`, {
                  required: "Dependencia es obligatoria",
                })}
                placeholder="Ej: Calidad"
              />
              {errors.asistentes?.[index]?.dependencia && (
                <ErrorMessage>
                  {errors.asistentes[index]?.dependencia?.message}
                </ErrorMessage>
              )}
            </div>

            <button
              type="button"
              className="text-red-600 hover:text-red-800 mt-2"
              onClick={() => remove(index)}
            >
              <Trash2 />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              nombres: "",
              tipoDocumento: "",
              numeroDocumento: "",
              dependencia: "",
            })
          }
          className="bg-[#1B5040] hover:bg-[#304b43] text-white px-4 py-2 rounded font-bold"
        >
          Agregar Asistente
        </button>
      </div>

      {/* <button onClick={() => navigate(location.pathname + "?addMember=true")}>
        Agregar Asistente
      </button> */}
      <AddVisitanteForm />
    </>
  );
}
