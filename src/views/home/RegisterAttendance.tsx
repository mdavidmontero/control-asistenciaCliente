import { useQuery } from "@tanstack/react-query";
import { Link, Navigate } from "react-router-dom";
import {
  Clock,
  MapPin,
  Plus,
  CheckCircle,
  AlertCircle,
  XCircle,
  ExternalLink,
  Sun,
  Moon,
  FileText,
  Calendar,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";

import { getAttendandesUser } from "../../actions/attendance.actions";
import { formatDate, formatDateTime } from "../../lib/utils";
import { userAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Location } from "@/types";

export default function RegisterAttendanceView() {
  const user = userAuthStore((state) => state.user);

  const {
    data: attendances,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["attendanceday"],
    queryFn: getAttendandesUser,
  });

  const openMap = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank");
  };

  if (user?.role === "USER") {
    return <Navigate to="/welcome-visit" replace />;
  }

  const getAttendanceProgress = () => {
    if (!attendances) return 0;

    let completed = 0;
    const total = 4; // morningIn, morningOut, afternoonIn, afternoonOut

    if (attendances.morningIn) completed++;
    if (attendances.morningOut) completed++;
    if (attendances.afternoonIn) completed++;
    if (attendances.afternoonOut) completed++;

    return (completed / total) * 100;
  };

  const getAttendanceStatus = () => {
    if (!attendances)
      return {
        status: "pending",
        label: "Sin registros",
        color: "bg-gray-100 text-gray-800",
      };

    const hasMorningIn = !!attendances.morningIn;
    const hasMorningOut = !!attendances.morningOut;
    const hasAfternoonIn = !!attendances.afternoonIn;
    const hasAfternoonOut = !!attendances.afternoonOut;

    if (hasMorningIn && hasMorningOut && hasAfternoonIn && hasAfternoonOut) {
      return {
        status: "complete",
        label: "Completo",
        color: "bg-green-100 text-green-800",
      };
    } else if (hasMorningIn || hasAfternoonIn) {
      return {
        status: "partial",
        label: "En progreso",
        color: "bg-yellow-100 text-yellow-800",
      };
    } else {
      return {
        status: "pending",
        label: "Pendiente",
        color: "bg-red-100 text-red-800",
      };
    }
  };

  const attendanceStatus = getAttendanceStatus();
  const progress = getAttendanceProgress();

  const LocationButton = ({
    location,
    label,
  }: {
    location?: Location;
    label: string;
  }) => {
    if (!location) return null;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              onClick={() => openMap(location.lat, location.lng)}
            >
              <MapPin className="w-3 h-3 mr-1" />
              <ExternalLink className="w-3 h-3" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Ver {label} en Google Maps</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  const ShiftCard = ({
    title,
    icon: Icon,
    entryTime,
    entryLocation,
    exitTime,
    exitLocation,
    notes,
    colorClass,
  }: {
    title: string;
    icon: LucideIcon;
    entryTime?: string;
    entryLocation?: Location;
    exitTime?: string;
    exitLocation?: Location;
    notes?: string;
    colorClass: string;
  }) => (
    <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className={`flex items-center gap-2 text-lg ${colorClass}`}>
          <Icon className="w-5 h-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Entry */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Entrada</span>
            {entryTime && <CheckCircle className="w-4 h-4 text-green-500" />}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm">
              {entryTime ? formatDateTime(entryTime) : "—"}
            </span>
            <LocationButton location={entryLocation} label="entrada" />
          </div>
        </div>

        {/* Exit */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">Salida</span>
            {exitTime && <CheckCircle className="w-4 h-4 text-green-500" />}
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm">
              {exitTime ? formatDateTime(exitTime) : "—"}
            </span>
            <LocationButton location={exitLocation} label="salida" />
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-sm font-medium text-slate-600 block">
                  Notas
                </span>
                <p className="text-sm text-slate-700 mt-1">{notes}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-slate-600 font-medium">Cargando asistencias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(new Date().toLocaleDateString())}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
              Mis Asistencias de Hoy
            </h1>
            <p className="text-lg text-slate-600">
              Revisa y registra tu asistencia diaria
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="gap-2 bg-white hover:bg-slate-50"
            >
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </Button>
            <Link to="/create-attendance">
              <Button className="gap-2 bg-amber-500 hover:bg-amber-600 w-full sm:w-auto">
                <Plus className="w-4 h-4" />
                Registrar Asistencia
              </Button>
            </Link>
          </div>
        </div>

        {attendances?.morningIn || attendances?.afternoonIn ? (
          <div className="space-y-8">
            {/* Status Overview */}
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Estado de Asistencia
                  </CardTitle>
                  <Badge className={attendanceStatus.color}>
                    {attendanceStatus.status === "complete" && (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    )}
                    {attendanceStatus.status === "partial" && (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {attendanceStatus.status === "pending" && (
                      <XCircle className="w-3 h-3 mr-1" />
                    )}
                    {attendanceStatus.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progreso del día</span>
                    <span className="font-medium">
                      {Math.round(progress)}% completado
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                  <div className="text-center">
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        attendances.morningIn
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {attendances.morningIn ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600">Entrada AM</p>
                  </div>
                  <div className="text-center">
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        attendances.morningOut
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {attendances.morningOut ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600">Salida AM</p>
                  </div>
                  <div className="text-center">
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        attendances.afternoonIn
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {attendances.afternoonIn ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600">Entrada PM</p>
                  </div>
                  <div className="text-center">
                    <div
                      className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                        attendances.afternoonOut
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {attendances.afternoonOut ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600">Salida PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shift Details */}
            <div className="grid lg:grid-cols-2 gap-8">
              <ShiftCard
                title="Jornada Mañana"
                icon={Sun}
                entryTime={attendances.morningIn ?? undefined}
                entryLocation={attendances.morningInLocation ?? undefined}
                exitTime={attendances.morningOut ?? undefined}
                exitLocation={attendances.morningOutLocation ?? undefined}
                notes={attendances.anotacionesMorning ?? undefined}
                colorClass="text-amber-600"
              />

              <ShiftCard
                title="Jornada Tarde"
                icon={Moon}
                entryTime={attendances.afternoonIn ?? undefined}
                entryLocation={attendances.afternoonInLocation ?? undefined}
                exitTime={attendances.afternoonOut ?? undefined}
                exitLocation={attendances.afternoonOutLocation ?? undefined}
                notes={attendances.anotacionesAfternoon ?? undefined}
                colorClass="text-blue-600"
              />
            </div>

            {/* Footer Info */}
            <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="py-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-slate-500">
                  <span>Fecha de registro: {formatDate(attendances.date)}</span>
                  <span>
                    Última actualización:{" "}
                    {formatDateTime(attendances.updatedAt)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Empty State */
          <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No hay registros de hoy
              </h3>
              <p className="text-slate-500 text-center mb-6 max-w-md">
                Aún no has registrado ninguna asistencia para el día de hoy. Haz
                clic en el botón para comenzar.
              </p>
              <Link to="/create-attendance">
                <Button className="gap-2 bg-amber-500 hover:bg-amber-600">
                  <Plus className="w-4 h-4" />
                  Registrar Primera Asistencia
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
