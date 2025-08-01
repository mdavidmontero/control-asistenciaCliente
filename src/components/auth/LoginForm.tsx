import { useForm } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";
import type { UserLoginForm } from "../../types";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, login } from "../../actions/auth.actions";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const initialValues: UserLoginForm = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: async () => {
      const user = await queryClient.fetchQuery({
        queryKey: ["user"],
        queryFn: getUser,
      });

      if (user?.role === "USER") {
        navigate("/visit-center");
      } else {
        navigate("/register-attendance");
      }
    },
  });
  const handleLogin = (formData: UserLoginForm) => mutate(formData);
  return (
    <form className="mt-14 space-y-5" onSubmit={handleSubmit(handleLogin)}>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Email</label>

        <input
          id="email"
          type="email"
          placeholder="Email de Registro"
          className="w-full border border-gray-400 p-3 rounded-lg"
          {...register("email", {
            required: "El Email es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "E-mail no válido",
            },
          })}
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-bold text-2xl">Password</label>

        <input
          type="password"
          placeholder="Password de Registro"
          className="w-full border border-gray-400 p-3 rounded-lg"
          {...register("password", {
            required: "El Password es obligatorio",
          })}
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}
      </div>

      <input
        type="submit"
        value="Iniciar Sesión"
        className="bg-[#1B5040] hover:bg-[#304b43] w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
      />
    </form>
  );
}
