import { Link, Navigate, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Logo from "../components/ui/Logo";
import { useAuth } from "../hooks/useAuth";
export default function AuthLayout() {
  const { data, isLoading } = useAuth();
  if (isLoading) return "Cargando...";
  if (data) {
    return <Navigate to="/register-attendance" replace />;
  }

  return (
    <>
      <div className="lg:grid lg:grid-cols-2 lg:min-h-screen">
        <div className="flex justify-center bg-[#88cdb1] lg:bg-[url(/grafico.svg)] lg:bg-30 bg-no-repeat bg-left-bottom ">
          <div className="w-1/2 py-10 lg:py-20 flex justify-center items-center ">
            <Link to={"/"}>
              <Logo />
            </Link>
          </div>
        </div>
        <div className="p-10 lg:py-28">
          <div className="max-w-3xl mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
