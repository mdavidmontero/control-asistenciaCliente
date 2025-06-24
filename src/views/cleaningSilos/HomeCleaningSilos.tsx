import { getLimpiezaSiloByDateActual } from "@/actions/cleaning-silos.actions";
import ListCleaningSilos from "@/components/cleaningSilos/ListCleaningSilos";
import { Button } from "@/components/ui/button";
import CalendarFilter from "@/components/ui/CalendarFilter";
// import { userAuthStore } from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeCleaningSilos() {
  // const user = userAuthStore((state) => state.user);
  const navigate = useNavigate();

  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: addDays(new Date(), -5),
    to: addDays(new Date(), 5),
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["limpiezasiloDateActual", dateSelected.from, dateSelected.to],
    queryFn: () => {
      if (!dateSelected.from || !dateSelected.to) return Promise.resolve([]);
      return getLimpiezaSiloByDateActual(
        dateSelected.from.toISOString(),
        dateSelected.to.toISOString()
      );
    },
    enabled: false,
  });
  const handleFetchReports = () => {
    if (!dateSelected.from || !dateSelected.to) {
      alert("Selecciona un rango de fechas válido.");
      return;
    }
    refetch();
  };
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B5040]">
          Registro de Limpieza - Silos
        </h1>
        <p className="text-base md:text-lg text-gray-700">
          Consulta y descarga los reportes registrados de limpieza de silos
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <CalendarFilter setDateSelected={setDateSelected} />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => navigate("/register-cleaning-silo")}
            className="bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            Registrar Limpieza
          </Button>
          <Button
            onClick={handleFetchReports}
            variant="outline"
            className="border-gray-300"
          >
            {isLoading ? "Cargando..." : "Cargar Registros"}
          </Button>
          {/* {data && data.length > 0 && (
            <PDFDownloadLink
              document={<PDFCleaningBlock data={data} />}
              fileName={`Reporte_Limpieza_${
                user?.name
              }_${new Date().toLocaleDateString()}.pdf`}
            >
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Descargar PDF
              </Button>
            </PDFDownloadLink>
          )} */}
        </div>
      </div>
      <div className="rounded-xl">
        {data && data.length > 0 ? (
          <ListCleaningSilos data={data} />
        ) : (
          <p className="text-center text-gray-500 text-sm">
            No hay registros disponibles para el rango de fechas seleccionado.
          </p>
        )}
      </div>
    </div>
  );
}
