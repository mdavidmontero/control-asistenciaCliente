import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, LogOut, Clock, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Reloj } from "./Reloj";
import type { User } from "@/types";

interface HeaderProps {
  data: User;
}

export default function HeaderShared({ data }: HeaderProps) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      localStorage.removeItem("AUTH_TOKEN");
      queryClient.setQueryData(["user"], null);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/auth/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800";
      case "ADMINISTRATIVA":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Administrador";
      case "ADMINISTRATIVA":
        return "Administrativa";
      default:
        return role;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="transition-all duration-300 ease-in-out lg:ml-64">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => {
                // This will be handled by the sidebar component
                const event = new CustomEvent("toggle-sidebar");
                window.dispatchEvent(event);
              }}
            >
              <Menu className="w-5 h-5" />
            </Button>

            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <h1 className="text-xl font-bold text-slate-800">
                  Centro de Acopio{" "}
                  <span className="font-normal text-emerald-600">
                    Asoseynekun
                  </span>
                </h1>
              </div>
              <div className="lg:hidden">
                <h1 className="text-lg font-bold text-slate-800">Seynekun</h1>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Clock */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg">
                <Clock className="w-4 h-4 text-slate-600" />
                <Reloj />
              </div>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 h-auto p-2 hover:bg-slate-100"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={data.image || "/nophoto.jpeg"}
                        alt={data.name}
                      />
                      <AvatarFallback>
                        <Menu className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-slate-800 truncate max-w-[120px]">
                        {data.name}
                      </p>
                      {data.cargo && (
                        <p className="text-xs text-slate-500 truncate max-w-[120px]">
                          {data.cargo}
                        </p>
                      )}
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuLabel>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={data.image || "/nophoto.jpeg"}
                          alt={data.name}
                        />
                        <AvatarFallback>
                          <Menu className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 truncate">
                          {data.name}
                        </p>
                        {data.cargo && (
                          <p className="text-sm text-slate-500 truncate">
                            {data.cargo}
                          </p>
                        )}
                        <Badge
                          className={`${getRoleColor(data.role)} text-xs mt-1`}
                        >
                          {getRoleLabel(data.role)}
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-2 w-full cursor-pointer"
                    >
                      <Menu className="w-4 h-4" />
                      Mi Perfil
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <NavLink
                      to="/settings"
                      className="flex items-center gap-2 w-full cursor-pointer"
                    >
                      <Menu className="w-4 h-4" />
                      Configuración
                    </NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    disabled={isLoggingOut}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
