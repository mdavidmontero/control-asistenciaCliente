import { useState, useEffect } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  registerAttendanceMorning,
  registerAttendanceAfternoon,
  getAttendandesUser,
} from "../../actions/attendance.actions";
import { useNavigate } from "react-router";
import { LogIn, LogOut, FileText, Sun, Moon, Clock } from "lucide-react";

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
  const { data } = useQuery({
    queryKey: ["attendance-date"],
    queryFn: () => getAttendandesUser(),
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tipo, setTipo] = useState<"entrada" | "salida" | "">("");
  const [anotaciones, setAnotaciones] = useState("");

  // Cargar anotaciones existentes según la jornada
  useEffect(() => {
    if (data) {
      const existingAnnotations =
        shift === "morning"
          ? data.anotacionesMorning || ""
          : data.anotacionesAfternoon || "";
      setAnotaciones(existingAnnotations);
    } else {
      // Limpiar anotaciones si no hay datos
      setAnotaciones("");
    }
  }, [data, shift]);

  // Selección automática del tipo de asistencia basada en registros existentes
  useEffect(() => {
    if (data) {
      if (shift === "morning") {
        // Si no hay entrada ni salida, seleccionar "entrada"
        // Si hay entrada pero no salida, seleccionar "salida"
        // Si solo hay salida, seleccionar "entrada"
        if (!data.morningIn && !data.morningOut) {
          setTipo("entrada");
        } else if (data.morningIn && !data.morningOut) {
          setTipo("salida");
        } else if (!data.morningIn && data.morningOut) {
          setTipo("entrada");
        } else {
          // Si ya tiene entrada y salida, limpiar selección
          setTipo("");
        }
      } else if (shift === "afternoon") {
        // Si no hay entrada ni salida, seleccionar "entrada"
        // Si hay entrada pero no salida, seleccionar "salida"
        // Si solo hay salida, seleccionar "entrada"
        if (!data.afternoonIn && !data.afternoonOut) {
          setTipo("entrada");
        } else if (data.afternoonIn && !data.afternoonOut) {
          setTipo("salida");
        } else if (!data.afternoonIn && data.afternoonOut) {
          setTipo("entrada");
        } else {
          // Si ya tiene entrada y salida, limpiar selección
          setTipo("");
        }
      }
    } else {
      // Si no hay datos, por defecto seleccionar "entrada"
      setTipo("entrada");
    }
  }, [data, shift]);

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

  const getCurrentTimeInfo = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentTime = now.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const isCorrectShift =
      (shift === "morning" && currentHour >= 6 && currentHour < 14) ||
      (shift === "afternoon" && currentHour >= 14 && currentHour <= 23);

    return { currentTime, isCorrectShift };
  };

  const shiftConfig = {
    morning: {
      title: "Jornada Mañana",
      icon: Sun,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      timeRange: "06:00 - 14:00",
      buttonColor: "bg-amber-500 hover:bg-amber-600",
    },
    afternoon: {
      title: "Jornada Tarde",
      icon: Moon,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      timeRange: "14:00 - 18:00",
      buttonColor: "bg-indigo-500 hover:bg-indigo-600",
    },
  };

  const config = shiftConfig[shift];
  const { currentTime, isCorrectShift } = getCurrentTimeInfo();

  return (
    <div className="">
      <div className="text-center space-y-4">
        <div className="space-y-3">
          <div>
            {!isCorrectShift && (
              <Badge className="absolute -top-3 -right-3 bg-orange-500 text-white text-xs px-2 py-1 animate-pulse">
                Fuera de horario
              </Badge>
            )}
          </div>

          {!isCorrectShift && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-4 text-sm shadow-sm">
              <div className="flex items-center justify-center gap-2 text-orange-700 mb-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
                <span className="font-semibold">Atención</span>
              </div>
              <p className="text-orange-600 text-center">
                Está registrando asistencia fuera del horario habitual de esta
                jornada.
                <br />
                <span className="font-medium">Hora actual: {currentTime}</span>
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <Label
            htmlFor="tipo"
            className="text-lg font-semibold text-slate-700 flex items-center justify-center gap-2"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            Tipo de Asistencia
          </Label>
          <Select
            value={tipo}
            onValueChange={(value) => setTipo(value as "entrada" | "salida")}
          >
            <SelectTrigger className="h-14 text-base border-2 hover:border-blue-300 focus:border-blue-500 transition-colors w-full">
              <SelectValue placeholder="Seleccione el tipo de asistencia" />
            </SelectTrigger>
            <SelectContent className="z-50 max-w-[calc(100vw-2rem)] w-full">
              <SelectItem
                value="entrada"
                className="h-14"
                disabled={
                  data && shift === "morning" && data.morningIn
                    ? true
                    : data && shift === "afternoon" && data.afternoonIn
                    ? true
                    : false
                }
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <LogIn className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">Entrada</span>
                  {data &&
                    ((shift === "morning" && data.morningIn) ||
                      (shift === "afternoon" && data.afternoonIn)) && (
                      <Badge className="ml-2 bg-green-100 text-green-700 text-xs">
                        Ya registrada
                      </Badge>
                    )}
                </div>
              </SelectItem>
              <SelectItem
                value="salida"
                className="h-14"
                disabled={
                  data && shift === "morning" && data.morningOut
                    ? true
                    : data && shift === "afternoon" && data.afternoonOut
                    ? true
                    : false
                }
              >
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-red-100 rounded-full">
                    <LogOut className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="font-medium">Salida</span>
                  {data &&
                    ((shift === "morning" && data.morningOut) ||
                      (shift === "afternoon" && data.afternoonOut)) && (
                      <Badge className="ml-2 bg-red-100 text-red-700 text-xs">
                        Ya registrada
                      </Badge>
                    )}
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {tipo && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
            <Label
              htmlFor="anotaciones"
              className="flex items-center justify-center gap-2 text-lg font-semibold text-slate-700"
            >
              <div className="p-1 bg-blue-100 rounded-full">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              Anotaciones
            </Label>
            <Textarea
              id="anotaciones"
              placeholder="Escriba anotaciones sobre su jornada (opcional)"
              className="min-h-[120px] resize-none border-2 hover:border-blue-300 focus:border-blue-500 transition-colors text-base"
              onChange={(e) => setAnotaciones(e.target.value)}
              value={anotaciones}
            />
          </div>
        )}

        {/* Status Indicators */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Badge
            variant={ubicacion ? "default" : "secondary"}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium ${
              ubicacion
                ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200"
                : "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-600 border-gray-200"
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                ubicacion ? "bg-green-500 animate-pulse" : "bg-gray-400"
              }`}
            />
            {ubicacion ? "Ubicación confirmada" : "Ubicación pendiente"}
          </Badge>

          <Badge
            variant="outline"
            className="px-4 py-3 text-sm font-medium border-2"
          >
            <Clock className="w-4 h-4 mr-2" />
            {new Date().toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </Badge>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            onClick={handleSubmit}
            disabled={!ubicacion || !tipo || isPending}
            className={`w-full h-16 text-lg font-semibold ${config.buttonColor} disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100`}
          >
            {isPending ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Registrando...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {tipo === "entrada" ? (
                  <LogIn className="w-5 h-5" />
                ) : (
                  <LogOut className="w-5 h-5" />
                )}
                <span>Firmar Asistencia</span>
              </div>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
