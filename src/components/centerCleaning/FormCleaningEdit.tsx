/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { userAuthStore } from "@/store/useAuthStore";
import { AREAS, INTERVENCIONES } from "@/data";
import { limpiezaSchema, type LimpiezaForm } from "@/types/schemas";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getLimpiezaById,
  updateLimpiezaAcopio,
} from "@/actions/cleanin-center.actions";
import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import CalendarShared from "../ui/CalendarShared";
import { formatDate } from "@/utils";

export default function FormCleaningEdit() {
  const user = userAuthStore((state) => state.user);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<LimpiezaForm>({
    resolver: zodResolver(limpiezaSchema),
    defaultValues: {
      responsable: "",
      insumosutilizados: "",
      areas: [],
      intervenciones: [],
    },
  });

  const { data } = useQuery({
    queryKey: ["limpiezaacopio", +id!],
    queryFn: () => getLimpiezaById(+id!),
  });

  useEffect(() => {
    if (data) {
      const selectedAreas = AREAS.filter(({ key }) => data[key]).map(
        ({ key }) => key
      );
      const selectedIntervenciones = INTERVENCIONES.filter(
        ({ key }) => data[key]
      ).map(({ key }) => key);

      reset({
        responsable: data.responsable,
        insumosutilizados: data.insumosutilizados,
        areas: selectedAreas,
        intervenciones: selectedIntervenciones,
      });
    }
  }, [data, reset]);

  const selectedAreas = watch("areas");
  const selectedIntervenciones = watch("intervenciones");

  const toggleSeleccion = (key: string, tipo: "areas" | "intervenciones") => {
    const current = getValues(tipo);
    const updated = current.includes(key)
      ? current.filter((k) => k !== key)
      : [...current, key];
    setValue(tipo, updated);
  };

  const mutationcleaningCenter = useMutation({
    mutationFn: updateLimpiezaAcopio,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["limpiezaacopio"] });
      queryClient.invalidateQueries({
        queryKey: ["limpiezaacopioDateActual"],
      });
      toast.success(data, {
        onClose: () => {
          navigate(-1);
        },
        autoClose: 1000,
      });
    },
  });

  const onSubmit = async (formData: LimpiezaForm) => {
    const payload: any = {
      userId: user?.id,
      date: new Date(),
      responsable: formData.responsable,
      insumosutilizados: formData.insumosutilizados,
      id: +id!,
    };

    formData.areas.forEach((area) => {
      payload[area] = true;
    });

    formData.intervenciones.forEach((inter) => {
      payload[inter] = true;
    });

    mutationcleaningCenter.mutate(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-lg shadow-gray-400"
    >
      <h2 className="text-xl font-bold">Información general</h2>

      {/* Áreas */}
      <div>
        <label className="font-bold uppercase">Fecha de Intervención</label>
        <p className="font-bold text-gray-800 italic">
          Por favor seleccione la fecha en la que se realizaron la intervención
        </p>
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="w-full md:w-2/3">
            <CalendarShared date={date} setDate={setDate} />
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              Fecha Seleccionanada:{" "}
              <span className="text-gray-800 font-semibold text-lg">
                {formatDate(date!.toISOString())}
              </span>
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-end md:justify-center">
            <img
              src="/limpieza.png"
              alt="limpieza"
              className="w-28 sm:w-36 md:w-44 lg:w-full object-contain"
            />
          </div>
        </div>

        <p className="font-medium text-gray-600">
          Seleccione las Áreas a intervenir
        </p>
        <div className="flex flex-wrap gap-4 mt-2 border-2 p-4 rounded-md bg-white">
          {AREAS!.map(({ key, label }) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              className={cn(
                "rounded-full shadow shadow-gray-500",
                selectedAreas?.includes(key)
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "hover:bg-gray-100"
              )}
              onClick={() => toggleSeleccion(key, "areas")}
            >
              {label}
            </Button>
          ))}
        </div>
        {errors.areas && (
          <p className="text-red-600 text-sm mt-1">{errors.areas.message}</p>
        )}
      </div>

      {/* Intervenciones */}
      <div>
        <label className="text-sm uppercase font-bold">
          Tipo de intervención
        </label>
        <p className="font-medium text-gray-600">
          Seleccione el tipo de intervención
        </p>
        <div className="flex flex-wrap gap-4 mt-2 border-2 p-4 rounded-md bg-white">
          {INTERVENCIONES?.map(({ key, label }) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              className={cn(
                "rounded-full shadow shadow-gray-500",
                selectedIntervenciones?.includes(key)
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "hover:bg-gray-100"
              )}
              onClick={() => toggleSeleccion(key, "intervenciones")}
            >
              {label}
            </Button>
          ))}
        </div>
        {errors.intervenciones && (
          <p className="text-red-600 text-sm mt-1">
            {errors.intervenciones.message}
          </p>
        )}
      </div>

      {/* Responsable */}
      <div className="space-y-3">
        <label className="text-sm uppercase font-bold">Responsable</label>
        <Controller
          name="responsable"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Nombre del responsable"
              className="w-full border border-gray-400 p-3 rounded-lg bg-white"
            />
          )}
        />
        {errors.responsable && (
          <p className="text-red-600 text-sm">{errors.responsable.message}</p>
        )}
      </div>

      {/* Insumos utilizados */}
      <div className="space-y-3">
        <label className="text-sm uppercase font-bold">
          Insumos utilizados
        </label>
        <Controller
          name="insumosutilizados"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Ej. desinfectante, cloro..."
              className="w-full border border-gray-400 p-3 rounded-lg bg-white"
            />
          )}
        />
      </div>

      {/* Botón submit */}
      <Button
        type="submit"
        disabled={mutationcleaningCenter.isPending}
        className="bg-[#1B5040] hover:bg-[#304b43] w-full p-5 rounded-lg text-white font-black text-xl"
      >
        {mutationcleaningCenter.isPending ? "Enviando..." : "Guardar"}
      </Button>
    </form>
  );
}
