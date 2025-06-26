import { userAuthStore } from "@/store/useAuthStore";
import { siloSchema, type LimpiezaSilo } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CalendarShared from "../ui/CalendarShared";
import { AREAS_SILOS, INTERVENCIONES_SILOS } from "@/data";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { toast } from "react-toastify";
import { registerCleaingSilo } from "@/actions/cleaning-silos.actions";

export default function FormCleaningSilos() {
  const user = userAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<LimpiezaSilo>({
    resolver: zodResolver(siloSchema),
    defaultValues: {
      areas: [],
      otraarea: "",
      intervenciones: [],
      otrasintervenciones: "",
      controlPlagas: "PREVENTIVO",
      insumosutilizados: "",
      observaciones: "",
      responsable: user?.name || "",
    },
  });

  const mutationCleaningSilos = useMutation({
    mutationFn: registerCleaingSilo,
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

  const selectedAreas = watch("areas");
  const selectedIntervenciones = watch("intervenciones");

  const toggleSeleccion = (key: string, tipo: "areas" | "intervenciones") => {
    const current = getValues(tipo);
    const updated = current.includes(key)
      ? current.filter((k) => k !== key)
      : [...current, key];
    setValue(tipo, updated);
  };

  const onSubmit = (data: LimpiezaSilo) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: any = {
      userId: user?.id,
      date: date,
      observaciones: data.observaciones,
      controlplagas: data.controlPlagas,
      responsable: data.responsable,
      insumosutilizados: data.insumosutilizados,
      otrasintervenciones: data.otrasintervenciones,
      otraarea: data.otraarea,
    };
    data.areas.forEach((area) => {
      payload[area] = true;
    });
    data.intervenciones.forEach((inter) => {
      payload[inter] = true;
    });
    mutationCleaningSilos.mutate(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">
        Registro de Limpieza en Silos
      </h2>

      <div className="flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="w-full md:w-2/3">
          <label className="block font-bold uppercase text-sm mb-1">
            Fecha de Intervención
          </label>
          <CalendarShared date={date} setDate={setDate} />
        </div>
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src="/limpieza.png"
            alt="limpieza"
            className="w-32 sm:w-40 md:w-full object-contain"
          />
        </div>
      </div>

      <div>
        <label className="text-sm uppercase font-bold">
          Áreas a intervenir
        </label>
        <p className="text-gray-600 text-sm">
          Seleccione las áreas a intervenir:
        </p>
        <div className="flex flex-wrap gap-3 mt-2 border-2 p-4 rounded-md bg-white">
          {AREAS_SILOS.map(({ key, label }) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              className={cn(
                "rounded-full shadow",
                selectedAreas.includes(key)
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
      <div className="space-y-2">
        <div className="w-full mt-4">
          <label className="block font-semibold text-gray-700 mb-1">
            Otras Área
          </label>
          <Controller
            name="otraarea"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value}
                placeholder="Nombre de la área"
                className="w-full border border-gray-300 p-3 rounded-md"
              />
            )}
          />
        </div>
      </div>

      <div>
        <label className="text-sm uppercase font-bold">
          Tipo de intervención
        </label>
        <p className="text-gray-600 text-sm">
          Seleccione tipo de intervención:
        </p>
        <div className="flex flex-wrap gap-3 mt-2 border-2 p-4 rounded-md bg-white">
          {INTERVENCIONES_SILOS.map(({ key, label }) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              className={cn(
                "rounded-full shadow",
                selectedIntervenciones.includes(key)
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "hover:bg-gray-100"
              )}
              onClick={() => toggleSeleccion(key, "intervenciones")}
            >
              {label}
            </Button>
          ))}

          {/* Campo Otras Intervenciones */}
          <div className="w-full mt-4">
            <label className="block font-semibold text-gray-700 mb-1">
              Otras Intervenciones
            </label>
            <Controller
              name="otrasintervenciones"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value}
                  placeholder="Nombre de la intervención"
                  className="w-full border border-gray-300 p-3 rounded-md"
                />
              )}
            />
          </div>
        </div>
        {errors.intervenciones && (
          <p className="text-red-600 text-sm mt-1">
            {errors.intervenciones.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="font-medium text-gray-600">Control Realizado</label>
        <Controller
          name="controlPlagas"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Tipo de control" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PREVENTIVO">Preventivo</SelectItem>
                <SelectItem value="CORRECTIVO">Correctivo</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm uppercase font-bold">
          Insumos utilizados
        </label>
        <Controller
          name="insumosutilizados"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Ej. Aspiradora, Limpiadora, etc..."
              className="w-full border border-gray-300 p-3 rounded-md"
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm uppercase font-bold">Observaciones</label>
        <Controller
          name="observaciones"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Observaciones adicionales"
              className="w-full border border-gray-300 p-3 rounded-md"
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm uppercase font-bold">Responsable</label>
        <Controller
          name="responsable"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Nombre del responsable"
              className="w-full border border-gray-300 p-3 rounded-md"
            />
          )}
        />
        {errors.responsable && (
          <p className="text-red-600 text-sm">{errors.responsable.message}</p>
        )}
      </div>

      <div className="pt-6 text-center">
        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-md w-full"
        >
          Guardar Registro
        </Button>
      </div>
    </form>
  );
}
