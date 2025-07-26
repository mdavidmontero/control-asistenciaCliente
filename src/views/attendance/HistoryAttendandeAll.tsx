import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { Navigate } from "react-router-dom";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { toast } from "react-toastify";
import {
  CalendarIcon,
  Download,
  FileText,
  Mail,
  Users,
  Shield,
} from "lucide-react";

import { getAttendanceHistoryAll } from "@/actions/attendance.actions";
import ListAttendanceHistoryAll from "@/components/attendance/ListAttendanceAll";
import { AttendanceReportAll } from "@/components/reports/ReportAttendanceAll";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/axios";
import { userAuthStore } from "@/store/useAuthStore";

export default function HistoryAttendanceAll() {
  const user = userAuthStore((state) => state.user);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSendingEmail, setIsSendingEmail] = useState(false);

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
      toast.error("No hay datos para enviar");
      return;
    }

    setIsSendingEmail(true);
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
      toast.success("Correo enviado con éxito");
    } catch (error) {
      console.error("Error al enviar PDF:", error);
      toast.error("Ocurrió un error al enviar el correo");
    } finally {
      setIsSendingEmail(false);
    }
  };

  // Auth checks
  if (user === null) return <Navigate to="/auth/login" />;

  const rolesAllowed = ["ADMIN", "ADMINISTRATIVA"];
  if (!rolesAllowed.includes(user?.role)) return <Navigate to="/403" />;

  const formatSelectedDate = () => {
    if (!date) return "";
    return date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getAttendanceStats = () => {
    if (!data || data.length === 0) return null;

    const totalEmployees = new Set(data.map((record) => record!.userId)).size;
    const totalRecords = data.length;

    return { totalEmployees, totalRecords };
  };

  const stats = getAttendanceStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Shield className="w-4 h-4" />
              <span>Panel de administración</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
              Histórico General de Asistencias
            </h1>
            <p className="text-lg text-slate-600">
              Consulta las{" "}
              <span className="text-amber-500 font-semibold">
                asistencias de todos los empleados
              </span>
            </p>
            {date && (
              <Badge variant="outline" className="px-3 py-1 capitalize">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {formatSelectedDate()}
              </Badge>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {data && data.length > 0 && (
              <>
                <PDFDownloadLink
                  document={
                    <AttendanceReportAll
                      data={data}
                      personName={user?.name || ""}
                    />
                  }
                  fileName={`Reporte_General_${date
                    ?.toLocaleDateString("es-ES")
                    .replace(/\//g, "-")}.pdf`}
                >
                  <Button
                    variant="outline"
                    className="gap-2 bg-white hover:bg-slate-50"
                  >
                    <Download className="w-4 h-4" />
                    Descargar PDF
                  </Button>
                </PDFDownloadLink>

                <Button
                  onClick={handleSendPdf}
                  disabled={isSendingEmail}
                  className="gap-2 bg-green-600 hover:bg-green-700"
                >
                  {isSendingEmail ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4" />
                      Enviar por Correo
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Empleados</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {stats.totalEmployees}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <FileText className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Total Registros</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {stats.totalRecords}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <CalendarIcon className="w-5 h-5" />
                  Seleccionar Fecha
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border-0 w-full"
                  locale={es}
                />
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <FileText className="w-5 h-5" />
                  Registros del Día
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading && (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Cargando registros...</p>
                  </div>
                )}

                {!isLoading && (!data || data.length === 0) && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">
                      No hay registros
                    </h3>
                    <p className="text-slate-500">
                      No se encontraron asistencias para el día seleccionado
                    </p>
                  </div>
                )}

                {data && data.length > 0 && (
                  <ListAttendanceHistoryAll data={data || []} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
