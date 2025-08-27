import { getLimpiezaTrapsByDate } from "@/actions/sticky-traps.actions";
import ListsCleaningStickyTraps from "@/components/stickyTrapsCleaning/ListsCleaningStickyTraps";
import { Button } from "@/components/ui/button";
import CalendarFilter from "@/components/ui/CalendarFilter";
import { useQuery } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function HomeStickyTraps() {
  const navigate = useNavigate();

  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: addDays(new Date(), -5),
    to: addDays(new Date(), 5),
  });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["limpiezaTrapsDateActual", dateSelected.from, dateSelected.to],
    queryFn: () => {
      if (!dateSelected.from || !dateSelected.to) return Promise.resolve([]);
      return getLimpiezaTrapsByDate(
        dateSelected.from.toISOString(),
        dateSelected.to.toISOString()
      );
    },
    enabled: !!dateSelected.from && !!dateSelected.to,
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
          Registro Trampas Pegajosas - Centro de Acopio
        </h1>
        <p className="text-base md:text-lg text-gray-700">
          Consulta y descarga los reportes de las trampas pegajosas realizados
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <CalendarFilter setDateSelected={setDateSelected} />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => navigate("/register-sticky-traps")}
            className="bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            Registrar Trampa
          </Button>
          <Button
            onClick={handleFetchReports}
            variant="outline"
            className="border-gray-300"
          >
            {isLoading ? "Cargando..." : "Cargar Registros"}
          </Button>
        </div>
      </div>
      <div className=" rounded-xl">
        {data && data.length > 0 ? (
          <>
            <ListsCleaningStickyTraps data={data} />
          </>
        ) : (
          <p className="text-center text-gray-500 text-sm">
            No hay registros disponibles para el rango de fechas seleccionado.
          </p>
        )}
      </div>
    </div>
  );
}
