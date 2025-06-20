import type { limpiezasCleaningTypes } from "@/types/schemas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AREAS, INTERVENCIONES } from "@/data";
import { Check, Pencil, X } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  data: limpiezasCleaningTypes[];
}

export default function ListCleaningCenter({ data }: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto rounded-lg border bg-white p-4 shadow-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700">
            <TableHead>Responsable</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((limpieza) => (
            <>
              <TableRow key={limpieza!.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  {limpieza!.responsable}
                </TableCell>
                <TableCell>
                  {limpieza!.date
                    ? new Date(limpieza!.date).toLocaleDateString()
                    : "Sin fecha"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      navigate(`/cleaning-center/edit/${limpieza!.id}`)
                    }
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={3}>
                  <div className="grid gap-6 bg-gray-50 rounded-md p-4 text-sm">
                    {/* ÁREAS */}
                    <div>
                      <h4 className="text-base font-semibold mb-3 border-b pb-1 text-gray-700">
                        Áreas
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {AREAS.map((area) => {
                          const checked =
                            limpieza![area.key as keyof limpiezasCleaningTypes];
                          return (
                            <div
                              key={area.key}
                              className={`flex items-center gap-2 p-2 rounded-md border 
                                ${
                                  checked
                                    ? "bg-green-100 border-green-400 text-green-800 font-medium"
                                    : "text-gray-400"
                                }`}
                            >
                              {checked ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                              <span>{area.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-semibold mb-3 border-b pb-1 text-gray-700">
                        Tipo de Intervención
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {INTERVENCIONES.map((inter) => {
                          const checked =
                            limpieza![
                              inter.key as keyof limpiezasCleaningTypes
                            ];
                          return (
                            <div
                              key={inter.key}
                              className={`flex items-center gap-2 p-2 rounded-md border 
                                ${
                                  checked
                                    ? "bg-green-100 border-green-400 text-green-800 font-medium"
                                    : "text-gray-400"
                                }`}
                            >
                              {checked ? (
                                <Check className="w-4 h-4" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                              <span>{inter.label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {limpieza!.insumosutilizados && (
                      <div className="mt-4 text-sm text-gray-700">
                        <strong>Insumos utilizados:</strong>{" "}
                        {limpieza!.insumosutilizados}
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
  );
}
