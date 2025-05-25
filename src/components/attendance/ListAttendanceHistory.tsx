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

export default function ListAttendanceHistory({ data }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border  bg-white">
      <Table>
        <TableCaption className="text-sm text-muted-foreground mt-4">
          Listado de Asistencias
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="w-[120px]">Fecha</TableHead>
            <TableHead>Entrada Mañana</TableHead>
            <TableHead>Ubicación Entrada</TableHead>
            <TableHead>Salida Mañana</TableHead>
            <TableHead>Ubicación Salida</TableHead>
            <TableHead>Anotación Mañana</TableHead>
            <TableHead>Entrada Tarde</TableHead>
            <TableHead>Ubicación Entrada</TableHead>
            <TableHead>Salida Tarde</TableHead>
            <TableHead>Ubicación Salida</TableHead>
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
              <TableCell>{formatDate(attendance!.date)}</TableCell>
              <TableCell>
                {attendance?.morningIn
                  ? formatDateTime(attendance?.morningIn)
                  : "—"}
              </TableCell>
              <TableCell>
                {attendance?.morningInLocation ? (
                  <a
                    href={`https://www.google.com/maps?q=${attendance?.morningInLocation.lat},${attendance?.morningInLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Ver en Mapa
                  </a>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell>
                {attendance?.morningOut
                  ? formatDateTime(attendance?.morningOut)
                  : "—"}
              </TableCell>
              <TableCell>
                {attendance?.morningOutLocation ? (
                  <a
                    href={`https://www.google.com/maps?q=${attendance?.morningOutLocation.lat},${attendance?.morningOutLocation.lng}`}
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
              <TableCell>{attendance?.anotacionesMorning || "—"}</TableCell>
              <TableCell>
                {attendance?.afternoonIn
                  ? formatDateTime(attendance?.afternoonIn)
                  : "—"}
              </TableCell>
              <TableCell>
                {attendance?.afternoonInLocation ? (
                  <a
                    href={`https://www.google.com/maps?q=${attendance?.afternoonInLocation.lat},${attendance?.afternoonInLocation.lng}`}
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
              <TableCell>
                {attendance?.afternoonOut
                  ? formatDateTime(attendance?.afternoonOut)
                  : "—"}
              </TableCell>
              <TableCell>
                {attendance?.afternoonOutLocation ? (
                  <a
                    href={`https://www.google.com/maps?q=${attendance?.afternoonOutLocation.lat},${attendance?.afternoonOutLocation.lng}`}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
