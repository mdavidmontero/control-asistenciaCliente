import { Navigate } from "react-router";
import { useAuthStore } from "@/store/auth.store";

export default function RoleIndexRedirect() {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/auth/login" replace />;

  return user.role === "USER" ? (
    <Navigate to="/welcome-visit" replace />
  ) : (
    <Navigate to="/register-attendance" replace />
  );
}
