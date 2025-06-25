import type { limpiezasCleaningTrapsTypes } from "@/types/schemas";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

interface Props {
  data: limpiezasCleaningTrapsTypes[];
}

export default function ListsCleaningStickyTraps({ data }: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-full overflow-x-auto rounded-lg border bg-white p-4 shadow-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700">
            <TableHead className="w-1/3">Responsable</TableHead>
            <TableHead className="w-1/3">Fecha</TableHead>
            <TableHead className="w-1/3 text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((trampa) => (
            <TableRow key={trampa.id}>
              <TableCell colSpan={3} className="p-0">
                <div className="p-4 border-b">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Responsable:{" "}
                        <span className="font-normal">
                          {trampa.responsable}
                        </span>
                      </p>
                      <p className="text-gray-600">
                        Fecha:{" "}
                        {trampa.fecha
                          ? new Date(trampa.fecha).toLocaleDateString()
                          : "Sin fecha"}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/cleaning-sticky-traps/edit/${trampa.id}`)
                      }
                      className="mt-2 sm:mt-0"
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Editar
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-700 mt-4">
                    <p>
                      <strong>Lugar:</strong> {trampa.lugarcolocacion}
                    </p>
                    <p>
                      <strong>Tipo de trampa:</strong> {trampa.tipotrampa}
                    </p>
                    <p>
                      <strong>Cantidad:</strong> {trampa.cantidadtrampas}
                    </p>
                    <p>
                      <strong>Plaga monitoreada:</strong> {trampa.plagamonitor}
                    </p>
                    <p>
                      <strong>Fecha recambio:</strong>{" "}
                      {new Date(trampa.fecharecambio).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
