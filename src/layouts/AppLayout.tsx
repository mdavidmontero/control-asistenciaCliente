"use client";

import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";
import { Loader2 } from "lucide-react";
import HeaderShared from "@/components/ui/shared/HeaderShared";
import Sidebar from "@/components/ui/shared/Sidebar";

export default function AppLayout() {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
          <p className="text-slate-600 font-medium">Cargando aplicación...</p>
        </div>
      </div>
    );
  }

  if (isError) return <Navigate to="/auth/login" replace />;
  if (!data) return null;

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <HeaderShared data={data} />
        <Sidebar />

        {/* Main Content */}
        <main className="transition-all duration-300 ease-in-out lg:ml-64">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className="transition-all duration-300 ease-in-out lg:ml-64 border-t border-slate-200 bg-white/50 backdrop-blur-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <span>© {new Date().getFullYear()} Seynekun</span>
                <span className="hidden sm:inline">•</span>
                <span className="hidden sm:inline">
                  Centro de Acopio Asoseynekun
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>Versión 2.0</span>
                <span>•</span>
                <span>Sistema de Asistencias</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        toastClassName="backdrop-blur-sm"
      />
    </>
  );
}
