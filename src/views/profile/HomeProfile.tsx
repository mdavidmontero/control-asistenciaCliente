import { useAuthStore } from "@/store/auth.store";
import ProfileForm from "../../components/profile/ProfileForm";

export default function ProfileView() {
  const { user } = useAuthStore();
  if (user) return <ProfileForm data={user} />;
}
