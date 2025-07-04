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
import FormCleaningSticky from "./components/stickyTrapsCleaning/FormCleaningSticky";
import FormCleaningStickyEdit from "./components/stickyTrapsCleaning/FormCleaningStickyEdit";
import HomeCleaningEquipment from "./views/cleaningEquipment/HomeCleaningEquipment";
import { FormCleaningEquipment } from "./components/cleaningEquipmentCenter/FormCleaningEquipment";
import EditEquimentView from "./views/cleaningEquipment/EditEquimentView";
import NotFoundView from "./views/404/NotFounfView";
import UnauthorizedView from "./views/unauthorized/UnauthorizedView";
import HomeVisitCenter from "./views/visitCenter/HomeVisitCenter";
import RegisterVisitCenter from "./views/visitCenter/RegisterVisitCenter";

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
          <Route
            path="/register-sticky-traps"
            element={<FormCleaningSticky />}
          />
          <Route
            path="/cleaning-sticky-traps/edit/:id"
            element={<FormCleaningStickyEdit />}
          />
          <Route path="/cleaning-silos" element={<HomeCleaningSilos />} />
          <Route
            path="/register-cleaning-silo"
            element={<FormCleaningSilos />}
          />
          <Route
            path="/cleaning-silos/edit/:id"
            element={<FormCleaningEditSilos />}
          />
          <Route
            path="/cleaning-equipments"
            element={<HomeCleaningEquipment />}
          />
          <Route
            path="/register-cleaning-equipments"
            element={<FormCleaningEquipment />}
          />
          <Route
            path="/update-cleaning-equipments/edit/:id"
            element={<EditEquimentView />}
          />
          <Route path="/visit-center" element={<HomeVisitCenter />} />
          <Route
            path="/register-visit-center"
            element={<RegisterVisitCenter />}
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
        <Route path="/*" element={<NotFoundView />} />
        <Route path="/403" element={<UnauthorizedView />} />
      </Routes>
    </BrowserRouter>
  );
}
