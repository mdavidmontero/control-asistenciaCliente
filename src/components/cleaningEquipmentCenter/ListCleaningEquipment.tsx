import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import type { EquipmentSchemaType } from "@/types/schemas";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Pencil, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "@/utils";
import { Fragment, useState } from "react";

interface Props {
  data: EquipmentSchemaType[];
}

export default function ListCleaningEquipment({ data }: Props) {
  const navigate = useNavigate();
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const toggleRow = (id: number) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow">
      {/* --- Tabla modo escritorio --- */}
      <div className="hidden md:block overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
                Equipo
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
                Responsable
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase">
                Último mantenimiento
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-semibold text-gray-700 uppercase text-right">
                Acciones
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((equipment) => (
              <Fragment key={equipment.id}>
                <TableRow
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleRow(equipment.id)}
                >
                  <TableCell className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {equipment.nombre || "Equipo sin nombre"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {equipment.marca} {equipment.modelo}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-700">
                    {equipment.responsable}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-700">
                    {equipment.fecharealizado
                      ? formatDate(equipment.fecharealizado)
                      : "Sin registro"}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-indigo-600 hover:text-indigo-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(
                            `/update-cleaning-equipments/edit/${equipment.id}`
                          );
                        }}
                      >
                        <Pencil className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRow(equipment.id);
                        }}
                      >
                        {expandedRow === equipment.id ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>

                {expandedRow === equipment.id && (
                  <TableRow>
                    <TableCell colSpan={4} className="px-6 py-4 bg-gray-50">
                      {renderDetails(equipment)}
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* --- Tarjetas modo móvil --- */}
      <div className="block md:hidden space-y-4 p-4">
        {data.map((equipment) => (
          <div
            key={equipment.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow hover:shadow-md transition"
            onClick={() => toggleRow(equipment.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-base font-semibold text-gray-900">
                  {equipment.nombre || "Equipo sin nombre"}
                </p>
                <p className="text-sm text-gray-500">
                  {equipment.marca} {equipment.modelo}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRow(equipment.id);
                }}
              >
                {expandedRow === equipment.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </Button>
            </div>

            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-medium text-gray-500">Responsable:</span>{" "}
                {equipment.responsable}
              </p>
              <p>
                <span className="font-medium text-gray-500">
                  Último mantenimiento:
                </span>{" "}
                {equipment.fecharealizado
                  ? formatDate(equipment.fecharealizado)
                  : "Sin registro"}
              </p>
            </div>

            {expandedRow === equipment.id && (
              <div className="mt-4">{renderDetails(equipment)}</div>
            )}

            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/update-cleaning-equipments/edit/${equipment.id}`);
              }}
            >
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

const renderDetails = (equipment: EquipmentSchemaType) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <DetailItem label="Número de serie" value={equipment.nroserie} />
    <DetailItem label="Número de placa" value={equipment.nroplaca} />
    <DetailItem label="Referencia" value={equipment.referencia} />
    <DetailItem label="Potencia" value={equipment.potencia} />
    <DetailItem label="Área" value={equipment.area} />
    <DetailItem
      label="Fecha de compra"
      value={
        equipment.fechacompra ? formatDate(equipment.fechacompra) : undefined
      }
    />
    <DetailItem label="Estado actual" value={equipment.estado} />
    <DetailItem label="Tipo de mantenimiento" value={equipment.mantenimiento} />
    <DetailItem label="Falla detectada" value={equipment.falla} />
    <DetailItem
      label="Próximo mantenimiento"
      value={
        equipment.proximomantenimiento
          ? formatDate(equipment.proximomantenimiento)
          : undefined
      }
    />
    <DetailItem
      label="Motivo del mantenimiento"
      value={equipment.motivomantenimiento}
    />
    <DetailItem label="Técnico" value={equipment.tecnico} />
    <DetailItem
      label="Descripción de la situación"
      value={equipment.descripcionsituacion}
      fullWidth
    />
    <DetailItem
      label="Descripción del mantenimiento"
      value={equipment.descripcionmantemiento}
      fullWidth
    />
    <DetailItem
      label="Descripción de la falla"
      value={equipment.descripcionfalla}
      fullWidth
    />
  </div>
);

const DetailItem = ({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value?: string;
  fullWidth?: boolean;
}) => {
  if (!value) return null;

  return (
    <div className={fullWidth ? "col-span-full" : ""}>
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <p className="mt-0.5 text-sm text-gray-800 break-words">{value}</p>
    </div>
  );
};
