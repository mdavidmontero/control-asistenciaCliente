import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  X,
  Home,
  Clock,
  FileText,
  Users,
  Settings,
  BarChart3,
  Calendar,
} from "lucide-react";

import { LinksNav } from "@/data/LinksNav";
import { userAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const iconMap = {
  "/": Home,
  "/register-attendance": Clock,
  "/history-attendance": FileText,
  "/history-attendance-all": Users,
  "/reports": BarChart3,
  "/calendar": Calendar,
  "/settings": Settings,
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const user = userAuthStore((state) => state.user);
  const location = useLocation();

  // Handle mobile menu toggle
  useEffect(() => {
    const handleToggle = () => setIsOpen(!isOpen);
    window.addEventListener("toggle-sidebar", handleToggle);
    return () => window.removeEventListener("toggle-sidebar", handleToggle);
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (!user) {
    return (
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-slate-200 shadow-lg lg:translate-x-0 -translate-x-full">
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-slate-500">Cargando...</div>
        </div>
      </aside>
    );
  }

  const filteredNavigation = LinksNav.filter((nav) =>
    nav.allowedRoles.includes(user.role)
  );

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-slate-200 shadow-lg transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <Link to="/register-attendance" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
              <div>
                <h2 className="font-bold text-slate-800">Seynekun</h2>
                <p className="text-xs text-slate-500">Sistema de Asistencias</p>
              </div>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* User Info */}
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-200 flex items-center justify-center">
                <span className="text-emerald-700 font-semibold text-sm">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-800 truncate text-sm">
                  {user.name}
                </p>
                {user.cargo && (
                  <p className="text-xs text-slate-600 truncate">
                    {user.cargo}
                  </p>
                )}
                <Badge className="bg-emerald-100 text-emerald-700 text-xs mt-1">
                  {user.role === "ADMIN"
                    ? "Administrador"
                    : user.role === "ADMINISTRATIVA"
                    ? "Administrativa"
                    : user.role}
                </Badge>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Navegación
            </div>
            {filteredNavigation.map(({ to, label }) => {
              const Icon = iconMap[to as keyof typeof iconMap] || Home;
              const isActive = location.pathname === to;

              return (
                <NavLink
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? "bg-emerald-100 text-emerald-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? "text-emerald-600"
                        : "text-slate-500 group-hover:text-slate-600"
                    }`}
                  />
                  <span className="font-medium text-sm">{label}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-emerald-500 rounded-full" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200">
            <div className="text-center">
              <p className="text-xs text-slate-500">© 2025 Seynekun</p>
              <p className="text-xs text-slate-400 mt-1">v2.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
