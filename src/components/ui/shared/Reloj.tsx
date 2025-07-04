import { useEffect, useState } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

export function Reloj() {
  const [hora, setHora] = useState("");
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    const mostrarReloj = () => {
      const fechaActual = new Date();
      const horaActual = fechaActual.getHours();
      const minutosActual = fechaActual.getMinutes();
      const segundosActual = fechaActual.getSeconds();
      const mesActual = fechaActual.getMonth();
      const diaActual = fechaActual.getDate();
      const añoActual = fechaActual.getFullYear();

      const dias = [
        "domingo",
        "lunes",
        "martes",
        "miércoles",
        "jueves",
        "viernes",
        "sábado",
      ];
      const meses = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];

      const mes = meses[mesActual];
      const hr = horaActual % 12 || 12; // 12-hour format
      const am = horaActual < 12 ? "AM" : "PM";

      const formattedMinutos =
        minutosActual < 10 ? "0" + minutosActual : minutosActual;
      const formattedSegundos =
        segundosActual < 10 ? "0" + segundosActual : segundosActual;

      setHora(`${hr}:${formattedMinutos}:${formattedSegundos} ${am}`);
      setFecha(
        `${dias[fechaActual.getDay()]} ${diaActual} ${mes} del ${añoActual}`
      );
    };

    const intervalId = setInterval(mostrarReloj, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center font-bold gap-2 mt-2 sm:mt-0">
      <div className="flex items-center gap-2 text-gray-100">
        <ClockIcon className="w-5 h-5" />
        <span>{hora}</span>
      </div>
      <div className="text-gray-100 text-sm text-center sm:text-left">
        {fecha}
      </div>
    </div>
  );
}
