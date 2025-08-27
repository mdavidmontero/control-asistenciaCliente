import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Calendar, Download, FileText, Search, User } from "lucide-react";

import { getAttendanceHistoryMonth } from "@/actions/attendance.actions";
import ListAttendanceHistory from "@/components/attendance/ListAttendanceHistory";
import { AttendanceReport } from "@/components/reports/ReportAttendance";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CalendarFilter from "@/components/ui/CalendarFilter";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/auth.store";

export default function HomeHistoryAttendance() {
  const { user } = useAuthStore();
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const { data, isLoading, refetch, isFetching } = useQuery({
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
      toast.error("Selecciona un rango de fechas válido");
      return;
    }
    refetch();
  };

  const formatDateRange = () => {
    if (!dateSelected.from || !dateSelected.to) return "";
    return `${dateSelected.from.toLocaleDateString(
      "es-ES"
    )} - ${dateSelected.to.toLocaleDateString("es-ES")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <User className="w-4 h-4" />
              <span>Mi historial personal</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
              Histórico de Asistencias
            </h1>
            <p className="text-lg text-slate-600">
              Consulta y descarga el registro de tus asistencias
            </p>
            {dateSelected.from && dateSelected.to && (
              <Badge variant="outline" className="px-3 py-1">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDateRange()}
              </Badge>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleFetchReports}
              disabled={
                isLoading ||
                isFetching ||
                !dateSelected.from ||
                !dateSelected.to
              }
              className="gap-2 bg-amber-500 hover:bg-amber-600"
            >
              {isLoading || isFetching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Cargando...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Buscar Registros
                </>
              )}
            </Button>

            {data && data.length > 0 && (
              <PDFDownloadLink
                document={
                  <AttendanceReport data={data} personName={user?.name || ""} />
                }
                fileName={`Asistencias_${user?.name}_${
                  new Date().getMonth() + 1
                }-${new Date().getFullYear()}.pdf`}
              >
                <Button
                  variant="outline"
                  className="gap-2 bg-white hover:bg-slate-50"
                >
                  <Download className="w-4 h-4" />
                  Descargar PDF
                </Button>
              </PDFDownloadLink>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Date Filter */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-5 h-5" />
                  Filtrar por Fechas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarFilter setDateSelected={setDateSelected} />

                {/* Summary Stats */}
                {data && data.length > 0 && (
                  <div className="mt-6 p-4 bg-slate-50 rounded-lg space-y-2">
                    <h4 className="font-semibold text-slate-700">Resumen</h4>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Total registros:</span>
                      <Badge variant="secondary">{data.length}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Días consultados:</span>
                      <Badge variant="secondary">
                        {dateSelected.from && dateSelected.to
                          ? Math.ceil(
                              (dateSelected.to.getTime() -
                                dateSelected.from.getTime()) /
                                (1000 * 60 * 60 * 24)
                            ) + 1
                          : 0}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <FileText className="w-5 h-5" />
                  Registros de Asistencia
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!data && !isLoading && !isFetching && (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">
                      Selecciona un rango de fechas
                    </h3>
                    <p className="text-slate-500">
                      Usa el filtro de fechas y haz clic en "Buscar Registros"
                      para ver tus asistencias
                    </p>
                  </div>
                )}

                {(isLoading || isFetching) && (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Cargando registros...</p>
                  </div>
                )}

                {data && data.length === 0 && !isLoading && !isFetching && (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">
                      No hay registros
                    </h3>
                    <p className="text-slate-500">
                      No se encontraron asistencias en el rango de fechas
                      seleccionado
                    </p>
                  </div>
                )}

                {data && data.length > 0 && (
                  <ListAttendanceHistory data={data} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
