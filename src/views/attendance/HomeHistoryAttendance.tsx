import { getAttendanceHistoryMonth } from "@/actions/attendance.actions";
import ListAttendanceHistory from "@/components/attendance/ListAttendanceHistory";
import { AttendanceReport } from "@/components/reports/ReportAttendance";
import { Button } from "@/components/ui/button";
import CalendarFilter from "@/components/ui/CalendarFilter";
import { userAuthStore } from "@/store/useAuthStore";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { useState } from "react";

export default function HomeHistoryAttendance() {
  const user = userAuthStore((state) => state.user);
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: addDays(new Date(), -5),
    to: addDays(new Date(), 5),
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["reportMonth", dateSelected.from, dateSelected.to],
    queryFn: () => {
      if (!dateSelected.from || !dateSelected.to) {
        return Promise.resolve([]);
      }
      return getAttendanceHistoryMonth(
        dateSelected.from.toISOString(),
        dateSelected.to.toISOString()
      );
    },
    enabled: false,
  });

  const handleFetchReports = () => {
    if (!dateSelected.from || !dateSelected.to) {
      alert("Selecciona un rango de fechas válido.");
      return;
    }
    refetch();
  };

  return (
    <div className="max-w-screen mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-green-700 mb-1">
            Histórico de Asistencias
          </h1>
          <p className="text-lg text-gray-700">
            Revisa tus{" "}
            <span className="text-amber-500 font-semibold">
              asistencias anteriores
            </span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Button
            onClick={handleFetchReports}
            className="w-full sm:w-auto whitespace-nowrap"
          >
            {isLoading ? "Cargando..." : "Cargar"}
          </Button>

          {data && data.length > 0 && (
            <PDFDownloadLink
              document={
                <AttendanceReport data={data} personName={user?.name || ""} />
              }
              fileName={`Reporte de ${
                new Date().getMonth() + 1
              } de ${new Date().getFullYear()} - ${user?.name}`}
            >
              <Button className="w-full sm:w-auto whitespace-nowrap">
                Generar PDF
              </Button>
            </PDFDownloadLink>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 md:p-6 border min-h-[200px]">
        <CalendarFilter setDateSelected={setDateSelected} />
        {data ? (
          <ListAttendanceHistory data={data} />
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No hay asistencias en el rango de fecha seleccionado.
          </p>
        )}
      </div>
    </div>
  );
}
