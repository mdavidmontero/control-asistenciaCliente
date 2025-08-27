import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  registerAttendanceMorning,
  registerAttendanceAfternoon,
} from "../../actions/attendance.actions";
import { useNavigate } from "react-router";
import { LogIn, LogOut, FileText, Sun, Moon } from "lucide-react";

type Props = {
  shift: "morning" | "afternoon";
  ubicacion: { lat: number; lng: number } | null;
};

type AttendanceInput = {
  tipo: "entrada" | "salida";
  ubicacion: { lat: number; lng: number };
  anotaciones: string;
};

export default function AttendanceForm({ shift, ubicacion }: Props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tipo, setTipo] = useState<"entrada" | "salida" | "">("");
  const [anotaciones, setAnotaciones] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: ({ tipo, ubicacion, anotaciones }: AttendanceInput) =>
      shift === "morning"
        ? registerAttendanceMorning(tipo, ubicacion, anotaciones)
        : registerAttendanceAfternoon(tipo, ubicacion, anotaciones),
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

  const handleSubmit = () => {
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

  const shiftConfig = {
    morning: {
      title: "Jornada Mañana",
      icon: Sun,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    afternoon: {
      title: "Jornada Tarde",
      icon: Moon,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
  };

  const config = shiftConfig[shift];
  const ShiftIcon = config.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bgColor}`}
        >
          <ShiftIcon className={`w-5 h-5 ${config.color}`} />
          <span className={`font-semibold ${config.color}`}>
            {config.title}
          </span>
        </div>
        <p className="text-slate-600">
          Complete los datos para registrar su asistencia
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Attendance Type Selection */}
        <div className="space-y-3">
          <Label
            htmlFor="tipo"
            className="text-base font-medium text-slate-700"
          >
            Tipo de Asistencia
          </Label>
          <Select
            value={tipo}
            onValueChange={(value) => setTipo(value as "entrada" | "salida")}
          >
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Seleccione el tipo de asistencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entrada" className="h-12">
                <div className="flex items-center gap-3">
                  <LogIn className="w-4 h-4 text-green-600" />
                  <span>Entrada</span>
                </div>
              </SelectItem>
              <SelectItem value="salida" className="h-12">
                <div className="flex items-center gap-3">
                  <LogOut className="w-4 h-4 text-red-600" />
                  <span>Salida</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notes Section - Only for exit */}
        {tipo === "salida" && (
          <div className="space-y-3">
            <Label
              htmlFor="anotaciones"
              className="flex items-center gap-2 text-base font-medium text-slate-700"
            >
              <FileText className="w-4 h-4" />
              Anotaciones
            </Label>
            <Textarea
              id="anotaciones"
              placeholder="Escriba anotaciones sobre su jornada (opcional)"
              className="min-h-[100px] resize-none"
              onChange={(e) => setAnotaciones(e.target.value)}
              value={anotaciones}
            />
          </div>
        )}

        {/* Status Indicators */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Badge
            variant={ubicacion ? "default" : "secondary"}
            className={`flex items-center gap-2 px-3 py-2 ${
              ubicacion
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                ubicacion ? "bg-green-500" : "bg-gray-400"
              }`}
            />
            {ubicacion ? "Ubicación confirmada" : "Ubicación pendiente"}
          </Badge>

          <Badge variant="outline" className="px-3 py-2">
            {new Date().toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </Badge>
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!ubicacion || !tipo || isPending}
          className="w-full h-12 text-base bg-amber-500 hover:bg-amber-600 disabled:opacity-50"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Registrando...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {tipo === "entrada" ? (
                <LogIn className="w-4 h-4" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              Firmar Asistencia
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
