import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, ArrowLeft, Sun, Moon } from "lucide-react";
import MapaLeaflet from "@/components/maps/MapLealfet";
import AttendanceForm from "@/components/attendance/AttendandeForm";

export default function HomeAttendance() {
  const navigate = useNavigate();
  const [selectedShift, setSelectedShift] = useState<"morning" | "afternoon">(
    "morning"
  );
  const [ubicacion, setUbicacion] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
              <Clock className="w-4 h-4" />
              <span className="capitalize">{currentDate}</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-800">
              Registro de Asistencia
            </h1>
            <p className="text-lg text-slate-600">
              Seleccione su jornada laboral para registrar la asistencia
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-2 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              {currentTime}
            </Badge>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="gap-2 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </div>
        </div>

        {/* Shift Selection */}
        <Card className="mb-8 shadow-sm border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-slate-700">
              Seleccionar Jornada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setSelectedShift("morning")}
                variant={selectedShift === "morning" ? "default" : "outline"}
                className={`flex-1 h-16 gap-3 text-base ${
                  selectedShift === "morning"
                    ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md"
                    : "hover:bg-amber-50 hover:border-amber-200"
                }`}
              >
                <Sun className="w-5 h-5" />
                Jornada Mañana
                <Badge variant="secondary" className="ml-2">
                  08:00 - 12:00
                </Badge>
              </Button>

              <Button
                onClick={() => setSelectedShift("afternoon")}
                variant={selectedShift === "afternoon" ? "default" : "outline"}
                className={`flex-1 h-16 gap-3 text-base ${
                  selectedShift === "afternoon"
                    ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md"
                    : "hover:bg-amber-50 hover:border-amber-200"
                }`}
              >
                <Moon className="w-5 h-5" />
                Jornada Tarde
                <Badge variant="secondary" className="ml-2">
                  2:00 - 6:00
                </Badge>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-700">
                <MapPin className="w-5 h-5" />
                Ubicación Actual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <MapaLeaflet onUbicacionConfirmada={setUbicacion} />
                <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      ubicacion ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  {ubicacion
                    ? "Ubicación confirmada"
                    : "Esperando ubicación..."}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Section */}
          <Card className="shadow-sm border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-8">
              <AttendanceForm shift={selectedShift} ubicacion={ubicacion} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
