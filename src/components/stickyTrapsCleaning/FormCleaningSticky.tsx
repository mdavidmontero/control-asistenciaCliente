import { userAuthStore } from "@/store/useAuthStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CalendarShared from "../ui/CalendarShared";
import { Controller, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import {
  type LimpiezaTraps,
  type trapsFormSchema,
  trapsSchema,
} from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerStickyTrap } from "@/actions/sticky-traps.actions";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import ErrorMessage from "../ui/ErrorMessage";

export default function FormCleaningSticky() {
  const user = userAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [fechaRecambio, setFechaRecambio] = useState<Date | undefined>(
    new Date()
  );
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LimpiezaTraps>({
    resolver: zodResolver(trapsSchema),
    defaultValues: {
      lugarcolocacion: "",
      tipotrampa: "",
      cantidadtrampas: "",
      plagamonitor: "",
      imagenes: [],
      responsable: user?.name || "",
    },
  });

  const mutationCleaningSticky = useMutation({
    mutationFn: registerStickyTrap,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["limpiezaTraps"] });
      queryClient.invalidateQueries({
        queryKey: ["limpiezaTrapsDateActual"],
      });
      toast.success(data, {
        onClose: () => {
          navigate(-1);
        },
        autoClose: 1000,
      });
    },
  });

  const onsubmit = async (data: LimpiezaTraps) => {
    const payload: trapsFormSchema = {
      fecha: date!.toISOString(),
      lugarcolocacion: data.lugarcolocacion,
      tipotrampa: data.tipotrampa,
      cantidadtrampas: data.cantidadtrampas,
      plagamonitor: data.plagamonitor,
      fecharecambio: fechaRecambio!.toISOString(),
      imagenes: data.imagenes,
      responsable: data.responsable,
    };
    mutationCleaningSticky.mutate(payload);
  };

  return (
    <form
      className="space-y-6 p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-lg shadow-gray-400 relative"
      onSubmit={handleSubmit(onsubmit)}
    >
      <h2 className="text-xl font-bold text-center text-gray-800">
        Registro de Trampas Pegajosas
      </h2>
      <div>
        <label className="font-bold uppercase"> Fecha de Intervención</label>
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          <div className="w-full md:w-2/3">
            <CalendarShared date={date} setDate={setDate} />
          </div>
          <div className="w-full md:w-1/2 flex justify-end md:justify-center">
            <img
              src="/trampapegajosa.png"
              alt="limpieza"
              className="w-24 sm:w-32 md:w-44 lg:w-1/2 object-contain"
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="lugarcolocacion"
            className="block font-semibold text-gray-700 mb-1"
          >
            Lugar de colocación
          </label>
          <Controller
            name="lugarcolocacion"
            control={control}
            render={({ field }) => (
              <Input
                id="lugarcolocacion"
                {...field}
                placeholder="Nombre de la intervención"
                className="w-full border border-gray-400 p-3 rounded-lg"
              />
            )}
          />
          {errors.lugarcolocacion && (
            <ErrorMessage>{errors.lugarcolocacion.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="tipotrampa"
            className="block font-semibold text-gray-700 mb-1"
          >
            Tipo de Trampa
          </label>
          <Controller
            name="tipotrampa"
            control={control}
            render={({ field }) => (
              <Input
                id="tipotrampa"
                {...field}
                placeholder="Tipo de trampa"
                className="w-full border border-gray-400 p-3 rounded-lg"
              />
            )}
          />
          {errors.tipotrampa && (
            <ErrorMessage>{errors.tipotrampa.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="cantidadtrampas"
            className="block font-semibold text-gray-700 mb-1"
          >
            Cantidad de trampas
          </label>
          <Controller
            name="cantidadtrampas"
            control={control}
            render={({ field }) => (
              <Input
                id="cantidadtrampas"
                {...field}
                type="number"
                placeholder="Cantidad de trampas puestas"
                className="w-full border border-gray-400 p-3 rounded-lg"
              />
            )}
          />
          {errors.cantidadtrampas && (
            <ErrorMessage>{errors.cantidadtrampas.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="plagamonitor"
            className="block font-semibold text-gray-700 mb-1"
          >
            Plaga Monitoreada (Avistamento)
          </label>
          <Controller
            name="plagamonitor"
            control={control}
            render={({ field }) => (
              <Input
                id="plagamonitor"
                {...field}
                placeholder="Nombre de plaga monitoreada"
                className="w-full border border-gray-400 p-3 rounded-lg"
              />
            )}
          />
          {errors.plagamonitor && (
            <ErrorMessage>{errors.plagamonitor.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="fecharecambio"
            className="block font-semibold text-gray-700 mb-1"
          >
            Fecha de recambio
          </label>

          <CalendarShared date={fechaRecambio} setDate={setFechaRecambio} />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="responsable"
            className="block font-semibold text-gray-700 mb-1"
          >
            Responsable
          </label>
          <Controller
            name="responsable"
            control={control}
            render={({ field }) => (
              <Input
                id="responsable"
                {...field}
                placeholder="Responsable de la instalación o revisión de las trampas"
                className="w-full border border-gray-400 p-3 rounded-lg"
              />
            )}
          />
          {errors.responsable && (
            <ErrorMessage>{errors.responsable?.message}</ErrorMessage>
          )}
        </div>
      </div>

      <Button
        type="submit"
        disabled={mutationCleaningSticky.isPending}
        className="bg-[#1B5040] hover:bg-[#304b43] w-full p-5 rounded-lg text-white font-black text-xl"
      >
        {mutationCleaningSticky.isPending ? "Enviando..." : "Guardar"}
      </Button>
    </form>
  );
}
