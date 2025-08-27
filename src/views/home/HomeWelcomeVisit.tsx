import { useAuthStore } from "@/store/auth.store";
import { Link } from "react-router";

export default function HomeWelcomeVisit() {
  const { user } = useAuthStore();
  return (
    <>
      <main className="max-w-4xl mx-auto p-5 space-y-8 mt-20">
        <h1 className="font-black text-4xl lg:text-6xl text-[#052a47] text-center">
          !Hola <span>{user?.name}!</span> Bienvenidos a{" "}
          <span className="text-[#1B5040]">Seynekun</span>
        </h1>

        <p className="text-lg text-center">
          Estamos encantados de recibirte. Para garantizar tu acceso y brindarte
          una mejor atención, por favor registrar la solicitud de visita
          siguiendo estos simples pasos.
        </p>

        <div className="space-y-4">
          <h2 className="font-bold text-2xl text-[#052a47]">
            Pasos para registrar tu visita
          </h2>

          <ol className="space-y-3 text-lg">
            <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <span className="text-[#052a47] font-bold">
                1. Llena el formulario:{" "}
              </span>
              Completa tus datos básicos como nombre, documento, correo,
              asistentes y motivo de la visita.
            </li>
            <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <span className="text-[#052a47] font-bold">
                2. Verifica tu información:{" "}
              </span>
              Asegúrate de que todos los campos estén correctos antes de enviar.
            </li>
            <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <span className="text-[#052a47] font-bold">
                3. Confirma tu registro:{" "}
              </span>
              Una vez enviado, tu visita entrara en proceso de revisión, en
              cuanto se acepte se le enviará a su correo un documento con el
              registro de la visita.
            </li>
          </ol>
        </div>

        <div className="flex justify-center">
          <Link
            to="/register-visit-center"
            className="bg-[#1B5040] hover:bg-[#304b43] px-6 py-3 rounded-lg text-white font-bold text-lg transition-colors"
          >
            Registrar Visita
          </Link>
        </div>
      </main>
    </>
  );
}
