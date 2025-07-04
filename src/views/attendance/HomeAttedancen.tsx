import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import AttendanceFormMorning from "../../components/attendance/AttendandeForm";
import AttendanceFormAfternoon from "../../components/attendance/AttendanceFormAfternoon";
import MapaLeaflet from "@/components/maps/MapLealfet";

export default function HomeAttendance() {
  const [tipo, setTipo] = useState<"entrada" | "salida">("entrada");
  const [ubicacion, setUbicacion] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleSelectJornada = (tipo: "entrada" | "salida") => {
    setTipo(tipo);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="font-extrabold text-3xl md:text-3xl text-gray-700">
            Registrar asistencia del día {new Date().toLocaleDateString()}
          </h1>
          <p className="text-lg  font-medium text-gray-700">
            Seleccione el tipo de{" "}
            <span className="text-amber-500 font-semibold">asistencia</span>
          </p>
        </div>
        <Link
          to="/"
          className="bg-amber-500 hover:bg-amber-600 transition-colors px-4 py-2 rounded-lg text-white font-semibold shadow-md"
        >
          Volver
        </Link>
      </div>

      <div className="flex justify-center gap-4">
        <Button
          onClick={() => handleSelectJornada("entrada")}
          className={`${
            tipo === "entrada"
              ? "bg-amber-500 hover:bg-amber-600 transition-colors"
              : ""
          }`}
        >
          Jornada Mañana
        </Button>
        <Button
          onClick={() => handleSelectJornada("salida")}
          className={`${
            tipo === "salida"
              ? "bg-amber-500 hover:bg-amber-600 transition-colors"
              : ""
          }`}
        >
          Jornada Tarde
        </Button>
      </div>

      <div className="p-6 md:p-10 mt-6 bg-white border rounded-xl shadow-md space-y-6 text-center">
        <MapaLeaflet onUbicacionConfirmada={setUbicacion} />
        <span className="font-semibold text-sm text-center">
          Hora Actual: {new Date().toLocaleTimeString()}
        </span>
        {tipo === "entrada" ? (
          <AttendanceFormMorning ubicacion={ubicacion} />
        ) : (
          <AttendanceFormAfternoon ubicacion={ubicacion} />
        )}
      </div>
    </div>
  );
}
