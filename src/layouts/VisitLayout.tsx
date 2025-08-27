import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/ui/shared/Sidebar";
import { useAuthStore } from "@/store/auth.store";
import HeaderShared from "@/components/ui/shared/HeaderShared";

export default function VisitLayout() {
  const { user } = useAuthStore();

  if (user)
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
          <HeaderShared data={user} />
          <Sidebar />

          <main className="transition-all duration-300 ease-in-out lg:ml-64">
            <div className="p-4 sm:p-6 lg:p-8">
              <Outlet />
            </div>
          </main>

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
                  <span>Registro de visitas</span>
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
