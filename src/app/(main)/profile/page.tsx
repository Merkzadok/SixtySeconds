import Payment from "./components/Payment";
import PersonalInfo from "./components/PersonalInfo";
import { AccountSecurity } from "./components/Security";
import UserProfile from "./components/ProfileCard";

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <UserProfile />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PersonalInfo />
        </div>
        <div>
          <AccountSecurity />
        </div>
      </div>
      <Payment />
    </div>
  );
}
