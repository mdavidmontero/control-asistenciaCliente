import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAttendanceMorning } from "../../actions/attendance.actions";
import { useNavigate } from "react-router-dom";
import MapaIframe from "../maps/MapaIframe";

export default function AttendanceFormMorning() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tipo, setTipo] = useState<"entrada" | "salida" | "">("");
  const [ubicacion, setUbicacion] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [anotaciones, setAnotaciones] = useState("");
  type AttendanceInput = {
    tipo: "entrada" | "salida";
    ubicacion: { lat: number; lng: number };
    anotaciones: string;
  };

  const { mutate } = useMutation({
    mutationFn: ({ tipo, ubicacion, anotaciones }: AttendanceInput) =>
      registerAttendanceMorning(tipo, ubicacion, anotaciones),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["attendanceday"] });
      toast.success(data, {
        onClose: () => {
          navigate(-1);
        },
        autoClose: 2000,
      });
    },
  });
  const handleSubmit = async () => {
    if (!tipo) {
      toast.error("Seleccione el tipo de asistencia");
      return;
    }

    if (!ubicacion) {
      toast.error("Debe permitir ubicación para firmar asistencia");
      return;
    }
    mutate({ tipo, ubicacion, anotaciones });
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <h2 className="font-bold text-xl">Asistencia Jornada Mañana</h2>
      <div className="w-full md:w-80">
        <Select
          value={tipo}
          onValueChange={(value) => setTipo(value as "entrada" | "salida")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Seleccione el tipo de asistencia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="entrada">Entrada</SelectItem>
            <SelectItem value="salida">Salida</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <label className="font-bold text-lg">Anotaciones </label>
      {tipo === "salida" && (
        <textarea
          placeholder="Escriba anotaciones (opcional)"
          className="w-full border border-gray-400 p-2 rounded-lg"
          onChange={(e) => setAnotaciones(e.target.value)}
          value={anotaciones}
          defaultValue={anotaciones}
        />
      )}

      <MapaIframe onUbicacionConfirmada={(coords) => setUbicacion(coords)} />

      <Button
        onClick={handleSubmit}
        className="w-full md:w-80 bg-amber-500 hover:bg-amber-600 transition-colors"
      >
        Firmar asistencia
      </Button>
    </div>
  );
}
