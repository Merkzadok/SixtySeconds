import ProtectedRoute from "@/provider/ProtectPage";
import PersonalInfo from "./components/PersonalInfo";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div>
        <PersonalInfo />
      </div>
    </ProtectedRoute>
  );
}
