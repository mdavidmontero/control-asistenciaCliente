import Logo from "@/components/ui/Logo";
import { Link } from "react-router-dom";

export default function UnauthorizedView() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-[#88cdb1] p-2 ">
        <div className="py-10 lg:py-20 mx-auto w-[500px]">
          <Logo />
          <div className="mt-10">
            <h1 className="font-black text-center text-4xl text-[#1B5040] mt-10">
              No tienes Permisos para acceder a esta página
            </h1>
            <p className="mt-10 text-2xl text-center font-semibold italic text-gray-800">
              Por Favor accede con un usuario con permisos{" "}
              <Link
                className="text-[#052A47] font-bold italic underline underline-offset-auto"
                to={"/"}
              >
                Ir al Inicio
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
