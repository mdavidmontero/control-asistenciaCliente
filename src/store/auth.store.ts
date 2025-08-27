import { login } from "@/actions/auth.actions";
import { checkAuthAction } from "@/actions/check-auth.actions";
import type { LoginFormData, User } from "@/types";
import { create } from "zustand";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  isAdmin: () => boolean;
  isVisitor: () => boolean;
  login: (formData: LoginFormData) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};
export const rolesPermission = [
  "ADMIN",
  "COORDINACIONTECNICA",
  "CALIDAD",
  "ADMINISTRATIVA",
  "BODEGA",
  "SISTEMAS",
  "LIMPIEZA",
  "CONTABILIDAD",
  "TRABAJADORES",
];

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: "checking",

  isAdmin: () => {
    const roles = get().user?.role ?? "";
    return rolesPermission.includes(roles!);
  },
  isVisitor: () => {
    const roles = get().user?.role ?? null;
    return roles === "USER";
  },

  login: async (formData: LoginFormData) => {
    try {
      const data = await login(formData);
      localStorage.setItem("AUTH_TOKEN", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (err) {
      localStorage.removeItem("AUTH_TOKEN");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("AUTH_TOKEN");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({ user, token, authStatus: "authenticated" });
      return true;
    } catch {
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },
}));
