"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addDays } from "date-fns";
import { PDFDownloadLink } from "@react-pdf/renderer";
import {
  Calendar,
  Download,
  FileText,
  Plus,
  Search,
  RefreshCw,
  Sparkles,
  BarChart3,
  Filter,
} from "lucide-react";

import { getLimpiezaByDateActual } from "@/actions/cleanin-center.actions";
import ListCleaningCenter from "@/components/centerCleaning/ListCleaningCenter";
import { PDFCleaningBlock } from "@/components/cleaningCenter/reports/ReportCleaning";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CalendarFilter from "@/components/ui/CalendarFilter";
import { userAuthStore } from "@/store/useAuthStore";
import { toast } from "react-toastify";

export default function HomeCleaningCenter() {
  const user = userAuthStore((state) => state.user);
  const navigate = useNavigate();
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["limpiezaacopioDateActual", dateSelected.from, dateSelected.to],
    queryFn: () => {
      if (!dateSelected.from || !dateSelected.to) return Promise.resolve([]);
      return getLimpiezaByDateActual(
        dateSelected.from.toISOString(),
        dateSelected.to.toISOString()
      );
    },
    enabled: !!dateSelected.from && !!dateSelected.to,
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

  const getStatsFromData = () => {
    if (!data || data.length === 0) return null;

    const totalRecords = data.length;
    const uniqueResponsables = new Set(
      data.map((record) => record!.responsable)
    ).size;
    const recentRecords = data.filter(
      (record) =>
        new Date(record!.date).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000
    ).length;

    return { totalRecords, uniqueResponsables, recentRecords };
  };

  const stats = getStatsFromData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Sparkles className="w-4 h-4" />
              <span>Sistema de Limpieza</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
              Registro de Limpieza - Centro de Acopio
            </h1>
            <p className="text-lg text-slate-600">
              Consulta y gestiona los reportes de limpieza realizados
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
              onClick={() => navigate("/register-cleaning-center")}
              className="gap-2 bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="w-4 h-4" />
              Registrar Limpieza
            </Button>
            <Button
              onClick={handleFetchReports}
              disabled={isLoading || isFetching}
              variant="outline"
              className="gap-2 bg-white hover:bg-slate-50"
            >
              {isLoading || isFetching ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
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
                document={<PDFCleaningBlock data={data} />}
                fileName={`Reporte_Limpieza_${user?.name}_${new Date()
                  .toLocaleDateString("es-ES")
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
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <FileText className="w-5 h-5 text-emerald-600" />
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

            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Responsables</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {stats.uniqueResponsables}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">Esta Semana</p>
                    <p className="text-2xl font-bold text-slate-800">
                      {stats.recentRecords}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Date Filter */}
          <div className="lg:col-span-1">
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <Filter className="w-5 h-5" />
                  Filtrar por Fechas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CalendarFilter setDateSelected={setDateSelected} />
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-700">
                  <FileText className="w-5 h-5" />
                  Registros de Limpieza
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
                      para ver los reportes de limpieza
                    </p>
                  </div>
                )}

                {(isLoading || isFetching) && (
                  <div className="text-center py-12">
                    <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-600">Cargando registros...</p>
                  </div>
                )}

                {data && data.length === 0 && !isLoading && !isFetching && (
                  <div className="text-center py-12">
                    <Sparkles className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 mb-2">
                      No hay registros
                    </h3>
                    <p className="text-slate-500 mb-6">
                      No se encontraron registros de limpieza en el rango de
                      fechas seleccionado
                    </p>
                    <Button
                      onClick={() => navigate("/register-cleaning-center")}
                      className="gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Plus className="w-4 h-4" />
                      Crear Primer Registro
                    </Button>
                  </div>
                )}

                {data && data.length > 0 && <ListCleaningCenter data={data} />}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
