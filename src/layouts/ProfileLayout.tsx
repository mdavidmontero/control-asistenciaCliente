import { Outlet } from "react-router-dom";
import ProfileTabs from "../components/profile/ProfileTabs";

export default function ProfileLayout() {
  return (
    <>
      <ProfileTabs />
      <Outlet />
    </>
  );
}
