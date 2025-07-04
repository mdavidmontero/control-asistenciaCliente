import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "@/components/ui/shared/Sidebar";
import HeaderShared from "@/components/ui/shared/HeaderShared";

export default function AppLayout() {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) return "Cargando...";
  if (isError) return <Navigate to="/auth/login" replace />;
  if (!data) return null;

  return (
    <>
      <div className="min-h-screen bg-[#EDF3FB] flex flex-col">
        <HeaderShared data={data} />
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 sm:ml-64">
          <Outlet />
        </main>
        <footer className="py-5 text-center text-sm text-gray-600 sm:ml-64">
          © {new Date().getFullYear()} Seynekun
        </footer>
      </div>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
