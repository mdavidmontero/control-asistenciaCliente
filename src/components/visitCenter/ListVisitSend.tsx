import type { VisitList } from "@/types/schemas";
import { View } from "lucide-react";
import { Link } from "react-router";
interface ListVisitCenterProps {
  data: VisitList[];
  acciones?: boolean;
  onStatus?: (id: number, estado: string) => void;
  statusVisit?: boolean;
}
export default function ListVisitSend({
  data,
  acciones,
  onStatus,
  statusVisit,
}: ListVisitCenterProps) {
  return (
    <div className="relative overflow-x-auto my-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Fecha de Solicitud
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre del Solicitante
            </th>
            <th scope="col" className="px-6 py-3">
              Empresa
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha de Visita
            </th>

            <th scope="col" className="px-6 py-3">
              Estado
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((visit) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {visit.dia}/{visit.mes}/{visit.anio}
              </th>
              <td className="px-6 py-4">{visit.nombres}</td>
              <td className="px-6 py-4">{visit.empresa}</td>
              <td className="px-6 py-4">{visit.email}</td>
              <td className="px-6 py-4">
                {visit.fechaVisitaDia}/{visit.fechaVisitaMes}/
                {visit.fechaVisitaAnio}
              </td>
              {acciones && (
                <td className="px-6 py-4">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 items-start sm:items-center">
                    <select
                      defaultValue={visit.evaluacion}
                      onChange={(e) => onStatus?.(visit.id, e.target.value)}
                      name="estado"
                      id="estado"
                      className="bg-gray-100 px-2 py-1 rounded text-sm"
                    >
                      <option value="PENDIENTE">Pendiente</option>
                      <option value="APROBADO">Aprobado</option>
                      <option value="RECHAZADO">Rechazado</option>
                    </select>

                    <Link
                      to={`/visit/visit-cente-detail/${visit.id}`}
                      className="flex items-center gap-1 text-green-700 hover:underline text-sm"
                    >
                      <View className="w-4 h-4" />
                      Ver Detalles
                    </Link>
                  </div>
                </td>
              )}
              {statusVisit && (
                <td className="px-6 py-4">
                  <span className="text-green-600">{visit.evaluacion}</span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
