import type { limpiezasCleaningTypes } from "@/types/schemas";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { AREAS, INTERVENCIONES } from "@/data";
import { Check, Pencil } from "lucide-react"; // ícono elegante
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  data: limpiezasCleaningTypes;
}

export default function ListCleaningCenter({ data }: Props) {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-x-auto rounded-lg border bg-white p-4 shadow-md">
      <Table>
        <TableCaption className="text-sm text-muted-foreground mt-4">
          Limpieza realizada el día{" "}
          {data.date ? new Date(data.date).toLocaleDateString() : "Sin fecha"}
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 text-gray-700">
            <TableHead className="whitespace-nowrap">Responsable</TableHead>
            <TableHead className="whitespace-nowrap">Fecha</TableHead>
            {AREAS.map((area) => (
              <TableHead key={area.key} className="whitespace-nowrap">
                {area.label}
              </TableHead>
            ))}
            {INTERVENCIONES.map((inter) => (
              <TableHead key={inter.key} className="whitespace-nowrap">
                {inter.label}
              </TableHead>
            ))}
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="hover:bg-gray-50">
            <TableCell className="font-medium">{data.responsable}</TableCell>
            <TableCell>
              {data.date
                ? new Date(data.date).toLocaleDateString()
                : "Sin fecha"}
            </TableCell>

            {AREAS.map((area) => (
              <TableCell key={area.key} className="text-center">
                {data[area.key as keyof limpiezasCleaningTypes] ? (
                  <Check className="text-green-700 font-bold w-8 h-8" />
                ) : (
                  ""
                )}
              </TableCell>
            ))}

            {INTERVENCIONES.map((inter) => (
              <TableCell key={inter.key} className="text-center">
                {data[inter.key as keyof limpiezasCleaningTypes] ? (
                  <Check className="text-green-700 font-bold w-8 h-8" />
                ) : (
                  ""
                )}
              </TableCell>
            ))}

            <TableCell className="text-right">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => navigate(`/cleaning-center/edit/${data.id}`)}
              >
                <Pencil className="w-4 h-4" />
                Editar
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
