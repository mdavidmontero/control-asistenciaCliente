import { useForm } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import type { UserRegistrationForm } from "../../types";
import { createAccount } from "../../actions/auth.actions";
import { useNavigate } from "react-router-dom";
export default function RegisterForm() {
  const navigate = useNavigate();
  const initialValues: UserRegistrationForm = {
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      reset();
      toast.success(data, {
        onClose: () => {
          navigate("/auth/login");
        },
      });
    },
  });
  const handleRegister = (formData: UserRegistrationForm) => {
    mutate(formData);
  };

  const password = watch("password");
  return (
    <form className="mt-14 space-y-5" onSubmit={handleSubmit(handleRegister)}>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
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

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Nombre</label>
        <input
          type="text"
          placeholder="Nombre de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("name", {
            required: "El Nombre de usuario es obligatorio",
          })}
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Password</label>
        <input
          type="password"
          placeholder="Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("password", {
            required: "El Password es obligatorio",
            minLength: {
              value: 8,
              message: "El Password debe ser mínimo de 8 caracteres",
            },
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Repetir Password</label>
        <input
          id="password_confirmation"
          type="password"
          placeholder="Repite Password de Registro"
          className="w-full border border-gray-300 p-3 rounded-lg"
          {...register("password_confirmation", {
            required: "Repetir Password es obligatorio",
            validate: (value) =>
              value === password || "Los Passwords no son iguales",
          })}
        />
        {errors.password_confirmation && (
          <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Registrarme"
        className="bg-[#1B5040] hover:bg-[#304b43] w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
      />
    </form>
  );
}
