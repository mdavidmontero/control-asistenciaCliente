import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import ForgotPasswordView from "./views/auth/ForgotPasswordView";
import RequestNewCodeView from "./views/auth/RequestNewCodeView";
import NewPasswordView from "./views/auth/NewPasswordView";
import AppLayout from "./layouts/AppLayout";
import HomeView from "./views/home/HomeView";
import HomeAttedancen from "./views/attendance/HomeAttedancen";
import ProfileLayout from "./layouts/ProfileLayout";
import HomeProfile from "./views/profile/HomeProfile";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import HomeHistoryAttendance from "./views/attendance/HomeHistoryAttendance";
import HistoryAttendandeAll from "./views/attendance/HistoryAttendandeAll";
import HomeCleaningCenter from "./views/CleaningCenter/HomeCleaningCenter";
import FormCleaningEdit from "./components/centerCleaning/FormCleaningEdit";
import FormCleaningCenter from "./components/centerCleaning/FormCleaningCenter";
import { useUbicacionStore } from "./store/ubicacionStore";
import { useEffect } from "react";
import HomeStickyTraps from "./views/stickyTraps/HomeStickyTraps";
import HomeCleaningSilos from "./views/cleaningSilos/HomeCleaningSilos";
import FormCleaningSilos from "./components/cleaningSilos/FormCleaningSilos";
import FormCleaningEditSilos from "./components/cleaningSilos/FormCleaningEditSilos";

export default function Router() {
  const cargarUbicacion = useUbicacionStore((state) => state.cargarUbicacion);

  useEffect(() => {
    cargarUbicacion();
  }, [cargarUbicacion]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomeView />} />
          <Route path="/create-attendance" element={<HomeAttedancen />} />
          <Route
            path="/history-asistencia"
            element={<HomeHistoryAttendance />}
          />
          <Route
            path="/history-asistencias-todas"
            element={<HistoryAttendandeAll />}
          />
          <Route path="/cleaning-center" element={<HomeCleaningCenter />} />
          <Route
            path="/register-cleaning-center"
            element={<FormCleaningCenter />}
          />
          <Route
            path="/cleaning-center/edit/:id"
            element={<FormCleaningEdit />}
          />
          <Route path="/traps-center" element={<HomeStickyTraps />} />
          <Route path="/cleaning-silos" element={<HomeCleaningSilos />} />
          <Route
            path="/register-cleaning-silo"
            element={<FormCleaningSilos />}
          />
          <Route
            path="/cleaning-silos/edit/:id"
            element={<FormCleaningEditSilos />}
          />

          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<HomeProfile />} />
            <Route path="/profile/password" element={<ChangePasswordView />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/request-code" element={<RequestNewCodeView />} />
          <Route
            path="/auth/forgot-password"
            element={<ForgotPasswordView />}
          />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
