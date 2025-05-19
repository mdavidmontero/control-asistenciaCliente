import { Link } from "react-router-dom";
import RegisterForm from "../../components/auth/RegisterForm";

export default function RegisterView() {
  return (
    <>
      <h1 className="font-black text-6xl text-green-800">Crea una Cuenta</h1>
      <p className="text-3xl font-bold">
        y Registrar tu <span className="text-amber-500">asistencia</span>
      </p>
      <RegisterForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link to="/auth/login" className="text-center text-gray-500">
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>

        <Link to="/auth/forgot-password" className="text-center text-gray-500">
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}
