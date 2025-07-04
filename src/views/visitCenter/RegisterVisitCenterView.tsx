import VisitForm from "@/components/visitCenter/VisitForm";
import type { VisitFormData } from "@/types/schemas";
import { useFieldArray, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function RegisterVisitCenterView() {
  const [date, setDate] = useState<Value>(new Date());
  const [fechaVisita, setFechaVisita] = useState<Value>(new Date());

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({ defaultValues: initialValues });
  useEffect(() => {
    if (date instanceof Date) {
      setValue("dia", date.getDate().toString());
      setValue("mes", date.toLocaleString("es-ES", { month: "long" }));
      setValue("anio", date.getFullYear().toString());
    }
  }, [date, setValue]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "asistentes",
  });

  const handleForm = (formdata: VisitFormData) => {
    console.log(formdata);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <nav className="my-5 flex justify-end">
        <Link
          className="bg-[#052a47] hover:bg-[#041624] px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors rounded"
          to={"/"}
        >
          Volver
        </Link>
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
          className="bg-[#1B5040] hover:bg-[#304b43] w-full p-3 rounded-lg text-white font-black text-xl cursor-pointer"
        />
      </form>
    </div>
  );
}
