import MainHeader from "@/app/(main)/home/components/MainHeader";
import Leaderboard from "../components/leaderboard";
import UserAudio from "../components/UserAudio";

export default function LeaderboardSectionn() {
  return (
    <div className="min-h-screen bg-[#C0e6BA] ">
      <MainHeader />
      <Leaderboard />
      <UserAudio />
    </div>
  );
}
