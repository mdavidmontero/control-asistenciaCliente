import type { User } from "@/types";
import { Reloj } from "./Reloj";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";

interface HeaderProps {
  data: User;
}
export default function HeaderShared({ data }: HeaderProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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
    <header className="bg-[#4CAF7D] py-6 pl-0 sm:pl-64 pr-4 shadow-md lg:sticky lg:top-0">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 px-4">
        <div className="text-center sm:text-left">
          <h1 className="text-white text-2xl sm:text-2xl font-semibold">
            Centro de Acopio{" "}
            <span className="font-light text-gray-100">Asoseynekun</span>
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
          <div className="flex items-center text-white">
            <Reloj />
          </div>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-[#04253d] font-bold" : "text-gray-100"
            }
          >
            Mi Perfil
          </NavLink>

          <div className="flex items-center gap-3">
            <img
              src={data.image || "/nophoto.jpeg"}
              alt="Perfil"
              className="w-12 h-12 rounded-full object-cover border-2 border-white"
            />
            <div className="text-white text-center sm:text-left">
              <p className="font-semibold">{data.name}</p>
              {data.cargo && (
                <p className="text-xs text-gray-100">{data.cargo}</p>
              )}
            </div>
          </div>

          <button
            onClick={logout}
            className="bg-white text-[#1D4F3E] hover:bg-gray-200 font-medium px-4 py-2 rounded transition text-sm w-full lg:w-auto"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
