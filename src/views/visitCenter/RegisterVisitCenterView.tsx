import VisitForm from "@/components/visitCenter/VisitForm";
import type { VisitFormData } from "@/types/schemas";
import { useFieldArray, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useVisitStore } from "@/store/visitStore";
import { buildDateFromFormData } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerVisitCenter } from "@/actions/visitCenter.actions";
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function RegisterVisitCenterView() {
  const queryClient = useQueryClient();
  const formData = useVisitStore((state) => state.formData);
  const setFormData = useVisitStore((state) => state.setFormData);
  const resetFormData = useVisitStore((state) => state.resetFormData);
  const initialSolicitudDate = buildDateFromFormData(
    formData.dia,
    formData.mes,
    formData.anio
  );
  const initialVisitaDate = buildDateFromFormData(
    formData.fechaVisitaDia,
    formData.fechaVisitaMes,
    formData.fechaVisitaAnio
  );
  const [date, setDate] = useState<Value>(initialSolicitudDate);
  const [fechaVisita, setFechaVisita] = useState<Value>(initialVisitaDate);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = useForm<VisitFormData>({
    defaultValues: formData,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      setFormData(value as VisitFormData);
    });
    return () => subscription.unsubscribe();
  }, [watch, setFormData]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "asistentes",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: registerVisitCenter,
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Visita Solicitada Correctamente",
        text: data,
      }).then(() => {
        resetFormData();
        // queryClient.invalidateQueries({ queryKey: ["visit-center-user"] });
        // queryClient.invalidateQueries({ queryKey: ["VisitCenterAll"] });
        navigate(-1);
      });
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    },
  });

  const handleForm = (formdata: VisitFormData) => {
    if (formdata.asistentes?.length === 0) {
      // Swal.fire({
      //   icon: "error",
      //   title: "Oops...",
      //   text: "Desea enviar la solicitud sin asistentes?",
      // });
      Swal.fire({
        title: "¿Desea enviar la solicitud sin asistentes?",
        text: "Esta acción no puede ser revertida",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, enviar",
      }).then((result) => {
        if (result.isConfirmed) {
          mutate(formdata);
        }
      });
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <nav className="my-5 flex justify-end">
        <button
          className="bg-[#052a47] hover:bg-[#041624] px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </nav>

      <form
        className="space-y-6 p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-lg shadow-gray-400 relative"
        onSubmit={handleSubmit(handleForm)}
        noValidate
      >
        <VisitForm
          register={register}
          errors={errors}
          onChange={setDate}
          value={date}
          fechaVisita={fechaVisita}
          setFechaVisita={setFechaVisita}
          setValue={setValue}
          fields={fields}
          append={append}
          remove={remove}
        />

        <input
          type="submit"
          value="Enviar"
          disabled={isPending}
          className="bg-[#1B5040] hover:bg-[#304b43] w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer disabled:opacity-50 transition-colors"
        />
      </form>
    </div>
  );
}
