import Logo from "@/components/ui/Logo";
import { Link } from "react-router-dom";

export default function HomeInitialView() {
  return (
    <>
      <header className="bg-[#4CAF7D] py-5">
        <div className="max-w-3xl mx-auto flex flex-col lg:flex-row items-center ">
          <div className="w-96 lg:w-[500px]">
            <Logo />
          </div>
          <nav className="flex flex-col lg:flex-row lg:justify-end gap-5 w-full ">
            <Link
              to="/auth/login"
              className="font-bold text-white hover:text-amber-500 uppercase text-sm text-center"
            >
              Iniciar Sesión
            </Link>
            <Link
              to="/auth/register"
              className="font-bold text-white hover:text-amber-500 uppercase text-sm text-center"
            >
              Registrarme
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-3xl mx-auto p-5 space-y-8 mt-20">
        <h1 className="font-black text-4xl lg:text-6xl text-[#052a47] text-center">
          Bienvenidos a <span className="text-[#1B5040]">Seynekun</span>
        </h1>

        <p className="text-lg text-center">
          Estamos encantados de recibirte. Para garantizar tu acceso y brindarte
          una mejor atención, por favor registra tu solicitud de visita
          siguiendo estos simples pasos.
        </p>

        <div className="space-y-4">
          <h2 className="font-bold text-2xl text-[#052a47]">
            Pasos para registrar tu visita
          </h2>

          <ol className="space-y-3 text-lg">
            <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <span className="text-[#052a47] font-bold">1. Regístrate: </span>
              Crea tu cuenta para poder acceder al sistema de visitas.
            </li>
            <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <span className="text-[#052a47] font-bold">
                2. Inicia sesión:{" "}
              </span>
              Accede con tu cuenta para comenzar el proceso.
            </li>
            <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <span className="text-[#052a47] font-bold">
                3. Llena el formulario:{" "}
              </span>
              Completa tus datos básicos como nombre, documento, correo,
              asistentes y motivo de la visita.
            </li>
            <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <span className="text-[#052a47] font-bold">
                4. Verifica tu información:{" "}
              </span>
              Asegúrate de que todos los campos estén correctos antes de enviar.
            </li>
            <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <span className="text-[#052a47] font-bold">
                5. Confirma tu registro:{" "}
              </span>
              Una vez enviado, tu visita entrará en proceso de revisión. En
              cuanto sea aceptada, recibirás un documento con el registro de la
              visita en tu correo.
            </li>
          </ol>
        </div>

        <div className="flex justify-center">
          <Link
            to="/register-visit-center"
            className="bg-[#1B5040] hover:bg-[#304b43] px-6 py-3 rounded-lg text-white font-bold text-lg transition-colors"
          >
            Registrate
          </Link>
        </div>
      </main>

      <nav className="flex flex-col lg:flex-row lg:justify-between gap-5 mt-10 pb-20 max-w-3xl mx-auto ">
        <Link
          to="/auth/register"
          className="text-gray-500 text-sm uppercase text-center"
        >
          ¿No tienes cuenta? Crea una
        </Link>
        <Link
          to="/auth/login"
          className="text-gray-500 text-sm uppercase text-center"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
      </nav>
    </>
  );
}
