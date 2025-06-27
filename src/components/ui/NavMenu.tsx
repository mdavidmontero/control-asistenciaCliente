import { Fragment } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import type { User } from "../../types";
import { userAuthStore } from "@/store/useAuthStore";

type NavMenuProps = {
  name: User["name"];
};
export default function NavMenu({ name }: NavMenuProps) {
  const user = userAuthStore((state) => state.user);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = async () => {
    try {
      localStorage.removeItem("AUTH_TOKEN");
      queryClient.setQueryData(["user"], null);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg bg-green-800">
        <Bars3Icon className="w-8 h-8 text-white " />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <p className="text-center">Hola: {name} </p>
            <Link to="/profile" className="block p-2 hover:text-green-950">
              Mi Perfil
            </Link>
            <Link to="/" className="block p-2 hover:text-green-950">
              Mis Asistencias
            </Link>
            <Link
              to="/history-asistencia"
              className="block p-2 hover:text-green-950"
            >
              Historico de Asistencias
            </Link>
            {user?.role === "ADMIN" && (
              <Link
                to="/history-asistencias-todas"
                className="block p-2 hover:text-green-950"
              >
                Historico Todas las Asistencias
              </Link>
            )}
            <Link
              to="/cleaning-center"
              className="block p-2 hover:text-green-950"
            >
              Registrar Limpieza Centro Acopio
            </Link>
            <Link to="/traps-center" className="block p-2 hover:text-green-950">
              Trampas Pegajosas
            </Link>
            <Link
              to="/cleaning-equipments"
              className="block p-2 hover:text-green-950"
            >
              Mantemiento de Maquinas y Equipos
            </Link>
            <Link
              to="/cleaning-silos"
              className="block p-2 hover:text-green-950"
            >
              Limpieza Silos
            </Link>
            <button
              className="block p-2 hover:text-green-950  hover:font-bold cursor-pointer"
              type="button"
              onClick={logout}
            >
              Cerrar Sesión
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}
