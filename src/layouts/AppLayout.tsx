import { Outlet, Link, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../components/ui/Logo";
import { useAuth } from "../hooks/useAuth";
import NavMenu from "../components/ui/NavMenu";

export default function AppLayout() {
  const { data, isError, isLoading } = useAuth();

  if (isLoading) return "Cargando...";
  if (isError) {
    return <Navigate to="/auth/login" replace />;
  }

  if (data)
    return (
      <>
        <header className="bg-[#88cdb1] py-4 shadow-md">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-5 gap-4">
            <div className="order-1 lg:order-none w-64 lg:w-64 flex justify-center lg:justify-start">
              <Link to={"/"}>
                <Logo />
              </Link>
            </div>

            <div className="order-2 lg:order-none flex flex-col items-center lg:flex-row gap-4">
              <div className="flex flex-col items-center">
                <img
                  src={data.image || "/default-profile.png"}
                  alt="Perfil"
                  className="w-24 h-24 lg:w-20 lg:h-20 rounded-full object-cover border-4 border-white"
                />
                <span className="text-black font-semibold mt-2 text-center">
                  {data.name}
                </span>
              </div>

              <div className="w-full lg:w-auto flex justify-center">
                <NavMenu name={data.name} />
              </div>
            </div>
          </div>
        </header>

        <section className="max-w-screen-2xl mx-auto mt-10 px-4">
          <Outlet />
        </section>

        <footer className="py-5 text-center text-sm text-gray-600">
          Todos los derechos reservados {new Date().getFullYear()}
        </footer>

        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      </>
    );
}
