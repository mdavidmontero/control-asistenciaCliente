import type React from "react";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  MapPin,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  FileText,
  Sun,
  Moon,
} from "lucide-react";
import { formatDate, formatDateTime } from "@/lib/utils";
import type { HistoryAttendances } from "@/types";

interface Props {
  data: HistoryAttendances[];
}

type SortField = "date" | "morningIn" | "afternoonIn";
type SortDirection = "asc" | "desc";

export default function ListAttendanceHistory({ data }: Props) {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleRowExpansion = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const sortedData: HistoryAttendances[] = [...data].sort((a, b): number => {
    let aValue: string | Date;
    let bValue: string | Date;

    switch (sortField) {
      case "date":
        aValue = new Date(a!.date);
        bValue = new Date(b!.date);
        break;
      case "morningIn":
        aValue = a!.morningIn ? new Date(a!.morningIn) : new Date(0);
        bValue = b!.morningIn ? new Date(b!.morningIn) : new Date(0);
        break;
      case "afternoonIn":
        aValue = a!.afternoonIn ? new Date(a!.afternoonIn) : new Date(0);
        bValue = b!.afternoonIn ? new Date(b!.afternoonIn) : new Date(0);
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const getAttendanceStatus = (attendance: HistoryAttendances) => {
    const hasMorningIn = !!attendance!.morningIn;
    const hasMorningOut = !!attendance!.morningOut;
    const hasAfternoonIn = !!attendance!.afternoonIn;
    const hasAfternoonOut = !!attendance!.afternoonOut;

    if (hasMorningIn && hasMorningOut && hasAfternoonIn && hasAfternoonOut) {
      return {
        status: "complete",
        label: "Completo",
        color: "bg-green-100 text-green-800",
      };
    } else if (hasMorningIn || hasAfternoonIn) {
      return {
        status: "partial",
        label: "Parcial",
        color: "bg-yellow-100 text-yellow-800",
      };
    } else {
      return {
        status: "absent",
        label: "Ausente",
        color: "bg-red-100 text-red-800",
      };
    }
  };

  const LocationLink = ({
    location,
    label,
  }: {
    location: { lat: number; lng: number } | null;
    label: string;
  }) => {
    if (!location) return <span className="text-slate-400 text-sm">—</span>;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps?q=${location.lat},${location.lng}`,
                  "_blank"
                )
              }
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

  const SortButton = ({
    field,
    children,
  }: {
    field: SortField;
    children: React.ReactNode;
  }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 font-semibold text-slate-700 hover:text-slate-900"
      onClick={() => handleSort(field)}
    >
      {children}
      {sortField === field &&
        (sortDirection === "asc" ? (
          <ChevronUp className="w-4 h-4 ml-1" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-1" />
        ))}
    </Button>
  );

  if (!data || data.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="w-16 h-16 text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            No hay registros
          </h3>
          <p className="text-slate-500 text-center">
            No se encontraron asistencias en el período seleccionado
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile View */}
      <div className="block lg:hidden space-y-4">
        {sortedData.map((attendance) => {
          const attendanceStatus = getAttendanceStatus(attendance);
          const isExpanded = expandedRows.has(attendance!.id);

          return (
            <Card key={attendance!.id} className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {formatDate(attendance!.date)}
                    </h4>
                    <p className="text-sm text-slate-600">Mi asistencia</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={attendanceStatus.color}>
                      {attendanceStatus.status === "complete" && (
                        <CheckCircle className="w-3 h-3 mr-1" />
                      )}
                      {attendanceStatus.status === "partial" && (
                        <AlertCircle className="w-3 h-3 mr-1" />
                      )}
                      {attendanceStatus.status === "absent" && (
                        <XCircle className="w-3 h-3 mr-1" />
                      )}
                      {attendanceStatus.label}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRowExpansion(attendance!.id)}
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-6">
                    {/* Morning Shift */}
                    <div className="space-y-3 p-4 bg-amber-50 rounded-lg">
                      <h5 className="font-semibold text-amber-700 flex items-center gap-2">
                        <Sun className="w-4 h-4" />
                        Jornada Mañana
                      </h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600 block mb-1">
                            Entrada:
                          </span>
                          <p className="font-medium">
                            {attendance!.morningIn
                              ? formatDateTime(attendance!.morningIn)
                              : "—"}
                          </p>
                          {attendance!.morningInLocation && (
                            <LocationLink
                              location={attendance!.morningInLocation}
                              label="entrada mañana"
                            />
                          )}
                        </div>
                        <div>
                          <span className="text-slate-600 block mb-1">
                            Salida:
                          </span>
                          <p className="font-medium">
                            {attendance!.morningOut
                              ? formatDateTime(attendance!.morningOut)
                              : "—"}
                          </p>
                          {attendance!.morningOutLocation && (
                            <LocationLink
                              location={attendance!.morningOutLocation}
                              label="salida mañana"
                            />
                          )}
                        </div>
                      </div>
                      {attendance!.anotacionesMorning && (
                        <div>
                          <span className="text-slate-600 text-sm block mb-1">
                            Notas:
                          </span>
                          <p className="text-sm text-slate-700 bg-white p-2 rounded border">
                            {attendance!.anotacionesMorning}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Afternoon Shift */}
                    <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
                      <h5 className="font-semibold text-blue-700 flex items-center gap-2">
                        <Moon className="w-4 h-4" />
                        Jornada Tarde
                      </h5>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600 block mb-1">
                            Entrada:
                          </span>
                          <p className="font-medium">
                            {attendance!.afternoonIn
                              ? formatDateTime(attendance!.afternoonIn)
                              : "—"}
                          </p>
                          {attendance!.afternoonInLocation && (
                            <LocationLink
                              location={attendance!.afternoonInLocation}
                              label="entrada tarde"
                            />
                          )}
                        </div>
                        <div>
                          <span className="text-slate-600 block mb-1">
                            Salida:
                          </span>
                          <p className="font-medium">
                            {attendance!.afternoonOut
                              ? formatDateTime(attendance!.afternoonOut)
                              : "—"}
                          </p>
                          {attendance!.afternoonOutLocation && (
                            <LocationLink
                              location={attendance!.afternoonOutLocation}
                              label="salida tarde"
                            />
                          )}
                        </div>
                      </div>
                      {attendance!.anotacionesAfternoon && (
                        <div>
                          <span className="text-slate-600 text-sm block mb-1">
                            Notas:
                          </span>
                          <p className="text-sm text-slate-700 bg-white p-2 rounded border">
                            {attendance!.anotacionesAfternoon}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Desktop View */}
      <Card className="hidden lg:block shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Mi Historial de Asistencias
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-[120px]">
                    <SortButton field="date">Fecha</SortButton>
                  </TableHead>
                  <TableHead className="w-[100px]">Estado</TableHead>
                  <TableHead className="text-center" colSpan={3}>
                    <div className="flex items-center justify-center gap-2 text-amber-600">
                      <Sun className="w-4 h-4" />
                      Jornada Mañana
                    </div>
                  </TableHead>
                  <TableHead className="text-center" colSpan={3}>
                    <div className="flex items-center justify-center gap-2 text-blue-600">
                      <Moon className="w-4 h-4" />
                      Jornada Tarde
                    </div>
                  </TableHead>
                </TableRow>
                <TableRow className="bg-slate-50 border-t-0">
                  <TableHead></TableHead>
                  <TableHead></TableHead>
                  <TableHead className="text-xs">Entrada</TableHead>
                  <TableHead className="text-xs">Salida</TableHead>
                  <TableHead className="text-xs">Notas</TableHead>
                  <TableHead className="text-xs">Entrada</TableHead>
                  <TableHead className="text-xs">Salida</TableHead>
                  <TableHead className="text-xs">Notas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((attendance, idx) => {
                  const attendanceStatus = getAttendanceStatus(attendance);

                  return (
                    <TableRow
                      key={attendance!.id}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                    >
                      <TableCell className="font-medium">
                        {formatDate(attendance!.date)}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${attendanceStatus.color} text-xs`}>
                          {attendanceStatus.status === "complete" && (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          )}
                          {attendanceStatus.status === "partial" && (
                            <AlertCircle className="w-3 h-3 mr-1" />
                          )}
                          {attendanceStatus.status === "absent" && (
                            <XCircle className="w-3 h-3 mr-1" />
                          )}
                          {attendanceStatus.label}
                        </Badge>
                      </TableCell>

                      {/* Morning Shift */}
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {attendance!.morningIn
                              ? formatDateTime(attendance!.morningIn)
                              : "—"}
                          </p>
                          <LocationLink
                            location={attendance!.morningInLocation}
                            label="entrada mañana"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {attendance!.morningOut
                              ? formatDateTime(attendance!.morningOut)
                              : "—"}
                          </p>
                          <LocationLink
                            location={attendance!.morningOutLocation}
                            label="salida mañana"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        {attendance!.anotacionesMorning ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <p className="text-sm text-slate-600 truncate cursor-help">
                                  {attendance!.anotacionesMorning}
                                </p>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  {attendance!.anotacionesMorning}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>

                      {/* Afternoon Shift */}
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {attendance!.afternoonIn
                              ? formatDateTime(attendance!.afternoonIn)
                              : "—"}
                          </p>
                          <LocationLink
                            location={attendance!.afternoonInLocation}
                            label="entrada tarde"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            {attendance!.afternoonOut
                              ? formatDateTime(attendance!.afternoonOut)
                              : "—"}
                          </p>
                          <LocationLink
                            location={attendance!.afternoonOutLocation}
                            label="salida tarde"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        {attendance!.anotacionesAfternoon ? (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <p className="text-sm text-slate-600 truncate cursor-help">
                                  {attendance!.anotacionesAfternoon}
                                </p>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  {attendance!.anotacionesAfternoon}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
