import { useForm } from "react-hook-form";
import type { RequestConfirmationCodeForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { requestConfirmationCode } from "../../actions/auth.actions";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { Link } from "react-router";

export default function RequestNewCodeView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });
  const { mutate } = useMutation({
    mutationFn: requestConfirmationCode,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data);
      reset();
    },
  });

  const handleRequestCode = (formData: RequestConfirmationCodeForm) => {
    mutate(formData);
  };

  return (
    <>
      <h1 className="font-black text-3xl text-green-800">
        Solicitar Código de Confirmación
      </h1>
      <p className="text-2xl font-bold">
        Coloca un email para recibir{" "}
        <span className="text-amber-500">un nuevo código</span>
      </p>

      <form
        onSubmit={handleSubmit(handleRequestCode)}
        className="space-y-8 p-5 rounded-lg  mt-10"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label className="font-bold text-2xl" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full border border-gray-400 p-3 rounded-lg"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-[#1B5040] hover:bg-[#304b43] w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/login"
          className="text-center text-gray-500 font-normal"
        >
          ¿Ya tienes cuenta? Iniciar Sesión
        </Link>
        <Link
          to="/auth/forgot-password"
          className="text-center text-gray-500 font-normal"
        >
          ¿Olvidaste tu contraseña? Reestablecer
        </Link>
      </nav>
    </>
  );
}
