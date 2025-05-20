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

export default function AttendanceFormMorning() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tipo, setTipo] = useState<"entrada" | "salida" | "">("");

  const { mutate } = useMutation({
    mutationFn: registerAttendanceMorning,
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
    mutate(tipo);
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

      <Button
        onClick={handleSubmit}
        className="w-full md:w-80 bg-amber-500 hover:bg-amber-600 transition-colors"
      >
        Firmar asistencia
      </Button>
    </div>
  );
}
