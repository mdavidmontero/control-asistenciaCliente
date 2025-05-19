import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import type { confirmToken } from "../../types";
import { Link, useNavigate } from "react-router-dom";
import { confirmAccount } from "../../actions/auth.actions";

export default function ConfirmAccountView() {
  const navigate = useNavigate();
  const [token, setToken] = useState<confirmToken["token"]>("");
  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      toast.success(data, {
        onClose: () => {
          navigate("/auth/login");
        },
      });
    },
  });
  const handleChange = (token: confirmToken["token"]) => {
    setToken(token);
  };
  const handleCompleted = (token: confirmToken["token"]) => {
    mutate({ token });
  };
  return (
    <>
      <h1 className="font-black text-6xl text-green-800">Confirma tu cuenta</h1>
      <p className="text-3xl font-bold">
        Ingresa el código que recibiste{" "}
        <span className="text-amber-500">por email</span>
      </p>
      <form className="space-y-8 p-10 bg-white mt-10 border rounded-lg">
        <label className="font-normal text-xl text-center block">
          Código de 6 dígitos
        </label>
        <div className="flex justify-center gap-5">
          <PinInput
            value={token}
            onChange={handleChange}
            onComplete={handleCompleted}
          >
            <PinInputField className="w-10 h-10 rounde-lg text-center border border-gray-400 rounded placeholder-white" />
            <PinInputField className="w-10 h-10 rounde-lg text-center border border-gray-400 rounded placeholder-white" />
            <PinInputField className="w-10 h-10 rounde-lg text-center border border-gray-400 rounded placeholder-white" />
            <PinInputField className="w-10 h-10 rounde-lg text-center border border-gray-400 rounded placeholder-white" />
            <PinInputField className="w-10 h-10 rounde-lg text-center border border-gray-400 rounded placeholder-white" />
            <PinInputField className="w-10 h-10 rounde-lg text-center border border-gray-400 rounded placeholder-white" />
          </PinInput>
        </div>
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to="/auth/request-code"
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>
    </>
  );
}
