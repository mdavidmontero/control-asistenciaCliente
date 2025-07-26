import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ListVisitCenter from "@/components/visitCenter/ListVisitCenter";
import ListVisitSend from "@/components/visitCenter/ListVisitSend";
import { useVisitStore } from "@/store/visitStore";
import { useQuery } from "@tanstack/react-query";
import { getVisitCenterByUser } from "@/actions/visitCenter.actions";

export default function HomeVisitCenter() {
  const navigate = useNavigate();
  const formData = useVisitStore((state) => state.formData);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["visit-center-user"],
    queryFn: getVisitCenterByUser,
  });

  const hasDraft =
    !!formData &&
    Object.values(formData).some(
      (value) =>
        value !== "" &&
        value !== "PENDIENTE" &&
        value !== null &&
        value !== undefined
    );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B5040]">
          Solicitud de Visitas
        </h1>
        <p className="text-base md:text-lg text-gray-700">
          Formato Solicitud de Visitas
        </p>
      </div>

      <div className="flex  gap-4 justify-between items-center ">
        <Button
          onClick={() => navigate("/register-visit-center")}
          className="w-full md:w-auto bg-emerald-700 hover:bg-emerald-800 text-white"
        >
          Solicitar Visita
        </Button>
      </div>

      {hasDraft && (
        <>
          <span className="bg-blue-100 text-blue-800 me-2 px-4 py-2 rounded-sm dark:bg-blue-900 dark:text-blue-300 font-bold">
            Borradores
          </span>
          <ListVisitCenter />
        </>
      )}

      <span className="bg-green-100 text-green-800 font-bold me-2 px-4 py-2 rounded-sm dark:bg-green-900 dark:text-green-300">
        Enviados
      </span>

      {isLoading ? (
        <p className="text-center text-gray-500">Cargando registros...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Error al cargar las visitas.</p>
      ) : data!.length > 0 ? (
        <ListVisitSend data={data || []} statusVisit={true} />
      ) : (
        <p className="text-center text-gray-500">No hay visitas registradas.</p>
      )}
    </div>
  );
}
