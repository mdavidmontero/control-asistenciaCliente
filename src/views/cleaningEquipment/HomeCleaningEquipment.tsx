import { Button } from "@/components/ui/button";
import CalendarFilter from "@/components/ui/CalendarFilter";
import { addDays } from "date-fns";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeCleaningEquipment() {
  const navigate = useNavigate();
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: addDays(new Date(), -5),
    to: addDays(new Date(), 5),
  });
  return (
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
            onClick={() => navigate("/register-cleaning-equipments")}
            className="bg-emerald-700 hover:bg-emerald-800 text-white"
          >
            Registrar Mantenimiento
          </Button>
          <Button
            onClick={() => {}}
            variant="outline"
            className="border-gray-300"
          >
            Acción
            {/* {isLoading ? "Cargando..." : "Cargar Registros"} */}
          </Button>
        </div>
      </div>

      <div className="rounded-xl flex justify-center">
        <p className="tex-center">Listado de mantenimientos</p>
      </div>
    </div>
  );
}
