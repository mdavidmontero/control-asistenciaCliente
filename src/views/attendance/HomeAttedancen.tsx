import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, Sun, Moon } from "lucide-react";
import AttendanceForm from "@/components/attendance/AttendandeForm";

export default function HomeAttendance() {
  const navigate = useNavigate();

  // Detectar automáticamente la jornada basada en la hora actual
  const getCurrentShift = (): "morning" | "afternoon" => {
    const currentHour = new Date().getHours();
    // Jornada mañana: 6:00 AM - 1:59 PM (6-13)
    // Jornada tarde: 2:00 PM - 11:59 PM (14-23)
    return currentHour >= 6 && currentHour < 14 ? "morning" : "afternoon";
  };

  const [selectedShift, setSelectedShift] = useState<"morning" | "afternoon">(
    getCurrentShift()
  );
  const [ubicacion] = useState<{
    lat: number;
    lng: number;
  } | null>({
    lat: 0,
    lng: 0,
  });

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-md">
          <CardHeader className="pb-6 text-center">
            <CardTitle className="text-2xl font-bold text-slate-800">
              Seleccionar Jornada
            </CardTitle>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-600 mt-2">
              <Clock className="w-4 h-4" />
              <span>Jornada sugerida automáticamente según la hora actual</span>
            </div>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => setSelectedShift("morning")}
                variant={selectedShift === "morning" ? "default" : "outline"}
                className={`flex-1 max-w-xs h-20 gap-3 text-base relative transition-all duration-300 ${
                  selectedShift === "morning"
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl transform scale-105"
                    : "hover:bg-amber-50 hover:border-amber-300 hover:shadow-md border-2"
                }`}
              >
                <Sun className="w-6 h-6" />
                <div className="flex flex-col items-center">
                  <span className="font-semibold">Jornada Mañana</span>
                  <Badge variant="secondary" className="text-xs mt-1">
                    06:00 - 14:00
                  </Badge>
                </div>
                {getCurrentShift() === "morning" && (
                  <Badge className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-2 py-1 animate-pulse">
                    Recomendada
                  </Badge>
                )}
              </Button>

              <Button
                onClick={() => setSelectedShift("afternoon")}
                variant={selectedShift === "afternoon" ? "default" : "outline"}
                className={`flex-1 max-w-xs h-20 gap-3 text-base relative transition-all duration-300 ${
                  selectedShift === "afternoon"
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-xl transform scale-105"
                    : "hover:bg-indigo-50 hover:border-indigo-300 hover:shadow-md border-2"
                }`}
              >
                <Moon className="w-6 h-6" />
                <div className="flex flex-col items-center">
                  <span className="font-semibold">Jornada Tarde</span>
                  <Badge variant="secondary" className="text-xs mt-1">
                    14:00 - 18:00
                  </Badge>
                </div>
                {getCurrentShift() === "afternoon" && (
                  <Badge className="absolute -top-3 -right-3 bg-green-500 text-white text-xs px-2 py-1 animate-pulse">
                    Recomendada
                  </Badge>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="flex justify-center">
          {/* Form Section */}
          <Card className="w-full max-w-2xl shadow-lg border-0 bg-white/80 backdrop-blur-md">
            <CardContent className="p-8">
              <AttendanceForm shift={selectedShift} ubicacion={ubicacion} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
