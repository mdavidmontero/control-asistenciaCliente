import { useForm } from "react-hook-form";
import type { User, UserProfileForm } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile, uploadImage } from "../../actions/auth.actions";
import { toast } from "react-toastify";
import ErrorMessage from "../ui/ErrorMessage";
import Spinner from "../ui/shared/spinner/Spinner";

type ProfileFormProps = {
  data: User;
};

export default function ProfileForm({ data }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileForm>({ defaultValues: data });

  const queryClient = useQueryClient();
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
  const updateImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], (prevData: User) => {
        return {
          ...prevData,
          image: data,
        };
      });
    },
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleUserProfileForm = (formData: UserProfileForm) => {
    const user: User = queryClient.getQueryData(["user"])!;
    user.name = formData.name;
    user.email = formData.email;
    updateProfileMutation.mutate(user);
  };

  return (
    <>
      <div className="mx-auto max-w-3xl g">
        <h1 className="text-3xl font-black ">Mi Perfil</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Aquí puedes actualizar tu información
        </p>

        <form
          onSubmit={handleSubmit(handleUserProfileForm)}
          className=" mt-14 space-y-5  bg-white shadow-lg p-10 rounded-l"
          noValidate
        >
          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              placeholder="Tu Nombre"
              className="w-full border border-gray-400 p-3 rounded-lg"
              {...register("name", {
                required: "Nombre de usuario es obligatoro",
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>

          <div className="mb-5 space-y-3">
            <label className="text-sm uppercase font-bold" htmlFor="password">
              E-mail
            </label>
            <input
              id="text"
              type="email"
              placeholder="Tu Email"
              className="w-full border border-gray-400 p-3 rounded-lg"
              {...register("email", {
                required: "EL e-mail es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2">
            <label htmlFor="handle" className="text-sm font-bold uppercase">
              Imagen
            </label>
            <input
              id="image"
              type="file"
              name="handle"
              className="p-2 border-none rounded-lg bg-slate-100"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          {updateImageMutation.isPending ? (
            <div className="flex justify-center my-3">
              <Spinner />
            </div>
          ) : (
            <div className="flex justify-center my-3">
              {data.image && (
                <img
                  src={data.image!}
                  alt="Imagen de perfil"
                  className="object-cover w-56 h-56 rounded-lg"
                />
              )}
            </div>
          )}
          <input
            type="submit"
            value="Guardar Cambios"
            className="bg-[#1B5040] hover:bg-[#304b43] w-full p-3 rounded-lg text-white font-black  text-xl cursor-pointer"
          />
        </form>
      </div>
    </>
  );
}
