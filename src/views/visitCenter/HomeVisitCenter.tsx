import { useNavigate } from "react-router-dom";
import CalendarFilter from "@/components/ui/CalendarFilter";
import { addDays } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils";

export default function HomeVisitCenter() {
  const navigate = useNavigate();
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: addDays(new Date(), -5),
    to: addDays(new Date(), 5),
  });

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 py-8 space-y-6">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B5040]">
            Mantenimiento de Equipos
          </h1>
          <p className="text-base md:text-lg text-gray-700">
            Consulta y descarga los registros de mantenimiento de los equipos
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <CalendarFilter setDateSelected={setDateSelected} />
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => navigate("/register-visit-center")}
              className="bg-emerald-700 hover:bg-emerald-800 text-white"
            >
              Registrar Mantenimiento
            </Button>
            {/* <Button
            onClick={handleFetchReports}
            variant="outline"
            className="border-gray-300"
          >
            {isLoading ? "Cargando..." : "Cargar Registros"}
          </Button> */}
          </div>
        </div>

        <div className="rounded-xl flex flex-col justify-center items-center">
          <p>
            fecha seleccionada: {formatDate(dateSelected.from!.toISOString())}
          </p>
          <span>Listado de visitas Aqui</span>
          {/* {data && data.length > 0 ? (
          <ListCleaningEquipment data={data} />
        ) : (
          <p className="text-center text-gray-500 text-sm">
            No hay registros disponibles para el rango de fechas seleccionado.
          </p>
        )} */}
        </div>
      </div>
    </div>
  );
}
