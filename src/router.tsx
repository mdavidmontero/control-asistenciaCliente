import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";

import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import HomeAttedancen from "./views/attendance/HomeAttedancen";
import ProfileLayout from "./layouts/ProfileLayout";
import HomeProfile from "./views/profile/HomeProfile";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import HomeHistoryAttendance from "./views/attendance/HomeHistoryAttendance";
import HistoryAttendandeAll from "./views/attendance/HistoryAttendandeAll";
import HomeCleaningCenter from "./views/CleaningCenter/HomeCleaningCenter";
import FormCleaningEdit from "./components/centerCleaning/FormCleaningEdit";
import FormCleaningCenter from "./components/centerCleaning/FormCleaningCenter";
import HomeStickyTraps from "./views/stickyTraps/HomeStickyTraps";
import HomeCleaningSilos from "./views/cleaningSilos/HomeCleaningSilos";
import FormCleaningSilos from "./components/cleaningSilos/FormCleaningSilos";
import FormCleaningEditSilos from "./components/cleaningSilos/FormCleaningEditSilos";
import FormCleaningSticky from "./components/stickyTrapsCleaning/FormCleaningSticky";
import FormCleaningStickyEdit from "./components/stickyTrapsCleaning/FormCleaningStickyEdit";
import HomeCleaningEquipment from "./views/cleaningEquipment/HomeCleaningEquipment";
import { FormCleaningEquipment } from "./components/cleaningEquipmentCenter/FormCleaningEquipment";
import EditEquimentView from "./views/cleaningEquipment/EditEquimentView";
import HomeVisitCenter from "./views/visitCenter/HomeVisitCenter";
import RegisterVisitCenterView from "./views/visitCenter/RegisterVisitCenterView";
import HomeWelcomeVisit from "./views/home/HomeWelcomeVisit";
import RegisterAttendanceView from "./views/home/RegisterAttendance";
import DetailsVisit from "./components/visitCenter/DetailsVisit";
import ListVisitAll from "./components/visitCenter/ListVisitAll";
import {
  AdminRoute,
  NotAuthenticatedRoute,
} from "./components/routes/ProtectedRoutes";
import NotFoundView from "./views/404/NotFounfView.tsx";
import RoleIndexRedirect from "./components/routes/RoleIndexRedirect.tsx";

const AuthLayout = lazy(() => import("./layouts/AuthLayout.tsx"));
const AdminLayout = lazy(() => import("./layouts/AppLayout.tsx"));

export const appRouter = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <NotAuthenticatedRoute>
        <AuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginView />,
      },
      {
        path: "register",
        element: <RegisterView />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <RoleIndexRedirect /> },
      {
        path: "register-attendance",
        element: <RegisterAttendanceView />,
      },
      {
        path: "create-attendance",
        element: <HomeAttedancen />,
      },
      {
        path: "history-asistencia",
        element: <HomeHistoryAttendance />,
      },
      {
        path: "history-asistencias-todas",
        element: <HistoryAttendandeAll />,
      },
      {
        path: "cleaning-center",
        element: <HomeCleaningCenter />,
      },
      {
        path: "register-cleaning-center",
        element: <FormCleaningCenter />,
      },
      {
        path: "cleaning-center/edit/:id",
        element: <FormCleaningEdit />,
      },
      {
        path: "traps-center",
        element: <HomeStickyTraps />,
      },
      {
        path: "register-sticky-traps",
        element: <FormCleaningSticky />,
      },
      {
        path: "cleaning-sticky-traps/edit/:id",
        element: <FormCleaningStickyEdit />,
      },
      {
        path: "cleaning-silos",
        element: <HomeCleaningSilos />,
      },
      {
        path: "register-cleaning-silo",
        element: <FormCleaningSilos />,
      },
      {
        path: "cleaning-silos/edit/:id",
        element: <FormCleaningEditSilos />,
      },
      {
        path: "cleaning-equipments",
        element: <HomeCleaningEquipment />,
      },
      {
        path: "register-cleaning-equipments",
        element: <FormCleaningEquipment />,
      },
      {
        path: "update-cleaning-equipments/edit/:id",
        element: <EditEquimentView />,
      },
      {
        path: "welcome-visit",
        element: <HomeWelcomeVisit />,
      },
      {
        path: "visit-center",
        element: <HomeVisitCenter />,
      },
      {
        path: "visits-center-all",
        element: <ListVisitAll />,
      },
      {
        path: "visit-cente-detail/:id",
        element: <DetailsVisit />,
      },
      {
        path: "register-visit-center",
        element: <RegisterVisitCenterView />,
      },
      {
        element: <ProfileLayout />,
        children: [
          {
            path: "profile",
            element: <HomeProfile />,
          },
          {
            path: "profile/password",
            element: <ChangePasswordView />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundView />,
  },
]);

// export default function Router() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomeInitialView />} />
//         <Route element={<AppLayout />}>
//           <Route
//             path="/register-attendance"
//             element={<RegisterAttendanceView />}
//           />
//           <Route path="/create-attendance" element={<HomeAttedancen />} />
//           <Route
//             path="/history-asistencia"
//             element={<HomeHistoryAttendance />}
//           />
//           <Route
//             path="/history-asistencias-todas"
//             element={<HistoryAttendandeAll />}
//           />
//           <Route path="/cleaning-center" element={<HomeCleaningCenter />} />
//           <Route
//             path="/register-cleaning-center"
//             element={<FormCleaningCenter />}
//           />
//           <Route
//             path="/cleaning-center/edit/:id"
//             element={<FormCleaningEdit />}
//           />
//           <Route path="/traps-center" element={<HomeStickyTraps />} />
//           <Route
//             path="/register-sticky-traps"
//             element={<FormCleaningSticky />}
//           />
//           <Route
//             path="/cleaning-sticky-traps/edit/:id"
//             element={<FormCleaningStickyEdit />}
//           />
//           <Route path="/cleaning-silos" element={<HomeCleaningSilos />} />
//           <Route
//             path="/register-cleaning-silo"
//             element={<FormCleaningSilos />}
//           />
//           <Route
//             path="/cleaning-silos/edit/:id"
//             element={<FormCleaningEditSilos />}
//           />
//           <Route
//             path="/cleaning-equipments"
//             element={<HomeCleaningEquipment />}
//           />
//           <Route
//             path="/register-cleaning-equipments"
//             element={<FormCleaningEquipment />}
//           />
//           <Route
//             path="/update-cleaning-equipments/edit/:id"
//             element={<EditEquimentView />}
//           />
//           <Route path="/welcome-visit" element={<HomeWelcomeVisit />} />
//           <Route path="/visit-center" element={<HomeVisitCenter />} />
//           <Route path="/visits-center-all" element={<ListVisitAll />} />
//           <Route path="/visit-cente-detail/:id" element={<DetailsVisit />} />
//           <Route
//             path="/register-visit-center"
//             element={<RegisterVisitCenterView />}
//           />

//           <Route element={<ProfileLayout />}>
//             <Route path="/profile" element={<HomeProfile />} />
//             <Route path="/profile/password" element={<ChangePasswordView />} />
//           </Route>
//         </Route>

//         <Route element={<AuthLayout />}>
//           <Route path="/auth/login" element={<LoginView />} />
//           <Route path="/auth/register" element={<RegisterView />} />
//           <Route
//             path="/auth/confirm-account"
//             element={<ConfirmAccountView />}
//           />
//           <Route path="/auth/request-code" element={<RequestNewCodeView />} />
//           <Route
//             path="/auth/forgot-password"
//             element={<ForgotPasswordView />}
//           />
//           <Route path="/auth/new-password" element={<NewPasswordView />} />
//         </Route>
//         <Route path="/*" element={<NotFoundView />} />
//         <Route path="/403" element={<UnauthorizedView />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
