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
            <TableHead className="w-[120px] text-gray-700 font-semibold">
              Fecha
            </TableHead>
            <TableHead className="text-gray-700 font-semibold">
              Entrada Mañana
            </TableHead>
            <TableHead className="text-gray-700 font-semibold">
              Salida Mañana
            </TableHead>
            <TableHead className="text-gray-700 font-semibold">
              Entrada Tarde
            </TableHead>
            <TableHead className="text-gray-700 font-semibold">
              Salida Tarde
            </TableHead>
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
              <TableCell className="font-medium text-gray-800">
                {formatDate(attendance!.date)}
              </TableCell>
              <TableCell>
                {attendance?.morningIn
                  ? formatDateTime(attendance.morningIn)
                  : "—"}
              </TableCell>
              <TableCell>
                {attendance?.morningOut
                  ? formatDateTime(attendance.morningOut)
                  : "—"}
              </TableCell>
              <TableCell>
                {attendance?.afternoonIn
                  ? formatDateTime(attendance.afternoonIn)
                  : "—"}
              </TableCell>
              <TableCell>
                {attendance?.afternoonOut
                  ? formatDateTime(attendance.afternoonOut)
                  : "—"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
