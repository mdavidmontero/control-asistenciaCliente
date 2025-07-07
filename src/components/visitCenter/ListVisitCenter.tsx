import { useVisitStore } from "@/store/visitStore";

export default function ListVisitCenter() {
  const formData = useVisitStore((state) => state.formData);
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
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {formData.dia}/{formData.mes}/{formData.anio}
            </th>
            <td className="px-6 py-4">{formData.nombres}</td>
            <td className="px-6 py-4">{formData.empresa}</td>
            <td className="px-6 py-4">{formData.email}</td>
            <td className="px-6 py-4">
              {formData.fechaVisitaDia}/{formData.fechaVisitaMes}/
              {formData.fechaVisitaAnio}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
