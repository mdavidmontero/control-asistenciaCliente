import { useForm } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";
import CalendarShared from "../ui/CalendarShared";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEquimentCleaning } from "@/actions/cleaning-equipment.actions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { EquipmentSchema, EquipmentSchemaType } from "@/types/schemas";

type EditEquipmentFormProps = {
  data: EquipmentSchema;
  equipmentId: EquipmentSchemaType["id"];
};
export const FormCleaningEquipmentEdit = ({
  data,
  equipmentId,
}: EditEquipmentFormProps) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // cargar una o la fecha actual
  const [fechaCompra, setFechaCompra] = useState<Date | undefined>(
    new Date(data.fechacompra ?? new Date().toISOString())
  );
  const [fechaRealizado, setFechaRealizado] = useState<Date | undefined>(
    new Date(data.fecharealizado ?? new Date().toISOString())
  );
  const [proximoMantenimiento, setProximoMantenimiento] = useState<
    Date | undefined
  >(new Date(data.proximomantenimiento ?? new Date().toISOString()));
  console.log("datos de la consulta", data);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: equipmentId,
      fecharealizado: data.fecharealizado,
      nombre: data.nombre,
      marca: data.marca,
      modelo: data.modelo,
      nroserie: data.nroserie,
      fechacompra: data.fechacompra,
      nroplaca: data.nroplaca,
      referencia: data.referencia,
      potencia: data.potencia,
      area: data.area,
      estado: data.estado,
      descripcionsituacion: data.descripcionsituacion,
      mantenimiento: data.mantenimiento,
      descripcionmantemiento: data.descripcionmantemiento,
      falla: data.falla,
      descripcionfalla: data.descripcionfalla,
      proximomantenimiento: data.proximomantenimiento,
      motivomantenimiento: data.motivomantenimiento,
      tecnico: data.tecnico,
      responsable: data.responsable,
    },
  });

  const equimentMutation = useMutation({
    mutationFn: updateEquimentCleaning,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["limpiezaEquimentDateActual"],
      });
      queryClient.invalidateQueries({
        queryKey: ["editEquipment", equipmentId],
      });
      toast.success(data, {
        onClose: () => {
          navigate(-1);
        },
        autoClose: 1000,
      });
    },
  });

  const handleEquipmentSubmit = (formData: EquipmentSchema) => {
    const payload = {
      ...formData,
      fecharealizado: fechaRealizado!.toISOString(),
      fechacompra: fechaCompra!.toISOString(),
      proximomantenimiento: proximoMantenimiento!.toISOString(),
    };
    const data = {
      equipmentId,
      formData: payload,
    };
    console.log("datos", data);
    equimentMutation.mutate(data);
  };
  return (
    <div
      onSubmit={handleSubmit(handleEquipmentSubmit)}
      className="mx-auto max-w-3xl"
    >
      <form className="space-y-6 p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-lg shadow-gray-400 relative">
        <h2 className="text-xl font-bold">Información general</h2>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="nroserie">
            Fecha de Mantenimiento del Equipo/Maquina :
          </label>
          <CalendarShared date={fechaRealizado} setDate={setFechaRealizado} />
          {errors.fecharealizado && (
            <ErrorMessage>{errors.fecharealizado.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="nombre">
            Nombre de la maquina y/o equipo
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de la maquina y/o equipo"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("nombre", {
              required: "El nombre del equipo es obligatorio",
            })}
          />
          {errors.nombre && (
            <ErrorMessage>{errors.nombre.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="marca">
            Marca
          </label>
          <input
            id="marca"
            type="text"
            placeholder="Marca de la maquina y/o equipo"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("marca", {
              required: "La marca del equipo es obligatoria",
            })}
          />
          {errors.marca && <ErrorMessage>{errors.marca.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="modelo">
            Modelo
          </label>
          <input
            id="modelo"
            type="text"
            placeholder="Modelo de la maquina y/o equipo"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("modelo", {
              required: "El modelo del equipo es obligatorio",
            })}
          />
          {errors.modelo && (
            <ErrorMessage>{errors.modelo.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="nroserie">
            Nro Serie
          </label>
          <input
            id="nroserie"
            type="text"
            placeholder="Nro Serie de la maquina y/o equipo"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("nroserie", {
              required: "El Nro de serie es obligatorio",
            })}
          />
          {errors.nroserie && (
            <ErrorMessage>{errors.nroserie.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="nroserie">
            Fecha de compra:
          </label>
          <CalendarShared date={fechaCompra} setDate={setFechaCompra} />
          {errors.fechacompra && (
            <ErrorMessage>{errors.fechacompra.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="nroplaca">
            Nro Placa
          </label>
          <input
            id="nroplaca"
            type="text"
            placeholder="Nro Placa de la maquina y/o equipo"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("nroplaca", {
              required:
                "El Nro de la placa del equipo o codigo unico es obligatorio",
            })}
          />
          {errors.nroplaca && (
            <ErrorMessage>{errors.nroplaca.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="referencia">
            Referencia
          </label>
          <input
            id="referencia"
            type="text"
            placeholder="Referencia de la maquina y/o equipo"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("referencia", {
              required: "La referencia del equipo es obligatoria",
            })}
          />
          {errors.referencia && (
            <ErrorMessage>{errors.referencia.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="potencia">
            Potencia
          </label>
          <input
            id="potencia"
            type="text"
            placeholder="Potencia de la maquina y/o equipo"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("potencia", {
              required: "La Potencia del equipo es obligatoria",
            })}
          />
          {errors.potencia && (
            <ErrorMessage>{errors.potencia.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="area">
            Área a la que pertenece
          </label>
          <input
            id="area"
            type="area"
            placeholder="Area a la que pertenece la maquina y/o equipo"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("area", {
              required:
                "El área a la que pertenece la maquina y/o equipo es obligatoria",
            })}
          />
          {errors.area && <ErrorMessage>{errors.area.message}</ErrorMessage>}
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-center">
            Estado de la Maquina y/o Equipo
          </h2>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="estado"
            {...register("estado", {
              required: "El estado del equipo es obligatorio",
            })}
          >
            <option value="" disabled>
              Seleccione un estado
            </option>
            <option value="BUENO">BUENO</option>
            <option value="REGULAR">REGULAR</option>
            <option value="MALO">MALO</option>
            <option value="DESARMADO">DESARMADO</option>
          </select>
          {errors.estado && (
            <ErrorMessage>{errors.estado.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="descripcionsituacion">
            Descripción ampliada de la situación encontrada
          </label>
          <input
            id="descripcionsituacion"
            type="text"
            placeholder="Descripción ampliada de la situación encontrada"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("descripcionsituacion", {
              required:
                "La descripción de la situación encontrada es obligatoria",
            })}
          />
          {errors.descripcionsituacion && (
            <ErrorMessage>{errors.descripcionsituacion.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-center">
            Detalle del Mantenimiento
          </h2>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="mantenimiento"
            {...register("mantenimiento", {
              required: "El tipo de mantenimiento es obligatorio",
            })}
          >
            <option value="" disabled>
              Seleccione tipo de mantenimiento
            </option>
            <option value="PREVENTIVO">PREVENTIVO</option>
            <option value="CORRECTIVO">CORRECTIVO</option>
            <option value="INSTALACION">INSTALACION</option>
            <option value="DESMONTAJE">DESMONTAJE</option>
          </select>
          {errors.mantenimiento && (
            <ErrorMessage>{errors.mantenimiento.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="area">
            Descripción del mantenimiento realizado
          </label>
          <input
            id="descripcionmantemiento"
            type="descripcionmantemiento"
            placeholder="Descripción del mantenimiento realizado"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("descripcionmantemiento", {
              required: "El detalle del mantenimiento es obligatorio",
            })}
          />
          {errors.descripcionmantemiento && (
            <ErrorMessage>{errors.descripcionmantemiento.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-center">
            Detalles de las fallas detectadas
          </h2>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="falla"
            {...register("falla", {
              required: "El tipo de falla es obligatorio",
            })}
          >
            <option value="" disabled>
              Seleccione la falla detectada
            </option>
            <option value="DEPRECIADA">DEPRECIADA</option>
            <option value="MALAOPERACION">MALA OPERACIÓN</option>
            <option value="MALAINSTALACION">MALA INSTALACIÓN</option>
            <option value="AVERIAS">AVERÍAS EN ACCESORIOS</option>
            <option value="SINFALLAS">NO PRESENTA FALLAS</option>
            <option value="DESCONOCIDA">DESCONOCIDA</option>
          </select>
          {errors.falla && <ErrorMessage>{errors.falla.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="area">
            Descripción de la falla detectada
          </label>
          <input
            id="descripcionfalla"
            type="descripcionfalla"
            placeholder="Descripción de la falla detectada"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("descripcionfalla", {
              required: "El detalle de la falla es obligatorio",
            })}
          />
          {errors.descripcionfalla && (
            <ErrorMessage>{errors.descripcionfalla.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="nroserie">
            Proximo Mantenimiento
          </label>
          <CalendarShared
            date={proximoMantenimiento}
            setDate={setProximoMantenimiento}
          />
          {errors.proximomantenimiento && (
            <ErrorMessage>{errors.proximomantenimiento.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="area">
            Motivo del proximo mantenimiento
          </label>
          <input
            id="motivomantenimiento"
            type="text"
            placeholder="Motivo del proximo mantenimiento"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("motivomantenimiento", {
              required: "El detalle del proximo mantenimiento es obligatorio",
            })}
          />
          {errors.motivomantenimiento && (
            <ErrorMessage>{errors.motivomantenimiento.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="area">
            Técnico responsable
          </label>
          <input
            id="tecnico"
            type="tecnico"
            placeholder="Técnico responsable"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("tecnico", {
              required: "El técnico es obligatorio",
            })}
          />
          {errors.tecnico && (
            <ErrorMessage>{errors.tecnico.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold uppercase" htmlFor="responsable">
            Responsable de la visita
          </label>
          <input
            type="text"
            id="responsable"
            placeholder="Responsable de la visita"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("responsable", {
              required: "El responsable es obligatorio",
            })}
          />
          {errors.responsable && (
            <ErrorMessage>{errors.responsable.message}</ErrorMessage>
          )}
        </div>
        <input
          type="submit"
          value="Guardar"
          className="bg-[#1B5040] hover:bg-[#304b43] w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>
    </div>
  );
};
