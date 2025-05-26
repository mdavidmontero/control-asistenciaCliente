import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatDateTime } from "@/lib/utils";
import type { HistoryAttendances } from "@/types";

interface Props {
  data: HistoryAttendances[];
}

export default function ListAttendanceHistoryAll({ data }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-white p-4">
      <Table>
        <TableCaption className="text-sm text-muted-foreground mt-4">
          Listado completo de asistencias
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100  text-gray-600">
            <TableHead>Empleado</TableHead>
            <TableHead>Fecha</TableHead>
            {data?.[0]?.user?.cargo && <TableHead>Cargo</TableHead>}

            <TableHead>Entrada AM</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Salida AM</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Anotación AM</TableHead>
            <TableHead>Entrada PM</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Salida PM</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Anotación PM</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((attendance, idx) => (
            <TableRow
              key={attendance?.id}
              className={
                idx % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"
              }
            >
              <TableCell className="whitespace-nowrap">
                <div className="flex items-center gap-3">
                  {attendance?.user?.image ? (
                    <img
                      src={attendance.user.image}
                      alt={attendance.user.name || "Empleado"}
                      className="rounded-full object-cover w-10 h-10"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-300" />
                  )}
                  <span className="text-sm font-medium truncate max-w-[120px]">
                    {attendance?.user?.name?.split(" ").slice(0, 2).join(" ") ||
                      "—"}
                  </span>
                </div>
              </TableCell>

              <TableCell>{formatDate(attendance!.date)}</TableCell>
              {attendance?.user?.cargo && (
                <TableCell>{attendance?.user?.cargo || "—"}</TableCell>
              )}

              {/* AM - Entrada */}
              <TableCell>
                {attendance?.morningIn
                  ? formatDateTime(attendance.morningIn)
                  : "—"}
              </TableCell>
              <TableCell>
                {attendance?.morningInLocation ? (
                  <a
                    href={`https://www.google.com/maps?q=${attendance.morningInLocation.lat},${attendance.morningInLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Ver mapa
                  </a>
                ) : (
                  "—"
                )}
              </TableCell>

              {/* AM - Salida */}
              <TableCell>
                {attendance?.morningOut
                  ? formatDateTime(attendance.morningOut)
                  : "—"}
              </TableCell>
              <TableCell>
                {attendance?.morningOutLocation ? (
                  <a
                    href={`https://www.google.com/maps?q=${attendance.morningOutLocation.lat},${attendance.morningOutLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline "
                  >
                    Ver mapa
                  </a>
                ) : (
                  "—"
                )}
              </TableCell>

              <TableCell>{attendance?.anotacionesMorning || "—"}</TableCell>

              {/* PM - Entrada */}
              <TableCell>
                {attendance?.afternoonIn
                  ? formatDateTime(attendance.afternoonIn)
                  : "—"}
              </TableCell>
              <TableCell>
                {attendance?.afternoonInLocation ? (
                  <a
                    href={`https://www.google.com/maps?q=${attendance.afternoonInLocation.lat},${attendance.afternoonInLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-xs"
                  >
                    Ver mapa
                  </a>
                ) : (
                  "—"
                )}
              </TableCell>

              {/* PM - Salida */}
              <TableCell>
                {attendance?.afternoonOut
                  ? formatDateTime(attendance.afternoonOut)
                  : "—"}
              </TableCell>
              <TableCell>
                {attendance?.afternoonOutLocation ? (
                  <a
                    href={`https://www.google.com/maps?q=${attendance.afternoonOutLocation.lat},${attendance.afternoonOutLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Ver mapa
                  </a>
                ) : (
                  "—"
                )}
              </TableCell>

              <TableCell>{attendance?.anotacionesAfternoon || "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
