import { getLimpiezaByDateActual } from "@/actions/cleanin-center.actions";
import ListCleaningCenter from "@/components/centerCleaning/ListCleaningCenter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function HomeCleaningCenter() {
  const navigation = useNavigate();
  const { data } = useQuery({
    queryKey: ["limpiezaacopioDateActual"],
    queryFn: getLimpiezaByDateActual,
  });
  return (
    <div className="max-w-screen mx-auto px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-green-700 mb-1">
            Registro de Limpieza en el centro de acopio
          </h1>
          <p className="text-lg text-gray-700">
            Revisa los registros de limpiezas realizadas en el centro de acopio{" "}
            <span className="text-amber-500 font-semibold">
              el día {new Date().toLocaleDateString()}
            </span>
          </p>
        </div>
        <Button onClick={() => navigation("/register-cleaning-center")}>
          Registrar Limpieza
        </Button>
      </div>
      {data ? (
        <div className="bg-white rounded-lg shadow p-4 md:p-6 border min-h-[200px]">
          <ListCleaningCenter data={data} />
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No hay registros de limpiezas en el día seleccionado.
        </p>
      )}
    </div>
  );
}
