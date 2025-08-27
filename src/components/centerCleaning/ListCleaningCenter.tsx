"use client";

import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Edit,
  Calendar,
  User,
  Sparkles,
  Package,
  ChevronDown,
  ChevronUp,
  Check,
  X,
} from "lucide-react";

import type { limpiezasCleaningTypes } from "@/types/schemas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { AREAS, INTERVENCIONES } from "@/data";

interface Props {
  data: limpiezasCleaningTypes[];
}

export default function ListCleaningCenter({ data }: Props) {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRowExpansion = (id: number) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  if (!data || data.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Sparkles className="w-16 h-16 text-slate-300 mb-4" />
          <h3 className="text-lg font-semibold text-slate-600 mb-2">
            No hay registros
          </h3>
          <p className="text-slate-500 text-center">
            No se encontraron registros de limpieza para mostrar
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mobile View */}
      <div className="block lg:hidden space-y-4">
        {data.map((limpieza) => {
          const isExpanded = expandedRows.has(limpieza!.id!);

          return (
            <Card key={limpieza!.id} className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {limpieza!.responsable}
                    </h4>
                    <p className="text-sm text-slate-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {limpieza!.date
                        ? new Date(limpieza!.date).toLocaleDateString("es-ES")
                        : "Sin fecha"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/cleaning-center/edit/${limpieza!.id}`)
                      }
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRowExpansion(limpieza!.id!)}
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
                  <div className="space-y-4">
                    {/* Areas */}
                    <div>
                      <h5 className="font-semibold text-emerald-600 flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4" />
                        Áreas Intervenidas
                      </h5>
                      <div className="grid grid-cols-2 gap-2">
                        {AREAS.map((area) => {
                          const checked =
                            limpieza![area.key as keyof limpiezasCleaningTypes];
                          return (
                            <div
                              key={area.key}
                              className={`flex items-center gap-2 p-2 rounded-md text-sm ${
                                checked
                                  ? "bg-green-100 text-green-800 border border-green-200"
                                  : "bg-gray-50 text-gray-500"
                              }`}
                            >
                              {checked ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <X className="w-3 h-3" />
                              )}
                              <span>{area.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interventions */}
                    <div>
                      <h5 className="font-semibold text-blue-600 flex items-center gap-2 mb-3">
                        <Package className="w-4 h-4" />
                        Tipo de Intervención
                      </h5>
                      <div className="grid grid-cols-1 gap-2">
                        {INTERVENCIONES.map((inter) => {
                          const checked =
                            limpieza![
                              inter.key as keyof limpiezasCleaningTypes
                            ];
                          return (
                            <div
                              key={inter.key}
                              className={`flex items-center gap-2 p-2 rounded-md text-sm ${
                                checked
                                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                                  : "bg-gray-50 text-gray-500"
                              }`}
                            >
                              {checked ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <X className="w-3 h-3" />
                              )}
                              <span>{inter.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Supplies */}
                    {limpieza!.insumosutilizados && (
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <h6 className="font-semibold text-slate-700 mb-2">
                          Insumos Utilizados:
                        </h6>
                        <p className="text-sm text-slate-600">
                          {limpieza!.insumosutilizados}
                        </p>
                      </div>
                    )}
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
            <Sparkles className="w-5 h-5" />
            Registros de Limpieza
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="w-[200px]">Responsable</TableHead>
                  <TableHead className="w-[120px]">Fecha</TableHead>
                  <TableHead className="w-[100px]">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((limpieza, idx) => (
                  <>
                    <TableRow
                      key={limpieza!.id}
                      className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                    >
                      <TableCell className="font-medium">
                        {limpieza!.responsable}
                      </TableCell>
                      <TableCell>
                        {limpieza!.date
                          ? new Date(limpieza!.date).toLocaleDateString("es-ES")
                          : "Sin fecha"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/cleaning-center/edit/${limpieza!.id}`)
                          }
                          className="gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow key={`${limpieza!.id}-details`}>
                      <TableCell colSpan={3} className="p-0">
                        <div className="p-6 bg-slate-50/50 space-y-6">
                          {/* Areas */}
                          <div>
                            <h4 className="font-semibold text-emerald-600 flex items-center gap-2 mb-4">
                              <Sparkles className="w-4 h-4" />
                              Áreas Intervenidas
                            </h4>
                            <div className="grid grid-cols-3 gap-3">
                              {AREAS.map((area) => {
                                const checked =
                                  limpieza![
                                    area.key as keyof limpiezasCleaningTypes
                                  ];
                                return (
                                  <Badge
                                    key={area.key}
                                    className={`flex items-center gap-2 justify-start ${
                                      checked
                                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                                        : "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    {checked ? (
                                      <Check className="w-3 h-3" />
                                    ) : (
                                      <X className="w-3 h-3" />
                                    )}
                                    <span>{area.label}</span>
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>

                          {/* Interventions */}
                          <div>
                            <h4 className="font-semibold text-blue-600 flex items-center gap-2 mb-4">
                              <Package className="w-4 h-4" />
                              Tipo de Intervención
                            </h4>
                            <div className="grid grid-cols-3 gap-3">
                              {INTERVENCIONES.map((inter) => {
                                const checked =
                                  limpieza![
                                    inter.key as keyof limpiezasCleaningTypes
                                  ];
                                return (
                                  <Badge
                                    key={inter.key}
                                    className={`flex items-center gap-2 justify-start ${
                                      checked
                                        ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                                        : "bg-gray-100 text-gray-500"
                                    }`}
                                  >
                                    {checked ? (
                                      <Check className="w-3 h-3" />
                                    ) : (
                                      <X className="w-3 h-3" />
                                    )}
                                    <span>{inter.label}</span>
                                  </Badge>
                                );
                              })}
                            </div>
                          </div>

                          {/* Supplies */}
                          {limpieza!.insumosutilizados && (
                            <div className="p-4 bg-white rounded-lg border">
                              <h5 className="font-semibold text-slate-700 mb-2">
                                Insumos Utilizados:
                              </h5>
                              <p className="text-slate-600">
                                {limpieza!.insumosutilizados}
                              </p>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
