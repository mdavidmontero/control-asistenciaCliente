import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getAttendandesUser } from "../../actions/attendance.actions";
import { formatDate, formatDateTime } from "../../lib/utils";

export default function HomeView() {
  const { data: attendances } = useQuery({
    queryKey: ["attendanceday"],
    queryFn: getAttendandesUser,
  });

  const openMap = (lat: number, lng: number) =>
    `https://www.google.com/maps?q=${lat},${lng}`;

  return (
    <div className="px-4 md:px-8 py-6">
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Mis Asistencias
          </h1>
          <p className="text-lg font-medium text-gray-700 mt-1">
            Revisa tus{" "}
            <span className="text-amber-500">asistencias diarias</span>
          </p>
        </div>

        <Link
          to="/create-attendance"
          className="bg-amber-500 hover:bg-amber-600 transition-colors px-4 py-2 rounded-md text-white font-semibold shadow text-center w-full md:w-auto"
        >
          Registrar Asistencia
        </Link>
      </div>

      {attendances?.morningIn || attendances?.afternoonIn ? (
        <div className="mt-8">
          <div className="p-6 rounded-lg bg-white shadow border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Fecha: {formatDate(attendances.date)}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-700">
              {/* Entrada Mañana */}
              <div>
                <p className="font-semibold text-gray-900">Entrada Mañana</p>
                <p>
                  {attendances.morningIn
                    ? formatDateTime(attendances.morningIn)
                    : "—"}
                </p>
                {attendances.morningInLocation && (
                  <a
                    href={openMap(
                      attendances.morningInLocation.lat,
                      attendances.morningInLocation.lng
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-xs mt-1 block"
                  >
                    Ver ubicación
                  </a>
                )}
              </div>

              {/* Salida Mañana */}
              <div>
                <p className="font-semibold text-gray-900">Salida Mañana</p>
                <p>
                  {attendances.morningOut
                    ? formatDateTime(attendances.morningOut)
                    : "—"}
                </p>
                {attendances.morningOutLocation && (
                  <a
                    href={openMap(
                      attendances.morningOutLocation.lat,
                      attendances.morningOutLocation.lng
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-xs mt-1 block"
                  >
                    Ver ubicación
                  </a>
                )}
              </div>

              {/* Anotación Mañana */}
              <div>
                <p className="font-semibold text-gray-900">Anotación Mañana</p>
                <p>{attendances.anotacionesMorning || "—"}</p>
              </div>

              {/* Entrada Tarde */}
              <div>
                <p className="font-semibold text-gray-900">Entrada Tarde</p>
                <p>
                  {attendances.afternoonIn
                    ? formatDateTime(attendances.afternoonIn)
                    : "—"}
                </p>
                {attendances.afternoonInLocation && (
                  <a
                    href={openMap(
                      attendances.afternoonInLocation.lat,
                      attendances.afternoonInLocation.lng
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-xs mt-1 block"
                  >
                    Ver ubicación
                  </a>
                )}
              </div>

              {/* Salida Tarde */}
              <div>
                <p className="font-semibold text-gray-900">Salida Tarde</p>
                <p>
                  {attendances.afternoonOut
                    ? formatDateTime(attendances.afternoonOut)
                    : "—"}
                </p>
                {attendances.afternoonOutLocation && (
                  <a
                    href={openMap(
                      attendances.afternoonOutLocation.lat,
                      attendances.afternoonOutLocation.lng
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-xs mt-1 block"
                  >
                    Ver ubicación
                  </a>
                )}
              </div>

              {/* Anotación Tarde */}
              <div>
                <p className="font-semibold text-gray-900">Anotación Tarde</p>
                <p>{attendances.anotacionesAfternoon || "—"}</p>
              </div>
            </div>

            <p className="text-xs text-right text-gray-400 mt-6">
              Última actualización: {formatDateTime(attendances.updatedAt)}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600 py-24">
          No hay asistencias registradas el día de hoy.
        </p>
      )}
    </div>
  );
}
