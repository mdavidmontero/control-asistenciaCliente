/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { userAuthStore } from "@/store/useAuthStore";
import { AREAS, INTERVENCIONES } from "@/data";
import { limpiezaSchema, type LimpiezaForm } from "@/types/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerLimpiezaAcopio } from "@/actions/cleanin-center.actions";
import { toast } from "react-toastify";

export default function FormCleaningCenter() {
  const user = userAuthStore((state) => state.user);
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
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
    mutationFn: registerLimpiezaAcopio,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["limpiezaacopio"] });
    },
  });

  const onSubmit = async (data: LimpiezaForm) => {
    const payload: any = {
      userId: user?.id,
      date: new Date(),
      responsable: data.responsable,
      insumosutilizados: data.insumosutilizados,
    };

    data.areas.forEach((area) => {
      payload[area] = true;
    });

    data.intervenciones.forEach((inter) => {
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
      <div>
        <label className="text-sm uppercase font-bold">
          Áreas a intervenir
        </label>
        <p className="font-medium text-gray-600">
          Seleccione las Áreas a intervenir
        </p>
        <div className="flex flex-wrap gap-4 mt-2 border-2 p-4 rounded-md bg-white">
          {AREAS.map(({ key, label }) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              className={cn(
                "rounded-full shadow shadow-gray-500",
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

      <div>
        <label className="text-sm uppercase font-bold">
          Tipo de intervención
        </label>
        <p className="font-medium text-gray-600">
          Seleccione el tipo de intervención
        </p>
        <div className="flex flex-wrap gap-4 mt-2 border-2 p-4 rounded-md bg-white">
          {INTERVENCIONES.map(({ key, label }) => (
            <Button
              key={key}
              type="button"
              variant="outline"
              className={cn(
                "rounded-full shadow shadow-gray-500",
                selectedIntervenciones.includes(key)
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
