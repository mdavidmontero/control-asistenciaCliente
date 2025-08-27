import { Outlet } from "react-router";
import ProfileTabs from "../components/profile/ProfileTabs";

export default function ProfileLayout() {
  return (
    <>
      <ProfileTabs />
      <Outlet />
    </>
  );
}
