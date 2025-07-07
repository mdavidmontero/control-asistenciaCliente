import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

export default function LoginView() {
  return (
    <>
      <h1 className="font-black text-3xl text-green-800">Iniciar Sesión</h1>
      <p className="text-2xl font-bold">
        y registra tu <span className="text-amber-500">asistencia</span>
      </p>
      <LoginForm />
      <nav className="mt-10 flex flex-col space-y-4">
        <Link to="/auth/register" className="text-center text-gray-500">
          ¿No tienes cuenta? Crea una
        </Link>

        <Link to="/auth/forgot-password" className="text-center text-gray-500">
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
        <Link to="/" className="text-center text-gray-500 hover:text-green-700">
          Volver al inicio
        </Link>
      </nav>
    </>
  );
}
