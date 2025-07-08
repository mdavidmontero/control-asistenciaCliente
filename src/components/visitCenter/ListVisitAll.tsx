import {
  getVisitCenterAll,
  updateStatusVisit,
} from "@/actions/visitCenter.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { useState } from "react";
import CalendarFilter from "../ui/CalendarFilter";
import ListVisitSend from "./ListVisitSend";
import PaginatedShared from "../ui/shared/PaginatedShared";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function ListVisitAll() {
  const queryClient = useQueryClient();
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: addDays(new Date(), -5),
    to: addDays(new Date(), 5),
  });
  const [search, setSearch] = useState("");

  const [searchParams] = useSearchParams();
  const page = +(searchParams.get("page") || "1");

  const { data, isLoading, refetch } = useQuery({
    queryKey: [
      "VisitCenterAll",
      dateSelected.from,
      dateSelected.to,
      search,
      page,
    ],
    queryFn: () => {
      return getVisitCenterAll({
        from: dateSelected.from!.toISOString(),
        to: dateSelected.to!.toISOString(),
        empresa: search,
        page,
      });
    },
    enabled: !!dateSelected.from && !!dateSelected.to,
  });

  const handleFetchReports = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!dateSelected.from || !dateSelected.to) {
      alert("Selecciona un rango de fechas válido.");
      return;
    }
    refetch();
  };

  const mutationStatus = useMutation({
    mutationFn: updateStatusVisit,
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    },
    onSuccess: (data) => {
      Swal.fire({
        icon: "success",
        title: "Estado actualizado Correctamente",
        text: data,
      });
      queryClient.invalidateQueries({ queryKey: ["VisitCenterAll"] });
    },
  });

  const handleStatus = (id: number, evaluacion: string) => {
    mutationStatus.mutate({ id, evaluacion });
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1B5040]">
          Listado de Solicitudes de Visitas
        </h1>
        <p className="text-base md:text-lg text-gray-600">
          Gestiona las solicitudes de visitas realizadas a través del sistema.
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <CalendarFilter setDateSelected={setDateSelected} />

        <form className="w-full md:w-auto" onSubmit={handleFetchReports}>
          <div className="flex gap-2 items-center border rounded-lg bg-gray-50 px-3 py-2 focus-within:ring-2 focus-within:ring-green-600">
            <div className="text-gray-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="flex-grow text-sm bg-transparent outline-none placeholder-gray-400"
              placeholder="Buscar visitas..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-medium rounded-lg text-sm px-4 py-2"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      <div className="w-full overflow-x-auto">
        {isLoading ? (
          <p className="text-center text-gray-500">Cargando datos...</p>
        ) : data && data.data.length > 0 ? (
          <>
            <div className="w-full  mx-auto">
              <ListVisitSend
                data={data.data}
                acciones={true}
                onStatus={handleStatus}
                statusVisit={false}
              />
            </div>
            <PaginatedShared page={data.page} totalPages={data.totalPages!} />
          </>
        ) : (
          <p className="text-center text-gray-500">
            No hay registros disponibles para el rango de fechas seleccionado.
          </p>
        )}
      </div>
    </div>
  );
}
