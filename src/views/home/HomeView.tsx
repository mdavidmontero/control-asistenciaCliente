import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAttendandesUser } from "../../actions/attendance.actions";
import { formatDate, formatDateTime } from "../../lib/utils";

export default function HomeView() {
  const { data: attendances } = useQuery({
    queryKey: ["attendanceday"],
    queryFn: getAttendandesUser,
  });

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center">
        <div className="w-full md:w-auto">
          <h1 className="font-black text-4xl text-black my-5">
            Mis Asistencias
          </h1>
          <p className="text-xl font-bold">
            Revisa tus{" "}
            <span className="text-amber-500">asistencias diarias</span>
          </p>
        </div>
        <Link
          to={"/create-attendance"}
          className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
        >
          Registrar Asistencia
        </Link>
      </div>

      {attendances?.morningIn || attendances?.afternoonIn ? (
        <div className="grid grid-cols-1 gap-6 mt-10">
          <div
            key={attendances.id}
            className="p-6 bg-white rounded-lg shadow-md border border-gray-200"
          >
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              Fecha: {formatDate(attendances.date)}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
              <div>
                <span className="block font-semibold text-gray-900">
                  Entrada Mañana:
                </span>
                {attendances.morningIn
                  ? formatDateTime(attendances.morningIn)
                  : "—"}
              </div>
              <div>
                <span className="block font-semibold text-gray-900">
                  Salida Mañana:
                </span>
                {attendances.morningOut
                  ? formatDateTime(attendances.morningOut)
                  : "—"}
              </div>
              <div>
                <span className="block font-semibold text-gray-900">
                  Entrada Tarde:
                </span>
                {attendances.afternoonIn
                  ? formatDateTime(attendances.afternoonIn)
                  : "—"}
              </div>
              <div>
                <span className="block font-semibold text-gray-900">
                  Salida Tarde:
                </span>
                {attendances.afternoonOut
                  ? formatDateTime(attendances.afternoonOut)
                  : "—"}
              </div>
            </div>

            <p className="text-xs text-right text-gray-400 mt-4">
              Última actualización: {formatDateTime(attendances.updatedAt)}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center py-20">
          No hay asistencias registradas el dia de hoy
        </p>
      )}
    </>
  );
}
