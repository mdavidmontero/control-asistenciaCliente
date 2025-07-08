import { getVisitById } from "@/actions/visitCenter.actions";
import { formatDate } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function DetailsVisit() {
  const { id } = useParams();
  const idVisit = +id!;
  const { data, isLoading } = useQuery({
    queryKey: ["visit-center-user", idVisit],
    queryFn: () => getVisitById(idVisit),
  });

  if (isLoading)
    return <p className="text-center text-gray-500">Cargando detalles...</p>;

  if (!data)
    return <p className="text-center text-gray-500">No se encontraron datos</p>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-green-700">
          Detalles de la Visita
        </h2>
        <p className="text-gray-500">
          Información detallada de la solicitud #{data.id}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DetailItem
          label="Fecha de Solicitud"
          value={formatDate(data.createdAt)}
        />
        <DetailItem label="Estado" value={data.evaluacion} />
        <DetailItem label="Nombre del Solicitante" value={data.nombres} />
        <DetailItem label="Empresa" value={data.empresa} />
        <DetailItem label="Área" value={data.area} />
        <DetailItem label="Email" value={data.email} />
        <DetailItem label="Teléfono" value={data.telefono} />
        <DetailItem
          label="Fecha de Visita"
          value={`${data.fechaVisitaDia} de ${data.fechaVisitaMes} de ${data.fechaVisitaAnio}`}
        />
        <DetailItem
          label="Horario"
          value={`${data.horaInicio} - ${data.horaFin}`}
        />
        <DetailItem label="Dependencia" value={data.dependencia} />
        <DetailItem label="Objeto" value={data.objeto} />
        <DetailItem label="Material" value={data.material} />
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-green-700">Visitantes</h3>
        {data.asistentes && data.asistentes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.asistentes.map((asistente, index: number) => (
              <div
                key={index}
                className="border p-4 rounded-lg bg-gray-50 space-y-1 shadow-sm"
              >
                <p className="font-semibold">{asistente.nombres}</p>
                <p className="text-sm text-gray-600">
                  {asistente.tipoDocumento}: {asistente.numeroDocumento}
                </p>
                <p className="text-sm text-gray-600">
                  Dependencia: {asistente.dependencia}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No hay asistentes registrados.
          </p>
        )}
      </div>

      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click </span> o arrastre para
              subir el documento de la visita
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">PDF,</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="application/pdf"
          />
        </label>
      </div>

      <div className="text-center">
        <button className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded-lg text-sm transition">
          Descargar Documento
        </button>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-900">{value || "—"}</p>
    </div>
  );
}
