import { getAttendanceHistoryAll } from "@/actions/attendance.actions";
import ListAttendanceHistoryAll from "@/components/attendance/ListAttendanceAll";
import { AttendanceReportAll } from "@/components/reports/ReportAttendanceAll";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import api from "@/lib/axios";
import { userAuthStore } from "@/store/useAuthStore";
import { pdf, PDFDownloadLink } from "@react-pdf/renderer";
import { useQuery } from "@tanstack/react-query";
import { startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function HistoryAttendandeAll() {
  const user = userAuthStore((state) => state.user);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const selectedDate = date instanceof Date ? startOfDay(date) : null;
  const { data, isLoading } = useQuery({
    queryKey: ["reportAll", date],
    queryFn: () =>
      selectedDate
        ? getAttendanceHistoryAll(selectedDate.toISOString())
        : Promise.resolve([]),
    enabled: !!selectedDate,
  });
  const handleSendPdf = async () => {
    if (!data || data.length === 0 || !user) {
      toast.error("No hay datos para enviar.");
      return;
    }

    try {
      const doc = (
        <AttendanceReportAll
          data={data}
          personName={user?.name || "Administrador"}
        />
      );
      const blob = await pdf(doc).toBlob();

      const formData = new FormData();
      formData.append(
        "file",
        new File([blob], "reporte-asistencia.pdf", { type: "application/pdf" })
      );

      await api.post("/cron/send-pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Correo enviado con éxito.");
    } catch (error) {
      console.error("Error al enviar PDF:", error);
      toast.error("Ocurrió un error al enviar el correo.");
    }
  };
  if (user === null) return <Navigate to={"/login"} />;
  const rolesAllowed = ["ADMIN", "ADMINISTRATIVA"];
  if (!rolesAllowed.includes(user?.role)) return <Navigate to={"/403"} />;

  return (
    <div className="max-w-screen mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B5040] mb-1">
            Histórico de Asistencias
          </h1>
          <p className="text-lg text-gray-700">
            Revisa las{" "}
            <span className="text-amber-500 font-semibold">
              asistencias anteriores de todos los empleados
            </span>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <Button
            onClick={() => {}}
            className="w-full sm:w-auto whitespace-nowrap"
          >
            {isLoading ? "Cargando..." : "Cargar"}
          </Button>

          {data && data.length > 0 && (
            <>
              <PDFDownloadLink
                document={
                  <AttendanceReportAll
                    data={data}
                    personName={user?.name || ""}
                  />
                }
                fileName={`Reporte de ${new Date().getMonth() + 1} general`}
              >
                <Button className="w-full sm:w-auto whitespace-nowrap">
                  Descargar PDF
                </Button>
              </PDFDownloadLink>

              <Button
                onClick={handleSendPdf}
                className="w-full sm:w-auto whitespace-nowrap bg-green-600 hover:bg-green-700"
              >
                Enviar por correo
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-4 md:p-6 border min-h-[200px]">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border mb-5 w-[250px] mx-auto lg:mx-0"
          locale={es}
        />
        {data ? (
          <ListAttendanceHistoryAll data={data} />
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No hay asistencias en el día seleccionado.
          </p>
        )}
      </div>
    </div>
  );
}
