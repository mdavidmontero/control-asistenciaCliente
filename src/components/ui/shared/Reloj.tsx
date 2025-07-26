import { useState, useEffect } from "react";

export function Reloj() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
      <span className="font-mono font-semibold text-slate-700">
        {formatTime(time)}
      </span>
      <span className="hidden sm:inline text-slate-400">•</span>
      <span className="text-slate-600 capitalize text-xs sm:text-sm">
        {formatDate(time)}
      </span>
    </div>
  );
}
